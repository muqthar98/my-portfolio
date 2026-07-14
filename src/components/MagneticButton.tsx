import { useRef, type ComponentType, type ElementType, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  as?: ElementType
  href?: string
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'ghost'
  type?: 'button' | 'submit'
  disabled?: boolean
}

export function MagneticButton({
  children,
  as: Tag = 'button',
  href,
  onClick,
  className,
  variant = 'primary',
  type = 'button',
  disabled,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 14 })
  const springY = useSpring(y, { stiffness: 200, damping: 14 })

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    x.set(relX * 0.35)
    y.set(relY * 0.35)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  // Cast to a permissive component type — Tag is chosen at the call site
  // ('button' | 'a') and passed a matching prop set, so runtime is safe.
  const Component = Tag as ComponentType<Record<string, unknown>>

  const base =
    'relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium font-mono tracking-wide transition-colors duration-300 focus-visible:outline-2'
  const styles =
    variant === 'primary'
      ? 'bg-signal text-void hover:bg-ion'
      : 'border border-line text-ink-100 hover:border-signal hover:text-signal'

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
      data-cursor="pointer"
    >
      <Component
        ref={ref}
        href={href}
        onClick={onClick}
        type={Tag === 'button' ? type : undefined}
        disabled={disabled}
        className={cn(base, styles, disabled && 'opacity-50 cursor-not-allowed', className)}
      >
        {children}
      </Component>
    </motion.div>
  )
}
