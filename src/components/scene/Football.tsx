import { useEffect, useMemo, useRef } from 'react'
import type { Mesh } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

export const BALL_RADIUS = 0.22
export const DEFAULT_ROLL_SPEED = 3.4 // units per second

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

/**
 * A football that rolls toward `target` (e.g. a selected player) and calls
 * `onArrived` once it settles, so the caller can reveal content only after
 * the ball has visibly reached its destination.
 */
export function Football({
  target,
  speed = DEFAULT_ROLL_SPEED,
  onArrived,
}: {
  target: [number, number, number]
  speed?: number
  onArrived?: () => void
}) {
  const texture = useBallTexture()
  const meshRef = useRef<Mesh>(null)
  const currentPos = useRef(new THREE.Vector3(target[0], target[1], target[2]))
  const targetPos = useRef(new THREE.Vector3(target[0], target[1], target[2]))
  const wasMoving = useRef(false)
  const upAxis = useRef(new THREE.Vector3(0, 1, 0))

  useEffect(() => {
    targetPos.current.set(target[0], target[1], target[2])
    // A fresh selection always counts as "moving", even if the ball is
    // already sitting on the new target — otherwise re-clicking the same
    // hotspot twice in a row would never re-fire onArrived.
    wasMoving.current = true
  }, [target])

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const pos = currentPos.current
    const dist = pos.distanceTo(targetPos.current)

    if (dist > 0.01) {
      wasMoving.current = true
      const step = Math.min(dist, speed * delta)
      const move = targetPos.current.clone().sub(pos).normalize().multiplyScalar(step)
      pos.add(move)

      const axis = new THREE.Vector3().crossVectors(move, upAxis.current)
      if (axis.lengthSq() > 1e-8) {
        axis.normalize()
        const angle = step / BALL_RADIUS
        mesh.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(axis, angle))
      }
    } else if (wasMoving.current) {
      wasMoving.current = false
      onArrived?.()
    } else {
      mesh.rotation.y += delta * 0.25
    }

    mesh.position.copy(pos)
  })

  return (
    <mesh ref={meshRef} castShadow position={target}>
      <sphereGeometry args={[BALL_RADIUS, 24, 24]} />
      <meshStandardMaterial map={texture} roughness={0.5} />
    </mesh>
  )
}
