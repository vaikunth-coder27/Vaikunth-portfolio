'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay },
})

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden flex items-center"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_50%,rgba(6,182,212,0.06),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_20%_60%,rgba(139,92,246,0.06),transparent)]" />

      <Spotlight className="-top-40 left-0 md:left-40 md:-top-20" fill="white" />

      <div className="max-w-7xl mx-auto px-5 w-full flex items-center min-h-screen pt-20 pb-28 md:pt-24 md:pb-12">
        {/* Left — intro content */}
        <div className="flex-1 flex flex-col items-center md:items-start gap-5 z-10 text-center md:text-left">

          {/* Available badge */}
          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 text-xs text-neutral-400 bg-white/5 backdrop-blur-sm font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name — big serif italic */}
          <div className="flex flex-col gap-0 leading-none">
            <motion.h1
              {...fadeUp(0.2)}
              className="text-[clamp(3.2rem,12vw,8.5rem)] font-serif italic font-semibold text-white leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Vaikunth
            </motion.h1>
            <motion.h1
              {...fadeUp(0.3)}
              className="text-[clamp(3.2rem,12vw,8.5rem)] font-serif italic font-semibold leading-[0.9] tracking-tight"
              style={{
                fontFamily: 'var(--font-cormorant)',
                background: 'linear-gradient(135deg, #ffffff 0%, #22d3ee 50%, #818cf8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Guruswamy
            </motion.h1>
          </div>

          {/* Title — clean mono, wraps gracefully on mobile */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-xs md:text-sm font-mono text-neutral-500 tracking-[0.15em] uppercase leading-relaxed"
          >
            AI Researcher &nbsp;·&nbsp; ML Engineer
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> &nbsp;·&nbsp; </span>
            NLP Specialist
          </motion.p>

          {/* Tagline — italic serif */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-lg md:text-[1.35rem] font-serif italic text-neutral-400 max-w-xs md:max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Building intelligent systems that understand language, see the world,
            and reason like humans.
          </motion.p>

          {/* CTAs — stacked on mobile, row on sm+ */}
          <motion.div {...fadeUp(0.6)} className="flex flex-col sm:flex-row gap-3 mt-1 w-full sm:w-auto">
            <a
              href="#projects"
              className="flex items-center justify-center min-h-[48px] px-7 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors tracking-wide"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="flex items-center justify-center min-h-[48px] px-7 rounded-full border border-white/20 text-white text-sm font-light hover:bg-white/8 transition-colors tracking-wide"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats row — 2×2 grid on mobile, single row on md+ */}
          <motion.div
            {...fadeUp(0.7)}
            className="grid grid-cols-2 gap-x-8 gap-y-4 md:flex md:gap-8 mt-2 pt-6 border-t border-white/8 w-full"
          >
            {[
              { value: '82%', label: 'MSc Distinction' },
              { value: '9.5', label: 'BE CGPA / 10' },
              { value: '6+',  label: 'AI Projects' },
              { value: '20+', label: 'Technologies' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span
                  className="text-2xl font-serif italic font-semibold text-white"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-neutral-600 font-mono tracking-wider uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D Spline robot (desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.2 }}
          className="flex-1 h-[600px] relative hidden md:block"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
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
        <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent" />
      </motion.div>
    </section>
  )
}
