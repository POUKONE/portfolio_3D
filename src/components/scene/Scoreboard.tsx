import { useState } from 'react'
import { Text, Html } from '@react-three/drei'
import { GlowRing } from './GlowRing'

export function Scoreboard({
  position,
  rotation = [0, 0, 0],
  standHeight,
  onClick,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  standHeight: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const legLength = standHeight - 1.4
  const legY = -1.5 - legLength / 2

  return (
    <group
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
      <GlowRing radius={2.6} color="#ffd166" position={[0, -standHeight + 0.03, 0]} />

      <mesh castShadow position={[-2.2, legY, 0]}>
        <cylinderGeometry args={[0.16, 0.16, legLength, 10]} />
        <meshStandardMaterial color="#2a2e36" />
      </mesh>
      <mesh castShadow position={[2.2, legY, 0]}>
        <cylinderGeometry args={[0.16, 0.16, legLength, 10]} />
        <meshStandardMaterial color="#2a2e36" />
      </mesh>

      <mesh castShadow>
        <boxGeometry args={[6, 3, 0.4]} />
        <meshStandardMaterial color={hovered ? '#1f7a34' : '#111417'} />
      </mesh>
      <Text
        position={[0, 0.6, 0.25]}
        fontSize={0.42}
        letterSpacing={0.02}
        color="#ffd166"
        anchorX="center"
        anchorY="middle"
      >
        IBRAPKN FC
      </Text>
      <Text
        position={[0, -0.4, 0.25]}
        fontSize={0.28}
        color="#8fcf9e"
        anchorX="center"
        anchorY="middle"
      >
        0 : 0 — click to kickoff
      </Text>
      {hovered && (
        <Html position={[0, 2.1, 0]} center distanceFactor={12} occlude>
          <div className="hotspot-label">About Me</div>
        </Html>
      )}
    </group>
  )
}
