import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'
import * as THREE from 'three'
import { Sky, Stars } from '@react-three/drei'

const DAY_SKY = '#bcd8ea'
const NIGHT_SKY = '#040910'

export function Lighting({ isNight }: { isNight: boolean }) {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.Fog(isNight ? NIGHT_SKY : DAY_SKY, 25, 90)
    return () => {
      scene.fog = null
    }
  }, [isNight, scene])

  return (
    <>
      <color attach="background" args={[isNight ? NIGHT_SKY : DAY_SKY]} />

      <ambientLight intensity={isNight ? 0.18 : 0.65} color={isNight ? '#7fa8ff' : '#ffffff'} />

      <directionalLight
        position={isNight ? [6, 12, 4] : [10, 15, 8]}
        intensity={isNight ? 0.15 : 1.3}
        color={isNight ? '#a9c6ff' : '#ffffff'}
        castShadow={!isNight}
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {isNight && <Stars radius={80} depth={30} count={2000} factor={2} fade />}
      {!isNight && <Sky sunPosition={[10, 8, 5]} turbidity={4} rayleigh={1.2} />}
    </>
  )
}
