import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
// @ts-ignore: three package has no local declaration file in this setup
import * as THREE from 'three'

interface StarFieldProps {
  count?: number
  radius?: number
}

/**
 * A single instanced Points cloud standing in for "stars". Uses one draw
 * call regardless of count, and drifts slowly so the background never
 * feels static without costing a real animation budget.
 */
export function StarField({ count = 2600, radius = 60 }: StarFieldProps) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // distribute in a spherical shell so depth reads correctly while scrolling
      const r = radius * (0.35 + Math.random() * 0.65)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count, radius])

  useFrame((state, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.006
    pointsRef.current.rotation.x += delta * 0.002
    const t = state.clock.elapsedTime
    pointsRef.current.position.y = Math.sin(t * 0.08) * 0.6
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#b7bede"
        size={0.09}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  )
}
