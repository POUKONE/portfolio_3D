import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Splash } from './components/Splash'
import { Scene } from './components/Scene'
import { Panel } from './components/overlay/Panel'
import { HomePanel } from './components/overlay/HomePanel'
import { CareerPanel } from './components/overlay/CareerPanel'
import { ProjectsPanel } from './components/overlay/ProjectsPanel'
import { BALL_CURSOR } from './cursor'

export type PanelKey = 'home' | 'career' | 'projects' | null

function App() {
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isNight, setIsNight] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelKey>(null)
  const crowdAudioRef = useRef<HTMLAudioElement | null>(null)
  const whistleAudioRef = useRef<HTMLAudioElement | null>(null)

  if (crowdAudioRef.current === null) {
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/crowd.mp3`)
    audio.loop = true
    audio.volume = 0.35
    crowdAudioRef.current = audio
  }

  if (whistleAudioRef.current === null) {
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/whistle.mp3`)
    audio.volume = 0.7
    whistleAudioRef.current = audio
  }

  function playWhistle() {
    const audio = whistleAudioRef.current
    if (!audio || muted) return
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  useEffect(() => {
    const audio = crowdAudioRef.current
    if (!audio) return
    audio.muted = muted
  }, [muted])

  useEffect(() => {
    const audio = crowdAudioRef.current
    return () => {
      audio?.pause()
    }
  }, [])

  if (!entered) {
    return (
      <Splash
        onEnter={(startMuted) => {
          setMuted(startMuted)
          setEntered(true)
          const audio = crowdAudioRef.current
          if (audio) {
            audio.muted = startMuted
            audio.play().catch(() => {})
          }
        }}
      />
    )
  }

  return (
    <div className="experience" style={{ cursor: BALL_CURSOR }}>
      <div className="canvas-wrap">
        <Scene isNight={isNight} onOpenPanel={setActivePanel} onWhistle={playWhistle} />
      </div>

      <div className="hud">
        <button
          className="hud-btn"
          title="Info"
          onClick={() => {
            playWhistle()
            setActivePanel('home')
          }}
        >
          i
        </button>
        <button
          className={`hud-btn${muted ? '' : ' active'}`}
          title={muted ? 'Unmute crowd noise' : 'Mute crowd noise'}
          onClick={() => setMuted((m) => !m)}
        >
          {muted ? '🔇' : '🔊'}
        </button>
        <button
          className={`hud-btn${isNight ? ' active' : ''}`}
          title="Toggle day / night match"
          onClick={() => setIsNight((n) => !n)}
        >
          {isNight ? '🌙' : '☀️'}
        </button>
      </div>

      {activePanel && (
        <Panel onClose={() => setActivePanel(null)}>
          {activePanel === 'home' && <HomePanel />}
          {activePanel === 'career' && <CareerPanel />}
          {activePanel === 'projects' && <ProjectsPanel />}
        </Panel>
      )}
    </div>
  )
}

export default App
