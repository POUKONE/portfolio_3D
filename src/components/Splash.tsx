import { useEffect, useRef, useState } from 'react'

const NAME = 'Ibrahima Poukone'
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// Reveals the name left-to-right, cycling random characters through the
// not-yet-locked letters — a "team sheet scrolling into place" feel rather
// than the name just appearing flat.
function useScrambleReveal(target: string, msPerLetter = 90) {
  const [text, setText] = useState(() => scramble(target, 0))

  useEffect(() => {
    let revealed = 0
    const interval = setInterval(() => {
      setText(scramble(target, revealed))
      if (revealed >= target.length) {
        clearInterval(interval)
        return
      }
      revealed += 1
    }, msPerLetter)
    return () => clearInterval(interval)
  }, [target, msPerLetter])

  return text
}

function scramble(target: string, revealedCount: number) {
  return target
    .split('')
    .map((ch, i) => {
      if (ch === ' ') return ' '
      if (i < revealedCount) return ch
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
    })
    .join('')
}

// A little physics sprite: the ball drops from the top and bounces around
// the splash screen's full bounds until the user kicks off, instead of
// sitting still next to the name.
function useBouncingBall(containerRef: React.RefObject<HTMLDivElement | null>) {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const ball = ballRef.current
    if (!container || !ball) return

    const size = 48
    let width = container.clientWidth
    let height = container.clientHeight
    let x = width / 2 - size / 2
    let y = -size
    let vx = 140 * (Math.random() < 0.5 ? -1 : 1)
    let vy = 0
    let spin = 0
    const gravity = 1400
    const restitution = 0.74
    const minBounceSpeed = 340

    function handleResize() {
      if (!container) return
      width = container.clientWidth
      height = container.clientHeight
    }
    window.addEventListener('resize', handleResize)

    let raf = 0
    let last = performance.now()
    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.032)
      last = now

      vy += gravity * dt
      x += vx * dt
      y += vy * dt

      const maxX = width - size
      const maxY = height - size

      if (x <= 0) {
        x = 0
        vx = Math.abs(vx)
      } else if (x >= maxX) {
        x = maxX
        vx = -Math.abs(vx)
      }

      if (y >= maxY) {
        y = maxY
        vy = -vy * restitution
        if (Math.abs(vy) < minBounceSpeed) {
          vy = -minBounceSpeed * (0.7 + Math.random() * 0.4)
        }
        vx += (Math.random() - 0.5) * 60
      } else if (y <= 0) {
        y = 0
        vy = Math.abs(vy)
      }

      spin += vx * dt * 2.2
      if (ball) ball.style.transform = `translate(${x}px, ${y}px) rotate(${spin}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [containerRef])

  return ballRef
}

export function Splash({ onEnter }: { onEnter: (muted: boolean) => void }) {
  const [muted, setMuted] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const ballRef = useBouncingBall(containerRef)
  const displayName = useScrambleReveal(NAME)

  return (
    <div className="splash" ref={containerRef}>
      <div className="splash-ball" ref={ballRef} aria-hidden="true">
        ⚽
      </div>
      <h1 className="name-football">{displayName}</h1>
      <p className="subtitle">Convergence Énergie & Data — Terrain à domicile</p>
      <button className="kickoff-btn" onClick={() => onEnter(muted)}>
        Coup d'envoi ▸
      </button>
      <label className="mute-row">
        <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} />
        Couper le bruit de la foule
      </label>
    </div>
  )
}
