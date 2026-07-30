import { useMemo, useRef } from 'react'
import type { Group } from 'three'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import type { PanelKey } from '../../App'

const THEMED_PANEL_KEYS = new Set<PanelKey>([
  'formation',
  'experience',
  'competences',
  'interests',
  'projects',
  'languages',
])

export function isThemedShowcaseKey(panel: PanelKey): boolean {
  return THEMED_PANEL_KEYS.has(panel)
}

// A stylised, original shield badge — colours evoke a league without
// reproducing any real crest/wordmark.
function useShieldTexture(label: string, stripes: string[], orientation: 'vertical' | 'horizontal') {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 160
    const ctx = canvas.getContext('2d')!
    const w = canvas.width
    const h = canvas.height
    const r = w * 0.16

    function shieldPath() {
      ctx.beginPath()
      ctx.moveTo(0, r)
      ctx.quadraticCurveTo(0, 0, r, 0)
      ctx.lineTo(w - r, 0)
      ctx.quadraticCurveTo(w, 0, w, r)
      ctx.lineTo(w, h * 0.5)
      ctx.quadraticCurveTo(w, h * 0.78, w / 2, h)
      ctx.quadraticCurveTo(0, h * 0.78, 0, h * 0.5)
      ctx.closePath()
    }

    ctx.save()
    shieldPath()
    ctx.clip()
    const n = stripes.length
    stripes.forEach((color, i) => {
      ctx.fillStyle = color
      if (orientation === 'vertical') ctx.fillRect((w / n) * i, 0, w / n + 1, h)
      else ctx.fillRect(0, (h / n) * i, w, h / n + 1)
    })
    ctx.restore()

    ctx.lineWidth = 7
    ctx.strokeStyle = '#f4d35e'
    shieldPath()
    ctx.stroke()

    ctx.fillStyle = 'rgba(0, 0, 0, 0.55)'
    ctx.fillRect(w * 0.12, h * 0.36, w * 0.76, h * 0.28)
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${w * 0.3}px system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, w / 2, h * 0.5)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, orientation])
}

function useTacticsBoardTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 160
    canvas.height = 120
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#0d3b23'
    ctx.fillRect(0, 0, 160, 120)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'
    ctx.lineWidth = 2
    ctx.strokeRect(8, 8, 144, 104)
    ctx.beginPath()
    ctx.moveTo(80, 8)
    ctx.lineTo(80, 112)
    ctx.stroke()

    const dots: [number, number][] = [
      [30, 30],
      [80, 20],
      [130, 30],
      [50, 62],
      [110, 62],
      [80, 96],
    ]
    ctx.fillStyle = '#ffd166'
    dots.forEach(([x, y]) => {
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    const links: [[number, number], [number, number]][] = [
      [dots[0], dots[3]],
      [dots[2], dots[4]],
      [dots[3], dots[5]],
      [dots[4], dots[5]],
    ]
    links.forEach(([a, b]) => {
      ctx.beginPath()
      ctx.moveTo(a[0], a[1])
      ctx.lineTo(b[0], b[1])
      ctx.stroke()
    })

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function useHighlightScreenTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 160
    canvas.height = 100
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createLinearGradient(0, 0, 160, 100)
    grad.addColorStop(0, '#0b3d91')
    grad.addColorStop(1, '#123a20')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 160, 100)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.92)'
    ctx.beginPath()
    ctx.moveTo(64, 30)
    ctx.lineTo(64, 70)
    ctx.lineTo(100, 50)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 209, 102, 0.85)'
    ctx.lineWidth = 4
    ctx.strokeRect(6, 6, 148, 88)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function useMiniPitchTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 96
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#2e7d34'
    ctx.fillRect(0, 0, 128, 96)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)'
    ctx.lineWidth = 3
    ctx.strokeRect(6, 6, 116, 84)
    ctx.beginPath()
    ctx.moveTo(64, 6)
    ctx.lineTo(64, 90)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(64, 48, 14, 0, Math.PI * 2)
    ctx.stroke()
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function MiniGoal({ position, rotationY = 0 }: { position: [number, number, number]; rotationY?: number }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[-0.14, 0.09, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.18, 6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0.14, 0.09, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.18, 6]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.008, 0.008, 0.28, 6]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

function MiniCup({ color = '#ffd166', scale = 1 }: { color?: string; scale?: number }) {
  return (
    <group scale={scale}>
      <mesh position={[0, 0.09, 0]}>
        <cylinderGeometry args={[0.055, 0.075, 0.07, 12]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.09, 8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.225, 0]}>
        <sphereGeometry args={[0.075, 14, 14, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Formation: a miniature training-academy pitch with mini goals and cones.
function FormationShowcase() {
  const pitchTexture = useMiniPitchTexture()
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 1.1]} />
        <meshStandardMaterial map={pitchTexture} roughness={0.9} />
      </mesh>
      <MiniGoal position={[0, 0, -0.5]} />
      <MiniGoal position={[0, 0, 0.5]} rotationY={Math.PI} />
      {(
        [
          [-0.5, 0.32],
          [0.12, -0.28],
          [0.48, 0.15],
        ] as [number, number][]
      ).map(([x, z], i) => (
        <mesh key={i} position={[x, 0.045, z]}>
          <coneGeometry args={[0.035, 0.09, 10]} />
          <meshStandardMaterial color="#ff7a1a" />
        </mesh>
      ))}
    </group>
  )
}

