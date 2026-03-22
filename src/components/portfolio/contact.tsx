'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="relative py-40 px-6 bg-black overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(6,182,212,0.05),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_30%_60%,rgba(139,92,246,0.04),transparent)] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs text-neutral-600 tracking-[0.3em] uppercase mb-8">
            06 — Contact
          </p>
        </motion.div>

        {/* Large editorial heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-[clamp(3rem,8vw,7rem)] font-serif italic font-semibold text-white leading-[0.9] mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          Let&apos;s build
        </motion.h2>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          className="text-[clamp(3rem,8vw,7rem)] font-serif italic font-semibold leading-[0.9] mb-12"
          style={{
            fontFamily: 'var(--font-cormorant)',
            background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #c084fc 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          something extraordinary.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="text-neutral-500 text-base font-light max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Whether it&apos;s a research collaboration, a full-time role, or an ambitious
          AI project — I&apos;m always open to a conversation.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="mailto:vaikunthgc@gmail.com"
            className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-all duration-300 text-sm tracking-wide"
          >
            <span>vaikunthgc@gmail.com</span>
            <span className="text-neutral-500 group-hover:translate-x-1 transition-transform">→</span>
          </a>
          <a
            href="tel:+447407446796"
            className="px-8 py-4 rounded-full border border-white/15 text-neutral-400 hover:text-white hover:border-white/30 transition-all duration-300 text-sm font-light tracking-wide"
          >
            +44 7407 446796
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex items-center justify-center gap-6"
        >
          <div className="h-px w-16 bg-white/10" />
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/vaikunth-guruswamy' },
            { label: 'GitHub', href: 'https://github.com/vaikunthgc' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-600 hover:text-white font-mono tracking-wider transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <div className="h-px w-16 bg-white/10" />
        </motion.div>
      </div>
    </section>
  )
}
