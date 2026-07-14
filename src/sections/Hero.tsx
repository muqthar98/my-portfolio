import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/MagneticButton'
import { profile } from '@/data/profile'
import { textReveal } from '@/animations/variants'
import { FiArrowDown, FiDownload } from 'react-icons/fi'

const NAME_CHARS = profile.name.split('')

const HeroScene = lazy(() => import('@/three/HeroScene').then((m) => ({ default: m.HeroScene })))

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24 lg:px-12">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* readability scrim so the 3D scene never fights the type */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-void via-void/60 to-void/10" />

      <div className="relative mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="telemetry-label"
        >
          T+00:00 · Available for select engagements
        </motion.p>

        <h1 className="mt-6 overflow-hidden font-display text-5xl font-semibold leading-[1.02] text-ink-100 sm:text-7xl lg:text-8xl">
          <span className="block overflow-hidden">
            {NAME_CHARS.map((char, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={textReveal}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-3 font-mono text-lg text-ion sm:text-xl"
        >
          {profile.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-6 max-w-xl text-base text-ink-300 sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton as="a" href="#projects" variant="primary">
            View Projects
          </MagneticButton>
          {/* <MagneticButton as="a" href={profile.resumeUrl} variant="ghost">
            <FiDownload /> Download Resume
          </MagneticButton> */}
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        data-cursor="pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ink-500 hover:text-signal"
      >
        <FiArrowDown size={22} />
      </motion.a>
    </section>
  )
}
