// Layered, cost-first guardrails for the portfolio chat.
//
//   0. precheckInput   — regex canned pre-filter (zero tokens): obvious jailbreak /
//                        prompt-extraction / abuse → instant friendly redirect.
//   1. detectInjection — Llama Prompt Guard 2 (86M) on Groq: catches subtler
//                        prompt-injection / jailbreak attempts. Fail-open.
//   2. (persona)       — off-topic steering handled by SYSTEM_PROMPT.
//   3. guardOutput     — strips any leaked system-prompt / function markup.

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GUARD_MODEL = process.env.GROQ_GUARD_MODEL || 'meta-llama/llama-prompt-guard-2-86m'
// Prompt Guard 2 returns P(attack) in [0,1]. 0.8 keeps false positives low.
const GUARD_THRESHOLD = Number(process.env.GROQ_GUARD_THRESHOLD || 0.8)
const GUARD_ENABLED = process.env.GROQ_GUARD_ENABLED !== 'false'

// Cap on a single user message (protects the token budget from dumps/attacks).
export const MAX_USER_CHARS = 2000
// Max words per message. Keep in sync with MAX_INPUT_WORDS in chat-input.tsx.
export const MAX_USER_WORDS = 50

// Trim a message to at most MAX_USER_WORDS words (server-side backstop).
export function capWords(text: string): string {
  const words = (text || '').trim().split(/\s+/).filter(Boolean)
  if (words.length <= MAX_USER_WORDS) return text
  return words.slice(0, MAX_USER_WORDS).join(' ')
}

// Friendly, on-brand canned replies (zero LLM tokens).
export const CANNED = {
  jailbreak:
    "Ha, nice try 😄 — I'm just here to chat about Vaikunth and his work, not to peek behind the curtain. What would you like to know about him?",
  injection:
    "I'll stick to what I'm here for — talking about Vaikunth and his work! What would you like to know about his experience or projects?",
  abuse:
    "Let's keep it friendly! I'm happy to tell you all about Vaikunth's work — what are you curious about?",
}

// ── 0. Regex pre-filter ──────────────────────────────────────────────────────
const JAILBREAK_PATTERNS: RegExp[] = [
  /ignore\s+(?:all\s+|any\s+|the\s+|your\s+)?(?:previous|prior|above|earlier|preceding)?\s*(?:instructions|prompts?|rules|directions)/i,
  /disregard\s+(?:all\s+|the\s+|your\s+)?(?:previous|above|prior)?\s*(?:instructions|rules|prompts?)/i,
  /(?:reveal|show|print|repeat|expose|display|tell\s+me|what(?:'?s| is|\s+are))\b[^.?!]{0,40}\b(?:system\s*prompt|your\s+(?:instructions|prompt|rules|guidelines|system\s*message))/i,
  /\b(?:system\s*prompt|initial\s+instructions|your\s+prompt)\b/i,
  /\b(?:developer\s+mode|jailbreak|DAN\b|do\s+anything\s+now|sudo\s+mode|god\s+mode)\b/i,
  /pretend\s+(?:you\s+are|to\s+be)\s+(?!vaikunth)/i,
  /you\s+are\s+now\s+(?:a|an|the|no\s+longer)/i,
]

const ABUSE_PATTERNS: RegExp[] = [
  /\b(?:fuck|shit|bitch|asshole|cunt|dick|bastard)\b/i,
  /\bstupid\s+(?:bot|ai|assistant)\b/i,
]

export type Precheck = { blocked: boolean; reply: string; reason: string }

export function precheckInput(text: string): Precheck | null {
  const t = (text || '').slice(0, MAX_USER_CHARS)
  if (JAILBREAK_PATTERNS.some((re) => re.test(t))) {
    return { blocked: true, reply: CANNED.jailbreak, reason: 'jailbreak' }
  }
  if (ABUSE_PATTERNS.some((re) => re.test(t))) {
    return { blocked: true, reply: CANNED.abuse, reason: 'abuse' }
  }
  return null
}

// ── 1. Prompt Guard 2 (LLM injection detector) ───────────────────────────────
export async function detectInjection(
  apiKey: string,
  text: string,
): Promise<{ attack: boolean; score: number }> {
  if (!GUARD_ENABLED) return { attack: false, score: 0 }
  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: GUARD_MODEL,
        messages: [{ role: 'user', content: (text || '').slice(0, MAX_USER_CHARS) }],
        max_tokens: 10,
        temperature: 0,
      }),
    })
    if (!res.ok) return { attack: false, score: 0 } // fail-open
    const data = await res.json()
    const raw = data?.choices?.[0]?.message?.content ?? '0'
    const score = parseFloat(String(raw).trim())
    if (!Number.isFinite(score)) return { attack: false, score: 0 }
    return { attack: score >= GUARD_THRESHOLD, score }
  } catch {
    return { attack: false, score: 0 } // fail-open on any error
  }
}

// ── 3. Output guard ──────────────────────────────────────────────────────────
// Sentinel phrases that only appear if the system prompt leaked into the reply.
const LEAK_SENTINELS = [
  'warm, easygoing mutual friend',
  'peak marketing',
  '# The vibe',
  '# Boundaries',
  '# Grounding',
  'SYSTEM_PROMPT',
  'send_notification tool',
]

function stripFunctionMarkup(s: string): string {
  return s
    .replace(/<function\s*=[\s\S]*$/i, '')
    .replace(/<\/?function[^>]*>/gi, '')
    .trim()
}

export function guardOutput(text: string): string {
  const cleaned = stripFunctionMarkup(text || '')
  const lower = cleaned.toLowerCase()
  if (LEAK_SENTINELS.some((s) => lower.includes(s.toLowerCase()))) {
    return "I'll keep us focused on Vaikunth — what would you like to know about his work, projects, or experience?"
  }
  return cleaned
}
