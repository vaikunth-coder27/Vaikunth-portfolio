'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

type DescChunk = { text: string; serif?: boolean; accent?: string }
type Pillar = { label: string; techs: string }
type Bullet = { lead: string; detail: string }
type Role = {
  title: string
  tagline?: string
  phase?: string
  period: string
  current?: boolean
  bullets: Bullet[]
  stack: string[]
}
type ExperienceEntry = {
  index: string
  company: string
  logoSrc: string
  href: string
  sub: string
  role: string
  roleDetail: string
  period: string
  current: boolean
  nameGradient: string
  accentRgb: string
  pullQuote: string
  description?: DescChunk[]
  bullets?: Bullet[]
  pillars?: Pillar[]
  roles?: Role[]
}

const experiences: ExperienceEntry[] = [
  {
    index: '01',
    company: 'ZOT',
    logoSrc: '/logo_zot.ico',
    href: 'https://www.zot.co.uk/',
    sub: 'PCB & Precision Manufacturing · United Kingdom',
    role: 'Software Application Engineer',
    roleDetail: 'Founding Engineer · Intern → Full-time',
    period: 'Feb 2025 – Present',
    current: true,
    nameGradient: 'linear-gradient(135deg, #38bdf8, #818cf8)',
    accentRgb: '56,189,248',
    pullQuote:
      '"Founding engineer at a UK manufacturer: built the digital foundation 0→1, then turned it into a platform that ships AI and full-stack features across the business at speed."',
    roles: [
      {
        title: 'Software Application Engineer',
        tagline: 'Founding Engineer',
        phase: 'Scaling the platform: breadth at velocity',
        period: 'Aug 2025 – Present',
        current: true,
        bullets: [
          {
            lead: 'Scaled the platform company-wide',
            detail: 'Grew the foundation into a unified ERP spanning every division, deploying 15+ production systems on Microsoft Azure and giving the business a single, extensible source of truth.',
          },
          {
            lead: 'Generative AI & LLMOps',
            detail: 'Delivered an LLM-powered payroll assistant with prompt caching and multi-tool orchestration, plus a privacy-first, multi-agent recruitment pipeline with automated candidate scoring.',
          },
          {
            lead: 'Applied ML & computer vision',
            detail: 'Engineered a PCB-defect detection system (RANSAC, DETR, DINOv3, SAM2), LayoutLM-based document intelligence, and Times-FM demand forecasting.',
          },
          {
            lead: 'Self-serve data & analytics',
            detail: 'Built natural-language-to-SQL graph inference and 100+ live executive dashboards, surfacing organisation-wide insight on demand.',
          },
          {
            lead: 'Paperless manufacturing initiative',
            detail: 'Identified the opportunity and delivered end-to-end a production system that digitises and logs every manufacturing step, reducing paper usage by 80% and advancing the company’s transition to environmentally friendly, paperless operations.',
          },
          {
            lead: 'Backend & cloud infrastructure',
            detail: 'Architected the backend serverless Azure Functions (114+ endpoints), integrating three legacy on-premise ERP systems over an encrypted VPN, owning DevOps and MLOps throughout.',
          },
          {
            lead: 'Cloud architecture & FinOps',
            detail: 'Designed the complete Azure cloud architecture from the ground up, creating and managing resource groups across environments and owning FinOps cost governance to keep spend predictable as the platform scaled.',
          },
          {
            lead: 'CI/CD & developer experience',
            detail: 'Set up the company’s GitHub organisation, repositories, and GitHub Actions workflows, and standardised local quality gates, ESLint, unit tests, and Cypress E2E, behind automated build, test, and deploy pipelines.',
          },
          {
            lead: 'Observability & reliability',
            detail: 'Instrumented distributed tracing, monitoring, and alerting across production systems, running ongoing performance evaluations, bug fixes, and improvements to keep the platform fast and dependable.',
          },
          {
            lead: 'Query performance optimisation',
            detail: 'Profiled the report-generation workflow to isolate its bottlenecks and re-engineered the underlying query structures, cutting execution time from 55 seconds to 3.4 seconds, a 16× improvement.',
          },
        ],
        stack: ['LLMOps', 'Multi-Agent AI', 'NL-to-SQL', 'Computer Vision', 'Forecasting', 'Azure DevOps', 'CI/CD', 'Observability', 'FinOps', '114+ Endpoints'],
      },
      {
        title: 'Software Application Engineer',
        tagline: 'Intern',
        phase: 'Laying the 0→1 foundation',
        period: 'Feb 2025 – Jul 2025',
        current: false,
        bullets: [
          {
            lead: 'Established the software function 0→1',
            detail: 'Joined as the first software engineer and set up the company’s entire technical foundation, translating operational needs into a delivery roadmap.',
          },
          {
            lead: 'Discovery & requirements',
            detail: 'Partnered with stakeholders across three business divisions to map manual workflows and convert user requirements into well-defined deliverables, tracked end-to-end in ClickUp.',
          },
          {
            lead: 'Stack & architecture',
            detail: 'Selected the full technology stack and designed the relational database schema underpinning the platform.',
          },
          {
            lead: 'Foundational product',
            detail: 'Delivered the public company website and the first ERP modules and analytics dashboards on an Angular 19 SSR frontend and Python REST API.',
          },
          {
            lead: 'Reusable delivery pipeline',
            detail: 'Standardised a secure path from database to API to UI, with MSAL/JWT authentication, RBAC, CI/CD, and automated testing at 98% coverage, enabling rapid delivery of every feature that followed.',
          },
        ],
        stack: ['Tech-Stack 0→1', 'Angular 19 SSR', 'Python Flask', 'DB Schema Design', 'CI/CD Pipeline', 'Dashboards'],
      },
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
      '"MSc thesis, in collaboration with Amazon: measuring and mitigating how code-based LLMs memorize their training data, and the privacy and copyright risks it creates."',
    bullets: [
      {
        lead: 'Research question',
        detail: 'Investigated memorization in code-based large language models, the tendency to reproduce training data verbatim, which drives privacy, PII-leakage, and copyright risk in AI code generation. Awarded a distinction (82%).',
      },
      {
        lead: 'Cross-architecture study',
        detail: 'Evaluated all three model families, encoder-only, decoder-only, and encoder-decoder (CodeBERT, CodeGPT, CodeT5), on the CodeSearchNet dataset across four programming languages (Python, Java, JavaScript, Ruby), processing 30,000 samples per language.',
      },
      {
        lead: 'Novel evaluation methodology',
        detail: 'Designed two data-extraction attacks (masked-token prediction and prefix–suffix generation) and proposed an extended CodeBLEU metric with custom privacy components that detect exact reproduction of variable names, values, string literals, and comments via AST parsing.',
      },
      {
        lead: 'Key findings',
        detail: 'Showed that identifiers and string literals are the most memorized tokens (up to 79.3% exact match) and that verbose languages such as Java memorize more than concise ones like Python; 8-bit quantization consistently reduced exact memorization while preserving code quality.',
      },
      {
        lead: 'Few-Shot & prompt tuning',
        detail: 'Analysed how Few-Shot Learning shifts the balance between memorization and generalisation, uncovering non-monotonic, context-dependent effects where more examples do not always help.',
      },
    ],
    pillars: [
      { label: 'Research Focus', techs: 'LLM Memorization · Privacy · Copyright' },
      { label: 'Models & Data', techs: 'CodeBERT · CodeGPT · CodeT5 · CodeSearchNet' },
      { label: 'Methods', techs: 'MLM & NTP Attacks · Extended CodeBLEU · AST' },
      { label: 'Analysis', techs: '8-bit Quantization · Few-Shot Learning' },
    ],
  },
]

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

// Technical concepts to emphasise (sky). Metrics are auto-detected (emerald).
const TECH_TERMS = [
  'natural-language-to-SQL graph inference', 'natural-language-to-SQL',
  'multi-agent recruitment pipeline', 'LLM-powered payroll assistant',
  'serverless Azure Functions', 'Azure Functions', 'relational database schema',
  'PCB-defect detection', 'prompt caching', 'multi-tool orchestration',
  'demand forecasting', 'document intelligence', 'graph inference',
  'Angular 19 SSR', 'Python REST API', 'encrypted VPN', 'end-to-end CI/CD',
  'MSAL/JWT', 'CI/CD', 'DevOps', 'MLOps', 'RBAC', 'RANSAC', 'DETR', 'DINOv3',
  'SAM2', 'LayoutLM', 'Times-FM', 'ClickUp',
  // Platform / DevOps / infra
  'Azure cloud architecture', 'GitHub Actions', 'resource groups', 'FinOps',
  'Cypress E2E', 'Cypress', 'ESLint', 'unit tests', 'distributed tracing',
  'observability',
  // Thesis / research
  'code-based large language models', 'extended CodeBLEU', 'CodeBLEU',
  'CodeSearchNet', 'CodeBERT', 'CodeGPT', 'CodeT5', '8-bit quantization',
  'quantization', 'Few-Shot Learning', 'prompt tuning', 'AST parsing',
  'encoder-decoder', 'encoder-only', 'decoder-only', 'data-extraction attacks',
  'masked-token', 'membership-inference',
]

const METRIC_RE = /\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?\s?seconds|\d+(?:\.\d+)?\+|\d+%|\d+×/

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

const HIGHLIGHT_RE = new RegExp(
  '(' +
    [
      METRIC_RE.source,
      ...[...TECH_TERMS].sort((a, b) => b.length - a.length).map(escapeRe),
    ].join('|') +
    ')',
  'g',
)

const METRIC_TEST = new RegExp('^(?:' + METRIC_RE.source + ')$')
const TECH_SET = new Set(TECH_TERMS)

function HighlightedDetail({ detail }: { detail: string }) {
  const parts = detail.split(HIGHLIGHT_RE)
  return (
    <>
      {parts.map((part, i) => {
        if (METRIC_TEST.test(part)) {
          return <span key={i} className="text-emerald-400 font-medium">{part}</span>
        }
        if (TECH_SET.has(part)) {
          return <span key={i} className="text-sky-400 font-medium">{part}</span>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function BulletList({ bullets, accentRgb }: { bullets: Bullet[]; accentRgb: string }) {
  return (
    <ul className="flex flex-col gap-3.5">
      {bullets.map((b) => (
        <li key={b.lead} className="flex gap-3">
          <span
            className="mt-[10px] w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ background: `rgb(${accentRgb})`, boxShadow: `0 0 8px rgba(${accentRgb},0.5)` }}
          />
          <p className="text-[0.95rem] leading-[1.7] font-light text-p-text-3">
            <span className="text-p-text font-medium">{b.lead}.</span>{' '}
            <HighlightedDetail detail={b.detail} />
          </p>
        </li>
      ))}
    </ul>
  )
}

function RoleTimeline({ roles, accentRgb }: { roles: Role[]; accentRgb: string }) {
  return (
    <div className="relative py-8">
      {/* Vertical connecting line */}
      <div
        className="absolute left-[6px] top-4 bottom-6 w-px"
        style={{ background: `linear-gradient(to bottom, rgba(${accentRgb},0.5), var(--p-border-subtle, rgba(120,120,120,0.15)) 55%, transparent)` }}
      />

      <div className="flex flex-col gap-14">
        {roles.map((r) => (
          <div key={r.tagline ?? r.title} className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 lg:gap-16">

            {/* Left: dot + role heading + description */}
            <div className="relative pl-8">
              {/* Timeline dot */}
              <span
                className={`absolute left-0 top-[7px] w-3 h-3 rounded-full ${r.current ? 'animate-pulse' : ''}`}
                style={{
                  background: r.current ? '#34d399' : `rgb(${accentRgb})`,
                  boxShadow: r.current
                    ? '0 0 0 4px rgba(52,211,153,0.12), 0 0 12px rgba(52,211,153,0.55)'
                    : `0 0 0 4px rgba(${accentRgb},0.10), 0 0 10px rgba(${accentRgb},0.45)`,
                }}
              />

              {/* Role title + tag */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h4
                  className="text-2xl font-serif italic font-semibold text-p-text leading-tight"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {r.title}
                </h4>
                {r.tagline && (
                  <span
                    className="text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border"
                    style={{
                      borderColor: `rgba(${accentRgb},0.3)`,
                      color: `rgb(${accentRgb})`,
                      background: `rgba(${accentRgb},0.06)`,
                    }}
                  >
                    {r.tagline}
                  </span>
                )}
              </div>

              {/* Phase subtitle */}
              {r.phase && (
                <p
                  className="text-sm font-serif italic text-p-text-4 mt-1.5"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {r.phase}
                </p>
              )}

              {/* Period + current */}
              <div className="flex items-center gap-3 mt-1.5 mb-5">
                <span className="font-mono text-xs text-p-text-5 tracking-wider">{r.period}</span>
                {r.current && (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>

              {/* Bullets — bold lead (glance) + detail (nuance/metrics) */}
              <BulletList bullets={r.bullets} accentRgb={accentRgb} />
            </div>

            {/* Right: stack chips */}
            <div>
              <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-4">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {r.stack.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono text-p-text-3 px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `rgba(${accentRgb},0.2)`, background: `rgba(${accentRgb},0.05)` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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
            02 / Experience
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

              {/* ── Body: role timeline (ZOT) OR description + pillars (others) ── */}
              {exp.roles ? (
                <RoleTimeline roles={exp.roles} accentRgb={exp.accentRgb} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 lg:gap-16 py-8">

                  {/* Left: bullets (research) or description paragraph */}
                  {exp.bullets ? (
                    <BulletList bullets={exp.bullets} accentRgb={exp.accentRgb} />
                  ) : (
                    <DescriptionText chunks={exp.description ?? []} />
                  )}

                  {/* Right: tech pillars — no container */}
                  <div>
                    <p className="font-mono text-xs text-p-text-5 tracking-[0.3em] uppercase mb-5">
                      Tech Pillars
                    </p>
                    <div className="flex flex-col">
                      {(exp.pillars ?? []).map((pillar, pi) => (
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
                          {pi < (exp.pillars ?? []).length - 1 && <div className="h-px bg-p-border-subtle" />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

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
