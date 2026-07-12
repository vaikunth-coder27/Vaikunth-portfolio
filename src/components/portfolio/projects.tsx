'use client'

import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import {
  featuredProjects,
  projectCatalogue,
  projectCategories,
  type FeaturedProject,
  type ProjectChart,
  type CategoryKey,
} from '@/lib/data'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number]

/* ── Category chip ───────────────────────────────────────────── */
function Chip({ category, label }: { category: CategoryKey; label?: string }) {
  const c = projectCategories[category]
  return (
    <span
      className="inline-block font-mono text-[0.62rem] tracking-wide px-2.5 py-1 rounded-full border"
      style={{ color: c.solid, background: c.chipBg, borderColor: c.chipBorder }}
    >
      {label ?? c.label}
    </span>
  )
}

/* ── Inline SVG-free bar charts, rendered from real data ─────────── */
function FigureChart({ chart, gradient, solid }: { chart: ProjectChart; gradient: string; solid: string }) {
  return (
    <div className="rounded-2xl border border-p-border bg-p-surface-veil p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-p-text-5">{chart.fig}</span>
        {chart.kind === 'vbars' && chart.unit && (
          <span className="font-mono text-[0.6rem] text-p-text-5">{chart.unit}</span>
        )}
      </div>

      {chart.kind === 'hbars' ? (
        <div className="flex flex-col gap-2.5">
          {chart.bars.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="font-mono text-[0.6rem] text-p-text-5 w-[86px] shrink-0 text-right truncate">
                {b.label}
              </span>
              <div className="flex-1 h-3 rounded-full bg-p-surface overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(b.value / chart.max) * 100}%`,
                    background: b.hero ? gradient : solid,
                    opacity: b.hero ? 1 : 0.4,
                  }}
                />
              </div>
              <span className="font-mono text-[0.6rem] text-p-text-4 w-9 tabular-nums text-right">{b.show}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-end justify-around gap-4 h-[128px] px-1">
          {chart.bars.map((b) => (
            <div key={b.label} className="flex flex-col items-center justify-end h-full flex-1 min-w-0">
              <span className="font-mono text-[0.62rem] text-p-text-4 mb-1.5 tabular-nums">{b.show}</span>
              <div
                className="w-full max-w-[46px] rounded-t-md"
                style={{
                  height: `${(b.value / chart.max) * 92}px`,
                  background: b.hero ? gradient : solid,
                  opacity: b.hero ? 1 : 0.4,
                }}
              />
              <span className="font-mono text-[0.6rem] text-p-text-5 mt-2 truncate max-w-full">{b.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Bespoke system-pipeline diagram (for the autonomous-vehicle thesis) ── */
function PipelineFigure({ stages, solid }: { stages: { stage: string; detail: string }[]; solid: string }) {
  return (
    <div className="rounded-2xl border border-p-border bg-p-surface-veil p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-p-text-5">Fig.01 — System pipeline</span>
        <span className="font-mono text-[0.6rem] text-p-text-5">on-device</span>
      </div>
      <div className="flex items-stretch gap-1.5">
        {stages.map((s, i) => (
          <Fragment key={s.stage}>
            <div className="flex-1 min-w-0 rounded-lg border border-p-border bg-p-surface px-2 py-3 text-center flex flex-col justify-center">
              <div className="font-mono text-[0.66rem] text-p-text-2 leading-tight">{s.stage}</div>
              <div className="font-mono text-[0.54rem] text-p-text-5 mt-1 leading-tight break-words">{s.detail}</div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center font-mono text-sm" style={{ color: solid }} aria-hidden>
                ›
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

/* ── Framed figure plate (light matplotlib/screenshot on a white plate) ── */
function FigurePlate({ src, caption, tall }: { src: string; caption: string; tall?: boolean }) {
  return (
    <div className="rounded-2xl border border-p-border overflow-hidden bg-white">
      <div className={`flex items-center justify-center p-3 ${tall ? 'min-h-[220px]' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE}${src}`}
          alt={caption}
          loading="lazy"
          className={`w-full h-auto object-contain ${tall ? 'max-h-[360px]' : 'max-h-[210px]'}`}
        />
      </div>
      <div className="px-3.5 py-2 border-t border-black/10 bg-white">
        <span className="font-mono text-[0.58rem] tracking-wide text-neutral-500">{caption}</span>
      </div>
    </div>
  )
}

/* ── One flagship project row ───────────────────────────────────── */
function FeaturedRow({ project, index }: { project: FeaturedProject; index: number }) {
  const c = projectCategories[project.category]
  const reverse = index % 2 === 1

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
      className={`flex flex-col gap-8 md:gap-[clamp(30px,4vw,64px)] items-center ${
        reverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      {/* Media */}
      <div className="flex-1 min-w-0 w-full flex flex-col gap-4">
        {project.pipeline && <PipelineFigure stages={project.pipeline} solid={c.solid} />}
        {project.chart && <FigureChart chart={project.chart} gradient={c.gradient} solid={c.solid} />}
        <FigurePlate
          src={project.image.src}
          caption={project.image.caption}
          tall={!project.chart && !project.pipeline}
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 w-full">
        <p className="font-mono text-[0.7rem] tracking-[0.22em] uppercase text-p-text-5 mb-4">P.{project.num}</p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4">
          <Chip category={project.category} label={project.categoryLabel} />
          {project.context && (
            <span className="font-mono text-[0.62rem] tracking-wide text-p-text-5">{project.context}</span>
          )}
        </div>
        <h3
          className="font-serif italic font-semibold text-p-text leading-[1.08] tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.9rem, 3vw, 2.75rem)' }}
        >
          {project.title}
        </h3>
        <p className="font-light text-p-text-3 leading-[1.85] mb-7 max-w-[46ch] text-[0.98rem]">
          {project.blurb}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-x-[clamp(24px,3vw,40px)] gap-y-5 mb-7">
          {project.stats.map((s) => (
            <div key={s.label}>
              <div
                className="font-serif italic font-semibold leading-none"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.7rem, 2.4vw, 2.35rem)',
                  ...(s.hero
                    ? {
                        background: c.gradient,
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent',
                      }
                    : { color: 'var(--p-text)' }),
                }}
              >
                {s.value}
              </div>
              <div className="font-mono text-[0.63rem] tracking-wide uppercase text-p-text-5 mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="font-mono text-[0.68rem] text-p-text-4 px-2.5 py-1 rounded-full border border-p-border"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ── Compact catalogue row ──────────────────────────────────────── */
function CatalogueRow({ project }: { project: (typeof projectCatalogue)[number] }) {
  const c = projectCategories[project.category]
  return (
    <div className="grid grid-cols-1 md:grid-cols-[minmax(180px,1.6fr)_150px_minmax(200px,2.1fr)_minmax(120px,1fr)] gap-3 md:gap-5 md:items-center py-4 px-2 border-b border-p-border-subtle rounded-lg hover:bg-p-surface-veil transition-colors">
      <div className="flex gap-3 items-baseline min-w-0">
        <span className="font-mono text-[0.7rem] text-p-text-5">{project.num}</span>
        <span
          className="font-serif italic font-semibold text-[1.1rem] text-p-text-2"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {project.title}
        </span>
      </div>
      <div>
        <span
          className="font-mono text-[0.6rem] px-2.5 py-1 rounded-full border"
          style={{ color: c.solid, background: c.chipBg, borderColor: c.chipBorder }}
        >
          {c.label}
        </span>
      </div>
      <div className="font-light text-[0.82rem] leading-[1.5] text-p-text-4">{project.summary}</div>
      <div className="flex flex-wrap gap-1.5 md:justify-end">
        {project.stack.map((s) => (
          <span
            key={s}
            className="font-mono text-[0.6rem] text-p-text-5 px-2 py-0.5 rounded-full border border-p-border"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export function Projects() {
  const [open, setOpen] = useState(false)

  return (
    <section id="projects" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">03 — Projects</p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text mb-6 leading-tight"
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
          <p className="font-light text-p-text-3 leading-[1.85] max-w-[54ch] text-[1.02rem]">
            Six flagship builds — spanning NLP, computer vision, robotics and machine learning — each documented end
            to end, from method to measured result. Nine more sit in the catalogue below.
          </p>
        </motion.div>

        {/* Flagship rows */}
        <div className="flex flex-col gap-[clamp(64px,9vw,116px)] mt-[clamp(48px,6vw,84px)]">
          {featuredProjects.map((project, i) => (
            <FeaturedRow key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* Fading-line chevron divider */}
        <div className="flex items-center gap-5 mt-[clamp(52px,6vw,80px)]">
          <span className="flex-1 h-px bg-gradient-to-r from-transparent to-p-border" />
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-[0.72rem] tracking-[0.12em] uppercase cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.35)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
            style={{ background: 'var(--p-text)', color: 'var(--p-bg)' }}
          >
            <span>{open ? 'Show fewer projects' : 'View 9 more projects'}</span>
            <motion.svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={open ? { rotate: 180, y: 0 } : { rotate: 0, y: [0, 3, 0] }}
              transition={
                open
                  ? { duration: 0.4, ease: EASE }
                  : { y: { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }, rotate: { duration: 0.4 } }
              }
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </motion.button>
          <span className="flex-1 h-px bg-gradient-to-l from-transparent to-p-border" />
        </div>

        {/* Expandable catalogue */}
        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0, marginTop: open ? 44 : 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="overflow-hidden"
        >
          <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-p-text-5 mb-5">
            All projects · The full catalogue
          </p>
          <div className="hidden md:grid grid-cols-[minmax(180px,1.6fr)_150px_minmax(200px,2.1fr)_minmax(120px,1fr)] gap-5 px-2 pb-3.5 border-b border-p-border">
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-p-text-5">Project</span>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-p-text-5">Category</span>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-p-text-5">Summary</span>
            <span className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-p-text-5 text-right">Stack</span>
          </div>
          {projectCatalogue.map((project) => (
            <CatalogueRow key={project.num} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
