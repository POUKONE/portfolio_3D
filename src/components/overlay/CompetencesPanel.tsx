const SKILL_GROUPS = [
  {
    name: 'Data & Analyse',
    tags: ['Power BI', 'Python', 'R', 'SQL', 'PostgreSQL', 'ETL', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
  },
  { name: 'Développement Web', tags: ['HTML', 'CSS', 'JavaScript', 'PHP'] },
  {
    name: 'Outils & Techno',
    tags: ['Git', 'VS Code', 'STM32', 'Tinkercad', 'Matlab', 'Microsoft Office', 'WordPress', 'Hostinger', 'Zapier'],
  },
]

export function CompetencesPanel() {
  return (
    <div>
      <span className="tag">Plan de Jeu</span>
      <h2>Compétences</h2>
      <p style={{ marginBottom: 18 }}>Compétences clés — remplace par les tiennes.</p>
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
