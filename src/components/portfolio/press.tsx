'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const press = [
  {
    publication: 'Midlothian & East Lothian Chamber of Commerce',
    kicker: 'MELCC Magazine',
    date: 'February 11, 2026',
    headline: 'Successful internship results in a new website for ZOT Engineering',
    excerpt:
      'A feature on my internship at ZOT Engineering building the company’s new website and internal tools for performance tracking and production monitoring.',
    quote: 'The company supported me at every step. Whenever I needed guidance or resources, the answer was always yes.',
    href: 'https://www.melcc.org.uk/successful-internship-results-in-a-new-website-for-zot-engineering/',
    accentRgb: '45,212,191',
    nameGradient: 'linear-gradient(135deg, #2dd4bf, #60a5fa)',
  },
]

export function Press() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="press" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            08 — Featured In
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            When my work
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #2dd4bf, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              made the news.
            </span>
          </h2>
          <div className="mt-10 mb-14 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Press entries */}
        <div className="flex flex-col gap-8">
          {press.map((item, i) => (
            <motion.a
              key={item.headline}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.15 + i * 0.2,
              }}
              className="group block rounded-2xl border border-p-border-subtle bg-p-text/[0.015] hover:bg-p-text/[0.03] transition-colors duration-300 p-7 md:p-10"
              style={{ borderColor: `rgba(${item.accentRgb}, 0.18)` }}
            >
              {/* Top row: publication + date + external arrow */}
              <div className="flex items-start justify-between gap-4 mb-7">
                <div>
                  <p
                    className="font-mono text-xs tracking-[0.25em] uppercase mb-1.5"
                    style={{ color: `rgba(${item.accentRgb}, 0.85)` }}
                  >
                    {item.kicker}
                  </p>
                  <p className="text-p-text-4 text-xs font-light">
                    {item.publication}
                    <span className="text-p-text-5"> · </span>
                    {item.date}
                  </p>
                </div>
                <span
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 group-hover:scale-110"
                  style={{
                    borderColor: `rgba(${item.accentRgb}, 0.3)`,
                    background: `rgba(${item.accentRgb}, 0.08)`,
                  }}
                  aria-hidden
                >
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ color: `rgb(${item.accentRgb})` }}
                  />
                </span>
              </div>

              {/* Headline */}
              <h3
                className="font-serif italic font-semibold leading-tight tracking-tight mb-5"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                  background: item.nameGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {item.headline}
              </h3>

              {/* Excerpt */}
              <p
                className="text-p-text-3 font-light leading-[1.9] max-w-3xl"
                style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}
              >
                {item.excerpt}
              </p>

              {/* Pulled quote */}
              <div className="mt-7 flex gap-4 max-w-3xl">
                <div
                  className="w-0.5 flex-shrink-0 rounded-full"
                  style={{ background: `rgba(${item.accentRgb}, 0.45)` }}
                />
                <p
                  className="font-serif italic text-p-text-2 leading-relaxed"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Read link */}
              <div className="mt-8 flex items-center gap-2">
                <span
                  className="font-mono text-xs tracking-[0.2em] uppercase transition-colors duration-200"
                  style={{ color: `rgba(${item.accentRgb}, 0.9)` }}
                >
                  Read the article
                </span>
                <span
                  className="h-px w-8 transition-all duration-300 group-hover:w-14"
                  style={{ background: `rgba(${item.accentRgb}, 0.6)` }}
                />
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
