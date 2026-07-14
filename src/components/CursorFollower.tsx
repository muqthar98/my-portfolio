import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useIsMobile, usePrefersReducedMotion } from '@/hooks/useMediaQuery'

export function CursorFollower() {
  const isMobile = useIsMobile()
  const reducedMotion = usePrefersReducedMotion()
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 })
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 })

  useEffect(() => {
    if (isMobile || reducedMotion) return

    function handleMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target as HTMLElement
      setIsPointer(Boolean(target.closest('a, button, [data-cursor="pointer"]')))
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [isMobile, reducedMotion, visible, x, y])

  if (isMobile || reducedMotion) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ion"
        animate={{
          width: isPointer ? 44 : 18,
          height: isPointer ? 44 : 18,
          backgroundColor: isPointer ? 'rgba(111,231,255,0.15)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      />
    </motion.div>
  )
}
