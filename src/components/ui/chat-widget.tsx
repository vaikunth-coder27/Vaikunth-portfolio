'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import ChatInput from './chat-input'
import { randomThinking } from '@/lib/ai/thinking'

// Served from /public. BASE stays '' on the root domain; matches the pattern
// used elsewhere for images so it works under a basePath too.
const LOGO_SRC = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/chat-logo.png`

// Small reusable avatar showing Vaikunth's chat logo.
function BotAvatar({ size = 24, className = '' }: { size?: number; className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-cyan-500/15 border border-cyan-500/30 overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={LOGO_SRC} alt="" aria-hidden="true" className="w-full h-full object-contain p-0.5" />
    </span>
  )
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

// Cloudflare Turnstile — public site key (safe to expose; appears in page HTML).
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAD0m_xLzH44Kmjx5'

// The sitekey isn't whitelisted for localhost, so the widget errors (110200) in
// dev. Skip rendering/waiting for it locally — the API also disables the check
// there via TURNSTILE_ENABLED=false. Production is unaffected.
function isLocalHost(): boolean {
  if (typeof window === 'undefined') return false
  return /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|::1)$/.test(window.location.hostname)
}

type TurnstileAPI = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string
  reset: (id?: string) => void
  remove: (id?: string) => void
}
declare global {
  interface Window {
    turnstile?: TurnstileAPI
  }
}

// NOTE: keep this greeting in sync with GREETING in src/lib/ai/persona.ts.
// It's duplicated (not imported) on purpose so the server-only SYSTEM_PROMPT
// in that module never gets bundled into the public client JavaScript.
const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: "Hey there! 👋 Welcome — I'm here on Vaikunth's behalf, happy to chat. What brings you by today? Curious what you're working on, and I'd love to point you to the parts of his work you'd find most interesting.",
}

function TypingIndicator() {
  // Pick a fresh random phrase on mount, then keep rotating through new random
  // ones so a longer (paced/throttled) wait never feels stalled or repetitive.
  const [phrase, setPhrase] = useState<string | null>(null)

  useEffect(() => {
    const start = setTimeout(() => setPhrase(randomThinking()), 600)
    const rotate = setInterval(() => setPhrase(randomThinking()), 2000)
    return () => {
      clearTimeout(start)
      clearInterval(rotate)
    }
  }, [])

  return (
    <div className="flex items-end gap-2 mb-3">
      <BotAvatar size={24} />
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-2 items-center h-4">
          <div className="flex gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          {phrase && (
            <span className="text-xs text-neutral-400 whitespace-nowrap animate-pulse">{phrase}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  // Only reveal the Turnstile widget when an interactive challenge is actually
  // required; otherwise it verifies invisibly and stays hidden.
  const [challengeActive, setChallengeActive] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Stable per-visit session id (persists across reloads within the tab) so the
  // backend can log and compact this conversation.
  const sessionIdRef = useRef<string>('')
  if (!sessionIdRef.current) {
    let id = ''
    try {
      id = sessionStorage.getItem('vg_chat_session') || ''
      if (!id) {
        id = (crypto.randomUUID?.() ?? `s_${Date.now()}_${Math.random().toString(36).slice(2)}`)
        sessionStorage.setItem('vg_chat_session', id)
      }
    } catch {
      id = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
    }
    sessionIdRef.current = id
  }

  // Cloudflare Turnstile (invisible bot check, verified once per session).
  const turnstileTokenRef = useRef<string>('')
  const turnstileWidgetId = useRef<string | null>(null)
  const turnstileBoxRef = useRef<HTMLDivElement>(null)
  const verifiedRef = useRef(false)

  useEffect(() => {
    if (!isOpen || isLocalHost()) return
    let cancelled = false

    const renderWidget = () => {
      if (cancelled || !window.turnstile || turnstileWidgetId.current || !turnstileBoxRef.current) return
      turnstileWidgetId.current = window.turnstile.render(turnstileBoxRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        appearance: 'interaction-only', // invisible unless a challenge is truly needed
        callback: (token: string) => {
          turnstileTokenRef.current = token
          setChallengeActive(false)
        },
        'before-interactive-callback': () => setChallengeActive(true),
        'after-interactive-callback': () => setChallengeActive(false),
        'expired-callback': () => {
          turnstileTokenRef.current = ''
          if (turnstileWidgetId.current) window.turnstile?.reset(turnstileWidgetId.current)
        },
        'error-callback': () => {
          turnstileTokenRef.current = ''
          setChallengeActive(false)
        },
      })
    }

    if (window.turnstile) {
      renderWidget()
    } else if (!document.getElementById('cf-turnstile-script')) {
      const s = document.createElement('script')
      s.id = 'cf-turnstile-script'
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      s.async = true
      s.defer = true
      s.onload = renderWidget
      document.head.appendChild(s)
    } else {
      // Script tag exists but API not ready yet — poll briefly.
      const t = setInterval(() => {
        if (window.turnstile) {
          clearInterval(t)
          renderWidget()
        }
      }, 200)
      return () => clearInterval(t)
    }

    return () => {
      cancelled = true
    }
  }, [isOpen])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading, scrollToBottom])

  const handleSubmit = useCallback(async (content: string, tool?: string) => {
    const userMessage: Message = { role: 'user', content }
    const updatedMessages = [...messages, userMessage]

    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      // Until this session is verified, attach a Turnstile token. If it isn't
      // ready yet (user sent very fast), wait briefly for it. Skipped on
      // localhost where the widget is disabled.
      let token = ''
      if (!verifiedRef.current && !isLocalHost()) {
        token = turnstileTokenRef.current
        for (let i = 0; i < 15 && !token; i++) {
          await new Promise(r => setTimeout(r, 200))
          token = turnstileTokenRef.current
        }
      }

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          ...(tool ? { forceTool: tool } : {}),
          ...(token ? { turnstileToken: token } : {}),
        }),
      })

      const data = await res.json()

      if (data.needVerify) {
        // Bot check failed / token stale — get a fresh token for the retry.
        turnstileTokenRef.current = ''
        if (turnstileWidgetId.current) window.turnstile?.reset(turnstileWidgetId.current)
      } else if (data.content) {
        // A normal answer implies the session passed verification.
        verifiedRef.current = true
      }

      // The API returns a friendly `content` even for handled cases (rate limit,
      // busy, errors), so prefer it over throwing on non-200 statuses.
      if (data.content) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
      } else if (!res.ok || data.error) {
        throw new Error(data.error || 'Request failed')
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again in a moment." },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed right-5 bottom-5 z-50 w-[360px] max-w-[calc(100vw-2.5rem)] flex flex-col"
          style={{ height: 'min(580px, calc(100vh - 2.5rem))' }}
        >
          {/* Glass panel */}
          <div className="flex flex-col h-full bg-black/85 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            style={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.08), 0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(34,211,238,0.05)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 flex-shrink-0">
              <BotAvatar size={32} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white leading-none">Vaikunth&apos;s AI</p>
                <p className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 flex items-center justify-center rounded-full text-neutral-500 hover:text-white hover:bg-white/8 transition-all"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 mb-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'assistant' && <BotAvatar size={24} className="mb-0.5" />}
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-cyan-500/15 border border-cyan-500/25 text-white rounded-br-sm'
                        : 'bg-white/5 border border-white/8 text-neutral-200 rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-3 pb-3 pt-2 flex-shrink-0 border-t border-white/5">
              {/* Cloudflare Turnstile — kept in the DOM so it can verify invisibly,
                  but visually collapsed unless an interactive challenge is required. */}
              <div
                ref={turnstileBoxRef}
                className={
                  challengeActive
                    ? 'flex justify-center mb-2'
                    : 'h-0 overflow-hidden opacity-0 pointer-events-none'
                }
              />
              <ChatInput
                placeholder="Ask me anything..."
                onSubmit={handleSubmit}
                disabled={isLoading}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
