'use client'

import React, { useEffect, useState, useRef, useCallback, memo } from 'react'
import { Plus } from 'lucide-react'

type MenuOption = 'About' | 'Projects' | 'Skills' | 'Experience'

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
  onSubmit?: (value: string) => void
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

const MENU_OPTIONS: MenuOption[] = ['About', 'Projects', 'Skills', 'Experience']

export default function ChatInput({
  placeholder = 'Ask me anything...',
  onSubmit,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [ripples, setRipples] = useState<RippleEffect[]>([])
  const [mousePosition, setMousePosition] = useState<Position>({ x: 50, y: 50 })

  const containerRef = useRef<HTMLDivElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const throttleRef = useRef<number | null>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 104) + 'px'
    }
  }, [value])

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (value.trim() && !disabled) {
        onSubmit?.(value.trim())
        setValue('')
      }
    },
    [value, onSubmit, disabled]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit(e as unknown as React.FormEvent)
      }
    },
    [handleSubmit]
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

  const isSubmitDisabled = disabled || !value.trim()

  return (
    <form onSubmit={handleSubmit} className="w-full">
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

        {/* Menu button */}
        <div className="relative flex-shrink-0" ref={menuRef}>
          <button
            type="button"
            onClick={() => setIsMenuOpen(p => !p)}
            aria-label="Quick topics"
            className="h-8 w-8 flex items-center justify-center rounded-full bg-white/8 hover:bg-white/15 text-white/60 hover:text-white transition-all ml-1 mr-1 z-20 relative"
          >
            <Plus size={16} />
          </button>

          {isMenuOpen && (
            <div className="absolute bottom-full left-0 mb-2 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-30 min-w-[140px]">
              {MENU_OPTIONS.map(option => (
                <button
                  key={option}
                  type="button"
                  className="w-full px-4 py-2.5 text-left hover:bg-white/5 text-neutral-300 hover:text-white text-sm font-medium transition-colors"
                  onClick={() => {
                    setValue(`Tell me about Vaikunth's ${option.toLowerCase()}`)
                    setIsMenuOpen(false)
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea */}
        <div className="flex-1 relative flex items-center min-w-0">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="w-full bg-transparent text-sm text-white placeholder-neutral-500 border-0 outline-none px-2 py-1 z-20 relative resize-none overflow-y-auto leading-[22px] min-h-8 max-h-24"
            disabled={disabled}
          />
        </div>

        <SendButton isDisabled={isSubmitDisabled} />
      </div>
    </form>
  )
}
