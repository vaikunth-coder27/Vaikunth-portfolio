// Session logging, auto-compaction, and durable rate limiting (MongoDB-backed).
// All functions fail-open: if the DB is unavailable, the chat keeps working.

import { getDb } from '@/lib/db/mongo'
import type { UpdateFilter } from 'mongodb'

// Session document uses the string sessionId as its _id.
type SessionDoc = {
  _id: string
  createdAt?: Date
  updatedAt?: Date
  ip?: string
  userAgent?: string | null
  messages?: { role: string; content: string; ts: Date }[]
  summary?: string
  summaryCovers?: number
  turns?: number
  tokensIn?: number
  tokensOut?: number
  toolCalls?: { name: string; ts: Date }[]
  guardrailEvents?: { type: string; ts: Date }[]
  compactions?: CompactionEvent[]
  verified?: boolean
}

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const SUMMARY_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'

// Compaction tuning: keep the last N turns verbatim; only compact once the
// conversation grows past the trigger. Short portfolio chats rarely hit this.
const KEEP_RECENT = 6
const COMPACT_TRIGGER = 10

export type Msg = { role: 'user' | 'assistant'; content: string }
export type LlmMsg = { role: 'system' | 'user' | 'assistant'; content: string }

export function approxTokens(text: string): number {
  return Math.ceil((text || '').length / 4)
}

function tokensOf(msgs: { content: string }[]): number {
  return msgs.reduce((n, m) => n + approxTokens(m.content), 0)
}

// ── Summarise older turns into a running memory (only on long chats) ──────────
async function summarise(apiKey: string, prevSummary: string, toFold: Msg[]): Promise<string> {
  const transcript = toFold.map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n')
  const prompt = `You are compressing a portfolio-chat conversation to save context.
${prevSummary ? `Existing summary:\n${prevSummary}\n\n` : ''}New messages to fold in:
${transcript}

Write an updated summary in 2-4 sentences. Preserve: who the visitor is, what they do, their interests, anything they asked, and any pending action (e.g. a message to send Vaikunth). Be concise and factual.`

  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: SUMMARY_MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 220,
      temperature: 0.3,
    }),
  })
  if (!res.ok) throw new Error(`summarise ${res.status}`)
  const data = await res.json()
  return (data?.choices?.[0]?.message?.content ?? prevSummary).trim()
}

export type CompactionEvent = {
  at: Date
  coveredUpTo: number
  tokensBefore: number
  tokensAfter: number
}

export type ContextResult = {
  messages: LlmMsg[]
  summary: string
  summaryCovers: number
  compaction?: CompactionEvent
}

// Build the messages sent to the LLM, applying auto-compaction for long chats.
export async function buildContext(
  sessionId: string,
  history: Msg[],
  systemPrompt: string,
  apiKey: string,
): Promise<ContextResult> {
  const base: LlmMsg[] = [{ role: 'system', content: systemPrompt }]

  // Short conversation: no compaction needed.
  if (history.length <= COMPACT_TRIGGER) {
    return { messages: [...base, ...history], summary: '', summaryCovers: 0 }
  }

  const olderEnd = history.length - KEEP_RECENT // messages [0, olderEnd) get summarised

  // Load any existing running summary for this session.
  let summary = ''
  let summaryCovers = 0
  try {
    const db = await getDb()
    if (db && sessionId) {
      const doc = await db.collection<SessionDoc>('sessions').findOne(
        { _id: sessionId },
        { projection: { summary: 1, summaryCovers: 1 } },
      )
      if (doc) {
        summary = doc.summary ?? ''
        summaryCovers = doc.summaryCovers ?? 0
      }
    }
  } catch {
    /* fall through to stateless fallback below */
  }

  let compaction: CompactionEvent | undefined

  // Fold any not-yet-summarised older messages into the running summary.
  if (summaryCovers < olderEnd) {
    const toFold = history.slice(summaryCovers, olderEnd)
    try {
      const before = tokensOf(toFold)
      summary = await summarise(apiKey, summary, toFold)
      compaction = {
        at: new Date(),
        coveredUpTo: olderEnd,
        tokensBefore: before,
        tokensAfter: approxTokens(summary),
      }
      summaryCovers = olderEnd
    } catch {
      // Summarise failed (e.g. DB unavailable path): degrade to a safe truncation
      // that keeps recent turns verbatim without a summary.
      return { messages: [...base, ...history.slice(olderEnd)], summary: '', summaryCovers: 0 }
    }
  }

  const messages: LlmMsg[] = [
    ...base,
    { role: 'system', content: `Earlier conversation summary (for your context):\n${summary}` },
    ...history.slice(olderEnd),
  ]
  return { messages, summary, summaryCovers, compaction }
}

