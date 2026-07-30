import { Text } from '@react-three/drei'

export function Scoreboard({
  position,
  rotation = [0, 0, 0],
  standHeight,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  standHeight: number
}) {
  const legLength = standHeight - 1.4
  const legY = -1.5 - legLength / 2

  return (
    <group position={position} rotation={rotation}>
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
        <meshStandardMaterial color="#111417" />
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
        0 : 0 — cliquez pour le coup d'envoi
      </Text>
    </group>
  )
}
