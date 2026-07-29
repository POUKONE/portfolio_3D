function Trophy() {
  return (
    <group position={[0, 0.78, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.13, 0.17, 0.14, 14]} />
        <meshStandardMaterial color="#ffd166" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.22, 10]} />
        <meshStandardMaterial color="#ffd166" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.17, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color="#ffd166" metalness={0.7} roughness={0.25} side={2} />
      </mesh>
      <mesh castShadow position={[-0.18, 0.32, 0]} rotation={[0, 0, 0.5]}>
        <torusGeometry args={[0.09, 0.02, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#ffd166" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh castShadow position={[0.18, 0.32, 0]} rotation={[0, 0, -0.5]}>
        <torusGeometry args={[0.09, 0.02, 8, 12, Math.PI]} />
        <meshStandardMaterial color="#ffd166" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  )
}

export function TrophyCase({
  position,
  rotationY = 0,
}: {
  position: [number, number, number]
  rotationY?: number
}) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh castShadow receiveShadow position={[0, 0.3, 0]}>
        <boxGeometry args={[1, 0.6, 1]} />
        <meshStandardMaterial color="#1c1f26" />
      </mesh>

      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[1, 1.4, 1]} />
        <meshStandardMaterial
          color="#bfe8ff"
          transparent
          opacity={0.22}
          roughness={0.05}
          metalness={0.1}
        />
      </mesh>
      {[
        [0.5, 0, 0],
        [-0.5, 0, 0],
        [0, 0, 0.5],
        [0, 0, -0.5],
      ].map((edge, i) => (
        <mesh key={i} position={[edge[0], 1.3, edge[2]]}>
          <boxGeometry args={[edge[0] ? 0.03 : 1, 1.4, edge[2] ? 0.03 : 1]} />
          <meshStandardMaterial color="#e7f6ff" />
        </mesh>
      ))}

      <Trophy />
    </group>
  )
}
