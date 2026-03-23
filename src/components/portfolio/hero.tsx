'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { ChatWidget } from '@/components/ui/chat-widget'
import { MessageCircle } from 'lucide-react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

export function Hero() {
  const [chatOpen, setChatOpen] = useState(false)
  const [tooltipVisible, setTooltipVisible] = useState(true)

  const handleRobotClick = () => {
    setTooltipVisible(false)
    setChatOpen(true)
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-background overflow-hidden flex items-center"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(6,182,212,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,rgba(139,92,246,0.06),transparent)]" />

      <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="white" />

      <div className="max-w-7xl mx-auto px-5 w-full flex items-center min-h-screen pt-20 pb-28 md:pt-24 md:pb-12">
        {/* Left — intro content */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-5 z-10 text-center md:text-left">

          {/* Name — big serif italic */}
          <div className="flex flex-col gap-0 leading-none pb-6">
            <motion.h1
              {...fadeUp(0.2)}
              className="text-[clamp(3.2rem,12vw,8.5rem)] font-serif italic font-semibold text-p-text leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Vaikunth
            </motion.h1>
            <motion.h1
              {...fadeUp(0.3)}
              className="text-[clamp(3.2rem,12vw,8.5rem)] font-serif italic font-semibold leading-[0.9] tracking-tight"
              style={{
                fontFamily: 'var(--font-cormorant)',
                background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Guruswamy
            </motion.h1>
          </div>

          {/* Title */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-xs md:text-sm font-mono text-p-text-5 tracking-[0.15em] uppercase leading-relaxed"
          >
            AI Researcher &nbsp;·&nbsp; ML Engineer
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
            NLP Specialist
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-lg md:text-[1.35rem] font-serif italic text-p-text-3 max-w-xs md:max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Building intelligent systems that understand language, see the world,
            and reason like humans.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex items-center justify-center min-h-[48px] px-7 rounded-full bg-p-text text-background text-sm font-medium hover:opacity-90 transition-opacity tracking-wide"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center min-h-[48px] px-7 rounded-full border border-p-text/20 text-p-text text-sm font-light dark:hover:bg-white/8 hover:bg-black/[0.06] transition-colors tracking-wide"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Mobile chat button */}
          <motion.div {...fadeUp(0.7)} className="flex md:hidden mt-2">
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 transition-all"
            >
              <MessageCircle size={16} />
              Chat with my AI
            </button>
          </motion.div>
        </div>

        {/* Right — 3D Spline robot (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          className="flex-1 h-[600px] relative hidden md:block group"
        >
          {/* Speech bubble tooltip */}
          <AnimatePresence>
            {tooltipVisible && !chatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ delay: 1.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none"
              >
                <div
                  className="relative px-4 py-2.5 rounded-2xl text-sm text-white font-medium whitespace-nowrap"
                  style={{
                    background: 'rgba(10, 18, 30, 0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(34, 211, 238, 0.25)',
                    boxShadow: '0 0 20px rgba(34, 211, 238, 0.12), 0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Click me to start chatting ✨
                  </span>
                  {/* Bubble tail */}
                  <div
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden"
                  >
                    <div
                      className="w-3 h-3 rotate-45 mx-auto"
                      style={{
                        background: 'rgba(10, 18, 30, 0.85)',
                        border: '1px solid rgba(34, 211, 238, 0.25)',
                        marginTop: '-6px',
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hover ring hint — behind robot (z-0) */}
          <div
            className="absolute inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
            style={{
              boxShadow: '0 0 0 1px rgba(34,211,238,0.15), 0 0 40px rgba(34,211,238,0.06)',
            }}
          />

          {/* Spline robot — in front of ring (z-[5]) */}
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full relative z-[5]"
          />

          {/* Clickable overlay — on top for click capture (z-10) */}
          <div
            onClick={handleRobotClick}
            className="absolute inset-0 z-10 cursor-pointer"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-p-text-5 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-p-text-5 to-transparent" />
      </motion.div>

      {/* Chat widget */}
      <ChatWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </section>
  )
}
