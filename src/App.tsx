import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Splash } from './components/Splash'
import { Scene } from './components/Scene'
import { Panel } from './components/overlay/Panel'
import { HomePanel } from './components/overlay/HomePanel'
import { ExperiencePanel } from './components/overlay/ExperiencePanel'
import { ProjectsPanel } from './components/overlay/ProjectsPanel'
import { FormationPanel } from './components/overlay/FormationPanel'
import { CompetencesPanel } from './components/overlay/CompetencesPanel'
import { InterestsPanel } from './components/overlay/InterestsPanel'
import { LanguagesPanel } from './components/overlay/LanguagesPanel'
import { ContactPanel } from './components/overlay/ContactPanel'
import { Fireworks } from './components/overlay/Fireworks'
import { TROPHY_CURSOR } from './cursor'

export type PanelKey =
  | 'home'
  | 'projects'
  | 'formation'
  | 'experience'
  | 'competences'
  | 'interests'
  | 'languages'
  | 'contact'
  | null

function App() {
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isNight, setIsNight] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelKey>(null)
  const [fireworksKey, setFireworksKey] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)
  const crowdAudioRef = useRef<HTMLAudioElement | null>(null)
  const whistleAudioRef = useRef<HTMLAudioElement | null>(null)
  const fireworksTimeoutRef = useRef<number | null>(null)

  function celebrateGoal() {
    if (fireworksTimeoutRef.current) window.clearTimeout(fireworksTimeoutRef.current)
    setFireworksKey((k) => k + 1)
    setShowFireworks(true)
    fireworksTimeoutRef.current = window.setTimeout(() => setShowFireworks(false), 1500)
  }

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
      if (fireworksTimeoutRef.current) window.clearTimeout(fireworksTimeoutRef.current)
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
    <div className="experience" style={{ cursor: TROPHY_CURSOR }}>
      <div className="canvas-wrap">
        <Scene
          isNight={isNight}
          activePanel={activePanel}
          onOpenPanel={setActivePanel}
          onWhistle={playWhistle}
          onGoal={celebrateGoal}
        />
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
          {activePanel === 'projects' && <ProjectsPanel />}
          {activePanel === 'formation' && <FormationPanel />}
          {activePanel === 'experience' && <ExperiencePanel />}
          {activePanel === 'competences' && <CompetencesPanel />}
          {activePanel === 'interests' && <InterestsPanel />}
          {activePanel === 'languages' && <LanguagesPanel />}
          {activePanel === 'contact' && <ContactPanel />}
        </Panel>
      )}

      {showFireworks && <Fireworks key={fireworksKey} />}
    </div>
  )
}

export default App
