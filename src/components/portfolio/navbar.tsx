'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div
        className={cn(
          'flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500',
          scrolled
            ? 'bg-black/85 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/60'
            : 'bg-white/5 backdrop-blur-md border-white/8'
        )}
      >
        {/* Serif logo mark */}
        <a
          href="#"
          className="font-serif italic text-white font-semibold text-lg px-4 py-1 rounded-full bg-white/10 mr-1 leading-none"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          VG
        </a>

        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-neutral-400 hover:text-white text-sm px-4 py-1.5 rounded-full hover:bg-white/8 transition-all duration-200 font-light tracking-wide"
          >
            {link.label}
          </a>
        ))}

        <a
          href="mailto:vaikunthgc@gmail.com"
          className="ml-1 text-sm px-5 py-1.5 rounded-full bg-white text-black font-medium hover:bg-neutral-100 transition-colors tracking-wide"
        >
          Hire Me
        </a>
      </div>
    </motion.div>
  )
}
