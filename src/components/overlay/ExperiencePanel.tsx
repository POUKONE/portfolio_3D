const EXPERIENCE = [
  {
    club: 'Club Actuel Inc.',
    role: 'Architecte Senior',
    period: '2022 - Présent',
    notes: 'Direction de l’architecture de la plateforme et mentorat de l’équipe.',
  },
  {
    club: 'Club Précédent Co.',
    role: 'Architecte Technique',
    period: '2019 - 2022',
    notes: 'Direction du pôle frontend et déploiement du design system.',
  },
  {
    club: 'Première Startup FC',
    role: 'Ingénieur Fondateur',
    period: '2012 - 2019',
    notes: 'A porté tous les maillots : backend, frontend, DevOps.',
  },
]

export function ExperiencePanel() {
  return (
    <div>
      <span className="tag">Historique des Matchs</span>
      <h2>Expérience</h2>
      <p style={{ marginBottom: 18 }}>Parcours professionnel entre les clubs — remplace par ta propre chronologie.</p>
      {EXPERIENCE.map((c) => (
        <div className="timeline-item" key={c.club}>
          <h3>
            {c.role} · {c.club}
          </h3>
          <span className="period">{c.period}</span>
          <p>{c.notes}</p>
        </div>
      ))}
    </div>
  )
}
