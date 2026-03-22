'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const roles = [
  {
    title: 'Secretary',
    org: 'Electronics Engineers Association',
    sub: 'Anna University · Chennai, India',
    period: 'Aug 2021 – Jul 2022 · 1 yr',
    accent: 'from-emerald-500/10 to-teal-500/5',
    border: 'border-emerald-500/20',
    dot: 'bg-emerald-400',
    glow: 'rgba(16,185,129,0.06)',
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
    title: 'Technical Team Lead',
    org: 'MIT Robotics Association',
    sub: 'Anna University · Chennai, India',
    period: 'Aug 2021 – Jul 2022 · 1 yr',
    accent: 'from-violet-500/10 to-purple-500/5',
    border: 'border-violet-500/20',
    dot: 'bg-violet-400',
    glow: 'rgba(139,92,246,0.06)',
    highlights: [
      {
        label: 'Keynote Speaker',
        text: 'Delivered keynotes for the Machine Learning & Deep Learning workshop, tri-weekly Robotic Operating System (ROS) sessions, and a Reinforcement Learning workshop.',
      },
      {
        label: 'Swatchtha Bot',
        text: 'Led the technical team for the association\'s annual project — a waste-collection robot.',
      },
      {
        label: 'DEXBOT Competition',
        text: 'Conducted and managed the line-follower competition. Active contributor across logistics and technical operations.',
      },
    ],
  },
]

export function Volunteering() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="volunteering" className="relative py-16 md:py-32 px-5 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            06 — Volunteering
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Giving back to
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              the community.
            </span>
          </h2>
          <p className="text-neutral-500 text-sm font-light mb-16 max-w-md">
            Leadership and community roles beyond the classroom — organizing events,
            mentoring peers, and driving technical initiatives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {roles.map((role, i) => (
            <VolunteerCard key={role.title} role={role} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function VolunteerCard({
  role,
  index,
  inView,
}: {
  role: (typeof roles)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        delay: 0.15 + index * 0.15,
      }}
      className={`relative rounded-2xl border ${role.border} bg-white/[0.02] p-8 overflow-hidden flex flex-col gap-6`}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 20% 30%, ${role.glow}, transparent)`,
        }}
      />
      {/* Hover gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${role.accent} opacity-60 pointer-events-none`} />

      {/* Header */}
      <div className="relative z-10 flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`w-1.5 h-1.5 rounded-full ${role.dot}`} />
          <span className="font-mono text-xs text-neutral-600 tracking-wider uppercase">
            {role.period}
          </span>
        </div>
        <h3
          className="text-2xl font-serif italic font-semibold text-white leading-tight"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {role.title}
        </h3>
        <p className="text-neutral-300 font-light text-base">{role.org}</p>
        <p className="text-xs font-mono text-neutral-600 tracking-wide">{role.sub}</p>
      </div>

      {/* Highlights */}
      <div className="relative z-10 flex flex-col gap-4">
        {role.highlights.map((h) => (
          <div key={h.label} className="flex gap-3">
            <div className="mt-1.5 w-px self-stretch bg-white/8 flex-shrink-0" />
            <div>
              <p className="text-xs font-mono text-neutral-500 tracking-wider uppercase mb-0.5">
                {h.label}
              </p>
              <p className="text-neutral-400 text-sm leading-relaxed font-light">{h.text}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
