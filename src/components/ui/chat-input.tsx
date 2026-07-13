'use client'

import React, { useEffect, useState, useRef, useCallback, useMemo, memo } from 'react'
import { Terminal, CornerDownLeft } from 'lucide-react'
import { CHAT_COMMANDS, parseSlashCommand, type ChatCommand } from '@/lib/ai/commands'

interface RippleEffect {
  x: number
  y: number
  id: number
}

interface Position {
  x: number
  y: number
}

interface ChatInputProps {
  placeholder?: string
  /** Receives the message text and, when a slash command was used, its tool. */
  onSubmit?: (value: string, tool?: string) => void
  disabled?: boolean
}

const SendButton = memo(({ isDisabled }: { isDisabled: boolean }) => (
  <button
    type="submit"
    aria-label="Send message"
    disabled={isDisabled}
    className={`ml-auto self-center h-8 w-8 flex items-center justify-center rounded-full border-0 p-0 transition-all z-20 flex-shrink-0 ${
      isDisabled
        ? 'opacity-40 cursor-not-allowed bg-white/20 text-white/40'
        : 'opacity-90 bg-white text-black hover:opacity-100 cursor-pointer hover:shadow-lg'
    }`}
  >
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 22L16 10M16 10L11 15M16 10L21 15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
))

SendButton.displayName = 'SendButton'

// Keep in sync with MAX_USER_WORDS in src/lib/ai/guardrails.ts
const MAX_INPUT_WORDS = 50

const countWords = (s: string) => (s.trim() ? s.trim().split(/\s+/).filter(Boolean).length : 0)

// The palette opens while the visitor is still typing the command token — i.e.
// the value is a leading "/word" with no whitespace yet. Returns the lowercase
// query (may be empty for a bare "/"), or null when not in command mode.
function slashQuery(value: string): string | null {
  const m = /^\/([a-z_]*)$/i.exec(value)
  return m ? m[1].toLowerCase() : null
}

