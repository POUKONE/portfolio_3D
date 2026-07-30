import { useState } from 'react'
import { Html } from '@react-three/drei'
import { GlowRing } from './GlowRing'

type GoalProps = {
  position: [number, number, number]
  rotation?: [number, number, number]
  onClick?: () => void
  hoverLabel?: string
}

const POST_W = 6
const POST_H = 2.4
const POST_R = 0.09

export function Goal({ position, rotation = [0, 0, 0], onClick, hoverLabel }: GoalProps) {
  const [hovered, setHovered] = useState(false)
  const interactive = typeof onClick === 'function'

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={
        interactive
          ? (e) => {
              e.stopPropagation()
              setHovered(false)
              onClick?.()
            }
          : undefined
      }
      onPointerOver={
        interactive
          ? (e) => {
              e.stopPropagation()
              setHovered(true)
            }
          : undefined
      }
      onPointerOut={interactive ? () => setHovered(false) : undefined}
    >
      {interactive && <GlowRing radius={POST_W / 2 + 0.6} color="#ffd447" position={[0, 0.02, 0]} />}
      {interactive && hovered && hoverLabel && (
        <Html position={[0, POST_H + 0.6, 0]} center distanceFactor={14} occlude>
          <div className="hotspot-label">{hoverLabel}</div>
        </Html>
      )}
      <mesh castShadow position={[-POST_W / 2, POST_H / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_H, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh castShadow position={[POST_W / 2, POST_H / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_H, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh castShadow position={[0, POST_H, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[POST_R, POST_R, POST_W, 12]} />
        <meshStandardMaterial color="white" />
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
    </group>
  )
}
