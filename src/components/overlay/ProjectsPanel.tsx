const PROJECTS = [
  {
    name: 'Projet Un',
    status: 'En ligne',
    tags: ['React', 'Node.js', 'Postgres'],
    desc: 'Courte description du projet et de ton rôle.',
  },
  {
    name: 'Projet Deux',
    status: 'En cours',
    tags: ['IA', 'RAG', 'Python'],
    desc: 'Courte description du projet et de ton rôle.',
  },
  {
    name: 'Projet Trois',
    status: 'Open Source',
    tags: ['TypeScript', 'CLI'],
    desc: 'Courte description du projet et de ton rôle.',
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
            <h3>
              {p.name} <span style={{ color: '#8fcf9e', fontSize: '0.75rem' }}>· {p.status}</span>
            </h3>
            <p>{p.desc}</p>
            <div className="badges">
              {p.tags.map((t) => (
                <span className="badge" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
