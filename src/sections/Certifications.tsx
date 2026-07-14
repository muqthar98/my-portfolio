import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiExternalLink, FiX } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading'
import { certifications } from '@/data/career'
import { staggerContainer, fadeUp } from '@/animations/variants'
import type { Certification } from '@/types'

export function Certifications() {
  const [active, setActive] = useState<Certification | null>(null)

  return (
    <section id="certifications" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="T+05 · Certifications" title="Credentials, verified." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px' }}
          variants={staggerContainer}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <motion.button
              key={cert.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              onClick={() => setActive(cert)}
              data-cursor="pointer"
              className="glass-panel flex flex-col items-start rounded-2xl p-6 text-left"
            >
              <FiAward className="text-2xl text-signal" />
              <h3 className="mt-4 font-display text-lg text-ink-100">{cert.name}</h3>
              <p className="mt-1 text-sm text-ink-300">{cert.issuer}</p>
              <span className="mt-4 telemetry-label">Issued {cert.date}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 px-6 backdrop-blur-sm"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-md rounded-2xl p-8"
            >
              <div className="flex items-start justify-between">
                <FiAward className="text-3xl text-signal" />
                <button onClick={() => setActive(null)} aria-label="Close" className="text-ink-300 hover:text-signal">
                  <FiX size={20} />
                </button>
              </div>
              <h3 className="mt-4 font-display text-xl text-ink-100">{active.name}</h3>
              <p className="mt-1 text-ion">{active.issuer}</p>
              <dl className="mt-6 space-y-2 font-mono text-xs text-ink-300">
                <div className="flex justify-between border-b border-line pb-2">
                  <dt className="uppercase tracking-widest text-ink-500">Issued</dt>
                  <dd>{active.date}</dd>
                </div>
                <div className="flex justify-between pb-2">
                  <dt className="uppercase tracking-widest text-ink-500">Credential ID</dt>
                  <dd>{active.credentialId}</dd>
                </div>
              </dl>
              <a
                href={active.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-signal py-2.5 font-mono text-xs uppercase tracking-widest text-void hover:bg-ion"
              >
                <FiExternalLink /> Verify credential
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
