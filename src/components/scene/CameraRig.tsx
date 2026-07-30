import { useEffect, useRef, type RefObject } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'

type Focus = { position: [number, number, number]; target: [number, number, number] } | null

const TRANSITION_MS = 900

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Eases the camera to `focus` (or back to the default view when `focus` is
 * null) once per change, then hands full control back to OrbitControls —
 * it never fights the user's drag/zoom once a transition finishes.
 */
export function CameraRig({
  controlsRef,
  focus,
  defaultPosition,
  defaultTarget,
  defaultDistanceRange,
  focusDistanceRange,
}: {
  controlsRef: RefObject<OrbitControlsImpl | null>
  focus: Focus
  defaultPosition: [number, number, number]
  defaultTarget: [number, number, number]
  defaultDistanceRange: [number, number]
  focusDistanceRange: [number, number]
}) {
  const { camera } = useThree()
  const anim = useRef<{
    from: THREE.Vector3
    fromTarget: THREE.Vector3
    to: THREE.Vector3
    toTarget: THREE.Vector3
    start: number
  } | null>(null)

  useEffect(() => {
    const controls = controlsRef.current
    if (!controls) return
    const to = focus ? focus.position : defaultPosition
    const toTarget = focus ? focus.target : defaultTarget
    const [minDistance, maxDistance] = focus ? focusDistanceRange : defaultDistanceRange
    controls.minDistance = minDistance
    controls.maxDistance = maxDistance
    anim.current = {
      from: camera.position.clone(),
      fromTarget: controls.target.clone(),
      to: new THREE.Vector3(...to),
      toTarget: new THREE.Vector3(...toTarget),
      start: performance.now(),
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus])

  useFrame(() => {
    const controls = controlsRef.current
    const a = anim.current
    if (!controls || !a) return
    const t = Math.min(1, (performance.now() - a.start) / TRANSITION_MS)
    const eased = easeOutCubic(t)
    camera.position.lerpVectors(a.from, a.to, eased)
    controls.target.lerpVectors(a.fromTarget, a.toTarget, eased)
    controls.update()
    if (t >= 1) anim.current = null
  })

  return null
}
