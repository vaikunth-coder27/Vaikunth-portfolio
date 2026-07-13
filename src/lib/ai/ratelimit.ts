// Abuse / DDoS protection: per-IP and global request rate limiting.
//
// Layered, cheapest-first, and always evaluated BEFORE any LLM call or pacing
// delay so floods are rejected without holding serverless functions open:
//   1. Global in-memory gate (per instance) — instant, no DB.
//   2. Durable per-IP fixed-window counters in MongoDB (min + day).
// Fail-open: if the DB is unavailable, requests are allowed (availability > lockout).

import { getDb } from '@/lib/db/mongo'

const PER_IP_PER_MIN = Number(process.env.RL_IP_PER_MIN || 12)
const PER_IP_PER_DAY = Number(process.env.RL_IP_PER_DAY || 150)
const GLOBAL_PER_MIN = Number(process.env.RL_GLOBAL_PER_MIN || 90)

type RateDoc = { _id: string; c?: number; expireAt?: Date }

export function clientIp(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

// ── 1. Global in-memory gate (per warm instance) ─────────────────────────────
const globalHits: number[] = []
function globalOk(): boolean {
  const now = Date.now()
  while (globalHits.length && now - globalHits[0] > 60_000) globalHits.shift()
  if (globalHits.length >= GLOBAL_PER_MIN) return false
  globalHits.push(now)
  return true
}

// ── 2. Durable per-IP fixed-window counters ──────────────────────────────────
let indexReady = false
async function ensureIndex(db: NonNullable<Awaited<ReturnType<typeof getDb>>>) {
  if (indexReady) return
  try {
    await db.collection('rate').createIndex({ expireAt: 1 }, { expireAfterSeconds: 0 })
    indexReady = true
  } catch {
    /* non-fatal */
  }
}

export type RateResult = { ok: boolean; reason?: string }

export async function checkRateLimit(ip: string): Promise<RateResult> {
  if (!globalOk()) return { ok: false, reason: 'global' }

  try {
    const db = await getDb()
    if (!db) return { ok: true } // fail-open
    await ensureIndex(db)
    const col = db.collection<RateDoc>('rate')
    const now = Date.now()
    const minuteKey = `${ip}:m:${Math.floor(now / 60_000)}`
    const dayKey = `${ip}:d:${Math.floor(now / 86_400_000)}`

    const [minDoc, dayDoc] = await Promise.all([
      col.findOneAndUpdate(
        { _id: minuteKey },
        { $inc: { c: 1 }, $setOnInsert: { expireAt: new Date(now + 120_000) } },
        { upsert: true, returnDocument: 'after' },
      ),
      col.findOneAndUpdate(
        { _id: dayKey },
        { $inc: { c: 1 }, $setOnInsert: { expireAt: new Date(now + 90_000_000) } },
        { upsert: true, returnDocument: 'after' },
      ),
    ])

    if ((minDoc?.c ?? 0) > PER_IP_PER_MIN) return { ok: false, reason: 'ip_minute' }
    if ((dayDoc?.c ?? 0) > PER_IP_PER_DAY) return { ok: false, reason: 'ip_day' }
    return { ok: true }
  } catch {
    return { ok: true } // fail-open on DB error
  }
}
