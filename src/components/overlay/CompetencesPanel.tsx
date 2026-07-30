const SKILL_GROUPS = [
  { name: 'Languages & Frameworks', tags: ['TypeScript', 'Python', 'React'] },
  { name: 'Data & Infra', tags: ['SQL', 'Airflow', 'Docker'] },
  { name: 'Soft Skills', tags: ['Leadership', 'Communication'] },
]

export function CompetencesPanel() {
  return (
    <div>
      <span className="tag">Playbook</span>
      <h2>Compétences</h2>
      <p style={{ marginBottom: 18 }}>Core skillset — replace with your own.</p>
      <div className="card-grid">
        {SKILL_GROUPS.map((g) => (
          <div className="project-card" key={g.name}>
            <h3>{g.name}</h3>
            <div className="badges">
              {g.tags.map((t) => (
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
