'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { LimelightNav, NavItem } from '@/components/ui/limelight-nav'

const navLinks = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Contact',    href: '#contact' },
]

const mobileNavItems: NavItem[] = [
  {
    id: 'about',
    label: 'About',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    onClick: () => { window.location.href = '#about' },
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
      </svg>
    ),
    onClick: () => { window.location.href = '#experience' },
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    onClick: () => { window.location.href = '#projects' },
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    onClick: () => { window.location.href = '#skills' },
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    onClick: () => { window.location.href = '#contact' },
  },
]

const sectionIds = navLinks.map(l => l.href.replace('#', ''))

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sync limelight with the active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id)
            if (idx !== -1) setActiveIndex(idx)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* ── Desktop top pill nav ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="fixed top-5 left-0 right-0 z-50 hidden md:flex justify-center px-4"
      >
        <div
          className={cn(
            'flex items-center gap-1 px-2 py-2 rounded-full border transition-all duration-500',
            scrolled
              ? 'bg-black/85 backdrop-blur-2xl border-white/10 shadow-2xl shadow-black/60'
              : 'bg-white/5 backdrop-blur-md border-white/8'
          )}
        >
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
        </div>
      </motion.div>

      {/* ── Mobile bottom limelight nav ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-3 pt-2 bg-black"
      >
        <LimelightNav
          items={mobileNavItems}
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
          className="!h-12 rounded-2xl"
          iconContainerClassName="!p-3"
          iconClassName="!w-5 !h-5 text-white"
        />
      </motion.div>
    </>
  )
}
