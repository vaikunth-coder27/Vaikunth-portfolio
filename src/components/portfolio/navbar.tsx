'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LimelightNav, NavItem } from '@/components/ui/limelight-nav'
import { useTheme } from '@/components/theme-provider'

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
  const { theme, toggleTheme } = useTheme()

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
              ? 'dark:bg-black/85 bg-white/90 backdrop-blur-2xl dark:border-white/10 border-black/10 shadow-2xl dark:shadow-black/60 shadow-black/10'
              : 'dark:bg-white/5 bg-black/[0.04] backdrop-blur-md dark:border-white/8 border-black/[0.06]'
          )}
        >
          <a
            href="#"
            className="font-serif italic dark:text-white text-p-text font-semibold text-lg px-4 py-1 rounded-full dark:bg-white/10 bg-black/8 mr-1 leading-none"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            VG
          </a>

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="dark:text-neutral-400 text-p-text-4 dark:hover:text-white hover:text-p-text text-sm px-4 py-1.5 rounded-full dark:hover:bg-white/8 hover:bg-black/[0.06] transition-all duration-200 font-light tracking-wide"
            >
              {link.label}
            </a>
          ))}

          {/* Theme toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.93 }}
            className={cn(
              'relative ml-1 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 overflow-hidden',
              theme === 'dark'
                ? 'border-amber-400/30 bg-amber-400/10 hover:bg-amber-400/20 hover:border-amber-400/50'
                : 'border-indigo-400/40 bg-indigo-400/10 hover:bg-indigo-400/20 hover:border-indigo-400/60'
            )}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === 'dark' ? (
                <motion.span
                  key="sun"
                  initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center"
                >
                  <Sun size={13} className="text-amber-300" strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ opacity: 0, rotate: 45, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-center"
                >
                  <Moon size={13} className="text-indigo-500" strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>

      {/* ── Mobile theme toggle (top-right) ── */}
      <motion.button
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        onClick={toggleTheme}
        className={cn(
          'fixed top-4 right-4 z-50 md:hidden w-9 h-9 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300',
          theme === 'dark'
            ? 'border-amber-400/30 bg-black/60 hover:bg-amber-400/15 hover:border-amber-400/50'
            : 'border-indigo-400/30 bg-white/80 hover:bg-indigo-400/10 hover:border-indigo-400/50'
        )}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.span
              key="sun-m"
              initial={{ opacity: 0, rotate: -30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 30 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Sun size={15} className="text-amber-300" strokeWidth={1.8} />
            </motion.span>
          ) : (
            <motion.span
              key="moon-m"
              initial={{ opacity: 0, rotate: 30 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -30 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <Moon size={15} className="text-indigo-500" strokeWidth={1.8} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ── Mobile bottom limelight nav ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 0.4 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex justify-center pb-3 pt-2 dark:bg-black bg-white/95 backdrop-blur-md border-t dark:border-white/5 border-black/[0.06]"
      >
        <LimelightNav
          items={mobileNavItems}
          activeIndex={activeIndex}
          onTabChange={setActiveIndex}
          className="!h-12 rounded-2xl"
          iconContainerClassName="!p-3"
          iconClassName="!w-5 !h-5"
        />
      </motion.div>
    </>
  )
}
