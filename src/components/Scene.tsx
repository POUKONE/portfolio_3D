import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { Pitch, PITCH_LENGTH, PITCH_WIDTH } from './scene/Pitch'
import { Goal } from './scene/Goal'
import { Football, BALL_RADIUS, DEFAULT_ROLL_SPEED } from './scene/Football'
import { Stadium, STADIUM_HALF_LENGTH, STADIUM_HALF_WIDTH } from './scene/Stadium'
import { Scoreboard } from './scene/Scoreboard'
import { Lighting } from './scene/Lighting'
import { Figure } from './scene/Figure'
import { TrophyCase } from './scene/TrophyCase'
import { CameraRig } from './scene/CameraRig'
import { SectionShowcase, isThemedShowcaseKey } from './scene/SectionShowcase'
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
// Each player IS a section of the portfolio: back three -> Formation/Experience/Compétences,
// midfielder -> Intérêts & Loisirs, forwards -> Projets/Langues. Contact lives on the far goal.
const FORMATION_3_1_2: {
  position: [number, number, number]
  rotationY: number
  number: number
  panel: PanelKey
  label: string
}[] = [
  { position: [-9, 0, 12], rotationY: Math.PI - 0.3, number: 4, panel: 'formation', label: 'Formation' },
  { position: [0, 0, 12], rotationY: Math.PI, number: 5, panel: 'experience', label: 'Experience' },
  { position: [9, 0, 12], rotationY: Math.PI + 0.3, number: 2, panel: 'competences', label: 'Compétences' },
  { position: [0, 0, 7], rotationY: Math.PI, number: 8, panel: 'interests', label: 'Intérêts' },
  { position: [-6.5, 0, 2], rotationY: Math.PI - 0.4, number: 10, panel: 'projects', label: 'Projets' },
  { position: [6.5, 0, 2], rotationY: Math.PI + 0.4, number: 9, panel: 'languages', label: 'Langues' },
]

// Coach: inside the stadium bowl, on the touchline (not on the pitch itself)
const COACH_POSITION: [number, number, number] = [-(PITCH_WIDTH / 2 + 2), 0, 6]

const FAR_GOAL_POSITION: [number, number, number] = [0, 0, -PITCH_LENGTH / 2]
const SHOT_SPEED = 11 // units per second — a struck shot on goal, faster than the normal roll

const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 14, 26]
const DEFAULT_CAMERA_TARGET: [number, number, number] = [0, 1, 0]
const DEFAULT_DISTANCE_RANGE: [number, number] = [12, 65]
const FOCUS_DISTANCE_RANGE: [number, number] = [2, 20]

// The HTML panel is a right-side drawer, so the camera looks slightly to the
// right of the anchor — that keeps the actual subject (and its showcase)
// sitting in the uncovered left portion of the screen instead of dead
// centre, where the panel would hide it.
const PANEL_LATERAL_SHIFT = 2.6

function focusFromAnchor(anchor: [number, number, number]) {
  return {
    position: [anchor[0], anchor[1] + 3.4, anchor[2] + 4.5] as [number, number, number],
    target: [anchor[0] + PANEL_LATERAL_SHIFT, anchor[1] + 2, anchor[2]] as [number, number, number],
  }
}

export function Scene({
  isNight,
  activePanel,
  onOpenPanel,
  onWhistle,
  onGoal,
}: {
  isNight: boolean
  activePanel: PanelKey
  onOpenPanel: (panel: PanelKey) => void
  onWhistle: () => void
  onGoal: () => void
}) {
  const [ballTarget, setBallTarget] = useState<[number, number, number]>([0, BALL_RADIUS, 0])
  const [ballSpeed, setBallSpeed] = useState(DEFAULT_ROLL_SPEED)
  const [sectionAnchor, setSectionAnchor] = useState<[number, number, number] | null>(null)
  const [cameraFocus, setCameraFocus] = useState<{
    position: [number, number, number]
    target: [number, number, number]
  } | null>(null)
  const pendingPanelRef = useRef<PanelKey>(null)
  const controlsRef = useRef<OrbitControlsImpl>(null)

  useEffect(() => {
    if (!activePanel) {
      setCameraFocus(null)
      setSectionAnchor(null)
    }
  }, [activePanel])

  function selectPlayer(panel: PanelKey, position: [number, number, number]) {
    onWhistle()
    pendingPanelRef.current = panel
    setBallSpeed(DEFAULT_ROLL_SPEED)
    setBallTarget([position[0], BALL_RADIUS, position[2] + 0.55])
    setSectionAnchor(position)
    setCameraFocus(focusFromAnchor(position))
  }

  function selectGoal(position: [number, number, number]) {
    onWhistle()
    pendingPanelRef.current = 'contact'
    setBallSpeed(SHOT_SPEED)
    setBallTarget([position[0], BALL_RADIUS, position[2] + 1.4])
    setSectionAnchor(position)
    setCameraFocus(focusFromAnchor(position))
  }

  function handleBallArrived() {
    const panel = pendingPanelRef.current
    if (panel) {
      if (panel === 'contact') onGoal()
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

        <Goal
          position={FAR_GOAL_POSITION}
          onClick={() => selectGoal(FAR_GOAL_POSITION)}
          hoverLabel="Contact"
        />
        <Goal position={[0, 0, PITCH_LENGTH / 2]} rotation={[0, Math.PI, 0]} />
        <Football target={ballTarget} speed={ballSpeed} onArrived={handleBallArrived} />

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

        {activePanel && sectionAnchor && isThemedShowcaseKey(activePanel) && (
          <SectionShowcase theme={activePanel} position={[sectionAnchor[0], sectionAnchor[1] + 2.2, sectionAnchor[2]]} />
        )}
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        minDistance={12}
        maxDistance={65}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1, 0]}
      />
      <CameraRig
        controlsRef={controlsRef}
        focus={cameraFocus}
        defaultPosition={DEFAULT_CAMERA_POSITION}
        defaultTarget={DEFAULT_CAMERA_TARGET}
        defaultDistanceRange={DEFAULT_DISTANCE_RANGE}
        focusDistanceRange={FOCUS_DISTANCE_RANGE}
      />
    </Canvas>
  )
}
