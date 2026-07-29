const PROJECTS = [
  {
    name: 'Project One',
    status: 'Live',
    tags: ['React', 'Node.js', 'Postgres'],
    desc: 'Short description of the project and your role in it.',
  },
  {
    name: 'Project Two',
    status: 'Ongoing',
    tags: ['AI', 'RAG', 'Python'],
    desc: 'Short description of the project and your role in it.',
  },
  {
    name: 'Project Three',
    status: 'Open Source',
    tags: ['TypeScript', 'CLI'],
    desc: 'Short description of the project and your role in it.',
  },
]

export function ProjectsPanel() {
  return (
    <div>
      <span className="tag">Highlight Reel</span>
      <h2>Projects</h2>
      <p style={{ marginBottom: 18 }}>Your top plays — swap in your own project list.</p>
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
