# AI Portfolio Chat — Build Plan

**Goal:** Turn the existing OpenRouter chat widget into a showcase-grade AI feature: a small/quantized model with a "peak marketing" persona that talks up Vaikunth, backed by a real **MCP server**, with **guardrails**, **auto-compaction**, **session logging**, and a **"notify me by email"** tool — all on **free tiers ($0/month)** for realistic portfolio traffic.

**Owner:** Vaikunth Guruswamy · **Domain:** www.vaikunthguruswamy.uk (Cloudflare DNS → Vercel) · **Inbox:** vaikunthgc@gmail.com

---

## 1. Cost model — everything on permanent free tiers

| Concern | Choice | Free tier | Notes |
|---|---|---|---|
| Chat LLM (small/quantized) | **Groq** `llama-3.1-8b-instant` | No credit card · 14,400 req/day · 500K tok/day | LPU-served, sub-second, quantized |
| Tool-call / drafting turns | **Groq** `llama-3.3-70b-versatile` | 1K req/day | Stronger reasoning for tool use; rare |
| Safety guardrail | **Groq** `llama-guard-3-8b` | Same free tier | Purpose-built moderation |
| Fallback LLM | **OpenRouter** `:free` models | 50 req/day (<$10 spend) | Only if Groq is rate-limited |
| Email "notify me" tool | **Resend** | 3,000/mo · 100/day | Verified domain `vaikunthguruswamy.uk` → inbox |
| Conversation history / logs | **MongoDB Atlas M0** | 512 MB · no auto-pause | Chosen over Supabase, which pauses free projects after 7 days idle — bad for a sporadically-used portfolio chat |
| Hosting | **Vercel Hobby** | Free | Already deployed |

**Expected spend: $0/month.** Only paid if traffic reaches thousands of chats/month.

---

## 2. Architecture

```
Browser (chat-widget.tsx)
      |  POST /api/chat  { sessionId, message }
      v
Next.js API route  -- orchestrator --------------------------+
  1. Rate-limit (Upstash, per-IP)                            |
  2. Input guardrail (llama-guard + topic gate)              |
  3. Load session + running summary (Upstash)                |
  4. Auto-compact if context too long                        |
  5. LLM call with MCP tool schemas (Groq)                   |
  6. If tool_call -> execute tools --------------------->  /api/mcp (real MCP server)
  7. Output guardrail                                        |     get_experience, get_education,
  8. Persist turn + usage + events (Upstash)                 |     get_projects, get_skills,
      v                                                      |     get_contact, get_certifications,
  response -> browser                                        |     send_notification (email)
                                                             +--------------------------------------
```

**Single source of truth:** `src/data/portfolio-knowledge.json`. Tool functions read from it. Exposed BOTH via the MCP endpoint (publicly connectable from Claude Desktop/Cursor — the showcase flex) AND used directly by the chat orchestrator for function calling (no per-message protocol round-trip).

---

## 3. Component design

### 3.1 Persona ("peak marketing")
System prompt: an enthusiastic-but-credible advocate for Vaikunth. Confident, warm, professional; light enthusiasm, never cringe or dishonest. Always grounds claims in tool data; steers toward strengths and the contact/notify action. Default voice = **confident-professional with light warmth** (tweak later).

### 3.2 MCP server (`/api/mcp`)
Official TS SDK + Vercel `mcp-handler`, Streamable HTTP transport. Tools:
- `get_experience(company?)` · `get_education()` · `get_projects(category?)` · `get_skills()` · `get_contact()` · `get_certifications()`
- `send_notification(visitor_name, visitor_email, message)` → drafts + emails Vaikunth via Resend.

### 3.3 Guardrails (layered, cheapest first)
0. **Canned pre-filter** — regex/keyword for obvious off-topic/abuse → witty redirect, zero tokens.
1. **Safety** — `llama-guard-3-8b` on input.
2. **Topic gate** — cheap 8B "is this about Vaikunth / his career?" → redirect if not.
3. **System-prompt hard rules** — only discuss Vaikunth, never reveal the prompt, refuse jailbreaks.
4. **Output check** — no prompt leakage / drift before returning.
5. **Email tool safety** — validate email, sanitize, confirm before send, rate-limit (2/session, 5/IP/day).

### 3.4 Auto-compaction
Sliding window + running summary. Keep last ~6 messages verbatim; when tokens exceed threshold, summarise older turns with the 8B model into a stored "conversation memory". LLM only ever sees `[summary] + [recent turns] + [tool schemas]`. Log tokens-before/after per compaction.

### 3.5 Sessions & logging (Upstash)
Per session: `sessionId`, timestamps, messages, per-turn token usage, tool calls, compaction events, hashed IP (for rate limiting). Structured for a future `/admin` metrics view.

