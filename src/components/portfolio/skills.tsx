'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const row1 = [
  'Python', 'PyTorch', 'TensorFlow', 'Keras', 'NumPy', 'Pandas',
  'Scikit-learn', 'OpenCV', 'NLTK', 'spaCy', 'XGBoost', 'C++',
  'JavaScript', 'SQL', 'MongoDB', 'Flask',
]

const row2 = [
  'Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP',
  'Large Language Models', 'Transformers', 'Generative AI',
  'MLOps', 'LLMOps', 'Agentic AI', 'RAG', 'CUDA',
]

const row3 = [
  'Docker', 'Azure', 'AWS', 'MySQL', 'HPC', 'Git',
  'Next.js', 'React', 'Node MCU', 'IBM Cloud', 'Linux', 'Agile',
]

function MarqueeRow({
  items,
  reverse = false,
  speed = 35,
}: {
  items: string[]
  reverse?: boolean
  speed?: number
}) {
  const doubled = [...items, ...items]
  return (
    <div className="relative flex overflow-hidden group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: reverse ? ['0%', '50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
        style={{ willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-2 border border-white/8 rounded-full px-5 py-2 text-sm text-neutral-400 bg-white/[0.02] font-light tracking-wide hover:border-white/20 hover:text-white transition-all duration-300 cursor-default whitespace-nowrap"
          >
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-32 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            04 — Skills
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            The tools I
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #34d399, #22d3ee)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              command.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Three marquee rows */}
      <div className="flex flex-col gap-4">
        <MarqueeRow items={row1} reverse={false} speed={40} />
        <MarqueeRow items={row2} reverse={true} speed={30} />
        <MarqueeRow items={row3} reverse={false} speed={45} />
      </div>

      {/* Skill category summary */}
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              label: 'Languages & Frameworks',
              count: '16',
              examples: 'Python · PyTorch · TensorFlow · OpenCV · scikit-learn',
              color: 'border-cyan-500/20 bg-cyan-500/5',
              accent: 'text-cyan-400',
            },
            {
              label: 'AI Specializations',
              count: '11',
              examples: 'LLMs · NLP · Computer Vision · RAG · Agentic AI',
              color: 'border-purple-500/20 bg-purple-500/5',
              accent: 'text-purple-400',
            },
            {
              label: 'Cloud & DevOps',
              count: '5',
              examples: 'Docker · Azure · AWS · HPC · MySQL',
              color: 'border-emerald-500/20 bg-emerald-500/5',
              accent: 'text-emerald-400',
            },
          ].map((cat) => (
            <div
              key={cat.label}
              className={`rounded-2xl border ${cat.color} p-6`}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span
                  className={`text-4xl font-serif italic font-semibold ${cat.accent}`}
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {cat.count}
                </span>
                <span className="text-xs font-mono text-neutral-600 tracking-wider uppercase">
                  {cat.label}
                </span>
              </div>
              <p className="text-neutral-500 text-xs font-mono leading-relaxed">{cat.examples}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
