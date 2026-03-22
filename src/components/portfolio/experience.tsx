'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'


const amazonTags = ['LLMs', 'CodeBLEU', 'Few-Shot Learning', '8-bit Quantization', 'NLP', 'Python', 'Privacy AI']
const zotTags = ['Angular 19', 'Python', 'TypeScript', 'Azure', 'Azure Functions', '.NET', 'Docker', 'CI/CD', 'DevOps', 'LLMOps', 'AI Integration', 'SSR/PWA', 'PostgreSQL', 'RBAC', 'MSAL']

export function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="experience" className="relative py-32 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-4">
            02 — Experience
          </p>
          <h2
            className="text-5xl md:text-6xl font-serif italic font-semibold text-white mb-16 leading-tight"
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
        </motion.div>

        <div className="flex flex-col gap-6">

          {/* ZOT card — current role */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_30%_50%,rgba(59,130,246,0.06),transparent)] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex flex-col gap-2">
                {/* ZOT wordmark */}
                <div className="flex items-center gap-3 mb-2">
                  <a href="https://www.zot.co.uk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden hover:border-white/20 transition-colors flex-shrink-0">
                    <img src="/logo_zot.ico" alt="ZOT" className="w-7 h-7 object-contain" />
                  </a>
                  <div>
                    <a href="https://www.zot.co.uk/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5">
                      <p
                        className="text-2xl font-serif italic font-semibold text-white group-hover:text-neutral-300 transition-colors"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        ZOT
                      </p>
                      <span className="text-neutral-600 text-xs group-hover:text-neutral-400 transition-colors">↗</span>
                    </a>
                    <p className="text-xs font-mono text-neutral-600 tracking-wide">zot.co.uk · PCB & Precision Manufacturing, United Kingdom</p>
                  </div>
                </div>
                <p className="text-neutral-300 font-light text-base">
                  Full-Stack Software Engineer · End-to-End Ownership
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <span className="inline-block font-mono text-xs text-neutral-500 border border-white/10 rounded-full px-4 py-1.5 tracking-wider">
                  Feb 2025 – Present
                </span>
                <span className="inline-block font-mono text-xs text-emerald-500/70 border border-emerald-500/20 rounded-full px-4 py-1.5 tracking-wider">
                  Current Role
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed text-base mb-6 max-w-3xl font-light">
              Responsible for designing, building, and deploying a production-grade
              platform — a public customer website with{' '}
              <span
                className="text-white font-serif italic"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Angular 19 SSR & PWA
              </span>
              {' '}and a comprehensive internal ERP — backed by a{' '}
              <span
                className="text-white font-serif italic"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                Python serverless backend on Azure Functions
              </span>
              . Provisioned the full Azure cloud infrastructure: VNet, Front Door CDN,
              Private Endpoints, and Application Insights. Engineered{' '}
              <span className="text-sky-400 font-medium">AI-native features</span>{' '}
              across the platform — a GDPR-compliant AI-powered ATS, natural language to SQL chart recommendations,
              and Azure AI Foundry integrations for predictions and intelligent monitoring. Built a robust{' '}
              <span
                className="text-white font-serif italic"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                payroll engine
              </span>
              {' '}and dynamic dashboards with AI-driven insights, end-to-end data pipelines covering extraction,
              cleaning, preprocessing and automated visualization ideation. Implemented secure{' '}
              <span className="text-sky-400 font-medium">RBAC</span>{' '}
              across all modules, secured with MSAL SSO, JWT, and AES-encrypted API payloads.
            </p>

            {/* Key achievement */}
            <div className="border-l-2 border-[#3b82f6]/40 pl-4 mb-8">
              <p className="text-sm font-mono text-neutral-500 tracking-wide">Key achievement</p>
              <p
                className="text-xl font-serif italic text-white mt-1"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {"\u201cOwned the full delivery of a production ERP platform end-to-end \u2014 full-stack, cloud-native, and AI-integrated.\u201d"}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {zotTags.map(tag => (
                <span
                  key={tag}
                  className="text-xs border border-white/10 text-neutral-500 px-3 py-1 rounded-full font-mono tracking-wide hover:border-white/20 hover:text-neutral-400 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Amazon card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-12 overflow-hidden"
          >
            {/* Subtle glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(251,146,60,0.05),transparent)] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex flex-col gap-2">
                {/* Amazon wordmark */}
                <div className="flex items-center gap-3 mb-2">
                  <a href="https://www.amazon.co.uk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-[#FF9900]/10 border border-[#FF9900]/20 flex items-center justify-center overflow-hidden hover:border-[#FF9900]/40 transition-colors flex-shrink-0">
                    <img src="/amazon.ico" alt="Amazon" className="w-7 h-7 object-contain" />
                  </a>
                  <div>
                    <a href="https://www.amazon.co.uk/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-1.5">
                      <p
                        className="text-2xl font-serif italic font-semibold text-white group-hover:text-neutral-300 transition-colors"
                        style={{ fontFamily: 'var(--font-cormorant)' }}
                      >
                        Amazon
                      </p>
                      <span className="text-neutral-600 text-xs group-hover:text-neutral-400 transition-colors">↗</span>
                    </a>
                    <p className="text-xs font-mono text-neutral-600 tracking-wide">Edinburgh, United Kingdom</p>
                  </div>
                </div>
                <p className="text-neutral-300 font-light text-base">
                  Industry Collaborated Dissertation · MSc Research Partnership
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <span className="inline-block font-mono text-xs text-neutral-500 border border-white/10 rounded-full px-4 py-1.5 tracking-wider">
                  Mar 2024 – Aug 2024
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed text-base mb-6 max-w-3xl font-light">
              Developed novel methods to analyze copyright issues in various{' '}
              <span
                className="text-white font-serif italic"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                code-based Large Language Models
              </span>
              . Extended the CodeBLEU metric and applied Few-Shot Learning
              with 8-bit quantization techniques, achieving a{' '}
              <span className="text-emerald-400 font-medium">17% reduction in memorization</span>{' '}
              while maintaining model accuracy — contributing to enhanced privacy and robustness
              in AI code generation.
            </p>

            {/* Key achievement */}
            <div className="border-l-2 border-[#FF9900]/40 pl-4 mb-8">
              <p className="text-sm font-mono text-neutral-500 tracking-wide">Key achievement</p>
              <p
                className="text-xl font-serif italic text-white mt-1"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {"\u201cReduced LLM memorization by 17% via 8-bit quantization without sacrificing accuracy.\u201d"}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {amazonTags.map(tag => (
                <span
                  key={tag}
                  className="text-xs border border-white/10 text-neutral-500 px-3 py-1 rounded-full font-mono tracking-wide hover:border-white/20 hover:text-neutral-400 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