// ── Log one interaction (fire-and-forget; call via after()) ───────────────────
export type LogInput = {
  sessionId: string
  ip: string
  userAgent?: string
  userMessage: string
  assistantMessage: string
  toolCalls?: string[]
  guardrail?: string // e.g. 'jailbreak', 'injection', 'abuse'
  tokensIn?: number
  tokensOut?: number
  summary?: string
  summaryCovers?: number
  compaction?: CompactionEvent
}

export async function logInteraction(input: LogInput): Promise<void> {
  try {
    const db = await getDb()
    if (!db || !input.sessionId) return
    const now = new Date()

    const push: Record<string, unknown> = {
      messages: {
        $each: [
          { role: 'user', content: input.userMessage, ts: now },
          { role: 'assistant', content: input.assistantMessage, ts: now },
        ],
      },
    }
    if (input.toolCalls?.length) {
      push.toolCalls = { $each: input.toolCalls.map((name) => ({ name, ts: now })) }
    }
    if (input.guardrail) {
      push.guardrailEvents = { type: input.guardrail, ts: now }
    }
    if (input.compaction) {
      push.compactions = input.compaction
    }

    const set: Record<string, unknown> = { updatedAt: now }
    if (input.summary !== undefined) set.summary = input.summary
    if (input.summaryCovers !== undefined) set.summaryCovers = input.summaryCovers

    await db.collection<SessionDoc>('sessions').updateOne(
      { _id: input.sessionId },
      {
        $setOnInsert: { createdAt: now, ip: input.ip, userAgent: input.userAgent ?? null },
        $set: set,
        $inc: {
          turns: 1,
          tokensIn: input.tokensIn ?? 0,
          tokensOut: input.tokensOut ?? 0,
        },
        $push: push,
      } as UpdateFilter<SessionDoc>,
      { upsert: true },
    )
  } catch (err) {
    console.error('logInteraction failed (non-fatal):', err)
  }
}

// ── Durable email rate limits (send_notification) ─────────────────────────────
const EMAIL_PER_IP_PER_DAY = Number(process.env.EMAIL_IP_PER_DAY || 5)
// Global circuit-breaker: even a distributed attack can't flood the inbox or burn
// the Resend quota beyond this many emails per day across ALL senders.
const EMAIL_GLOBAL_PER_DAY = Number(process.env.EMAIL_GLOBAL_PER_DAY || 25)

// Returns true if allowed. Fail-open (true) when the DB is unavailable.
export async function emailRateLimitOk(ip: string): Promise<boolean> {
  try {
    const db = await getDb()
    if (!db) return true
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const [perIp, global] = await Promise.all([
      db.collection('email_log').countDocuments({ ip, at: { $gte: since } }),
      db.collection('email_log').countDocuments({ at: { $gte: since } }),
    ])
    return perIp < EMAIL_PER_IP_PER_DAY && global < EMAIL_GLOBAL_PER_DAY
  } catch {
    return true
  }
}

// ── Per-session Turnstile verification (verify once per chat, not per message) ─
const verifiedSessions = new Set<string>()

export async function isSessionVerified(sessionId: string): Promise<boolean> {
  if (!sessionId) return false
  if (verifiedSessions.has(sessionId)) return true
  try {
    const db = await getDb()
    if (!db) return false
    const doc = await db
      .collection<SessionDoc>('sessions')
      .findOne({ _id: sessionId }, { projection: { verified: 1 } })
    if (doc?.verified) {
      verifiedSessions.add(sessionId)
      return true
    }
  } catch {
    /* fall through */
  }
  return false
}

export async function markSessionVerified(sessionId: string): Promise<void> {
  if (!sessionId) return
  verifiedSessions.add(sessionId)
  try {
    const db = await getDb()
    if (!db) return
    await db
      .collection<SessionDoc>('sessions')
      .updateOne({ _id: sessionId }, { $set: { verified: true } }, { upsert: true })
  } catch {
    /* non-fatal */
  }
}

export async function recordEmailSend(ip: string, to: string, from: string): Promise<void> {
  try {
    const db = await getDb()
    if (!db) return
    await db.collection('email_log').insertOne({ ip, to, from, at: new Date() })
  } catch {
    /* non-fatal */
  }
}
