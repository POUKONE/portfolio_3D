import { useRef } from 'react'
import type { Mesh, MeshBasicMaterial } from 'three'
import { useFrame } from '@react-three/fiber'

export function GlowRing({
  radius = 1,
  color = '#ffe066',
  position = [0, 0.03, 0],
}: {
  radius?: number
  color?: string
  position?: [number, number, number]
}) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const pulse = 0.5 + Math.sin(state.clock.elapsedTime * 2.2) * 0.5
    meshRef.current.scale.setScalar(1 + pulse * 0.18)
    const material = meshRef.current.material as MeshBasicMaterial
    material.opacity = 0.25 + pulse * 0.45
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <ringGeometry args={[radius * 0.72, radius, 40]} />
      <meshBasicMaterial color={color} transparent opacity={0.4} depthWrite={false} toneMapped={false} />
    </mesh>
  )
}
