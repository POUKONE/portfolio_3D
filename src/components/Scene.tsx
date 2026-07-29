import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Pitch, PITCH_LENGTH } from './scene/Pitch'
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

export function Scene({
  isNight,
  onOpenPanel,
}: {
  isNight: boolean
  onOpenPanel: (panel: PanelKey) => void
}) {
  return (
    <Canvas shadows camera={{ position: [0, 14, 26], fov: 50 }}>
      <Suspense fallback={null}>
        <Lighting isNight={isNight} />
        <Pitch />
        <Stadium isNight={isNight} />

        <Goal position={[0, 0, -PITCH_LENGTH / 2]} onClick={() => onOpenPanel('career')} label="Career" />
        <Goal
          position={[0, 0, PITCH_LENGTH / 2]}
          rotation={[0, Math.PI, 0]}
          onClick={() => onOpenPanel('career')}
          label="Career"
        />
        <Football position={[2.5, BALL_RADIUS, 3]} onClick={() => onOpenPanel('projects')} />

        <Scoreboard
          position={[0, 8, -(STADIUM_HALF_LENGTH + 14)]}
          standHeight={8}
          onClick={() => onOpenPanel('home')}
        />

        <Figure
          position={[3.5, 0, -4]}
          rotationY={0.6}
          jerseyColor="#0b3d91"
          shortsColor="#ffffff"
          sockColor="#0b3d91"
          shoeColor="#c81e1e"
        />
        <Figure
          position={[-1.5, 0, 2.5]}
          rotationY={-1.2}
          jerseyColor="#111111"
          shortsColor="#111111"
          sockColor="#111111"
          shoeColor="#111111"
          whistleColor="#e11d1d"
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
