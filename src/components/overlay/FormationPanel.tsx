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

const CERTIFICATIONS: { title: string; issuer: string; period: string; notes: string; verify?: string }[] = [
  {
    title: 'Data Science Job Simulation — BCG X',
    issuer: 'Forage',
    period: '09/2026',
    notes:
      'Analyse de churn client pour XYZ Analytics (identification des données clés, démarche d’investigation stratégique), analyse de données en Python (Pandas, NumPy) avec visualisation des tendances, et modèle Random Forest optimisé (50% de rappel) accompagné d’une synthèse exécutive avec recommandations actionnables.',
    verify:
      'https://www.theforage.com/completion-certificates/SKZxezskWgmFjRvj9/Tcz8gTtprzAS4xSoK_SKZxezskWgmFjRvj9_69d5227590814bf6c8cf9490_1788702917194_completion_certificate.pdf',
  },
  {
    title: 'Data Science Job Simulation — British Airways',
    issuer: 'Forage',
    period: '09/2026',
    notes:
      'Simulation sur le rôle de la data science dans la réussite de British Airways : scraping et analyse d’avis clients, puis modèle prédictif des facteurs influençant le comportement d’achat.',
    verify:
      'https://www.theforage.com/completion-certificates/tMjbs76F526fF5v3G/NjynCWzGSaWXQCxSX_tMjbs76F526fF5v3G_69d5227590814bf6c8cf9490_1788662355460_completion_certificate.pdf',
  },
  {
    title: 'Getting Started with Data',
    issuer: 'IBM SkillsBuild',
    period: '09/2026',
    notes:
      'Notions fondamentales de la donnée : types de données, big data, processus d’analyse, visualisation et paysage de la data science, avec une première pratique d’un outil d’analyse (import, analyse et visualisation de données — Tableau).',
    verify: 'https://www.credly.com/badges/84a16afb-78ed-46fb-aea2-3ace5f1526c3',
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

      <h3 style={{ marginTop: 28, marginBottom: 4 }}>Certifications</h3>
      {CERTIFICATIONS.map((c) => (
        <div className="timeline-item" key={c.title}>
          <span className="period">{c.period}</span>
          <h3>{c.title}</h3>
          <p className="role-label">{c.issuer}</p>
          <p>{c.notes}</p>
          {c.verify && (
            <a href={c.verify} target="_blank" rel="noreferrer" className="project-link">
              Vérifier ▸
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
