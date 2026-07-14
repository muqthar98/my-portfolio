import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionHeading } from '@/components/SectionHeading'
import { skillCategories } from '@/data/skills'
import { staggerContainer, fadeUp } from '@/animations/variants'

export function Skills() {
  const [activeId, setActiveId] = useState(skillCategories[0].id)
  const active = skillCategories.find((c) => c.id === activeId)!

  return (
    <section id="skills" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="T+02 · Skills"
          title="An instrument panel, not a buzzword cloud."
          description="Categories reflect how these tools actually get used together on a project, not an alphabetized list."
        />

        <div className="mt-12 flex flex-wrap gap-2">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveId(cat.id)}
              data-cursor="pointer"
              className={`rounded-full border px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                activeId === cat.id
                  ? 'border-signal bg-signal/10 text-signal'
                  : 'border-line text-ink-300 hover:border-ion hover:text-ion'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {active.skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="glass-panel rounded-xl p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-base text-ink-100">{skill.name}</span>
                  <span className="font-mono text-sm text-ion">{skill.level}%</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-hull-2">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-ion to-signal"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
