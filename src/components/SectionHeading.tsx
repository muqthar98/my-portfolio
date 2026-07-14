import { motion } from 'framer-motion'
import { fadeUp } from '@/animations/variants'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15% 0px' }}
      variants={fadeUp}
      className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      <span className="telemetry-label">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-semibold text-ink-100 sm:text-4xl md:text-5xl">{title}</h2>
      {description && <p className="mt-4 text-base text-ink-300 sm:text-lg">{description}</p>}
    </motion.div>
  )
}
