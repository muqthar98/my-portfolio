import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei'
import { StarField } from './StarField'
import { Constellation } from './Constellation'
import { useMousePosition } from '@/hooks/useMousePosition'
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery'

function SceneFallback() {
  return null
}

export function HeroScene() {
  const mouse = useMousePosition()
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="absolute inset-0 -z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.8]}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
        camera={{ position: [0, 0, 9.5], fov: 50 }}
      >
        <PerformanceMonitor>
          <AdaptiveDpr pixelated={false} />
          <Suspense fallback={<SceneFallback />}>
            <StarField count={1800} radius={40} />
            {!reducedMotion && <Constellation mouse={mouse} />}
          </Suspense>
        </PerformanceMonitor>
      </Canvas>
    </div>
  )
}
