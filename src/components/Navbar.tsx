import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { navLinks, profile } from '@/data/profile'
import { MagneticButton } from './MagneticButton'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-panel shadow-[0_1px_0_0_var(--color-line)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-12">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight text-ink-100" data-cursor="pointer">
          J<span className="text-signal">.</span>Muqthar
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor="pointer"
                className={`signal-underline pb-1 font-mono text-xs uppercase tracking-widest transition-colors ${
                  active === link.href ? 'text-signal' : 'text-ink-300 hover:text-ink-100'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* <div className="hidden md:block">
          <MagneticButton as="a" href={profile.resumeUrl} variant="ghost" className="px-4! py-2! text-xs!">
            Resume
          </MagneticButton>
        </div> */}

        <button
          className="text-ink-100 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <HiX size={26} /> : <HiMenu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="glass-panel overflow-hidden md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-mono text-sm uppercase tracking-widest text-ink-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {/* <li className="pt-2">
                <a href={profile.resumeUrl} className="block py-3 font-mono text-sm uppercase tracking-widest text-signal">
                  Download Resume
                </a>
              </li> */}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