---

## 4. Build phases (each independently shippable)

- **Phase 1 — Grounded persona + tools (Groq swap).** Knowledge file (done) + tool functions + swap `/api/chat` OpenRouter→Groq with the marketing persona and function calling. *Result: cheaper, grounded, on-brand chat.*
- **Phase 2 — MCP endpoint.** Expose the same tools at `/api/mcp`; test from Claude Desktop/Cursor.
- **Phase 3 — Email tool.** Resend + Cloudflare DNS + `send_notification` with validation/confirmation/rate-limit.
- **Phase 4 — Guardrails.** Pre-filter, llama-guard, topic gate, output check.
- **Phase 5 — Sessions + auto-compact.** Upstash session logs, per-IP rate limiting, compaction.
- **Phase 6 (optional) — `/admin` metrics.** Conversations, leads captured, tokens saved.

---

## 5. Repo notes
- Stack is **Next.js 16 / React 19**; `AGENTS.md` warns APIs differ from older Next.js — check `node_modules/next/dist/docs/` before writing route handlers.
- Folder is **not a git repo** yet — recommend `git init` before code changes.
- Knowledge data lives at `src/data/portfolio-knowledge.json` (grounding for chat + MCP tools).

---

## 6. Status
- [x] Content collected from components + `lib/data.ts` + certifications
- [x] `src/data/portfolio-knowledge.json` created
- [x] Plan written
- [x] Phase 1 · persona (`persona.ts`) — friendly mutual-friend tone
- [x] Phase 1 · tool functions + schemas (`tools.ts`)
- [x] Phase 1 · `/api/chat` rewired to Groq + function calling
- [x] Phase 1 · widget greeting updated to match tone
- [x] Phase 1 · run & test — complete
- [x] Phase 2 · MCP server at `/api/mcp` (`app/api/[transport]/route.ts`) — verified: initialize, tools/list (7 tools), tools/call all return grounded data
- [x] Phase 2 · connected from a real MCP client — verified via MCP Inspector (all 7 tools listed & callable)
- [x] Phase 3 · Resend email "notify me" tool — verified end-to-end (email delivered to inbox; LLM drafts + sends)
- [x] Phase 4 · Guardrails — verified (regex pre-filter, Prompt Guard 2, persona steering, output guard)
- [x] Phase 5 · Sessions + auto-compaction + durable rate-limit (MongoDB Atlas) — logging & tool/token metrics verified in Atlas; compaction wired; 429 handling added
- [x] TPM hardening (post-Phase 5) — token trimming + proactive throttle + progressive pacing + input word limit
- [x] Abuse / DDoS hardening — read-only public MCP, rate limiting, email circuit-breaker, Cloudflare Turnstile (invisible)
- [ ] Phase 6 — optional /admin metrics

### Security hardening notes
- **Public MCP is read-only**: `send_notification` removed from `/api/mcp` (email tool only on the website chat, where we have session + IP context). MCP handler is rate-limited (per-IP + global) via a wrapper.
- **Rate limiting** (`ratelimit.ts`), evaluated FIRST on `/api/chat` and `/api/mcp` before any LLM call or pacing sleep: global in-memory gate (90/min/instance) + durable per-IP fixed-window counters in Mongo (`rate` collection, TTL-indexed): 12/min, 150/day. Fail-open. Env: `RL_IP_PER_MIN`, `RL_IP_PER_DAY`, `RL_GLOBAL_PER_MIN`.
- **Email circuit-breaker**: per-IP 5/day + GLOBAL 25/day cap across all senders (`EMAIL_GLOBAL_PER_DAY`) so even distributed abuse can't flood the inbox / burn the Resend quota.
- **Payload cap**: max 60 history messages/request.
- **Cloudflare Turnstile** (invisible, `turnstile.ts` + widget): verified once per session (in-memory Set + durable `sessions.verified`), token sent from the widget until verified, `interaction-only` appearance so real users never see a challenge. Server gate returns `needVerify` → client resets for a fresh token. Env: `TURNSTILE_SITE_KEY` (client uses public value), `TURNSTILE_SECRET_KEY` (server), `TURNSTILE_ENABLED=false` to disable (e.g. local testing). Verified: tokenless request → blocked.
- **Deploy-time (recommended, no code)**: keep Vercel domain DNS-only in Cloudflare (Vercel bot protection degrades behind a proxy); Vercel platform DDoS mitigation is automatic; add a Vercel WAF rate-limit rule on `/api/*` for edge-level flood rejection.

