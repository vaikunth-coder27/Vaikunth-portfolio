'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

const categoryColors: Record<string, string> = {
  NLP: 'text-cyan-500 dark:text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  'Computer Vision': 'text-purple-500 dark:text-purple-400 border-purple-500/20 bg-purple-500/5',
  'Machine Learning': 'text-emerald-500 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  'Embedded Systems': 'text-amber-500 dark:text-amber-400 border-amber-500/20 bg-amber-500/5',
}

const gradients = [
  'from-cyan-500/10 to-blue-500/5',
  'from-purple-500/10 to-pink-500/5',
  'from-green-500/10 to-teal-500/5',
  'from-orange-500/10 to-amber-500/5',
  'from-emerald-500/10 to-green-500/5',
  'from-rose-500/10 to-red-500/5',
]

const N = projects.length
const CARD_W = 340
const CARD_H = 420
const GAP = 28
const SLOT = CARD_W + GAP
const OFFSETS = [-2, -1, 0, 1, 2]

type Project = (typeof projects)[0]
type CardRect = { x: number; y: number; width: number; height: number }

function ProjectDialog({
  project,
  cardRect,
  onClose,
}: {
  project: Project
  cardRect: CardRect
  onClose: () => void
}) {
  const originY = cardRect.y + cardRect.height / 2 - window.innerHeight / 2
  const fromBelow = originY >= 0

  const sliver = fromBelow
    ? 'polygon(38% 92%, 62% 92%, 62% 100%, 38% 100%)'
    : 'polygon(38% 0%,  62% 0%,  62% 8%,  38% 8%)'

  const stretch = fromBelow
    ? 'polygon(0% 0%, 100% 0%, 78% 100%, 22% 100%)'
    : 'polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)'

  const full = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 dark:bg-black/75 bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="relative dark:bg-[#0a0a0a] bg-white border border-p-border rounded-2xl p-8 max-w-lg w-full shadow-2xl pointer-events-auto"
          style={{ willChange: 'transform, clip-path, opacity' }}
          animate={{
            y:        [originY, originY * 0.3, 0],
            clipPath: [sliver,  stretch,        full],
            opacity:  [0,       1,               1],
          }}
          exit={{
            y:        [0,    originY * 0.3, originY],
            clipPath: [full, stretch,       sliver],
            opacity:  [1,    1,             0],
          }}
          transition={{
            y:        { duration: 0.48, times: [0, 0.22, 1], ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
            clipPath: { duration: 0.48, times: [0, 0.22, 1], ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
            opacity:  { duration: 0.12, ease: 'easeOut' },
          }}
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-p-text-4 hover:text-p-text transition-colors text-lg leading-none"
          >
            ✕
          </button>

          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              categoryColors[project.category] ?? 'text-p-text-3 border-p-border bg-p-surface'
            }`}
          >
            {project.category}
          </span>

          <h3
            className="text-3xl font-serif italic font-semibold text-p-text mt-5 mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {project.title}
          </h3>

          <p className="text-p-text-3 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs border border-p-border-subtle text-p-text-4 px-3 py-1 rounded-full font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

function CarouselCard({
  project,
  projIdx,
  isCenter,
  onClick,
}: {
  project: Project
  projIdx: number
  isCenter: boolean
  onClick: (rect: CardRect) => void
}) {
  return (
    <div
      className={`relative rounded-2xl border overflow-hidden flex flex-col h-full transition-colors duration-300 ${
        isCenter
          ? 'border-p-border bg-p-surface cursor-pointer'
          : 'border-p-border-subtle bg-p-surface/50 cursor-default'
      }`}
      onClick={isCenter ? (e) => onClick(e.currentTarget.getBoundingClientRect()) : undefined}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradients[projIdx % gradients.length]} pointer-events-none transition-opacity duration-500 ${
          isCenter ? 'opacity-60' : 'opacity-0'
        }`}
      />

      <div className="relative z-10 flex flex-col h-full gap-4 p-6">
        <div className="flex items-start justify-between">
          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              categoryColors[project.category] ?? 'text-p-text-3 border-p-border bg-p-surface'
            }`}
          >
            {project.category}
          </span>
          <span className={`text-xl transition-colors ${isCenter ? 'text-p-text-4' : 'text-p-text-5'}`}>
            ↗
          </span>
        </div>

        <h3
          className={`font-serif italic font-semibold leading-tight transition-colors ${
            isCenter ? 'text-p-text text-xl' : 'text-p-text-4 text-lg'
          }`}
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {project.title}
        </h3>

        <p
          className={`text-sm leading-relaxed font-light flex-1 ${
            isCenter ? 'text-p-text-3' : 'text-p-text-5'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="text-xs border border-p-border-subtle text-p-text-5 px-2.5 py-0.5 rounded-full font-mono"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs text-p-text-5 px-2.5 py-0.5 font-mono">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [centerIdx, setCenterIdx] = useState(0)
  const [paused, setPaused] = useState(false)
  const [selectedProject, setSelectedProject] = useState<{ project: Project; cardRect: CardRect } | null>(null)

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => {
      setCenterIdx(prev => prev + 1)
    }, 2000)
    return () => clearTimeout(timer)
  }, [centerIdx, paused])

  const currentProjIdx = ((centerIdx % N) + N) % N

  return (
    <section id="projects" ref={sectionRef} className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            03 — Projects
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Things I&apos;ve
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #818cf8, #c084fc)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              engineered.
            </span>
          </h2>
          <p className="text-p-text-4 text-sm font-light mb-16 max-w-md">
            Eleven projects spanning NLP, Computer Vision, and Machine Learning —
            each solving a real problem with cutting-edge techniques.
          </p>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative overflow-hidden"
          style={{ height: CARD_H + 40 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Arrow buttons */}
          <button
            onClick={() => setCenterIdx(prev => prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full border border-p-border dark:bg-black/60 bg-white/80 text-p-text-3 hover:text-p-text hover:border-p-border transition-all duration-200"
          >
            ←
          </button>
          <button
            onClick={() => setCenterIdx(prev => prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full border border-p-border dark:bg-black/60 bg-white/80 text-p-text-3 hover:text-p-text hover:border-p-border transition-all duration-200"
          >
            →
          </button>

          <AnimatePresence>
            {OFFSETS.map(offset => {
              const projIdx = ((centerIdx + offset) % N + N) % N
              const project = projects[projIdx]
              const absOff = Math.abs(offset)
              const isCenter = offset === 0
              const targetX = offset * SLOT - CARD_W / 2
              const targetOpacity = isCenter ? 1 : absOff === 1 ? 0.55 : 0.25
              const targetScale = isCenter ? 1 : absOff === 1 ? 0.88 : 0.76
              const zIndex = isCenter ? 10 : absOff === 1 ? 5 : 1

              return (
                <motion.div
                  key={projIdx}
                  className="absolute top-5"
                  style={{ left: '50%', width: CARD_W, height: CARD_H, zIndex }}
                  initial={{ x: targetX, opacity: 0, scale: targetScale }}
                  animate={{ x: targetX, opacity: targetOpacity, scale: targetScale }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                >
                  <CarouselCard
                    project={project}
                    projIdx={projIdx}
                    isCenter={isCenter}
                    onClick={(rect) => setSelectedProject({ project, cardRect: rect })}
                  />
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const base = Math.floor(centerIdx / N) * N
                setCenterIdx(base + i)
              }}
              className={`rounded-full transition-all duration-300 ${
                currentProjIdx === i
                  ? 'w-6 h-1.5 bg-p-text'
                  : 'w-1.5 h-1.5 bg-p-text-5 hover:bg-p-text-4'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dialog */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDialog
            project={selectedProject.project}
            cardRect={selectedProject.cardRect}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
