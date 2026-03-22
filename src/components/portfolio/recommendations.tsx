'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Meteors } from '@/components/ui/meteors'

const recommendations = [
  {
    name: 'Gordon Falconer',
    title: 'Director',
    company: 'Zot Engineering Ltd',
    relationship: 'Gordon managed Vaikunth directly',
    date: 'September 5, 2025',
    accentColor: 'rgba(59,130,246,0.08)',
    borderAccent: 'rgba(59,130,246,0.25)',
    quote:
      "Having worked with Vaikunth for over 6 months , originally as our intern, but now as a full time employee, he has quickly proved himself as a dedicated and very talented software engineer. From day one he has demonstrated his eagerness to learn, strong problem solving skills, and ability to learn and adapt to new challenges.\n A fantastic \"can do\" attitude, working quickly and efficiently to solve problems and handle task given to him, showing creativity and initiative to find solutions. \nHe has quickly established himself as a key and valuable member of the Zot team.",
  },
  {
    name: 'Christos Christodoulopoulos',
    title: 'Principal Technology Adviser',
    company: 'ICO',
    relationship: 'Christos was Vaikunth\'s mentor',
    date: 'August 20, 2024',
    accentColor: 'rgba(168,85,247,0.08)',
    borderAccent: 'rgba(168,85,247,0.25)',
    quote:
      "I was one of Vaikunth's advisors for his MSc research project on LLM memorisation for code. From day one Vaikunth showed an incredible amount of passion and initiative, and, in Amazon terms, bias for action. He immersed himself into the relevant literature, and even in our first project meeting had done some preliminary experimentation. He continued at the same pace throughout the project, combining his hard work with innovative ideas that challenged existing approaches in the literature. I can easily recommend Vaikunth for any position that requires both deep exploration and technical execution.",
  },
]

export function Recommendations() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="recommendations" className="relative py-16 md:py-32 px-5 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            07 — Recommendations
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white mb-16 leading-tight"
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
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {recommendations.map((rec, i) => (
            <motion.div
              key={rec.name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                delay: 0.15 + i * 0.15,
              }}
              className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 overflow-hidden flex flex-col"
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 70% 60% at 20% 20%, ${rec.accentColor}, transparent)`,
                }}
              />

              {/* Meteor effect */}
              <Meteors number={14} />

              {/* Opening quote mark */}
              <div
                className="relative z-10 text-7xl font-serif leading-none mb-4 select-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: rec.borderAccent,
                  lineHeight: 1,
                }}
                aria-hidden
              >
                &ldquo;
              </div>

              {/* Quote body */}
              <blockquote className="relative z-10 flex-1">
                <p className="text-neutral-300 leading-relaxed text-base font-light whitespace-pre-line">
                  {rec.quote}
                </p>
              </blockquote>

              {/* Divider */}
              <div
                className="relative z-10 mt-8 mb-6 h-px"
                style={{ background: `linear-gradient(to right, ${rec.borderAccent}, transparent)` }}
              />

              {/* Recommender info */}
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <p
                    className="text-white font-serif italic text-xl font-semibold"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {rec.name}
                  </p>
                  <p className="text-neutral-400 text-sm font-light mt-0.5">
                    {rec.title}{' '}
                    <span className="text-neutral-600">·</span>{' '}
                    {rec.company}
                  </p>
                  <p className="font-mono text-xs text-neutral-600 tracking-wide mt-1.5">
                    {rec.relationship}
                  </p>
                </div>
                <span className="flex-shrink-0 font-mono text-xs text-neutral-600 border border-white/10 rounded-full px-3 py-1.5 tracking-wide whitespace-nowrap">
                  {rec.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
