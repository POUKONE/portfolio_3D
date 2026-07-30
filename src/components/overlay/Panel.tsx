import type { ReactNode } from 'react'

export function Panel({ onClose, children }: { onClose: () => void; children: ReactNode }) {
  return (
    <div className="panel-backdrop" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
