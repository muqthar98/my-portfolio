import { useMemo, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

const NODES = [
  'React', 'TypeScript', 'Three.js', 'Node.js', 'PostgreSQL',
  'AWS', 'Docker', 'GraphQL', 'Rust', 'Kubernetes',
]

interface NodeDatum {
  name: string
  position: THREE.Vector3
}

function buildNodes(): NodeDatum[] {
  const nodes: NodeDatum[] = []
  const count = NODES.length
  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution — even spacing without look-up tables
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
    const theta = Math.PI * (1 + Math.sqrt(5)) * i
    const r = 4.2
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    nodes.push({ name: NODES[i], position: new THREE.Vector3(x, y, z) })
  }
  return nodes
}

/** Connects each node to its two nearest neighbours to form a constellation. */
function buildEdges(nodes: NodeDatum[]): [number, number][] {
  const edges: [number, number][] = []
  const seen = new Set<string>()
  nodes.forEach((node, i) => {
    const distances = nodes
      .map((other, j) => ({ j, d: node.position.distanceTo(other.position) }))
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    distances.forEach(({ j }) => {
      const key = [i, j].sort((a, b) => a - b).join('-')
      if (!seen.has(key)) {
        seen.add(key)
        edges.push([i, j])
      }
    })
  })
  return edges
}

function Node({ datum, index }: { datum: NodeDatum; index: number }) {
  const ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.position.y = datum.position.y + Math.sin(t * 0.6 + index) * 0.15
    const scale = hovered ? 1.6 : 1
    ref.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.15)
  })

  return (
    <group>
      <mesh
        ref={ref}
        position={datum.position}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial
          color={hovered ? '#ffb454' : '#6fe7ff'}
          emissive={hovered ? '#ffb454' : '#6fe7ff'}
          emissiveIntensity={hovered ? 1.4 : 0.6}
          toneMapped={false}
        />
      </mesh>
      {hovered && (
        <Html position={datum.position} center distanceFactor={8} style={{ pointerEvents: 'none' }}>
          <div className="whitespace-nowrap rounded-md border border-line bg-hull/90 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-ink-100">
            {datum.name}
          </div>
        </Html>
      )}
    </group>
  )
}

interface ConstellationProps {
  mouse: { normalizedX: number; normalizedY: number }
}

export function Constellation({ mouse }: ConstellationProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { viewport } = useThree()
  const nodes = useMemo(buildNodes, [])
  const edges = useMemo(() => buildEdges(nodes), [nodes])
  const isSmall = viewport.width < 6

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.05 + mouse.normalizedX * 0.35
    groupRef.current.rotation.x = mouse.normalizedY * 0.2
  })

  return (
    <group ref={groupRef} scale={isSmall ? 0.75 : 1}>
      {edges.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a].position, nodes[b].position]}
          color="#1e2540"
          lineWidth={1}
          transparent
          opacity={0.9}
        />
      ))}
      {nodes.map((node, i) => (
        <Node key={node.name} datum={node} index={i} />
      ))}
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 4, 6]} intensity={40} color="#ffb454" />
      <pointLight position={[-6, -4, -4]} intensity={30} color="#6fe7ff" />
    </group>
  )
}
