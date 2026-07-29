import { useMemo } from 'react'
import { Instances, Instance } from '@react-three/drei'
import { PITCH_LENGTH, PITCH_WIDTH } from './Pitch'

const CROWD_COLORS = ['#e63946', '#f1faee', '#457b9d', '#ffb703', '#2f9e44']

function StandBlock({
  position,
  rotation,
  length,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  length: number
}) {
  const seats = useMemo(() => {
    const rows = 4
    const cols = Math.floor(length / 1.1)
    const list: { pos: [number, number, number]; color: string }[] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push({
          pos: [c * 1.1 - (cols * 1.1) / 2, r * 0.55, r * 0.7],
          color: CROWD_COLORS[Math.floor(Math.random() * CROWD_COLORS.length)],
        })
      }
    }
    return list
  }, [length])

  return (
    <group position={position} rotation={rotation}>
      {/* stand base/roof */}
      <mesh position={[0, 1.6, 1.4]} castShadow receiveShadow>
        <boxGeometry args={[length + 1, 0.3, 4]} />
        <meshStandardMaterial color="#3a3f4b" />
      </mesh>
      <Instances limit={seats.length}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial />
        {seats.map((s, i) => (
          <Instance key={i} position={s.pos} color={s.color} />
        ))}
      </Instances>
    </group>
  )
}

function Floodlight({ position, isNight }: { position: [number, number, number]; isNight: boolean }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 5, 0]}>
        <cylinderGeometry args={[0.12, 0.16, 10, 8]} />
        <meshStandardMaterial color="#555b66" />
      </mesh>
      <mesh position={[0, 10, 0]} castShadow>
        <boxGeometry args={[2.2, 1.2, 0.3]} />
        <meshStandardMaterial color="#20242c" />
      </mesh>
      <mesh position={[0, 10, 0.2]}>
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial
          color="#fff7d6"
          emissive="#fff7d6"
          emissiveIntensity={isNight ? 4 : 0}
          toneMapped={false}
        />
      </mesh>
      {isNight && (
        <spotLight
          position={[0, 9.8, 0.5]}
          target-position={[0, 1, 0]}
          angle={0.5}
          penumbra={0.6}
          intensity={260}
          distance={70}
          decay={1.2}
          color="#fff7d6"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0015}
          shadow-camera-near={5}
          shadow-camera-far={70}
        />
      )}
    </group>
  )
}

export function Stadium({ isNight }: { isNight: boolean }) {
  const halfW = PITCH_WIDTH / 2 + 4
  const halfL = PITCH_LENGTH / 2 + 4

  return (
    <group>
      <StandBlock position={[0, 0, -halfL]} rotation={[0, 0, 0]} length={PITCH_WIDTH + 6} />
      <StandBlock position={[0, 0, halfL]} rotation={[0, Math.PI, 0]} length={PITCH_WIDTH + 6} />
      <StandBlock position={[-halfW, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={PITCH_LENGTH + 6} />
      <StandBlock position={[halfW, 0, 0]} rotation={[0, -Math.PI / 2, 0]} length={PITCH_LENGTH + 6} />

      <Floodlight position={[-halfW - 2, 0, -halfL - 2]} isNight={isNight} />
      <Floodlight position={[halfW + 2, 0, -halfL - 2]} isNight={isNight} />
      <Floodlight position={[-halfW - 2, 0, halfL + 2]} isNight={isNight} />
      <Floodlight position={[halfW + 2, 0, halfL + 2]} isNight={isNight} />
    </group>
  )
}

export const STADIUM_HALF_WIDTH = PITCH_WIDTH / 2 + 4
export const STADIUM_HALF_LENGTH = PITCH_LENGTH / 2 + 4
