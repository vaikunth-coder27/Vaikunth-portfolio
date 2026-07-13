// send_notification tool — emails Vaikunth a message left by a chat visitor.
// Uses Resend. Server-only (imports the Resend SDK + reads secrets).
//
// Phase 3: input validation + a lightweight in-memory rate limiter (per serverless
// instance). Robust, durable per-IP limiting lands in Phase 5 (MongoDB).

import { Resend } from 'resend'
import { emailRateLimitOk, recordEmailSend } from '@/lib/ai/sessions'

export type NotifyInput = {
  visitor_name?: string
  visitor_email?: string
  message?: string
  subject?: string
}

export type NotifyMeta = { ip?: string }

export type NotifyResult = {
  ok: boolean
  status: 'sent' | 'invalid' | 'rate_limited' | 'error'
  // Human-readable line the model can relay to the visitor.
  message: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_MESSAGE = 4000
const MAX_NAME = 120

// ── Lightweight in-memory rate limiting (per instance) ───────────────────────
const WINDOW_MS = 24 * 60 * 60 * 1000 // 24h
const PER_IP_LIMIT = 5 // messages / IP / day
const GLOBAL_LIMIT = 50 // messages / instance / day (safety net)
const hits = new Map<string, number[]>()

function underLimit(key: string, limit: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

function clean(s: unknown, max: number): string {
  return String(s ?? '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max)
}

export async function sendNotification(
  input: NotifyInput,
  meta: NotifyMeta = {},
): Promise<NotifyResult> {
  const name = clean(input.visitor_name, MAX_NAME)
  const email = clean(input.visitor_email, 200)
  const message = String(input.message ?? '').trim().slice(0, MAX_MESSAGE)

  // Validation.
  if (!name || !email || !message) {
    return {
      ok: false,
      status: 'invalid',
      message:
        "I still need a few details before I can pass this along — could you share your name, email, and the message you'd like to send Vaikunth?",
    }
  }
  if (!EMAIL_RE.test(email)) {
    return {
      ok: false,
      status: 'invalid',
      message: "That email doesn't look quite right — mind double-checking it so Vaikunth can reply?",
    }
  }

  // Rate limiting — fast in-memory guard + durable per-IP/day check in MongoDB.
  const ip = meta.ip || 'unknown'
  const ipKey = `ip:${ip}`
  const rateLimited =
    !underLimit('global', GLOBAL_LIMIT) || !underLimit(ipKey, PER_IP_LIMIT) || !(await emailRateLimitOk(ip))
  if (rateLimited) {
    return {
      ok: false,
      status: 'rate_limited',
      message:
        "Looks like a few messages have already gone through recently — to keep things tidy, could you reach Vaikunth directly at vaikunthgc@gmail.com this time?",
    }
  }

  // Config.
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFY_TO_EMAIL || 'vaikunthgc@gmail.com'
  const from = process.env.NOTIFY_FROM_EMAIL || 'Vaikunth Portfolio <chat@vaikunthguruswamy.uk>'
  if (!apiKey || !to) {
    console.error('Resend not configured: missing RESEND_API_KEY or NOTIFY_TO_EMAIL')
    return {
      ok: false,
      status: 'error',
      message:
        "Hmm, my messaging channel isn't set up right now — you can reach Vaikunth directly at vaikunthgc@gmail.com.",
    }
  }

  const subject = clean(input.subject, 160) || `New portfolio message from ${name}`
  const sentAt = new Date().toISOString()

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      text: `You received a new message from your portfolio chat.

From:    ${name}
Email:   ${email}
Sent:    ${sentAt}

Message:
${message}

— Sent by the portfolio chat assistant (reply directly to reach ${name}).`,
    })

    if (error) {
      console.error('Resend send error:', error)
      return {
        ok: false,
        status: 'error',
        message:
          "I couldn't get that message through just now — you can reach Vaikunth directly at vaikunthgc@gmail.com.",
      }
    }

    await recordEmailSend(ip, to, from)

    return {
      ok: true,
      status: 'sent',
      message: `Done — I've passed your message along to Vaikunth, and he'll get back to you at ${email}. Anything else you'd like to know in the meantime?`,
    }
  } catch (err) {
    console.error('Resend send exception:', err)
    return {
      ok: false,
      status: 'error',
      message:
        "Something hiccuped on my end sending that — you can always reach Vaikunth directly at vaikunthgc@gmail.com.",
    }
  }
}
