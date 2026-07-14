import { motion } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { profile, timeline } from '@/data/profile'
import { fadeUp, staggerContainer } from '@/animations/variants'
import { useCountUp } from '@/hooks/useCountUp'

function StatCounter({ label, value }: { label: string; value: number }) {
  const { ref, value: current } = useCountUp(value)
  return (
    <div ref={ref as never} className="glass-panel rounded-2xl p-6">
      <p className="font-display text-4xl font-semibold text-signal sm:text-5xl">{current}+</p>
      <p className="mt-2 telemetry-label">{label}</p>
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="T+01 · About"
          title="Five years of shipping things that hold up under load."
          description={profile.shortBio}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profile.stats.map((stat) => (
            <StatCounter key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={fadeUp}
            className="glass-panel rounded-2xl p-8"
          >
            <span className="telemetry-label">Operating Philosophy</span>
            <p className="mt-4 font-display text-xl text-ink-100 sm:text-2xl">{profile.philosophy}</p>
          </motion.div>

          <motion.ol
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10% 0px' }}
            variants={staggerContainer}
            className="relative border-l border-line pl-8"
          >
            {timeline.map((entry) => (
              <motion.li key={entry.year} variants={fadeUp} className="relative mb-10 last:mb-0">
                <span className="absolute -left-9.25 top-1 h-2.5 w-2.5 rounded-full bg-ion" />
                <span className="telemetry-label">{entry.year}</span>
                <h3 className="mt-1 font-display text-lg text-ink-100">{entry.label}</h3>
                <p className="mt-1 text-sm text-ink-300">{entry.detail}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}
