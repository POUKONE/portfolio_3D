import { Suspense, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Pitch, PITCH_LENGTH, PITCH_WIDTH } from './scene/Pitch'
import { Goal } from './scene/Goal'
import { Football, BALL_RADIUS } from './scene/Football'
import { Stadium, STADIUM_HALF_LENGTH, STADIUM_HALF_WIDTH } from './scene/Stadium'
import { Scoreboard } from './scene/Scoreboard'
import { Lighting } from './scene/Lighting'
import { Figure } from './scene/Figure'
import { TrophyCase } from './scene/TrophyCase'
import type { PanelKey } from '../App'

const TROPHY_RING_RADIUS = STADIUM_HALF_WIDTH + 14
const TROPHY_ANGLES_DEG = [20, 70, 110, 160, 200, 250, 290, 340]

const TEAM_KIT = {
  jerseyColor: '#0b3d91',
  shortsColor: '#ffffff',
  sockColor: '#0b3d91',
  shoeColor: '#c81e1e',
  crest: true,
  crestInitials: 'IP',
}

// 3-1-2 formation, entirely inside the lower half of the pitch (z > 0, closest to the default camera).
// Each player IS a section of the portfolio: back three -> Career, midfielder -> Home, forwards -> Projects.
const FORMATION_3_1_2: {
  position: [number, number, number]
  rotationY: number
  number: number
  panel: PanelKey
  label: string
}[] = [
  { position: [-9, 0, 12], rotationY: Math.PI - 0.3, number: 4, panel: 'career', label: 'Career' },
  { position: [0, 0, 12], rotationY: Math.PI, number: 5, panel: 'career', label: 'Career' },
  { position: [9, 0, 12], rotationY: Math.PI + 0.3, number: 2, panel: 'career', label: 'Career' },
  { position: [0, 0, 7], rotationY: Math.PI, number: 8, panel: 'home', label: 'About Me' },
  { position: [-6.5, 0, 2], rotationY: Math.PI - 0.4, number: 10, panel: 'projects', label: 'Projects' },
  { position: [6.5, 0, 2], rotationY: Math.PI + 0.4, number: 9, panel: 'projects', label: 'Projects' },
]

// Coach: inside the stadium bowl, on the touchline (not on the pitch itself)
const COACH_POSITION: [number, number, number] = [-(PITCH_WIDTH / 2 + 2), 0, 6]

export function Scene({
  isNight,
  onOpenPanel,
  onWhistle,
}: {
  isNight: boolean
  onOpenPanel: (panel: PanelKey) => void
  onWhistle: () => void
}) {
  const [ballTarget, setBallTarget] = useState<[number, number, number]>([0, BALL_RADIUS, 0])
  const pendingPanelRef = useRef<PanelKey>(null)

  function selectPlayer(panel: PanelKey, position: [number, number, number]) {
    onWhistle()
    pendingPanelRef.current = panel
    setBallTarget([position[0], BALL_RADIUS, position[2] + 0.55])
  }

  function handleBallArrived() {
    const panel = pendingPanelRef.current
    if (panel) {
      onOpenPanel(panel)
      pendingPanelRef.current = null
    }
  }

  return (
    <Canvas shadows camera={{ position: [0, 14, 26], fov: 50 }}>
      <Suspense fallback={null}>
        <Lighting isNight={isNight} />
        <Pitch />
        <Stadium isNight={isNight} />

        <Goal position={[0, 0, -PITCH_LENGTH / 2]} />
        <Goal position={[0, 0, PITCH_LENGTH / 2]} rotation={[0, Math.PI, 0]} />
        <Football target={ballTarget} onArrived={handleBallArrived} />

        <Scoreboard position={[0, 8, -(STADIUM_HALF_LENGTH + 14)]} standHeight={8} />

        {FORMATION_3_1_2.map((p, i) => (
          <Figure
            key={i}
            position={p.position}
            rotationY={p.rotationY}
            number={p.number}
            onClick={() => selectPlayer(p.panel, p.position)}
            hoverLabel={p.label}
            {...TEAM_KIT}
          />
        ))}

        <Figure
          position={[1.8, 0, 1.2]}
          rotationY={-1.2}
          jerseyColor="#111111"
          shortsColor="#111111"
          sockColor="#111111"
          shoeColor="#111111"
          whistleColor="#e11d1d"
        />

        {/* Coach, inside the stadium on the touchline (not on the pitch), black tuxedo + sunglasses */}
        <Figure
          position={COACH_POSITION}
          rotationY={-Math.PI / 2}
          jerseyColor="#111111"
          shortsColor="#111111"
          sockColor="#111111"
          shoeColor="#000000"
          sunglasses
        />

        {TROPHY_ANGLES_DEG.map((deg) => {
          const rad = (deg * Math.PI) / 180
          const x = TROPHY_RING_RADIUS * Math.sin(rad)
          const z = TROPHY_RING_RADIUS * Math.cos(rad)
          return <TrophyCase key={deg} position={[x, 0, z]} rotationY={rad + Math.PI} />
        })}

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]} receiveShadow>
          <circleGeometry args={[TROPHY_RING_RADIUS + 10, 48]} />
          <meshStandardMaterial color="#1b3a22" roughness={1} />
        </mesh>
      </Suspense>
      <OrbitControls
        enablePan={false}
        minDistance={12}
        maxDistance={65}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />
    </Canvas>
  )
}
