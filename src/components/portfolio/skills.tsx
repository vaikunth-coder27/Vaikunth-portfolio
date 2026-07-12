'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

const skillGroups = [
  { n: '01', label: 'Languages', items: ['Python', 'TypeScript', 'C++', 'C# / .NET', 'Rust', 'SQL'] },
  { n: '02', label: 'Deep Learning & AI', items: ['PyTorch', 'TensorFlow', 'Hugging Face Transformers', 'OpenCV', 'ONNX Runtime'] },
  { n: '03', label: 'LLMs & GenAI', items: ['LangChain', 'RAG Pipelines', 'Vector Databases', 'Azure OpenAI', 'Prompt Engineering'] },
  { n: '04', label: 'MLOps & Deployment', items: ['MLflow', 'Azure ML', 'Docker', 'Kubernetes', 'CI/CD'] },
  { n: '05', label: 'Cloud & Databases', items: ['Azure', 'AWS', 'PostgreSQL', 'MongoDB'] },
  { n: '06', label: 'Web & Tooling', items: ['React', 'Angular', 'Node.js', 'Git', 'Linux'] },
]

export function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            04 — Skills
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            What I
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #34d399, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              work with.
            </span>
          </h2>
          <div className="mt-10 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Skill groups — numbered list */}
        <div className="flex flex-col">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.n}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.08 }}
              className="border-b border-p-border-subtle py-7 md:py-9 flex flex-col gap-y-3 md:grid md:grid-cols-[56px_minmax(0,1fr)_minmax(0,1.6fr)] md:gap-x-8 md:items-baseline"
            >
              <div className="flex items-baseline gap-4 md:contents">
                <span className="font-mono text-xs text-p-text-5 tracking-wider">{g.n}</span>
                <h3
                  className="font-serif italic font-semibold text-2xl md:text-[1.7rem] text-p-text leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {g.label}
                </h3>
              </div>
              <p className="font-mono text-sm text-p-text-4 leading-relaxed">
                {g.items.join(' · ')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
