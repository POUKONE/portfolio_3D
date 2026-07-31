const LANGUAGES = [
  { name: 'Français', level: 'Langue maternelle' },
  { name: 'Anglais', level: 'Pratiqué' },
  { name: 'Allemand', level: 'Pratiqué' },
]

export function LanguagesPanel() {
  return (
    <div>
      <span className="tag">Feuille de Match</span>
      <h2>Langues</h2>
      <p style={{ marginBottom: 18 }}>Les langues que je parle.</p>
      {LANGUAGES.map((l) => (
        <div className="stat-row" key={l.name}>
          <span>{l.name}</span>
          <span>{l.level}</span>
        </div>
      ))}
    </div>
  )
}
