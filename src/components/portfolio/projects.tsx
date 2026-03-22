'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

const categoryColors: Record<string, string> = {
  NLP: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  'Computer Vision': 'text-purple-400 border-purple-500/20 bg-purple-500/5',
  'Machine Learning': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
}

const gradients: string[] = [
  'from-cyan-500/10 to-blue-500/5',
  'from-purple-500/10 to-pink-500/5',
  'from-green-500/10 to-teal-500/5',
  'from-orange-500/10 to-amber-500/5',
  'from-emerald-500/10 to-green-500/5',
  'from-rose-500/10 to-red-500/5',
]

function ProjectCard({
  project,
  index,
  className = '',
}: {
  project: (typeof projects)[0]
  index: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: index * 0.07 }}
      className={`group relative rounded-2xl border border-white/8 bg-white/[0.02] p-6 overflow-hidden flex flex-col justify-between hover:border-white/15 transition-all duration-500 ${className}`}
    >
      {/* Hover gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="relative z-10 flex flex-col h-full gap-4">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${categoryColors[project.category] ?? 'text-neutral-400 border-white/10 bg-white/5'}`}
          >
            {project.category}
          </span>
          <span className="text-neutral-700 group-hover:text-neutral-500 text-xl transition-colors">↗</span>
        </div>

        {/* Title */}
        <h3
          className="text-xl font-serif italic font-semibold text-white leading-tight"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-neutral-500 text-sm leading-relaxed font-light flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-xs border border-white/8 text-neutral-600 px-2.5 py-0.5 rounded-full font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs text-neutral-700 px-2.5 py-0.5 font-mono">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="relative py-16 md:py-32 px-5 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            03 — Projects
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Things I&apos;ve
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #818cf8, #c084fc)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              engineered.
            </span>
          </h2>
          <p className="text-neutral-500 text-sm font-light mb-16 max-w-md">
            Six projects spanning NLP, Computer Vision, and Machine Learning —
            each solving a real problem with cutting-edge techniques.
          </p>
        </motion.div>

        {/* Bento grid — irregular layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1: large (2 col) + normal (1 col) */}
          <ProjectCard project={projects[0]} index={0} className="md:col-span-2 min-h-[280px]" />
          <ProjectCard project={projects[1]} index={1} className="min-h-[280px]" />

          {/* Row 2: three equal */}
          <ProjectCard project={projects[2]} index={2} className="min-h-[260px]" />
          <ProjectCard project={projects[3]} index={3} className="min-h-[260px]" />
          <ProjectCard project={projects[4]} index={4} className="min-h-[260px]" />

          {/* Row 3: full width */}
          <ProjectCard project={projects[5]} index={5} className="md:col-span-3 min-h-[220px] md:flex-row" />
        </div>
      </div>
    </section>
  )
}
