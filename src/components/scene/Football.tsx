import { useMemo, useRef, useState } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { GlowRing } from './GlowRing'

export const BALL_RADIUS = 0.22

function useBallTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#111'
    const hexRadius = 26
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 9; col++) {
        const offsetX = row % 2 === 0 ? 0 : hexRadius
        const x = col * hexRadius * 2 + offsetX
        const y = row * hexRadius * 1.6
        drawHex(ctx, x, y, hexRadius * 0.55)
      }
    }
    function drawHex(c: CanvasRenderingContext2D, x: number, y: number, r: number) {
      c.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i
        const px = x + r * Math.cos(angle)
        const py = y + r * Math.sin(angle)
        if (i === 0) c.moveTo(px, py)
        else c.lineTo(px, py)
      }
      c.closePath()
      c.fill()
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [])
}

export function Football({
  position,
  onClick,
}: {
  position: [number, number, number]
  onClick: () => void
}) {
  const texture = useBallTexture()
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.6
    meshRef.current.rotation.x += delta * 0.15
  })

  return (
    <group position={position}>
      <GlowRing radius={BALL_RADIUS * 2.3} color="#ffe066" position={[0, -BALL_RADIUS + 0.02, 0]} />
      <mesh
        ref={meshRef}
        castShadow
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
        scale={hovered ? 1.15 : 1}
      >
        <sphereGeometry args={[BALL_RADIUS, 24, 24]} />
        <meshStandardMaterial map={texture} roughness={0.5} />
      </mesh>
      {hovered && (
        <Html position={[0, BALL_RADIUS * 2.2, 0]} center distanceFactor={12} occlude>
          <div className="hotspot-label">Projects</div>
        </Html>
      )}
    </group>
  )
}
