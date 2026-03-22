'use client'

import { motion } from 'framer-motion'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
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

      <div className="max-w-7xl mx-auto px-6 w-full flex items-center min-h-screen pt-24 pb-12">
        {/* Left — intro content */}
        <div className="flex-1 flex flex-col gap-6 z-10">
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
              className="text-[clamp(4rem,10vw,8.5rem)] font-serif italic font-semibold text-white leading-[0.9] tracking-tight"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              Vaikunth
            </motion.h1>
            <motion.h1
              {...fadeUp(0.3)}
              className="text-[clamp(4rem,10vw,8.5rem)] font-serif italic font-semibold leading-[0.9] tracking-tight"
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

          {/* Title — clean sans */}
          <motion.p
            {...fadeUp(0.4)}
            className="text-base font-mono text-neutral-500 tracking-[0.2em] uppercase"
          >
            AI Researcher &nbsp;·&nbsp; ML Engineer &nbsp;·&nbsp; NLP Specialist
          </motion.p>

          {/* Tagline — italic serif */}
          <motion.p
            {...fadeUp(0.5)}
            className="text-[1.35rem] font-serif italic text-neutral-400 max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Building intelligent systems that understand language, see the world,
            and reason like humans.
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.6)} className="flex gap-4 mt-2">
            <a
              href="#projects"
              className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors tracking-wide"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-7 py-3 rounded-full border border-white/20 text-white text-sm font-light hover:bg-white/8 transition-colors tracking-wide"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div {...fadeUp(0.7)} className="flex gap-8 mt-4 pt-6 border-t border-white/8">
            {[
              { value: '82%', label: 'MSc Distinction' },
              { value: '9.5', label: 'BE CGPA / 10' },
              { value: '6+', label: 'AI Projects' },
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

        {/* Right — 3D Spline robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-neutral-600 font-mono tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-neutral-600 to-transparent" />
      </motion.div>
    </section>
  )
}
