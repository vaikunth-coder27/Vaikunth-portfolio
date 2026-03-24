'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

const experiences = [
  {
    index: '01',
    company: 'ZOT',
    logoSrc: '/logo_zot.ico',
    href: 'https://www.zot.co.uk/',
    sub: 'PCB & Precision Manufacturing · United Kingdom',
    role: 'Full-Stack Software Engineer',
    roleDetail: 'End-to-End Ownership',
    period: 'Feb 2025 – Present',
    current: true,
    nameGradient: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    accentRgb: '56,189,248',
    pullQuote:
      '"Owned the full delivery of a production ERP platform end-to-end — full-stack, cloud-native, and AI-integrated."',
    description: [
      { text: 'Responsible for designing, building, and deploying a production-grade platform — a public customer website with ' },
      { text: 'Angular 19 SSR & PWA', serif: true },
      { text: ' and a comprehensive internal ERP backed by a ' },
      { text: 'Python serverless backend on Azure Functions', serif: true },
      { text: '. Provisioned full Azure cloud infrastructure: VNet, Front Door CDN, Private Endpoints, and Application Insights. Engineered ' },
      { text: 'AI-native features', accent: 'sky' },
      { text: ' — a GDPR-compliant AI-powered ATS, natural language to SQL chart recommendations, and Azure AI Foundry integrations. Built a robust ' },
      { text: 'payroll engine', serif: true },
      { text: ' and dynamic dashboards with AI-driven insights. Implemented secure ' },
      { text: 'RBAC', accent: 'sky' },
      { text: ' across all modules, secured with MSAL SSO, JWT, and AES-encrypted API payloads.' },
    ],
    pillars: [
      { label: 'Frontend', techs: 'Angular 19 · TypeScript · SSR · PWA' },
      { label: 'Backend', techs: 'Python · Azure Functions · .NET · PostgreSQL' },
      { label: 'Cloud & DevOps', techs: 'Azure · Docker · CI/CD · Front Door CDN' },
      { label: 'AI & Security', techs: 'LLMOps · RBAC · MSAL · AI Foundry' },
    ],
  },
  {
    index: '02',
    company: 'Amazon',
    logoSrc: '/amazon.ico',
    href: 'https://www.amazon.co.uk/',
    sub: 'Edinburgh, United Kingdom',
    role: 'Industry Collaborated Dissertation',
    roleDetail: 'MSc Research Partnership',
    period: 'Mar 2024 – Aug 2024',
    current: false,
    nameGradient: 'linear-gradient(135deg, #fbbf24, #f97316)',
    accentRgb: '251,191,36',
    pullQuote:
      '"Reduced LLM memorization by 17% via 8-bit quantization — without sacrificing model accuracy."',
    description: [
      { text: 'Developed novel methods to analyze copyright issues in various ' },
      { text: 'code-based Large Language Models', serif: true },
      { text: '. Extended the CodeBLEU metric and applied Few-Shot Learning with 8-bit quantization techniques, achieving a ' },
      { text: '17% reduction in memorization', accent: 'emerald' },
      { text: ' while maintaining model accuracy — contributing to enhanced privacy and robustness in AI code generation.' },
    ],
    pillars: [
      { label: 'Research Domain', techs: 'LLMs · Code Generation · Privacy AI' },
      { label: 'Techniques', techs: 'Few-Shot Learning · 8-bit Quantization' },
      { label: 'Evaluation', techs: 'CodeBLEU · Memorization Analysis' },
      { label: 'Stack', techs: 'Python · NLP · HPC' },
    ],
  },
]

type DescChunk = { text: string; serif?: boolean; accent?: string }

function DescriptionText({ chunks }: { chunks: DescChunk[] }) {
  return (
    <p className="text-p-text-3 leading-[1.9] text-base font-light">
      {chunks.map((chunk, i) => {
        if (chunk.serif) {
          return (
            <span key={i} className="text-p-text font-serif italic" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {chunk.text}
            </span>
          )
        }
        if (chunk.accent === 'sky') {
          return <span key={i} className="text-sky-400 font-medium">{chunk.text}</span>
        }
        if (chunk.accent === 'emerald') {
          return <span key={i} className="text-emerald-400 font-medium">{chunk.text}</span>
        }
        return <span key={i}>{chunk.text}</span>
      })}
    </p>
  )
}

export function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-16 md:py-32 px-5 md:px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
            02 — Experience
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-p-text leading-tight"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            Where I&apos;ve made
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              an impact.
            </span>
          </h2>
          <div className="mt-10 h-px bg-gradient-to-r from-p-border via-p-border-subtle to-transparent" />
        </motion.div>

        {/* Experience entries */}
        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.15 + i * 0.18 }}
            >
              {/* ── Company nameplate ── */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 pt-12 pb-5">

                {/* Left: logo + giant name */}
                <div className="flex items-center gap-4">
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-9 h-9 rounded-lg border border-p-border-subtle flex items-center justify-center overflow-hidden hover:border-p-border transition-colors"
                    style={{ background: `rgba(${exp.accentRgb},0.06)` }}
                  >
                    <img src={`${BASE}${exp.logoSrc}`} alt={exp.company} className="w-6 h-6 object-contain" />
                  </a>
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-end gap-2 leading-none"
                  >
                    <h3
                      className="font-serif italic font-semibold leading-none tracking-tight"
                      style={{
                        fontFamily: 'var(--font-cormorant)',
                        fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                        background: exp.nameGradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {exp.company}
                    </h3>
                    <span className="text-p-text-5 text-sm mb-2 group-hover:text-p-text-3 transition-colors">↗</span>
                  </a>
                </div>

                {/* Right: role + period */}
                <div className="flex flex-col items-start md:items-end gap-1 pb-1">
                  <p className="text-p-text-2 font-light text-base">{exp.role}</p>
                  <p className="text-xs font-mono text-p-text-5 tracking-wide">{exp.roleDetail} · {exp.sub}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-mono text-xs text-p-text-5 tracking-wider">{exp.period}</span>
                    {exp.current && (
                      <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Current
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rule */}
              <div className="h-px bg-p-border-subtle" />

              {/* ── Pull quote ── */}
              <div className="py-7 border-b border-p-border-subtle">
                <blockquote
                  className="font-serif italic text-p-text-2 leading-snug max-w-4xl"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)',
                  }}
                >
                  {exp.pullQuote}
                </blockquote>
              </div>

              {/* ── Description + tech pillars ── */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 py-8">

                {/* Left: description */}
                <DescriptionText chunks={exp.description} />

                {/* Right: tech pillars — no container */}
                <div>
                  <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-5">
                    Tech Pillars
                  </p>
                  <div className="flex flex-col">
                    {exp.pillars.map((pillar, pi) => (
                      <div key={pillar.label}>
                        <div className="py-3">
                          <p
                            className="text-[10px] font-mono tracking-widest uppercase mb-1"
                            style={{ color: `rgba(${exp.accentRgb}, 0.75)` }}
                          >
                            {pillar.label}
                          </p>
                          <p className="text-sm text-p-text-3 font-light">{pillar.techs}</p>
                        </div>
                        {pi < exp.pillars.length - 1 && <div className="h-px bg-p-border-subtle" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Entry separator */}
              {i < experiences.length - 1 && (
                <div className="flex items-center gap-5 py-2">
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
