const LANGUAGES = [
  { name: 'French', level: 'Native' },
  { name: 'English', level: 'Fluent' },
  { name: 'Spanish', level: 'Conversational' },
]

export function LanguagesPanel() {
  return (
    <div>
      <span className="tag">Team Sheet</span>
      <h2>Langues</h2>
      <p style={{ marginBottom: 18 }}>Languages spoken — replace with your own.</p>
      {LANGUAGES.map((l) => (
        <div className="stat-row" key={l.name}>
          <span>{l.name}</span>
          <span>{l.level}</span>
        </div>
      ))}
    </div>
  )
}
