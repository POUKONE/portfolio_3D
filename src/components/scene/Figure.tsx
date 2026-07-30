import { useMemo, useRef, useState } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Html, Text } from '@react-three/drei'
import { GlowRing } from './GlowRing'

function useCrestTexture(initials: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 160
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height
    const r = w * 0.16

    ctx.beginPath()
    ctx.moveTo(0, r)
    ctx.quadraticCurveTo(0, 0, r, 0)
    ctx.lineTo(w - r, 0)
    ctx.quadraticCurveTo(w, 0, w, r)
    ctx.lineTo(w, h * 0.5)
    ctx.quadraticCurveTo(w, h * 0.78, w / 2, h)
    ctx.quadraticCurveTo(0, h * 0.78, 0, h * 0.5)
    ctx.closePath()

    ctx.fillStyle = '#f6f2e4'
    ctx.fill()
    ctx.lineWidth = 7
    ctx.strokeStyle = '#c9962e'
    ctx.stroke()

    ctx.fillStyle = '#0b3d91'
    ctx.font = `bold ${w * 0.42}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(initials, w / 2, h * 0.42)

    ctx.fillStyle = '#1f6b3a'
    ctx.fillRect(w * 0.28, h * 0.62, w * 0.44, h * 0.05)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [initials])
}

// Warm turned-wood grain, used for the head, forearms, hands and bare lower legs.
function useWoodTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height

    ctx.fillStyle = '#c08a55'
    ctx.fillRect(0, 0, w, h)

    for (let i = 0; i < 16; i++) {
      const baseR = 8 + i * 8.5
      ctx.beginPath()
      for (let a = 0; a <= Math.PI * 2 + 0.15; a += 0.08) {
        const wobble = Math.sin(a * 4 + i * 1.3) * 3.5
        const r = baseR + wobble
        const x = w / 2 + Math.cos(a) * r * 1.35
        const y = h / 2 + Math.sin(a) * r * 0.62
        if (a === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.strokeStyle = i % 2 === 0 ? 'rgba(96, 58, 26, 0.32)' : 'rgba(150, 102, 58, 0.22)'
      ctx.lineWidth = 2
      ctx.stroke()
    }

    for (let i = 0; i < 60; i++) {
      const x = Math.random() * w
      ctx.strokeStyle = `rgba(80, 48, 20, ${0.04 + Math.random() * 0.08})`
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x + (Math.random() * 8 - 4), h)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [])
}

// Woven-cloth look for the jersey and shorts: the base color plus a faint cross-hatch.
function useFabricTexture(baseColor: string) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height

    ctx.fillStyle = baseColor
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)'
    ctx.lineWidth = 1
    for (let x = 0; x <= w; x += 4) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, h)
      ctx.stroke()
    }
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)'
    for (let y = 0; y <= h; y += 4) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(w, y)
      ctx.stroke()
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    return texture
  }, [baseColor])
}

export function Figure({
  position,
  rotationY = 0,
  scale = 1.15,
  jerseyColor,
  shortsColor,
  sockColor,
  shoeColor = '#1a1a1a',
  whistleColor,
  number,
  numberColor = '#ffffff',
  sunglasses = false,
  crest = false,
  crestInitials = 'IP',
  onClick,
  hoverLabel,
}: {
  position: [number, number, number]
  rotationY?: number
  scale?: number
  jerseyColor: string
  shortsColor: string
  sockColor: string
  shoeColor?: string
  whistleColor?: string
  number?: number
  numberColor?: string
  sunglasses?: boolean
  crest?: boolean
  crestInitials?: string
  onClick?: () => void
  hoverLabel?: string
}) {
  const crestTexture = useCrestTexture(crestInitials)
  const woodTexture = useWoodTexture()
  const jerseyTexture = useFabricTexture(jerseyColor)
  const shortsTexture = useFabricTexture(shortsColor)
  const groupRef = useRef<Group>(null)
  const phase = useRef(Math.random() * Math.PI * 2)
  const [hovered, setHovered] = useState(false)
  const interactive = typeof onClick === 'function'

  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 1.6 + phase.current) * 0.02
  })

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={[0, rotationY, 0]}
      onClick={
        interactive
          ? (e) => {
              e.stopPropagation()
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
      onPointerOut={
        interactive
          ? () => {
              setHovered(false)
            }
          : undefined
      }
    >
      {interactive && <GlowRing radius={0.45} color="#8fcf9e" position={[0, 0.02, 0]} />}
      {interactive && hovered && hoverLabel && (
        <Html position={[0, 2.05 * scale, 0]} center distanceFactor={11} occlude>
          <div className="hotspot-label">{hoverLabel}</div>
        </Html>
      )}
      <group scale={scale * (interactive && hovered ? 1.05 : 1)}>
        {/* shoes: glossy plastic cleats */}
        <mesh castShadow position={[-0.115, 0.07, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.1, 4, 8]} />
          <meshStandardMaterial color={shoeColor} roughness={0.35} />
        </mesh>
        <mesh castShadow position={[0.115, 0.07, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.1, 4, 8]} />
          <meshStandardMaterial color={shoeColor} roughness={0.35} />
        </mesh>

        {/* ankle bands */}
        <mesh castShadow position={[-0.115, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.082, 0.024, 8, 16]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>
        <mesh castShadow position={[0.115, 0.16, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.082, 0.024, 8, 16]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>

        {/* bare wooden legs */}
        <mesh castShadow position={[-0.115, 0.405, 0]}>
          <capsuleGeometry args={[0.078, 0.42, 4, 10]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0.115, 0.405, 0]}>
          <capsuleGeometry args={[0.078, 0.42, 4, 10]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>

        {/* shorts */}
        <mesh castShadow position={[0, 0.85, 0]}>
          <capsuleGeometry args={[0.17, 0.09, 4, 12]} />
          <meshStandardMaterial map={shortsTexture} roughness={0.75} />
        </mesh>

        {/* torso jersey */}
        <mesh castShadow position={[0, 1.275, 0]}>
          <capsuleGeometry args={[0.135, 0.26, 4, 12]} />
          <meshStandardMaterial map={jerseyTexture} roughness={0.75} />
        </mesh>

        {crest && (
          <mesh position={[-0.07, 1.36, 0.125]}>
            <planeGeometry args={[0.085, 0.105]} />
            <meshBasicMaterial map={crestTexture} transparent />
          </mesh>
        )}

        {typeof number === 'number' && (
          <>
            <Text
              position={[0, 1.275, 0.14]}
              fontSize={0.15}
              color={numberColor}
              anchorX="center"
              anchorY="middle"
            >
              {number}
            </Text>
            <Text
              position={[0, 1.275, -0.14]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.15}
              color={numberColor}
              anchorX="center"
              anchorY="middle"
            >
              {number}
            </Text>
          </>
        )}

        {/* short jersey sleeves */}
        <mesh castShadow position={[-0.18, 1.44, 0]} rotation={[0, 0, 0.16]}>
          <capsuleGeometry args={[0.058, 0.1, 4, 8]} />
          <meshStandardMaterial map={jerseyTexture} roughness={0.75} />
        </mesh>
        <mesh castShadow position={[0.18, 1.44, 0]} rotation={[0, 0, -0.16]}>
          <capsuleGeometry args={[0.058, 0.1, 4, 8]} />
          <meshStandardMaterial map={jerseyTexture} roughness={0.75} />
        </mesh>

        {/* bare wooden forearms */}
        <mesh castShadow position={[-0.195, 1.22, 0]} rotation={[0, 0, 0.16]}>
          <capsuleGeometry args={[0.046, 0.26, 4, 8]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0.195, 1.22, 0]} rotation={[0, 0, -0.16]}>
          <capsuleGeometry args={[0.046, 0.26, 4, 8]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>

        {/* rounded wooden hands, no fingers - like a turned peg-doll */}
        <mesh castShadow position={[-0.22, 1.06, 0]}>
          <sphereGeometry args={[0.058, 12, 12]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>
        <mesh castShadow position={[0.22, 1.06, 0]}>
          <sphereGeometry args={[0.058, 12, 12]} />
          <meshStandardMaterial map={woodTexture} roughness={0.85} />
        </mesh>

        {/* head: smooth turned-wood ball, painted dot eyes, no hair */}
        <mesh castShadow position={[0, 1.58, 0]}>
          <sphereGeometry args={[0.135, 20, 20]} />
          <meshStandardMaterial map={woodTexture} roughness={0.7} />
        </mesh>
        <mesh position={[-0.045, 1.585, 0.125]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#2a1a10" roughness={0.4} />
        </mesh>
        <mesh position={[0.045, 1.585, 0.125]}>
          <sphereGeometry args={[0.014, 8, 8]} />
          <meshStandardMaterial color="#2a1a10" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.535, 0.13]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.03, 0.008, 0.006]} />
          <meshStandardMaterial color="#5c3a1e" />
        </mesh>

        {whistleColor && (
          <mesh position={[0, 1.55, 0.145]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshStandardMaterial color={whistleColor} />
          </mesh>
        )}

        {sunglasses && (
          <mesh position={[0, 1.595, 0.13]}>
            <boxGeometry args={[0.22, 0.05, 0.03]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.4} />
          </mesh>
        )}
      </group>
    </group>
  )
}
