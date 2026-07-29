import { useRef, useState } from 'react'
import type { Group } from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { GlowRing } from './GlowRing'

type GoalProps = {
  position: [number, number, number]
  rotation?: [number, number, number]
  onClick: () => void
  label: string
}

const POST_W = 6
const POST_H = 2.4
const POST_R = 0.09

export function Goal({ position, rotation = [0, 0, 0], onClick, label }: GoalProps) {
  const groupRef = useRef<Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return
    const pulse = hovered ? 1 + Math.sin(state.clock.elapsedTime * 6) * 0.02 : 1
    groupRef.current.scale.setScalar(pulse)
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
    >
      <GlowRing radius={POST_W / 2 + 0.6} color="#8fcf9e" position={[0, 0.03, 1.4]} />

      <mesh castShadow position={[-POST_W / 2, POST_H / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_H, 12]} />
        <meshStandardMaterial color={hovered ? '#ffd166' : 'white'} />
      </mesh>
      <mesh castShadow position={[POST_W / 2, POST_H / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_H, 12]} />
        <meshStandardMaterial color={hovered ? '#ffd166' : 'white'} />
      </mesh>
      <mesh castShadow position={[0, POST_H, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_W, 12]} />
        <meshStandardMaterial color={hovered ? '#ffd166' : 'white'} />
      </mesh>
      {/* simple net (back plane, semi-transparent) */}
      <mesh position={[0, POST_H / 2, -0.9]}>
        <planeGeometry args={[POST_W, POST_H, 8, 6]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.35} />
      </mesh>
      <mesh position={[0, POST_H / 2, -0.02]} rotation={[Math.PI / 2.6, 0, 0]}>
        <planeGeometry args={[POST_W, 1.1, 8, 4]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.3} />
      </mesh>

      {hovered && (
        <Html position={[0, POST_H + 0.6, 0]} center distanceFactor={12} occlude>
          <div className="hotspot-label">{label}</div>
        </Html>
      )}
    </group>
  )
}
