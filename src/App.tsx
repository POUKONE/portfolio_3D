import { useState } from 'react'
import './App.css'
import { Splash } from './components/Splash'
import { Scene } from './components/Scene'
import { Panel } from './components/overlay/Panel'
import { HomePanel } from './components/overlay/HomePanel'
import { CareerPanel } from './components/overlay/CareerPanel'
import { ProjectsPanel } from './components/overlay/ProjectsPanel'

export type PanelKey = 'home' | 'career' | 'projects' | null

function App() {
  const [entered, setEntered] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isNight, setIsNight] = useState(false)
  const [activePanel, setActivePanel] = useState<PanelKey>(null)

  if (!entered) {
    return (
      <Splash
        onEnter={(startMuted) => {
          setMuted(startMuted)
          setEntered(true)
        }}
      />
    )
  }

  return (
    <div className="experience">
      <div className="canvas-wrap">
        <Scene isNight={isNight} onOpenPanel={setActivePanel} />
      </div>

      <div className="hud">
        <button className="hud-btn" title="Info" onClick={() => setActivePanel('home')}>
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
