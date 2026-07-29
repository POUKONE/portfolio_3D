import { useRef } from 'react'
import type { Group } from 'three'
import { useFrame } from '@react-three/fiber'

export function Figure({
  position,
  rotationY = 0,
  scale = 1,
  jerseyColor,
  shortsColor,
  sockColor,
  shoeColor = '#1a1a1a',
  skinColor = '#e0ac69',
  hairColor = '#2b2116',
  whistleColor,
}: {
  position: [number, number, number]
  rotationY?: number
  scale?: number
  jerseyColor: string
  shortsColor: string
  sockColor: string
  shoeColor?: string
  skinColor?: string
  hairColor?: string
  whistleColor?: string
}) {
  const groupRef = useRef<Group>(null)
  const phase = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.6 + phase.current) * 0.02
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, rotationY, 0]}>
      <group scale={scale}>
        {/* shoes */}
        <mesh castShadow position={[-0.12, 0.05, 0.02]}>
          <boxGeometry args={[0.13, 0.1, 0.24]} />
          <meshStandardMaterial color={shoeColor} />
        </mesh>
        <mesh castShadow position={[0.12, 0.05, 0.02]}>
          <boxGeometry args={[0.13, 0.1, 0.24]} />
          <meshStandardMaterial color={shoeColor} />
        </mesh>

        {/* socks / legs */}
        <mesh castShadow position={[-0.12, 0.35, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 8]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>
        <mesh castShadow position={[0.12, 0.35, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 0.6, 8]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>

        {/* shorts */}
        <mesh castShadow position={[0, 0.7, 0]}>
          <boxGeometry args={[0.42, 0.3, 0.24]} />
          <meshStandardMaterial color={shortsColor} />
        </mesh>

        {/* jersey */}
        <mesh castShadow position={[0, 1.08, 0]}>
          <boxGeometry args={[0.44, 0.48, 0.26]} />
          <meshStandardMaterial color={jerseyColor} />
        </mesh>

        {/* arms */}
        <mesh castShadow position={[-0.32, 1.08, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.48, 8]} />
          <meshStandardMaterial color={jerseyColor} />
        </mesh>
        <mesh castShadow position={[0.32, 1.08, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.48, 8]} />
          <meshStandardMaterial color={jerseyColor} />
        </mesh>

        {/* head */}
        <mesh castShadow position={[0, 1.47, 0]}>
          <sphereGeometry args={[0.16, 14, 14]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        <mesh position={[0, 1.55, -0.02]}>
          <sphereGeometry args={[0.165, 14, 14, 0, Math.PI * 2, 0, Math.PI / 2.4]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>

        {whistleColor && (
          <mesh position={[0, 1.42, 0.17]}>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial color={whistleColor} />
          </mesh>
        )}
      </group>
    </group>
  )
}
