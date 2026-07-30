export function HelpPanel() {
  return (
    <div>
      <span className="tag">Officiel de Match</span>
      <h2>Comment Naviguer</h2>
      <p style={{ marginBottom: 18 }}>Quelques conseils de l'arbitre avant le coup d'envoi.</p>
      <div className="stat-row">
        <span>Joueurs</span>
        <span>Clique sur l'un d'eux pour ouvrir une section</span>
      </div>
      <div className="stat-row">
        <span>But lointain</span>
        <span>Tire dedans pour me contacter</span>
      </div>
      <div className="stat-row">
        <span>Icônes HUD</span>
        <span>Infos, bruit de foule, jour / nuit</span>
      </div>
    </div>
  )
}
