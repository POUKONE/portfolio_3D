const FORMATION = [
  {
    school: 'ECAM EPMI, Cergy-Pontoise, France',
    degree: 'Bac +4 Convergence Énergie & Data',
    period: '2024 - Aujourd’hui',
    notes: 'Formation en alternance alliant ingénierie énergétique et sciences des données.',
  },
  {
    school: 'Prépa Saint Jean, Douala, Cameroun',
    degree: 'Cycle Préparatoire',
    period: '2022 - 2024',
    notes: 'Classe préparatoire aux grandes écoles d’ingénieurs.',
  },
  {
    school: 'Siantou, Yaoundé, Cameroun',
    degree: 'BTS +1 Informatique',
    period: '2021 - 2022',
    notes: 'Première année de BTS en informatique.',
  },
]

export function FormationPanel() {
  return (
    <div>
      <span className="tag">Centre de Formation</span>
      <h2>Formation</h2>
      <p style={{ marginBottom: 18 }}>Mon parcours académique, du Cameroun à la France.</p>
      {FORMATION.map((f) => (
        <div className="timeline-item" key={f.school}>
          <span className="period">{f.period}</span>
          <h3>{f.school}</h3>
          <p className="role-label">{f.degree}</p>
          <p>{f.notes}</p>
        </div>
      ))}
    </div>
  )
}
