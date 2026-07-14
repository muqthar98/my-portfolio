import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading'
import { testimonials } from '@/data/career'

const AUTOPLAY_MS = 6000

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setDirection(1)
      setIndex((i) => (i + 1) % testimonials.length)
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused])

  function go(delta: number) {
    setDirection(delta)
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length)
  }

  const current = testimonials[index]

  return (
    <section id="testimonials" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="T+06 · Testimonials" title="What it's like on the other side of the handoff." align="center" />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="glass-panel overflow-hidden rounded-2xl px-8 py-12 sm:px-14">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: 40 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 * direction }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1)
                  else if (info.offset.x > 80) go(-1)
                }}
                className="text-center"
              >
                <p className="font-display text-xl leading-relaxed text-ink-100 sm:text-2xl">
                  &ldquo;{current.feedback}&rdquo;
                </p>
                <div className="mt-8 flex flex-col items-center gap-1">
                  <span className="font-mono text-sm text-signal">{current.name}</span>
                  <span className="telemetry-label">{current.role}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            data-cursor="pointer"
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full border border-line bg-hull p-2 text-ink-300 hover:border-signal hover:text-signal"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            data-cursor="pointer"
            className="absolute right-0 top-1/2 -translate-x-[-1rem] -translate-y-1/2 rounded-full border border-line bg-hull p-2 text-ink-300 hover:border-signal hover:text-signal"
          >
            <FiChevronRight />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => {
                  setDirection(i > index ? 1 : -1)
                  setIndex(i)
                }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-signal' : 'w-1.5 bg-line'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
