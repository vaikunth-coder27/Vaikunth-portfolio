'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const roles = [
  {
    index: '01',
    title: 'Secretary',
    org: 'Electronics Engineers Association',
    sub: 'Anna University · Chennai, India',
    period: 'Aug 2021 – Jul 2022',
    nameGradient: 'linear-gradient(135deg, #34d399, #22d3ee)',
    accentRgb: '52,211,153',
    metrics: [
      { value: '1,400+', label: 'Participants', sub: 'National symposium' },
      { value: '132', label: 'Coordinators', sub: 'Across 14 events' },
      { value: '24+', label: 'Events & Workshops', sub: 'Both symposiums' },
    ],
    highlights: [
      {
        label: 'Electrofocus 2022',
        text: 'Ideated and organized a national-level Technical Symposium with 132 event coordinators across 14 events and 6 workshops — drawing 1,400+ participants.',
      },
      {
        label: 'Apocalypse 2021',
        text: 'Organized an intra-college Technical Symposium with 40+ coordinators and volunteers across 21 events and 3 workshops — 400+ participants.',
      },
      {
        label: 'Finance & Audit',
        text: 'Managed financial records for the association and assisted in the end-of-year audit process.',
      },
    ],
  },
  {
    index: '02',
    title: 'Technical Team Lead',
    org: 'MIT Robotics Association',
    sub: 'Anna University · Chennai, India',
    period: 'Aug 2021 – Jul 2022',
    nameGradient: 'linear-gradient(135deg, #a78bfa, #818cf8)',
    accentRgb: '167,139,250',
    metrics: [
      { value: '4', label: 'Workshops Keynoted', sub: 'ML · DL · ROS · RL' },
      { value: '1', label: 'Robot Engineered', sub: 'Swatchtha Bot' },
      { value: '1', label: 'Competition Led', sub: 'DEXBOT line-follower' },
    ],
    highlights: [
      {
        label: 'Keynote Speaker',
        text: 'Delivered keynotes for the Machine Learning & Deep Learning workshop, tri-weekly Robotic Operating System (ROS) sessions, and a Reinforcement Learning workshop.',
      },
      {
        label: 'Swatchtha Bot',
        text: "Led the technical team for the association's annual flagship project — a fully functional waste-collection robot.",
      },
      {
        label: 'DEXBOT Competition',
        text: 'Conducted and managed the line-follower robot competition. Active contributor across logistics and technical operations.',
      },
    ],
  },
]

export function Volunteering() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="volunteering" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            06 — Volunteering
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Leadership beyond
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              the classroom.
            </span>
          </h2>
          <div className="mt-10 mb-14 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Role entries */}
        <div className="flex flex-col">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.15 + i * 0.18,
              }}
            >
              {/* ── Nameplate + metrics bar ── */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6">

                {/* Left: index + giant title + org */}
                <div>
                  <span
                    className="font-mono text-xs tracking-widest block mb-2"
                    style={{ color: `rgba(${role.accentRgb}, 0.5)` }}
                  >
                    {role.index}
                  </span>
                  <h3
                    className="font-serif italic font-semibold leading-none tracking-tight mb-3"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                      background: role.nameGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {role.title}
                  </h3>
                  <p className="text-p-text-2 font-light text-base leading-snug">{role.org}</p>
                  <p className="font-mono text-xs text-p-text-5 tracking-wide mt-1">
                    {role.period} &nbsp;·&nbsp; {role.sub}
                  </p>
                </div>

                {/* Right: impact metrics — editorial numbers */}
                <div className="flex items-end gap-8 md:gap-12 pb-1">
                  {role.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col items-start md:items-end">
                      <span
                        className="font-serif italic font-semibold leading-none text-p-text"
                        style={{
                          fontFamily: 'var(--font-cormorant)',
                          fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                          background: role.nameGradient,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                        }}
                      >
                        {m.value}
                      </span>
                      <p className="text-xs font-mono text-p-text-4 mt-1 text-left md:text-right">{m.label}</p>
                      <p
                        className="text-[10px] font-mono text-left md:text-right"
                        style={{ color: `rgba(${role.accentRgb}, 0.45)` }}
                      >
                        {m.sub}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rule */}
              <div className="h-px bg-p-border-subtle" />

              {/* ── Highlights ── */}
              <div className="py-8 flex flex-col gap-0">
                {role.highlights.map((h, hi) => (
                  <div key={h.label}>
                    <div className="grid grid-cols-[28px_1fr] gap-5 py-4 group">
                      {/* Number */}
                      <span
                        className="font-mono text-xs mt-0.5 flex-shrink-0 transition-colors duration-200"
                        style={{ color: `rgba(${role.accentRgb}, 0.4)` }}
                      >
                        {String(hi + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <p
                          className="font-mono text-[10px] tracking-[0.25em] uppercase mb-1.5"
                          style={{ color: `rgba(${role.accentRgb}, 0.75)` }}
                        >
                          {h.label}
                        </p>
                        <p className="text-sm text-p-text-3 font-light leading-[1.8] group-hover:text-p-text-2 transition-colors duration-200">
                          {h.text}
                        </p>
                      </div>
                    </div>
                    {hi < role.highlights.length - 1 && (
                      <div className="h-px bg-p-border-subtle/50 ml-[52px]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Entry separator */}
              {i < roles.length - 1 && (
                <div className="flex items-center gap-5 py-3 mb-2">
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
