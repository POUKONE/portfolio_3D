const PROJECTS = [
  {
    number: '01',
    name: 'Projet Un',
    status: 'En ligne',
    desc: 'Courte description du projet et de ton rôle.',
    link: '#',
  },
  {
    number: '02',
    name: 'Projet Deux',
    status: 'En cours',
    desc: 'Courte description du projet et de ton rôle.',
    link: '#',
  },
  {
    number: '03',
    name: 'Projet Trois',
    status: 'Open Source',
    desc: 'Courte description du projet et de ton rôle.',
    link: '#',
  },
]

export function ProjectsPanel() {
  return (
    <div>
      <span className="tag">Best-of</span>
      <h2>Projets</h2>
      <p style={{ marginBottom: 18 }}>Tes meilleures actions — remplace par ta propre liste de projets.</p>
      <div className="card-grid">
        {PROJECTS.map((p) => (
          <div className="project-card" key={p.name}>
            <div className="project-photo">
              <span className="project-photo-number">{p.number}</span>
              <span className="project-photo-icon">⚽</span>
            </div>
            <h3>
              {p.name} <span style={{ color: '#8fcf9e', fontSize: '0.75rem' }}>· {p.status}</span>
            </h3>
            <p>{p.desc}</p>
            <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
              Voir le projet ▸
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
