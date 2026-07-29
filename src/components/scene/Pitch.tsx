import { useMemo } from 'react'
import * as THREE from 'three'

const WIDTH = 30
const LENGTH = 44

function usePitchTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 1024
    canvas.height = 1536
    const ctx = canvas.getContext('2d')!

    // mow stripes
    const stripes = 12
    const stripeH = canvas.height / stripes
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? '#2f9e44' : '#2b8f3d'
      ctx.fillRect(0, i * stripeH, canvas.width, stripeH)
    }

    ctx.strokeStyle = 'rgba(255,255,255,0.9)'
    ctx.lineWidth = 6
    const margin = 40
    // outer boundary
    ctx.strokeRect(margin, margin, canvas.width - margin * 2, canvas.height - margin * 2)
    // halfway line
    ctx.beginPath()
    ctx.moveTo(margin, canvas.height / 2)
    ctx.lineTo(canvas.width - margin, canvas.height / 2)
    ctx.stroke()
    // center circle
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 6, 0, Math.PI * 2)
    ctx.fillStyle = 'white'
    ctx.fill()

    // penalty boxes (top & bottom)
    const boxW = 520
    const boxH = 190
    ctx.strokeRect(canvas.width / 2 - boxW / 2, margin, boxW, boxH)
    ctx.strokeRect(canvas.width / 2 - boxW / 2, canvas.height - margin - boxH, boxW, boxH)

    const goalW = 220
    const goalH = 70
    ctx.strokeRect(canvas.width / 2 - goalW / 2, margin, goalW, goalH)
    ctx.strokeRect(canvas.width / 2 - goalW / 2, canvas.height - margin - goalH, goalW, goalH)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

export function Pitch() {
  const texture = usePitchTexture()

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[WIDTH, LENGTH]} />
        <meshStandardMaterial map={texture} roughness={0.95} />
      </mesh>
      {/* surrounding grass apron */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[WIDTH + 16, LENGTH + 16]} />
        <meshStandardMaterial color="#237a34" roughness={1} />
      </mesh>
    </group>
  )
}

export const PITCH_WIDTH = WIDTH
export const PITCH_LENGTH = LENGTH
