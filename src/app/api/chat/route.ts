import { after } from 'next/server'
import { SYSTEM_PROMPT, FALLBACKS } from '@/lib/ai/persona'
import { toolSchemas, executeTool } from '@/lib/ai/tools'
import { precheckInput, detectInjection, guardOutput, CANNED, MAX_USER_CHARS, capWords } from '@/lib/ai/guardrails'
import {
  buildContext,
  logInteraction,
  approxTokens,
  isSessionVerified,
  markSessionVerified,
  type Msg,
  type LogInput,
} from '@/lib/ai/sessions'
import { reserveBudget, recordTokens } from '@/lib/ai/throttle'
import { checkRateLimit } from '@/lib/ai/ratelimit'
import { isTurnstileEnabled, verifyTurnstile } from '@/lib/ai/turnstile'

// Hard cap on how many prior messages we'll process from one request.
const MAX_HISTORY_MESSAGES = 60

// Groq (OpenAI-compatible) — free tier. 8B instant is the workhorse; it supports
// tool calling and has the most generous free daily budget.
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'
const MAX_TOOL_ROUNDS = 3

// Progressive per-session pacing: message 1 is instant; each later message in the
// same chat is delayed a little more (step per turn, capped) to smooth token use.
const SESSION_DELAY_STEP_MS = Number(process.env.CHAT_DELAY_STEP_MS || 450)
const SESSION_DELAY_MAX_MS = Number(process.env.CHAT_DELAY_MAX_MS || 4000)

type ChatMessage = {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string | null
  tool_calls?: {
    id: string
    type: 'function'
    function: { name: string; arguments: string }
  }[]
  tool_call_id?: string
}

type GroqResult =
  | { ok: true; json: { choices?: { message?: ChatMessage }[]; usage?: { total_tokens?: number } } }
  | { ok: false; status: number; code?: string; failedGeneration?: string; retryAfterMs?: number; raw: string }

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function callGroq(apiKey: string, messages: ChatMessage[], withTools: boolean): Promise<GroqResult> {
  // Proactive TPM pacing: estimate this request's size (input + tool schemas +
  // room for the reply) and wait if we're near the per-minute cap.
  const estTokens =
    approxTokens(messages.map((m) => m.content ?? '').join('\n')) + (withTools ? 350 : 0) + 400
  await reserveBudget(estTokens)

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages,
      max_tokens: 400,
      temperature: 0.7,
      ...(withTools ? { tools: toolSchemas, tool_choice: 'auto' } : {}),
    }),
  })

  if (!res.ok) {
    const raw = await res.text()
    let code: string | undefined
    let failedGeneration: string | undefined
    let retryAfterMs: number | undefined
    try {
      const j = JSON.parse(raw)
      code = j?.error?.code
      failedGeneration = j?.error?.failed_generation
      const m = /try again in ([\d.]+)s/i.exec(j?.error?.message ?? '')
      if (m) retryAfterMs = Math.ceil(parseFloat(m[1]) * 1000)
    } catch {
      /* keep raw */
    }
    const header = res.headers.get('retry-after')
    if (retryAfterMs == null && header) retryAfterMs = Math.ceil(parseFloat(header) * 1000)
    return { ok: false, status: res.status, code, failedGeneration, retryAfterMs, raw }
  }
  const json = await res.json()
  recordTokens(json?.usage?.total_tokens ?? estTokens)
  return { ok: true, json }
}

