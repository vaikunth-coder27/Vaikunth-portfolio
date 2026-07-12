'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '@/lib/data'

const entries = [
  {
    ...education[0],
    imageSrc: '/education/edinburgh.jpg',
    imagePosition: 'center 42%',
    logoSrc: '/education/edinburgh-emblem.png',
    place: 'Edinburgh, Scotland',
    nameGradient: 'linear-gradient(135deg, #c7d2fe, #818cf8)',
    accentRgb: '129,140,248',
  },
  {
    ...education[1],
    imageSrc: '/education/anna-university.jpg',
    imagePosition: 'center 30%',
    logoSrc: '/education/anna-emblem.png',
    place: 'Chennai, India',
    nameGradient: 'linear-gradient(135deg, #fed7aa, #fb923c)',
    accentRgb: '251,146,60',
  },
]

export function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="education" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">

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
            Academic
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #fbbf24, #f97316)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              foundation.
            </span>
          </h2>
          <div className="mt-10 mb-12 md:mb-16 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Immersive institution cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-7 items-stretch">
          {entries.map((edu, i) => (
            <motion.article
              key={edu.institution}
              initial={{ opacity: 0, y: 48 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.15 + i * 0.2,
              }}
              className="group relative rounded-3xl overflow-hidden border border-p-border bg-p-surface transition-transform duration-500 will-change-transform hover:-translate-y-1"
              style={{ boxShadow: `0 1px 0 0 rgba(${edu.accentRgb},0.06) inset` }}
            >
              {/* ── Campus hero — the thing you notice while scrolling ── */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <motion.img
                  src={edu.imageSrc}
                  alt={`${edu.institution} campus`}
                  initial={{ scale: 1.16 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.2 }}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: edu.imagePosition }}
                />

                {/* Legibility scrims — dark at the base regardless of theme */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/90 via-black/35 to-black/10" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(120deg, rgba(${edu.accentRgb},0.28) 0%, transparent 55%)`, mixBlendMode: 'overlay' }}
                />

                {/* Identity block — overlaid on the photo */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 md:p-8 flex items-end gap-4">
                  {/* Official seal — circular medallion */}
                  <div className="flex-shrink-0 w-[4.5rem] h-[4.5rem] md:w-24 md:h-24 rounded-full bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.55)] ring-1 ring-black/10 flex items-center justify-center p-3 md:p-3.5">
                    <img
                      src={edu.logoSrc}
                      alt={`${edu.institution} crest`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0 pb-1">
                    <h3
                      className="font-serif italic font-semibold leading-[1.05] mb-1.5 drop-shadow-sm"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(1.6rem, 2.6vw, 2.45rem)',
                        background: edu.nameGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {edu.institution}
                    </h3>
                    <p className="text-white/85 font-light text-sm sm:text-base leading-snug">
                      {edu.degree}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="p-5 sm:p-7 md:p-8">
                {/* Meta — fixed two-line block so both cards align */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3.5">
                    <span className="font-mono text-xs text-p-text-5 tracking-wide">{edu.period}</span>
                    <span className="text-p-text-5/30 text-xs">·</span>
                    <span className="font-mono text-xs text-p-text-5 tracking-wide">{edu.location}</span>
                  </div>
                  <span
                    className="inline-block font-mono text-xs px-3 py-1 rounded-full border"
                    style={{
                      borderColor: `rgba(${edu.accentRgb}, 0.3)`,
                      color: `rgba(${edu.accentRgb}, 0.95)`,
                      background: `rgba(${edu.accentRgb}, 0.08)`,
                    }}
                  >
                    {edu.grade}
                  </span>
                </div>

                <div className="h-px bg-p-border-subtle mb-6" />

                {/* Relevant courses */}
                <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-5">
                  Relevant Courses
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-3">
                  {edu.courses.map((course, ci) => (
                    <div key={course} className="flex items-start gap-4 group/course">
                      <span
                        className="font-mono text-xs flex-shrink-0 mt-0.5 w-5"
                        style={{ color: `rgba(${edu.accentRgb}, 0.5)` }}
                      >
                        {String(ci + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm text-p-text-3 font-light leading-snug group-hover/course:text-p-text-2 transition-colors duration-200">
                        {course}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  )
}