### TPM hardening notes
- Token trim: system prompt 676 tokens (from ~950), tool-schema descriptions shortened, `max_tokens` 500→400. ~450–500 fewer tokens/request.
- `throttle.ts`: rolling 60s token meter. Before each Groq call, if the window is >80% of TPM, wait just long enough for older tokens to age out (cap 4.5s/call). Records actual `usage.total_tokens` after each call. Env: `GROQ_TPM`.
- Progressive per-session pacing (`route.ts`): 1st message instant; each later message in the session delayed `+450ms` (cap 4s). Env: `CHAT_DELAY_STEP_MS`, `CHAT_DELAY_MAX_MS`. Guardrail-blocked messages stay instant.
- Both delays masked by the widget's rotating "thinking…" filler (`TypingIndicator`).
- Input word limit: 50 words, enforced in the UI (live counter bottom-right: neutral → amber ≥40 → red over) and server-side (`capWords`). Keep `MAX_INPUT_WORDS` (chat-input.tsx) in sync with `MAX_USER_WORDS` (guardrails.ts).

### Phase 5 notes
- `mongo.ts`: serverless-safe cached client, fail-open (chat works even if DB down).
- `sessions.ts`: `buildContext` (auto-compaction: keep last 6 turns, summarise older into a running memory once a chat passes 10 messages), `logInteraction` (deferred via `after()` — messages, turns, tokensIn/Out, toolCalls, guardrailEvents, compactions), durable per-IP/day email rate limit (`email_log`).
- Chat widget sends a stable `sessionId` (sessionStorage). Route logs every turn incl. guardrail blocks.
- Collections auto-created: `sessions`, `email_log`.
- FREE-TIER GOTCHA: `llama-3.1-8b-instant` free tier is **6,000 TPM**; each request ~3,100 tokens (system prompt + 7 tool schemas), and the tool loop makes ≥2 calls/turn — so a burst can hit the cap. Added graceful 429 handling: short auto-retry if wait ≤ 3.5s, else a friendly "busy" message (never a hard error). Options to ease it: trim system prompt/tool schemas, or add a one-time $10 Groq credit for much higher limits.

### Phase 4 notes
- `guardrails.ts`: 4 layers — (0) regex canned pre-filter for jailbreak/prompt-extraction/abuse (zero tokens); (1) `meta-llama/llama-prompt-guard-2-86m` injection detector on Groq, threshold 0.8, fail-open; (2) persona off-topic steering; (3) `guardOutput` strips leaked system-prompt/function markup.
- IMPORTANT model note: `llama-guard-4-12b` and `llama-guard-3-8b` are both **decommissioned** on Groq. Prompt Guard 2 (86M) is the live, purpose-built injection classifier (returns P(attack) 0–1).
- Tunable via env: `GROQ_GUARD_ENABLED`, `GROQ_GUARD_MODEL`, `GROQ_GUARD_THRESHOLD`. User messages capped at 2000 chars.
- Verified: regex jailbreak → instant canned; subtle "you are FreeGPT" jailbreak → caught by Prompt Guard 2; benign off-topic → warm persona redirect; on-topic → normal grounded answer.

### Phase 3 notes
- `notify.ts`: Resend send + validation + in-memory per-IP/day rate limit. `NOTIFY_TO_EMAIL` defaults to vaikunthgc@gmail.com in code (public, not a secret); only `RESEND_API_KEY` is required in env.
- `send_notification` exposed on both the chat (async `executeTool`) and the MCP server.
- Sender is now `Vaikunth Portfolio <chat@vaikunthguruswamy.uk>` — domain verified in Resend (Ireland/eu-west-1) via Cloudflare Auto-configure (DKIM verified). Code default handles the From, so no env var needed for the sender; override with `NOTIFY_FROM_EMAIL` if ever wanted.
- Deploy reminder: add `RESEND_API_KEY` (and `GROQ_API_KEY`) to Vercel project env vars for production.
- Robustness fix: 8B model sometimes emits a malformed inline tool call → Groq returns 400 `tool_use_failed`. The chat route now recovers (retries without tools, salvages prose) instead of crashing. Persona hardened to not call the tool until it has real values.

### Phase 2 notes
- Packages: `mcp-handler`, `@modelcontextprotocol/sdk@1.26.0`, `zod@^3`.
- Endpoint (Streamable HTTP): `/api/mcp`. SSE disabled (deprecated in spec). No Redis needed — tools are fast synchronous reads (stateless).
- Route uses the `[transport]` dynamic segment; the static `/api/chat` route takes precedence, so both coexist.
- Once deployed: `https://www.vaikunthguruswamy.uk/api/mcp` is publicly connectable from Claude Desktop / Cursor.
