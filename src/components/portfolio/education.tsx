'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { education } from '@/lib/data'

const universityImages: Record<string, string> = {
  'The University of Edinburgh': '/University of Edinburgh.png',
  'Anna University': '/anna university.png',
}

export function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const cards = [
    {
      ...education[0],
      gradient: 'from-blue-500 via-indigo-500 to-purple-600',
      glow: 'rgba(99,102,241,0.08)',
      accentColor: 'text-indigo-400',
      borderAccent: 'border-indigo-500/20',
    },
    {
      ...education[1],
      gradient: 'from-orange-400 via-red-500 to-rose-600',
      glow: 'rgba(239,68,68,0.06)',
      accentColor: 'text-rose-400',
      borderAccent: 'border-rose-500/20',
    },
  ]

  return (
    <section id="education" className="relative py-16 md:py-32 px-5 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            05 — Education
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white mb-16 leading-tight"
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
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {cards.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.1 + i * 0.12 }}
              className="relative rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden"
            >
              {/* Gradient top bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${edu.gradient}`} />

              {/* University image — left half only, fades to transparent at its right edge */}
              <div
                className="hidden md:block absolute left-0 top-1 bottom-0 w-1/2"
                style={{
                  maskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, black 0%, black 60%, transparent 100%)',
                }}
              >
                <img
                  src={universityImages[edu.institution]}
                  alt={edu.institution}
                  className="w-full h-full object-cover object-left opacity-70"
                />
              </div>

              {/* Glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${edu.glow}, transparent)` }}
              />

              {/* Content — starts from center on desktop */}
              <div className="relative z-10 px-8 py-5 md:pl-[50%]">
                {/* Top row: period + grade */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-block font-mono text-xs text-neutral-600 border border-white/8 rounded-full px-3 py-1 tracking-wider">
                    {edu.period}
                  </span>
                  <div className={`inline-flex items-center gap-2 border ${edu.borderAccent} rounded-full px-3 py-1`}
                    style={{ background: `${edu.glow.replace('0.06', '0.05').replace('0.08', '0.06')}` }}>
                    <span className={`text-sm font-serif italic font-semibold ${edu.accentColor}`}
                      style={{ fontFamily: 'var(--font-cormorant)' }}>
                      {edu.grade}
                    </span>
                  </div>
                </div>

                {/* Institution */}
                <h3
                  className="text-2xl md:text-3xl font-serif italic font-semibold text-white leading-tight mb-1"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {edu.institution}
                </h3>

                {/* Degree */}
                <p className="text-neutral-400 font-light text-sm mb-0.5">{edu.degree}</p>

                {/* Location */}
                <p className="text-neutral-600 font-mono text-xs mb-3">{edu.location}</p>

                {/* Courses */}
                <div>
                  <p className="text-xs font-mono text-neutral-600 tracking-widest uppercase mb-2">
                    Relevant Courses
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.courses.map(course => (
                      <span
                        key={course}
                        className="text-xs border border-white/8 text-neutral-500 px-3 py-1 rounded-full font-mono"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
