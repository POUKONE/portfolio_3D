// Generic pictograms stand in for each tool's logo — reproducing the real
// trademarked brand marks pixel-for-pixel would raise the same rights issue
// as copying a real league crest, so these are evocative, not exact.
const SKILL_ICONS: Record<string, string> = {
  Python: '🐍',
  R: '📐',
  SQL: '🗄️',
  'Power BI': '📊',
  'TensorFlow/Keras': '🧠',
  'Scikit-learn': '🤖',
  Matplotlib: '📉',
  Seaborn: '🌊',
  ETL: '🔄',
  Statistiques: '📈',

  'Groq API': '⚡',
  Whisper: '🎙️',
  'LLaMA 3.3': '🦙',
  'Prompt Engineering': '💬',
  'Analyse sémantique': '🧩',
  "Extraction d'info": '🔍',
  'Web of Linked Data': '🕸️',

  'Schémas relationnels': '🗂️',
  'Migrations DB': '🔁',
  PostgreSQL: '🐘',
  MySQL: '🐬',
  JSONB: '🧾',
  Géocodage: '🗺️',
  Haversine: '📏',

  FastAPI: '🚀',
  'Node.js/Express': '🟢',
  SQLAlchemy: '🗃️',
  Pydantic: '✅',
  Alembic: '🪜',
  PHP: '🐘',
  Java: '☕',
  'API REST': '🔌',

  React: '⚛️',
  'Next.js': '🧭',
  TypeScript: '🔷',
  JavaScript: '🟨',
  HTML: '🏗️',
  CSS: '🎨',
  'Tkinter/CustomTkinter': '🖼️',

  Git: '🔀',
  GitHub: '🐙',
  'GitHub Actions': '⚙️',
  Docker: '🐳',
  Vercel: '🌐',
  'Fly.io': '🪁',
  Render: '🌩️',
  'VS Code': '💻',
}

const SKILL_GROUPS = [
  {
    name: 'Data & Machine Learning',
    tags: ['Python', 'R', 'SQL', 'Power BI', 'TensorFlow/Keras', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'ETL', 'Statistiques'],
  },
  {
    name: 'IA Générative & NLP',
    tags: ['Groq API', 'Whisper', 'LLaMA 3.3', 'Prompt Engineering', 'Analyse sémantique', "Extraction d'info", 'Web of Linked Data'],
  },
  {
    name: 'Data Engineering & BDD',
    tags: ['Schémas relationnels', 'Migrations DB', 'PostgreSQL', 'MySQL', 'JSONB', 'Géocodage', 'Haversine'],
  },
  {
    name: 'Backend & API',
    tags: ['FastAPI', 'Node.js/Express', 'SQLAlchemy', 'Pydantic', 'Alembic', 'PHP', 'Java', 'API REST'],
  },
  {
    name: 'Frontend',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tkinter/CustomTkinter'],
  },
  {
    name: 'Outils & DevOps',
    tags: ['Git', 'GitHub', 'GitHub Actions', 'Docker', 'Vercel', 'Fly.io', 'Render', 'VS Code'],
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