// Experience: a row of season trophies on a small plinth.
function ExperienceShowcase() {
  const seasons = [
    { label: '19-22', x: -0.4, scale: 0.85 },
    { label: '22-23', x: 0, scale: 1.15 },
    { label: '23-25', x: 0.4, scale: 0.85 },
  ]
  return (
    <group>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[1.05, 0.04, 0.3]} />
        <meshStandardMaterial color="#1c1f26" />
      </mesh>
      {seasons.map((s) => (
        <group key={s.label} position={[s.x, 0.04, 0]}>
          <MiniCup scale={s.scale} />
          <Text position={[0, -0.06, 0.18]} fontSize={0.055} color="#ffd166" anchorX="center" anchorY="middle">
            {s.label}
          </Text>
        </group>
      ))}
    </group>
  )
}

// Compétences: a coach's tactics board on an easel.
function CompetencesShowcase() {
  const texture = useTacticsBoardTexture()
  return (
    <group>
      <mesh position={[0, 0.45, -0.015]}>
        <boxGeometry args={[0.96, 0.74, 0.02]} />
        <meshStandardMaterial color="#3a2a18" />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <planeGeometry args={[0.9, 0.68]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
      <mesh position={[-0.3, 0.08, 0.25]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 6]} />
        <meshStandardMaterial color="#3a2a18" />
      </mesh>
      <mesh position={[0.3, 0.08, 0.25]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.012, 0.012, 0.4, 6]} />
        <meshStandardMaterial color="#3a2a18" />
      </mesh>
    </group>
  )
}

// Intérêts & Loisirs: a small cluster of hobby icons — football, chess,
// camera, mountain (hiking).
function InterestsShowcase() {
  return (
    <group>
      <mesh position={[-0.5, 0.09, 0]} castShadow>
        <sphereGeometry args={[0.09, 14, 14]} />
        <meshStandardMaterial color="#f2f4f2" roughness={0.5} />
      </mesh>
      <group position={[-0.17, 0, 0]}>
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.05, 0.06, 0.1, 10]} />
          <meshStandardMaterial color="#e8e2d0" />
        </mesh>
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshStandardMaterial color="#e8e2d0" />
        </mesh>
      </group>
      <group position={[0.2, 0.075, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.11, 0.09]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
        <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.06, 12]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
      <mesh position={[0.5, 0.1, 0]}>
        <coneGeometry args={[0.12, 0.2, 12]} />
        <meshStandardMaterial color="#4a5a6a" />
      </mesh>
      <mesh position={[0.5, 0.18, 0]}>
        <coneGeometry args={[0.05, 0.06, 12]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  )
}

// Projets: a glowing highlight-reel jumbotron screen.
function ProjectsShowcase() {
  const texture = useHighlightScreenTexture()
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <planeGeometry args={[1, 0.62]} />
        <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.42, 0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
      <mesh position={[0.42, 0.05, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.5, 8]} />
        <meshStandardMaterial color="#222222" />
      </mesh>
    </group>
  )
}

// Langues: original stylised badges evoking Ligue 1, the Premier League and
// the Bundesliga by colour, not by reproducing any real crest.
function LanguagesShowcase() {
  const ligue1 = useShieldTexture('L1', ['#0055a4', '#ffffff', '#ef4135'], 'vertical')
  const premierLeague = useShieldTexture('PL', ['#3d1152', '#8a2be2'], 'vertical')
  const bundesliga = useShieldTexture('BL', ['#000000', '#dd0000', '#ffce00'], 'horizontal')
  const badges = [
    { texture: ligue1, x: -0.45 },
    { texture: premierLeague, x: 0 },
    { texture: bundesliga, x: 0.45 },
  ]
  return (
    <group>
      {badges.map((b, i) => (
        <mesh key={i} position={[b.x, 0.35, 0]}>
          <planeGeometry args={[0.32, 0.4]} />
          <meshBasicMaterial map={b.texture} transparent toneMapped={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  )
}

/**
 * A small procedural 3D "vignette" that floats above the clicked hotspot,
 * themed to the section whose panel is open — a visual complement to the
 * HTML panel, not a replacement for it.
 */
export function SectionShowcase({ theme, position }: { theme: PanelKey; position: [number, number, number] }) {
  const groupRef = useRef<Group>(null)
  const phase = useRef(Math.random() * Math.PI * 2)

  useFrame((state) => {
    const group = groupRef.current
    if (!group) return
    group.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.4 + phase.current) * 0.05
    group.rotation.y = state.clock.elapsedTime * 0.35
  })

  if (!isThemedShowcaseKey(theme)) return null

  return (
    <group ref={groupRef} position={position}>
      {theme === 'formation' && <FormationShowcase />}
      {theme === 'experience' && <ExperienceShowcase />}
      {theme === 'competences' && <CompetencesShowcase />}
      {theme === 'interests' && <InterestsShowcase />}
      {theme === 'projects' && <ProjectsShowcase />}
      {theme === 'languages' && <LanguagesShowcase />}
    </group>
  )
}
