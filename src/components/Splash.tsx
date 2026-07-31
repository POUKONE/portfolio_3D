import { useState } from 'react'

export function Splash({ onEnter }: { onEnter: (muted: boolean) => void }) {
  const [muted, setMuted] = useState(true)

  return (
    <div className="splash">
      <h1>⚽ Ibrahima Poukone</h1>
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
