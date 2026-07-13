// Proactive throttle for Groq's per-minute token budget (TPM).
//
// Groq's free tier caps tokens-per-minute (default 6000). Rather than let a burst
// hit a hard 429, we keep a rolling 60s window of tokens spent and, when a new
// request would push past ~80% of the cap, we wait just long enough for older
// tokens to age out of the window. The client masks this pause with "thinking…"
// filler so it feels natural. The hard 429 handler in the route stays as backstop.

const TPM = Number(process.env.GROQ_TPM || 6000)
const WINDOW_MS = 60_000
const SOFT = 0.8 // start pacing at 80% of the cap
const MAX_DELAY_MS = 4500 // never stall a single Groq call longer than this

type Hit = { ts: number; tokens: number }
const hits: Hit[] = []

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function prune(now: number) {
  while (hits.length && now - hits[0].ts > WINDOW_MS) hits.shift()
}

function usedTokens(now: number): number {
  prune(now)
  return hits.reduce((s, h) => s + h.tokens, 0)
}

// Wait just long enough that this request won't blow the soft TPM cap.
// Returns the delay applied (ms) so the caller can report/telemeter it.
export async function reserveBudget(estTokens: number): Promise<number> {
  const now = Date.now()
  const used = usedTokens(now)
  const cap = SOFT * TPM
  if (used + estTokens <= cap) return 0

  // How many tokens must age out of the window before this request fits?
  const mustFree = used + estTokens - cap
  let freed = 0
  let waitMs = 0
  for (const h of hits) {
    freed += h.tokens
    if (freed >= mustFree) {
      waitMs = h.ts + WINDOW_MS - now
      break
    }
  }
  const delay = Math.min(Math.max(0, waitMs), MAX_DELAY_MS)
  if (delay > 0) await sleep(delay)
  return delay
}

export function recordTokens(tokens: number) {
  hits.push({ ts: Date.now(), tokens: Math.max(0, tokens) })
}

// How close we are to the soft cap right now (0–1+). Handy for telemetry.
export function windowLoad(): number {
  return usedTokens(Date.now()) / (SOFT * TPM)
}
