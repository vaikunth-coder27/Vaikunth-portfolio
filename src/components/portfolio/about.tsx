'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '82%', label: 'MSc Distinction', sub: 'University of Edinburgh' },
  { value: '9.5', label: 'BE CGPA / 10', sub: 'Anna University' },
  { value: '6+', label: 'AI Projects', sub: 'End-to-end delivery' },
  { value: '3+', label: 'Years Research', sub: 'ML & Deep Learning' },
]

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay }}
    >
      {children}
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      {/* Section label */}
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            01 — About
          </p>
          <h2 className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text mb-16 leading-tight"
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
        </AnimatedSection>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Large bio card */}
          <AnimatedSection delay={0.1}>
            <div className="md:col-span-2 h-full rounded-2xl border border-p-border-subtle bg-p-surface p-8 flex flex-col justify-between min-h-[320px]">
              <div>
                <p
                  className="text-2xl md:text-3xl font-serif italic text-p-text-2 leading-relaxed mb-6"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                  suppressHydrationWarning
                >
                  {"\u201cI don\u2019t just build models \u2014 I architect systems that push the frontier of what machines can understand, perceive, and generate.\u201d"}
                </p>
                <p className="text-p-text-4 text-sm leading-relaxed font-light">
                  AI-focused researcher with deep expertise in Machine Learning, Deep Learning,
                  and Natural Language Processing. I thrive at the intersection of rigorous academic
                  research and real-world engineering — from collaborating with Amazon on LLM copyright
                  analysis to building autonomous vehicles and neural machine translation systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Machine Learning', 'NLP', 'Computer Vision', 'LLMs', 'Transformers'].map(tag => (
                  <span
                    key={tag}
                    className="text-xs border border-p-border text-p-text-4 px-3 py-1 rounded-full font-mono tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right column */}
          <div className="flex flex-col gap-4">
            {/* Location card */}
            <AnimatedSection delay={0.3}>
              <div className="rounded-2xl border border-p-border-subtle bg-p-surface p-6 flex-1">
                <p className="text-xs font-mono text-p-text-5 tracking-widest uppercase mb-3">Education</p>
                <p
                  className="text-lg font-serif italic text-p-text mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  MSc Artificial Intelligence
                </p>
                <p className="text-p-text-4 text-xs font-mono">University of Edinburgh</p>
                <div className="mt-3 h-px bg-p-border" />
                <p
                  className="text-lg font-serif italic text-p-text mt-3 mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  BE Electronics & Communication
                </p>
                <p className="text-p-text-4 text-xs font-mono">Anna University · 9.50 CGPA</p>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={0.1 + i * 0.08}>
              <div className="rounded-2xl border border-p-border-subtle bg-p-surface p-6 text-center">
                <p
                  className="text-4xl font-serif italic font-semibold text-p-text mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-p-text-3 font-light">{stat.label}</p>
                <p className="text-xs text-p-text-5 font-mono mt-1">{stat.sub}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
