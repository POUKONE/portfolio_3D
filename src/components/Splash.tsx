import { useState } from 'react'

export function Splash({ onEnter }: { onEnter: (muted: boolean) => void }) {
  const [muted, setMuted] = useState(true)

  return (
    <div className="splash">
      <h1>⚽ Your Name</h1>
      <p className="subtitle">Full Stack Developer — Home Ground</p>
      <button className="kickoff-btn" onClick={() => onEnter(muted)}>
        Kickoff ▸
      </button>
      <label className="mute-row">
        <input type="checkbox" checked={muted} onChange={(e) => setMuted(e.target.checked)} />
        Mute Crowd Noise
      </label>
    </div>
  )
}
