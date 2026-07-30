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

const FINGER_ANGLES_DEG = [-20, -7, 7, 20]

function Hand({
  x,
  y,
  side,
  skinColor,
}: {
  x: number
  y: number
  side: 1 | -1
  skinColor: string
}) {
  return (
    <group position={[x, y, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.042, 10, 10]} />
        <meshStandardMaterial color={skinColor} />
      </mesh>
      {FINGER_ANGLES_DEG.map((deg, i) => {
        const rad = (deg * Math.PI) / 180
        return (
          <mesh
            key={i}
            castShadow
            position={[side * Math.sin(rad) * 0.05, -0.05 - Math.cos(rad) * 0.008, Math.cos(rad) * 0.012]}
            rotation={[0, 0, side * rad]}
          >
            <capsuleGeometry args={[0.012, 0.05, 3, 6]} />
            <meshStandardMaterial color={skinColor} />
          </mesh>
        )
      })}
    </group>
  )
}

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
  skinColor?: string
  hairColor?: string
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
        <Html position={[0, 2.05, 0]} center distanceFactor={11} occlude>
          <div className="hotspot-label">{hoverLabel}</div>
        </Html>
      )}
      <group scale={scale * (interactive && hovered ? 1.05 : 1)}>
        {/* shoes */}
        <mesh castShadow position={[-0.115, 0.07, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.1, 4, 8]} />
          <meshStandardMaterial color={shoeColor} />
        </mesh>
        <mesh castShadow position={[0.115, 0.07, 0.03]} rotation={[Math.PI / 2, 0, 0]}>
          <capsuleGeometry args={[0.07, 0.1, 4, 8]} />
          <meshStandardMaterial color={shoeColor} />
        </mesh>

        {/* legs (slimmer, longer for a more adult silhouette) */}
        <mesh castShadow position={[-0.115, 0.405, 0]}>
          <capsuleGeometry args={[0.075, 0.42, 4, 10]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>
        <mesh castShadow position={[0.115, 0.405, 0]}>
          <capsuleGeometry args={[0.075, 0.42, 4, 10]} />
          <meshStandardMaterial color={sockColor} />
        </mesh>

        {/* shorts */}
        <mesh castShadow position={[0, 0.85, 0]}>
          <capsuleGeometry args={[0.145, 0.09, 4, 12]} />
          <meshStandardMaterial color={shortsColor} />
        </mesh>

        {/* torso, slimmer */}
        <mesh castShadow position={[0, 1.275, 0]}>
          <capsuleGeometry args={[0.135, 0.26, 4, 12]} />
          <meshStandardMaterial color={jerseyColor} />
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

        {/* arms, slimmer and longer */}
        <mesh castShadow position={[-0.3, 1.33, 0]} rotation={[0, 0, 0.16]}>
          <capsuleGeometry args={[0.05, 0.34, 4, 8]} />
          <meshStandardMaterial color={jerseyColor} />
        </mesh>
        <mesh castShadow position={[0.3, 1.33, 0]} rotation={[0, 0, -0.16]}>
          <capsuleGeometry args={[0.05, 0.34, 4, 8]} />
          <meshStandardMaterial color={jerseyColor} />
        </mesh>

        {/* hands, with visible fingers */}
        <Hand x={-0.335} y={1.1} side={-1} skinColor={skinColor} />
        <Hand x={0.335} y={1.1} side={1} skinColor={skinColor} />

        {/* head: oval, with a defined chin and a small nose */}
        <mesh castShadow position={[0, 1.6, 0]} scale={[0.92, 1.1, 0.95]}>
          <sphereGeometry args={[0.13, 20, 20]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        <mesh castShadow position={[0, 1.485, 0.03]}>
          <sphereGeometry args={[0.052, 12, 12]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>
        <mesh castShadow position={[0, 1.6, 0.125]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color={skinColor} />
        </mesh>

        {/* hair: base plus side-swept tufts */}
        <mesh position={[0, 1.665, -0.015]} scale={[1.05, 1, 1]}>
          <sphereGeometry args={[0.135, 18, 18, 0, Math.PI * 2, 0, Math.PI / 2.1]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[0.055, 1.7, 0.05]} rotation={[0.3, 0, 0.25]}>
          <sphereGeometry args={[0.055, 12, 12]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>
        <mesh position={[-0.03, 1.71, 0.06]} rotation={[0.2, 0, -0.15]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={hairColor} />
        </mesh>

        {whistleColor && (
          <mesh position={[0, 1.575, 0.145]}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshStandardMaterial color={whistleColor} />
          </mesh>
        )}

        {sunglasses && (
          <mesh position={[0, 1.615, 0.13]}>
            <boxGeometry args={[0.22, 0.05, 0.03]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.4} />
          </mesh>
        )}
      </group>
    </group>
  )
}
