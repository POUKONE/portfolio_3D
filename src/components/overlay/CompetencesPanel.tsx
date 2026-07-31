// Generic pictograms stand in for each tool's logo — reproducing the real
// trademarked brand marks pixel-for-pixel would raise the same rights issue
// as copying a real league crest, so these are evocative, not exact.
const SKILL_ICONS: Record<string, string> = {
  'Power BI': '📊',
  Python: '🐍',
  R: '📐',
  SQL: '🗄️',
  PostgreSQL: '🐘',
  ETL: '🔄',
  'Scikit-learn': '🤖',
  Matplotlib: '📉',
  Seaborn: '🌊',
  HTML: '🏗️',
  CSS: '🎨',
  JavaScript: '🟨',
  PHP: '🐘',
  Git: '🔀',
  'VS Code': '💻',
  STM32: '🔌',
  Tinkercad: '🧊',
  Matlab: '🧮',
  'Microsoft Office': '📎',
  WordPress: '📝',
  Hostinger: '🖥️',
  Zapier: '⚡',
}

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
      <p style={{ marginBottom: 18 }}>Compétences clés, par catégorie.</p>
      <div className="card-grid">
        {SKILL_GROUPS.map((g) => (
          <div className="project-card" key={g.name}>
            <h3>{g.name}</h3>
            <div className="badges">
              {g.tags.map((t) => (
                <span className="skill-chip" key={t}>
                  <span className="skill-chip-icon">{SKILL_ICONS[t] ?? '⚙️'}</span>
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
