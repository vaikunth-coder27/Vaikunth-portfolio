'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const recommendations = [
  {
    name: 'Gordon Falconer',
    title: 'Director',
    company: 'Zot Engineering Ltd',
    relationship: 'Gordon managed Vaikunth directly',
    date: 'September 5, 2025',
    accentRgb: '59,130,246',
    nameGradient: 'linear-gradient(135deg, #60a5fa, #818cf8)',
    quote:
      "Having worked with Vaikunth for over 6 months , originally as our intern, but now as a full time employee, he has quickly proved himself as a dedicated and very talented software engineer. From day one he has demonstrated his eagerness to learn, strong problem solving skills, and ability to learn and adapt to new challenges.\n A fantastic \"can do\" attitude, working quickly and efficiently to solve problems and handle task given to him, showing creativity and initiative to find solutions. \nHe has quickly established himself as a key and valuable member of the Zot team.",
  },
  {
    name: 'Christos Christodoulopoulos',
    title: 'Principal Technology Adviser',
    company: 'ICO',
    relationship: "Christos was Vaikunth's mentor",
    date: 'August 20, 2024',
    accentRgb: '168,85,247',
    nameGradient: 'linear-gradient(135deg, #c084fc, #818cf8)',
    quote:
      "I was one of Vaikunth's advisors for his MSc research project on LLM memorisation for code. From day one Vaikunth showed an incredible amount of passion and initiative, and, in Amazon terms, bias for action. He immersed himself into the relevant literature, and even in our first project meeting had done some preliminary experimentation. He continued at the same pace throughout the project, combining his hard work with innovative ideas that challenged existing approaches in the literature. I can easily recommend Vaikunth for any position that requires both deep exploration and technical execution.",
  },
]

export function Recommendations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="recommendations" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            07 — Recommendations
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Words from those
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #a855f7, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              who know my work.
            </span>
          </h2>
          <div className="mt-10 mb-14 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Testimonial entries */}
        <div className="flex flex-col">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.15 + i * 0.2,
              }}
            >
              {/* ── Letter layout ── */}
              <div className="flex gap-6 md:gap-10 py-10 md:py-14">

                {/* Left accent bar */}
                <div className="flex-shrink-0 flex flex-col items-center pt-1">
                  <div
                    className="w-0.5 flex-1 rounded-full"
                    style={{
                      background: `linear-gradient(to bottom, rgba(${rec.accentRgb},0.7) 0%, rgba(${rec.accentRgb},0.15) 70%, transparent 100%)`,
                    }}
                  />
                </div>

                {/* Right: full letter content */}
                <div className="flex-1 min-w-0">

                  {/* Letter header: relationship (left) + date (right) */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
                    <span
                      className="font-mono text-xs tracking-[0.25em] uppercase"
                      style={{ color: `rgba(${rec.accentRgb}, 0.7)` }}
                    >
                      {rec.relationship}
                    </span>
                    <span className="font-mono text-xs text-p-text-5 tracking-wide">
                      {rec.date}
                    </span>
                  </div>

                  {/* Opening quote mark — large typographic */}
                  <div
                    className="font-serif leading-none mb-2 select-none"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(4rem, 7vw, 6rem)',
                      color: `rgba(${rec.accentRgb}, 0.2)`,
                      lineHeight: 0.8,
                    }}
                    aria-hidden
                  >
                    &ldquo;
                  </div>

                  {/* Quote body — preserved verbatim */}
                  <blockquote className="mb-10">
                    <p
                      className="text-p-text-2 leading-[1.95] font-light whitespace-pre-line"
                      style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}
                    >
                      {rec.quote}
                    </p>
                  </blockquote>

                  {/* Signature rule */}
                  <div
                    className="h-px mb-5 w-24"
                    style={{ background: `rgba(${rec.accentRgb}, 0.25)` }}
                  />

                  {/* Signature */}
                  <div>
                    <p
                      className="font-serif italic font-semibold leading-tight"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        background: rec.nameGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {rec.name}
                    </p>
                    <p className="text-p-text-3 text-sm font-light mt-1">
                      {rec.title}{' '}
                      <span className="text-p-text-5">·</span>{' '}
                      {rec.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Entry separator */}
              {i < recommendations.length - 1 && (
                <div className="flex items-center gap-5">
                  <div className="flex-1 h-px bg-p-border-subtle" />
                  <span className="font-mono text-xs text-p-text-5/40 tracking-widest">✦</span>
                  <div className="flex-1 h-px bg-p-border-subtle" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
