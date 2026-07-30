const LANGUAGES = [
  { name: 'Français', level: 'Natif' },
  { name: 'Anglais', level: 'Courant' },
  { name: 'Espagnol', level: 'Conversationnel' },
]

export function LanguagesPanel() {
  return (
    <div>
      <span className="tag">Feuille de Match</span>
      <h2>Langues</h2>
      <p style={{ marginBottom: 18 }}>Langues parlées — remplace par les tiennes.</p>
      {LANGUAGES.map((l) => (
        <div className="stat-row" key={l.name}>
          <span>{l.name}</span>
          <span>{l.level}</span>
        </div>
      ))}
    </div>
  )
}
