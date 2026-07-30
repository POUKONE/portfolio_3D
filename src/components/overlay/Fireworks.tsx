import { useMemo, type CSSProperties } from 'react'

const COLORS = ['#ffd447', '#ff6b6b', '#4dd9ff', '#8fcf9e', '#ffffff', '#ff9f45']
const BURST_ORIGINS = [
  { x: 25, y: 35 },
  { x: 72, y: 28 },
  { x: 50, y: 48 },
]
const PARTICLES_PER_BURST = 20

function makeBurstParticles(originX: number, originY: number, seed: number) {
  return Array.from({ length: PARTICLES_PER_BURST }).map((_, i) => {
    const angle = (Math.PI * 2 * i) / PARTICLES_PER_BURST + seed
    const distance = 70 + ((seed * 37 + i * 13) % 100)
    return {
      id: i,
      originX,
      originY,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      color: COLORS[(i + Math.round(seed * 10)) % COLORS.length],
      delay: (i % 5) * 0.03,
    }
  })
}

export function Fireworks() {
  const bursts = useMemo(
    () => BURST_ORIGINS.map((origin, i) => ({ ...origin, particles: makeBurstParticles(origin.x, origin.y, i + 1) })),
    []
  )

  return (
    <div className="fireworks" aria-hidden>
      {bursts.map((burst, bi) =>
        burst.particles.map((p) => (
          <span
            key={`${bi}-${p.id}`}
            className="firework-particle"
            style={
              {
                left: `${p.originX}%`,
                top: `${p.originY}%`,
                background: p.color,
                animationDelay: `${p.delay}s`,
                '--dx': `${p.dx}px`,
                '--dy': `${p.dy}px`,
              } as CSSProperties
            }
          />
        ))
      )}
    </div>
  )
}
