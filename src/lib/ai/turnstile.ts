// Cloudflare Turnstile verification — invisible bot protection.
// Verifies the token the browser widget produces, server-side, once per session.
// Fail-open on a Cloudflare outage (availability > lockout); reject a missing or
// invalid token when we did get a verdict.

const SECRET = process.env.TURNSTILE_SECRET_KEY
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

// Enabled when a secret is configured (can be force-disabled for local testing
// with TURNSTILE_ENABLED=false).
export function isTurnstileEnabled(): boolean {
  return !!SECRET && process.env.TURNSTILE_ENABLED !== 'false'
}

export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  if (!isTurnstileEnabled()) return true
  if (!token) return false
  try {
    const body = new URLSearchParams()
    body.append('secret', SECRET as string)
    body.append('response', token)
    if (ip && ip !== 'unknown') body.append('remoteip', ip)

    const res = await fetch(SITEVERIFY, { method: 'POST', body })
    if (!res.ok) return true // Cloudflare outage → fail-open
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch {
    return true // network error → fail-open
  }
}
