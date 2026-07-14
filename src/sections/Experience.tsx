import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { experience } from '@/data/career'
import { fadeUp } from '@/animations/variants'

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="T+04 · Experience"
          title="A flight log, not a resume bullet dump."
        />

        <div className="relative mt-16 border-l border-line pl-8">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute -left-px top-0 h-full w-px bg-linear-to-b from-signal via-ion to-transparent"
          />

          {experience.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-15% 0px' }}
              custom={i}
              variants={fadeUp}
              className="relative mb-16 last:mb-0"
            >
              <span className="absolute -left-9.25 top-1 h-3 w-3 rounded-full border-2 border-signal bg-void" />
              <span className="telemetry-label">
                {entry.start} — {entry.end}
              </span>
              <h3 className="mt-1 font-display text-2xl text-ink-100">{entry.role}</h3>
              <p className="text-ion">{entry.company}</p>

              <ul className="mt-4 space-y-1.5 text-sm text-ink-300">
                {entry.responsibilities.map((r) => (
                  <li key={r} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                    {r}
                  </li>
                ))}
              </ul>

              <ul className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm text-signal">
                {entry.achievements.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-signal" />
                    {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
