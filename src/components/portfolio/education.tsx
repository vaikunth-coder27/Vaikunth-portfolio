'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '@/lib/data'

const entries = [
  {
    ...education[0],
    imageSrc: '/University of Edinburgh.png',
    gradeDisplay: '82%',
    gradeSub: 'MSc Distinction',
    gradeGradient: 'linear-gradient(135deg, #818cf8, #6366f1)',
    nameGradient: 'linear-gradient(135deg, #a5b4fc, #818cf8)',
    accentRgb: '129,140,248',
  },
  {
    ...education[1],
    imageSrc: '/anna university.png',
    gradeDisplay: '9.5',
    gradeSub: 'CGPA / 10.0',
    gradeGradient: 'linear-gradient(135deg, #fb923c, #f43f5e)',
    nameGradient: 'linear-gradient(135deg, #fda4af, #fb923c)',
    accentRgb: '251,146,60',
  },
]

export function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            05 — Education
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Foundations of
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              excellence.
            </span>
          </h2>
          <div className="mt-10 mb-14 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_72px_1fr] gap-0">

          {entries.map((edu, i) => (
            <>
              {/* Mobile separator between entries */}
              {i === 1 && (
                <div key="mobile-sep" className="md:hidden h-px bg-p-border-subtle my-14" />
              )}

              {/* Vertical divider (desktop) */}
              {i === 1 && (
                <motion.div
                  key="divider"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="hidden md:flex flex-col items-center"
                >
                  <div className="flex-1 w-px bg-p-border-subtle" />
                  <span
                    className="font-mono text-xs py-5 select-none"
                    style={{ color: `rgba(${entries[0].accentRgb},0.3)` }}
                  >
                    ✦
                  </span>
                  <div className="flex-1 w-px bg-p-border-subtle" />
                </motion.div>
              )}

              <motion.div
                key={edu.institution}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  delay: 0.15 + i * 0.18,
                }}
                className="relative flex flex-col pt-40"
              >
                {/* ── University image — atmospheric background, not a block ── */}
                <div
                  className="absolute top-0 left-0 right-0 h-52 pointer-events-none overflow-hidden"
                  style={{
                    maskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 30%, transparent 100%)',
                  }}
                >
                  <img
                    src={edu.imageSrc}
                    alt=""
                    aria-hidden
                    className="w-full h-full object-cover object-center dark:opacity-[0.13] opacity-[0.08]"
                  />
                </div>

                {/* ── Institution name — hero ── */}
                <div className="mb-7">
                  <h3
                    className="font-serif italic font-semibold leading-tight mb-3"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                      background: edu.nameGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {edu.institution}
                  </h3>
                  <p className="text-p-text-2 font-light text-lg leading-snug mb-3">
                    {edu.degree}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-p-text-5 tracking-wide">
                      {edu.period}
                    </span>
                    <span className="text-p-text-5/30 text-xs">·</span>
                    <span className="font-mono text-xs text-p-text-5 tracking-wide">
                      {edu.location}
                    </span>
                    <span
                      className="font-mono text-xs px-2.5 py-0.5 rounded-full border"
                      style={{
                        borderColor: `rgba(${edu.accentRgb}, 0.3)`,
                        color: `rgba(${edu.accentRgb}, 0.9)`,
                        background: `rgba(${edu.accentRgb}, 0.06)`,
                      }}
                    >
                      {edu.grade}
                    </span>
                  </div>
                </div>

                <div className="h-px bg-p-border-subtle mb-7" />

                {/* ── Courses as numbered list ── */}
                <div>
                  <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-5">
                    Relevant Courses
                  </p>
                  <div className="flex flex-col gap-3">
                    {edu.courses.map((course, ci) => (
                      <div key={course} className="flex items-start gap-4 group">
                        <span
                          className="font-mono text-xs flex-shrink-0 mt-0.5 w-5 transition-colors duration-200"
                          style={{ color: `rgba(${edu.accentRgb}, 0.4)` }}
                        >
                          {String(ci + 1).padStart(2, '0')}
                        </span>
                        <span className="text-sm text-p-text-3 font-light leading-snug group-hover:text-p-text-2 transition-colors duration-200">
                          {course}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          ))}
        </div>

      </div>
    </section>
  )
}
