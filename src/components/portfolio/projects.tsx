'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { projects } from '@/lib/data'

const categoryColors: Record<string, string> = {
  NLP: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
  'Computer Vision': 'text-purple-400 border-purple-500/20 bg-purple-500/5',
  'Machine Learning': 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
  'Embedded Systems': 'text-amber-400 border-amber-500/20 bg-amber-500/5',
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
  // Card is below dialog center for most viewport positions
  const fromBelow = originY >= 0

  // Genie clip-path keyframes — all 4-point polygons so framer-motion interpolates smoothly
  // "sliver"  = thin strip at the end nearest the card
  // "stretch" = macOS genie warp: the side anchored to the card stays wide, the far side is narrow
  // "full"    = normal rectangle
  const sliver = fromBelow
    ? 'polygon(38% 92%, 62% 92%, 62% 100%, 38% 100%)'  // strip at bottom of element
    : 'polygon(38% 0%,  62% 0%,  62% 8%,  38% 8%)'     // strip at top of element

  // Genie warp: bottom anchored (wide) while top is still narrow — or vice versa
  const stretch = fromBelow
    ? 'polygon(0% 0%, 100% 0%, 78% 100%, 22% 100%)'    // wide top trails, bottom narrows toward card
    : 'polygon(22% 0%, 78% 0%, 100% 100%, 0% 100%)'    // wide bottom trails, top narrows toward card

  const full = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'

  return (
    <>
      {/* Backdrop fades independently — faster than the window */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        onClick={onClose}
      />

      {/* Dialog — genie warp from card position */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <motion.div
          className="relative bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 max-w-lg w-full shadow-2xl pointer-events-auto"
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
            className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>

          <span
            className={`text-xs font-mono px-3 py-1 rounded-full border ${
              categoryColors[project.category] ?? 'text-neutral-400 border-white/10 bg-white/5'
            }`}
          >
            {project.category}
          </span>

          <h3
            className="text-3xl font-serif italic font-semibold text-white mt-5 mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {project.title}
          </h3>

          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span
                key={tag}
                className="text-xs border border-white/8 text-neutral-500 px-3 py-1 rounded-full font-mono"
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
          ? 'border-white/15 bg-white/[0.04] cursor-pointer'
          : 'border-white/6 bg-white/[0.02] cursor-default'
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
              categoryColors[project.category] ?? 'text-neutral-400 border-white/10 bg-white/5'
            }`}
          >
            {project.category}
          </span>
          <span className={`text-xl transition-colors ${isCenter ? 'text-neutral-500' : 'text-neutral-700'}`}>
            ↗
          </span>
        </div>

        <h3
          className={`font-serif italic font-semibold leading-tight transition-colors ${
            isCenter ? 'text-white text-xl' : 'text-neutral-500 text-lg'
          }`}
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {project.title}
        </h3>

        <p
          className={`text-sm leading-relaxed font-light flex-1 ${
            isCenter ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.slice(0, 4).map(tag => (
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
    <section id="projects" ref={sectionRef} className="relative py-16 md:py-32 px-5 md:px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
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
          <p className="text-neutral-500 text-sm font-light mb-16 max-w-md">
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
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Arrow buttons */}
          <button
            onClick={() => setCenterIdx(prev => prev - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/60 text-neutral-400 hover:text-white hover:border-white/25 transition-all duration-200"
          >
            ←
          </button>
          <button
            onClick={() => setCenterIdx(prev => prev + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-black/60 text-neutral-400 hover:text-white hover:border-white/25 transition-all duration-200"
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
                  ? 'w-6 h-1.5 bg-white'
                  : 'w-1.5 h-1.5 bg-neutral-700 hover:bg-neutral-500'
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
