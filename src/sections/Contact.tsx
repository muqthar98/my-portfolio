import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { SectionHeading } from '@/components/SectionHeading'
import { MagneticButton } from '@/components/MagneticButton'
import { useContactForm } from '@/hooks/useContactForm'
import { profile, socials } from '@/data/profile'

const fields = [
  { key: 'name', label: 'Name', type: 'text', placeholder: 'Jordan Lee' },
  { key: 'email', label: 'Email', type: 'email', placeholder: 'jordan@company.com' },
  { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Project inquiry' },
] as const

export function Contact() {
  const { values, errors, status, errorMessage, update, submit } = useContactForm()

  return (
    <section id="contact" className="relative px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="T+06 · Contact"
          title="Have a build in mind? Open a channel."
          description="I read every message myself, usually within a business day."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.3fr]">
          <div className="space-y-8">
            <div className="glass-panel rounded-2xl p-6">
              <span className="telemetry-label">Direct</span>
              <a href={`mailto:${profile.email}`} className="mt-2 flex items-center gap-2 font-display text-lg text-ink-100 hover:text-signal">
                <FiMail /> {profile.email}
              </a>
            </div>
            <div className="glass-panel rounded-2xl p-6">
              <span className="telemetry-label">Location</span>
              <p className="mt-2 flex items-center gap-2 font-display text-lg text-ink-100">
                <FiMapPin /> {profile.location}
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6">
              <span className="telemetry-label">Elsewhere</span>
              <div className="mt-3 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-line px-3 py-1.5 font-mono text-xs text-ink-300 hover:border-signal hover:text-signal"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} noValidate className="glass-panel relative overflow-hidden rounded-2xl p-8">
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-hull/95 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-signal text-void">
                    <FiCheck size={22} />
                  </span>
                  <p className="font-display text-xl text-ink-100">Message sent</p>
                  <p className="text-sm text-ink-300">Thanks for reaching out — I'll reply soon.</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.key} className={field.key === 'subject' ? 'sm:col-span-2' : ''}>
                  <label htmlFor={field.key} className="telemetry-label">
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type={field.type}
                    value={values[field.key]}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    aria-invalid={Boolean(errors[field.key])}
                    aria-describedby={errors[field.key] ? `${field.key}-error` : undefined}
                    className="mt-2 w-full rounded-lg border border-line bg-hull-2 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus-visible:border-signal"
                  />
                  {errors[field.key] && (
                    <p id={`${field.key}-error`} className="mt-1 text-xs text-flare">
                      {errors[field.key]}
                    </p>
                  )}
                </div>
              ))}

              <div className="sm:col-span-2">
                <label htmlFor="message" className="telemetry-label">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Tell me a bit about the project and timeline..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className="mt-2 w-full resize-none rounded-lg border border-line bg-hull-2 px-4 py-3 text-sm text-ink-100 placeholder:text-ink-500 focus-visible:border-signal"
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-flare">
                    {errors.message}
                  </p>
                )}
              </div>
            </div>

            {status === 'error' && <p className="mt-4 text-sm text-flare">{errorMessage}</p>}

            <div className="mt-6">
              <MagneticButton type="submit" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend /> Send message
                  </>
                )}
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