export default function ChatInput({
  placeholder = 'Ask me anything...',
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const [mousePosition, setMousePosition] = useState<Position>({ x: 50, y: 50 })
  const [focused, setFocused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const throttleRef = useRef<number | null>(null)

  const query = slashQuery(value)
  const matches: ChatCommand[] = useMemo(
    () => (query !== null ? CHAT_COMMANDS.filter((c) => c.cmd.startsWith(query)) : []),
    [query],
  )
  const paletteOpen = focused && matches.length > 0
  // Clamp on read so the highlight stays valid as the filtered list shrinks.
  const active = matches.length ? Math.min(activeIdx, matches.length - 1) : 0

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 104) + 'px'
    }
  }, [value])

  // Word/limit checks run against the resolved message (slash prefix stripped).
  const parsed = parseSlashCommand(value)
  const wordCount = countWords(parsed.text)
  const overLimit = wordCount > MAX_INPUT_WORDS

  const focusTextarea = useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    el.focus()
    const end = el.value.length
    el.setSelectionRange(end, end)
  }, [])

  // Complete the input with a chosen command, ready for the visitor's question.
  const applyCommand = useCallback(
    (command: ChatCommand) => {
      setValue(`/${command.cmd} `)
      requestAnimationFrame(focusTextarea)
    },
    [focusTextarea],
  )

  const submit = useCallback(() => {
    if (disabled) return
    const { text, tool } = parseSlashCommand(value)
    if (!text || countWords(text) > MAX_INPUT_WORDS) return
    onSubmit?.(text, tool)
    setValue('')
  }, [value, onSubmit, disabled])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      submit()
    },
    [submit],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (paletteOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setActiveIdx((i) => (i + 1) % matches.length)
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          setActiveIdx((i) => (i - 1 + matches.length) % matches.length)
          return
        }
        if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
          e.preventDefault()
          applyCommand(matches[active] ?? matches[0])
          return
        }
        if (e.key === 'Escape') {
          e.preventDefault()
          setValue('')
          return
        }
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        submit()
      }
    },
    [paletteOpen, matches, active, applyCommand, submit],
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && !throttleRef.current) {
      throttleRef.current = window.setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect()
        if (rect) {
          setMousePosition({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          })
        }
        throttleRef.current = null
      }, 50)
    }
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current && ripples.length < 5) {
      const rect = containerRef.current.getBoundingClientRect()
      const id = Date.now()
      setRipples(prev => [...prev, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }])
      setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
    }
  }, [ripples.length])

  const isSubmitDisabled = disabled || !parsed.text.trim() || overLimit

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Slash-command palette — a subtle terminal-style command list */}
        {paletteOpen && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#0b0f14]/95 backdrop-blur-xl border border-cyan-500/20 rounded-xl shadow-2xl overflow-hidden z-40"
            style={{ boxShadow: '0 0 0 1px rgba(34,211,238,0.06), 0 12px 40px rgba(0,0,0,0.6)' }}
          >
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/8">
              <Terminal size={11} className="text-cyan-400/80" />
              <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-500 uppercase">
                Commands
              </span>
              <span className="ml-auto text-[10px] font-mono text-neutral-600 hidden sm:flex items-center gap-1">
                <CornerDownLeft size={10} /> to run
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
              {matches.map((c, i) => (
                <button
                  key={c.cmd}
                  type="button"
                  // Keep textarea focus so the palette doesn't blur-close first.
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => applyCommand(c)}
                  className={`w-full flex items-baseline gap-2 px-3 py-2 text-left transition-colors ${
                    i === active ? 'bg-cyan-500/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span className="font-mono text-[13px] text-cyan-300 flex-shrink-0">
                    /{c.label}
                  </span>
                  <span className="text-xs text-neutral-500 truncate">{c.hint}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          className="relative flex items-center w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 group transition-all duration-300 hover:border-white/20"
          style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
          }}
        >
          {/* Glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              boxShadow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 20px rgba(34,211,238,0.08)',
            }}
          />

          {/* Cursor gradient */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle 80px at ${mousePosition.x}% ${mousePosition.y}%, rgba(34,211,238,0.04) 0%, transparent 100%)`,
            }}
          />

          {/* Ripples */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="absolute pointer-events-none"
              style={{ left: ripple.x - 20, top: ripple.y - 20, width: 40, height: 40 }}
            >
              <div className="w-full h-full rounded-full bg-cyan-400/10 animate-ping" />
            </div>
          ))}

          {/* Slash / commands trigger */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => {
              setValue('/')
              requestAnimationFrame(focusTextarea)
            }}
            aria-label="Slash commands"
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-cyan-500/15 text-white/60 hover:text-cyan-300 transition-all ml-1 mr-1 z-20 relative font-mono text-base leading-none"
          >
            /
          </button>

          {/* Textarea */}
          <div className="flex-1 relative flex items-center min-w-0">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => {
                setValue(e.target.value)
                setActiveIdx(0)
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder={paletteOpen ? 'Pick a command…' : placeholder}
              rows={1}
              className="w-full bg-transparent text-sm text-white placeholder-neutral-500 border-0 outline-none px-2 py-1 z-20 relative resize-none overflow-y-auto leading-[22px] min-h-8 max-h-24"
              disabled={disabled}
            />
          </div>

          {/* Word counter — always visible, bottom-right */}
          <span
            className={`absolute bottom-1.5 right-12 text-[10px] font-mono z-20 pointer-events-none transition-colors ${
              overLimit ? 'text-red-400' : wordCount >= 40 ? 'text-amber-400' : 'text-neutral-500'
            }`}
          >
            {wordCount}/{MAX_INPUT_WORDS}
          </span>

          <SendButton isDisabled={isSubmitDisabled} />
        </div>
      </div>
      {overLimit && (
        <p className="mt-1.5 px-2 text-[11px] text-red-400/90">
          Please keep it under {MAX_INPUT_WORDS} words — shorter messages get quicker, sharper answers.
        </p>
      )}
    </form>
  )
}
