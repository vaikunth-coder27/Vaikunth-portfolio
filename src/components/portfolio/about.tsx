'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '82%', label: 'MSc Distinction', sub: 'University of Edinburgh' },
  { value: '9.5', label: 'BE CGPA / 10', sub: 'Anna University' },
  { value: '6+', label: 'AI Projects', sub: 'End-to-end delivery' },
  { value: '3+', label: 'Years Research', sub: 'ML & Deep Learning' },
]

const specializations = [
  { name: 'Machine Learning', color: '#22d3ee' },
  { name: 'Natural Language Processing', color: '#818cf8' },
  { name: 'Computer Vision', color: '#34d399' },
  { name: 'Large Language Models', color: '#f472b6' },
  { name: 'Transformers', color: '#fb923c' },
  { name: 'Generative AI', color: '#a78bfa' },
]

export function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative py-16 md:py-32 px-5 md:px-6 bg-background overflow-hidden">

      {/* Subtle radial accent */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(34,211,238,0.04), transparent)' }}
      />

      <div className="max-w-7xl mx-auto" ref={ref}>

        {/* Label + headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            01 — About
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            The mind behind
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              the machine.
            </span>
          </h2>

          {/* Rule */}
          <div className="mt-10 mb-14 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-24">

          {/* LEFT — quote + bio + specializations */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 }}
            className="flex flex-col gap-10"
          >
            {/* Quote with gradient accent bar */}
            <div className="flex gap-5 items-stretch">
              <div
                className="w-0.5 flex-shrink-0 rounded-full"
                style={{
                  background: 'linear-gradient(to bottom, #22d3ee 0%, #818cf8 60%, transparent 100%)',
                  minHeight: '100%',
                }}
              />
              <blockquote
                className="text-[1.65rem] md:text-[2.05rem] font-serif italic leading-[1.38] text-p-text-2"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                "I don't just build models — I{' '}
                <span className="text-cyan-400 dark:text-cyan-400" style={{ color: '#22d3ee' }}>
                  architect systems
                </span>{' '}
                that push the{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #22d3ee, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  frontier
                </span>{' '}
                of what machines can understand, perceive, and generate."
              </blockquote>
            </div>

            {/* Bio */}
            <p className="text-p-text-4 text-base md:text-[1.05rem] leading-[1.9] font-light max-w-2xl">
              AI-focused researcher with deep expertise in Machine Learning, Deep Learning,
              and Natural Language Processing. I thrive at the intersection of rigorous academic
              research and real-world engineering — from collaborating with{' '}
              <span className="text-p-text-3 font-normal">Amazon</span>{' '}
              on LLM copyright analysis to building autonomous vehicles and neural machine
              translation systems.
            </p>

            {/* Specializations — colored indicator dots */}
            <div>
              <p className="font-mono text-xs text-p-text-5 tracking-[0.25em] uppercase mb-4">
                Core Specializations
              </p>
              <div className="flex flex-col gap-2.5">
                {specializations.map((s) => (
                  <div key={s.name} className="flex items-center gap-3 group">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                      style={{ background: s.color, boxShadow: `0 0 8px ${s.color}60` }}
                    />
                    <span className="text-sm text-p-text-3 font-light tracking-wide">{s.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — stats + education */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.3 }}
            className="flex flex-col gap-12"
          >
            {/* Stats — bare editorial numbers, no boxes */}
            <div>
              <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-6">
                By the numbers
              </p>
              <div className="flex flex-col">
                {stats.map((stat, i) => (
                  <div key={stat.label}>
                    <div className="flex items-baseline justify-between gap-4 py-4">
                      <span
                        className="text-[2.8rem] font-serif italic font-semibold text-p-text leading-none"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        {stat.value}
                      </span>
                      <div className="text-right">
                        <p className="text-sm text-p-text-3 font-light leading-tight">{stat.label}</p>
                        <p className="text-xs font-mono text-p-text-5 mt-0.5 leading-tight">{stat.sub}</p>
                      </div>
                    </div>
                    {i < stats.length - 1 && (
                      <div className="h-px bg-p-border-subtle" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education — minimal dot-timeline */}
            <div>
              <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-6">
                Education
              </p>
              <div className="relative flex flex-col gap-0">
                {/* connecting line */}
                <div className="absolute left-[5px] top-2 bottom-8 w-px bg-gradient-to-b from-indigo-400/40 via-p-border-subtle to-transparent" />

                {/* MSc */}
                <div className="flex gap-4 pb-8">
                  <div className="mt-1.5 flex-shrink-0 z-10">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-indigo-400"
                      style={{ background: 'oklch(0.1 0 0)', boxShadow: '0 0 10px rgba(129,140,248,0.5)' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xl font-serif italic font-semibold text-p-text leading-snug"
                      style={{ fontFamily: 'var(--font-cormorant)' }}
                    >
                      MSc Artificial Intelligence
                    </p>
                    <p className="text-xs font-mono text-p-text-4 mt-1">University of Edinburgh</p>
                    <p className="text-xs font-mono text-p-text-5 mt-0.5">Sep 2023 – Aug 2024</p>
                    <span
                      className="inline-block mt-2 text-xs font-mono px-2.5 py-0.5 rounded-full border"
                      style={{ borderColor: 'rgba(129,140,248,0.3)', color: '#818cf8', background: 'rgba(129,140,248,0.06)' }}
                    >
                      Distinction — 82%
                    </span>
                  </div>
                </div>

                {/* BE */}
                <div className="flex gap-4">
                  <div className="mt-1.5 flex-shrink-0 z-10">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-rose-400"
                      style={{ background: 'oklch(0.1 0 0)', boxShadow: '0 0 10px rgba(251,113,133,0.4)' }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-xl font-serif italic font-semibold text-p-text leading-snug"
                      style={{ fontFamily: 'var(--font-cormorant)' }}
                    >
                      BE Electronics & Communication
                    </p>
                    <p className="text-xs font-mono text-p-text-4 mt-1">Anna University</p>
                    <p className="text-xs font-mono text-p-text-5 mt-0.5">Aug 2019 – Jun 2023</p>
                    <span
                      className="inline-block mt-2 text-xs font-mono px-2.5 py-0.5 rounded-full border"
                      style={{ borderColor: 'rgba(251,113,133,0.3)', color: '#fb7185', background: 'rgba(251,113,133,0.06)' }}
                    >
                      CGPA 9.50 / 10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
