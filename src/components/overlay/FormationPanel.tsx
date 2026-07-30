const FORMATION = [
  {
    school: 'Nom de l’Université',
    degree: 'Master en Quelque Chose',
    period: '2010 - 2012',
    notes: 'Diplômé du centre de formation — remplace par tes propres qualifications.',
  },
  {
    school: 'Autre Établissement',
    degree: 'Licence en Quelque Chose',
    period: '2007 - 2010',
    notes: 'Là où les bases ont été acquises.',
  },
]

export function FormationPanel() {
  return (
    <div>
      <span className="tag">Centre de Formation</span>
      <h2>Formation</h2>
      <p style={{ marginBottom: 18 }}>Centre de formation et apprentissage — remplace par ton propre parcours scolaire.</p>
      {FORMATION.map((f) => (
        <div className="timeline-item" key={f.school}>
          <h3>
            {f.degree} · {f.school}
          </h3>
          <span className="period">{f.period}</span>
          <p>{f.notes}</p>
        </div>
      ))}
    </div>
  )
}