export async function POST(req: Request) {
  try {
    const { messages: incoming, sessionId: rawSessionId, turnstileToken } = await req.json()

    if (!Array.isArray(incoming)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 })
    }

    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      console.error('GROQ_API_KEY not configured')
      return Response.json({ content: FALLBACKS.error }, { status: 200 })
    }

    const sessionId = typeof rawSessionId === 'string' && rawSessionId ? rawSessionId.slice(0, 64) : 'anon'
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'
    const userAgent = req.headers.get('user-agent') ?? undefined

    // ── Rate limiting FIRST — before any LLM call or pacing delay ──
    // Rejects floods cheaply so they never reach the model or hold a function open.
    const rl = await checkRateLimit(ip)
    if (!rl.ok) {
      return Response.json({ content: FALLBACKS.busy }, { status: 429 })
    }

    // ── Bot check (Cloudflare Turnstile), verified once per session ──
    // Invisible to real users; scripted clients can't produce a valid token.
    // 'anon' (non-widget/direct API callers) is never cached, so it must present
    // a fresh valid token every time.
    if (isTurnstileEnabled()) {
      const cacheable = sessionId !== 'anon'
      const alreadyVerified = cacheable && (await isSessionVerified(sessionId))
      if (!alreadyVerified) {
        const token = typeof turnstileToken === 'string' ? turnstileToken : ''
        const passed = await verifyTurnstile(token, ip)
        if (!passed) {
          return Response.json({ content: FALLBACKS.needVerify, needVerify: true })
        }
        if (cacheable) await markSessionVerified(sessionId)
      }
    }

    // Only keep the fields the API expects; cap history length + each message.
    const history: Msg[] = (incoming as unknown[])
      .slice(-MAX_HISTORY_MESSAGES)
      .filter((m): m is { role?: string; content?: string } => !!m && typeof m === 'object')
      .filter((m) => typeof m.role === 'string' && typeof m.content === 'string')
      .map((m) => {
        const role = m.role === 'user' ? ('user' as const) : ('assistant' as const)
        const raw = String(m.content ?? '')
        const content = role === 'user' ? capWords(raw).slice(0, MAX_USER_CHARS) : raw.slice(0, MAX_USER_CHARS)
        return { role, content }
      })

    const lastUser = [...history].reverse().find((m) => m.role === 'user')?.content ?? ''

    // Defer session logging until after the response is sent.
    const log = (assistantMessage: string, extra: Partial<LogInput> = {}) => {
      after(() =>
        logInteraction({
          sessionId,
          ip,
          userAgent,
          userMessage: lastUser,
          assistantMessage,
          tokensIn: extra.tokensIn ?? approxTokens(lastUser),
          tokensOut: approxTokens(assistantMessage),
          ...extra,
        }),
      )
    }

    // ── Input guardrails on the latest user message ──
    // 0. Regex canned pre-filter (zero tokens).
    const pre = precheckInput(lastUser)
    if (pre) {
      log(pre.reply, { guardrail: pre.reason })
      return Response.json({ content: pre.reply })
    }

    // 1. Prompt Guard 2 — LLM injection/jailbreak detector (fail-open).
    const { attack } = await detectInjection(apiKey, lastUser)
    if (attack) {
      log(CANNED.injection, { guardrail: 'injection' })
      return Response.json({ content: CANNED.injection })
    }

    // ── Progressive per-session pacing ──
    // 1st user message: instant. Each later message: a slightly longer delay,
    // spreading token usage over time. Masked by the client's "thinking…" filler.
    const userTurn = history.filter((m) => m.role === 'user').length
    if (userTurn >= 2) {
      const delay = Math.min((userTurn - 1) * SESSION_DELAY_STEP_MS, SESSION_DELAY_MAX_MS)
      if (delay > 0) await sleep(delay)
    }

    // ── Auto-compaction: bound the context (and cost) on long conversations ──
    const ctx = await buildContext(sessionId, history, SYSTEM_PROMPT, apiKey)
    const convo: ChatMessage[] = [...ctx.messages]
    const tokensIn = approxTokens(ctx.messages.map((m) => m.content).join('\n'))
    const collectedToolCalls: string[] = []

    // Tool-calling loop: let the model fetch grounded facts, then answer.
    for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
      const isLastRound = round === MAX_TOOL_ROUNDS - 1
      let resp = await callGroq(apiKey, convo, !isLastRound)

      // Rate limited (free-tier TPM/RPM): auto-retry once if the wait is short,
      // otherwise return a friendly "busy" message rather than a hard error.
      if (!resp.ok && resp.status === 429) {
        const waitMs = resp.retryAfterMs ?? 0
        if (waitMs > 0 && waitMs <= 3500) {
          await sleep(waitMs + 250)
          resp = await callGroq(apiKey, convo, !isLastRound)
        }
        if (!resp.ok && resp.status === 429) {
          log(FALLBACKS.busy, { guardrail: 'rate_limited', tokensIn })
          return Response.json({ content: FALLBACKS.busy })
        }
      }

      // Recover from a malformed/failed tool call: retry once WITHOUT tools so the
      // model produces a clean plain-text reply; salvage its prose if even that fails.
      if (!resp.ok) {
        if (resp.code === 'tool_use_failed') {
          const retry = await callGroq(apiKey, convo, false)
          if (retry.ok) {
            resp = retry
          } else {
            const salvage = guardOutput(resp.failedGeneration || '') || FALLBACKS.error
            log(salvage, { tokensIn, summary: ctx.summary, summaryCovers: ctx.summaryCovers, compaction: ctx.compaction })
            return Response.json({ content: salvage })
          }
        } else {
          console.error('Groq error:', resp.status, resp.raw)
          return Response.json({ content: FALLBACKS.error })
        }
      }

      const msg = resp.json.choices?.[0]?.message
      if (!msg) {
        return Response.json({ content: FALLBACKS.error })
      }

      const toolCalls = msg.tool_calls
      if (toolCalls?.length && !isLastRound) {
        // Record the assistant's tool-call turn, then append each tool result.
        convo.push({ role: 'assistant', content: msg.content ?? '', tool_calls: toolCalls })
        for (const tc of toolCalls) {
          let args: Record<string, unknown> = {}
          try {
            args = tc.function.arguments ? JSON.parse(tc.function.arguments) : {}
          } catch {
            args = {}
          }
          collectedToolCalls.push(tc.function.name)
          const result = await executeTool(tc.function.name, args, { ip })
          convo.push({
            role: 'tool',
            tool_call_id: tc.id,
            content: JSON.stringify(result),
          })
        }
        continue
      }

      // Normal completion.
      const content = guardOutput(msg.content || '') || FALLBACKS.offTopic
      log(content, {
        tokensIn,
        toolCalls: collectedToolCalls,
        summary: ctx.summary,
        summaryCovers: ctx.summaryCovers,
        compaction: ctx.compaction,
      })
      return Response.json({ content })
    }

    return Response.json({ content: FALLBACKS.error })
  } catch (err) {
    console.error('Chat API error:', err)
    return Response.json({ content: FALLBACKS.error }, { status: 200 })
  }
}
