import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { StarField } from './StarField'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

function ScrollDrift() {
  const groupRef = useRef<THREE.Group>(null)
  const scrollRef = useRef(0)

  useFrame(() => {
    scrollRef.current = window.scrollY
    if (!groupRef.current) return
    const progress = scrollRef.current / (document.body.scrollHeight - window.innerHeight || 1)
    groupRef.current.rotation.z = progress * 0.4
    groupRef.current.position.y = progress * -4
  })

  return (
    <group ref={groupRef}>
      <StarField count={2200} radius={55} />
    </group>
  )
}

/**
 * Sits behind every section as a fixed backdrop: a slow-drifting star field
 * whose rotation and depth respond to overall scroll position, standing in
 * for the "infinite galaxy" environment without re-mounting a heavy scene
 * per-section.
 */
export function AmbientBackground() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(111,231,255,0.08), transparent), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(255,180,84,0.06), transparent)',
        }}
      />
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        camera={{ position: [0, 0, 12], fov: 60 }}
      >
        <Suspense fallback={null}>
          {reducedMotion ? <StarField count={1200} radius={55} /> : <ScrollDrift />}
        </Suspense>
      </Canvas>
    </div>
  )
}
