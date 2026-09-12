import { faviconUrl } from '../../favicon'

// Real favicons of each tool's official site — at this size (16px, listed
// as "I used this tool") this is standard nominative use, the same as any
// tech-stack badge row, not the brand-impersonation risk a reproduced
// sports crest would be. A plain emoji is kept only where the skill is a
// concept/technique rather than a named product with a site to fetch from.
const SKILL_ICONS: Record<string, { domain: string } | { emoji: string }> = {
  Python: { domain: 'python.org' },
  R: { domain: 'r-project.org' },
  SQL: { emoji: '🗄️' },
  'Power BI': { domain: 'powerbi.microsoft.com' },
  Tableau: { domain: 'tableau.com' },
  'TensorFlow/Keras': { domain: 'tensorflow.org' },
  'Scikit-learn': { domain: 'scikit-learn.org' },
  'Random Forest': { domain: 'scikit-learn.org' },
  Pandas: { domain: 'pandas.pydata.org' },
  NumPy: { domain: 'numpy.org' },
  Matplotlib: { domain: 'matplotlib.org' },
  Seaborn: { domain: 'seaborn.pydata.org' },
  ETL: { domain: 'talend.com' },
  Statistiques: { emoji: '📈' },

  'Groq API': { domain: 'groq.com' },
  Whisper: { domain: 'openai.com' },
  'LLaMA 3.3': { domain: 'llama.meta.com' },
  'Prompt Engineering': { emoji: '💬' },
  'Analyse sémantique': { emoji: '🧩' },
  "Extraction d'info": { emoji: '🔍' },
  'Web of Linked Data': { domain: 'w3.org' },

  'Schémas relationnels': { emoji: '🗂️' },
  'Migrations DB': { emoji: '🔁' },
  PostgreSQL: { domain: 'postgresql.org' },
  MySQL: { domain: 'mysql.com' },
  JSONB: { domain: 'postgresql.org' },
  Géocodage: { domain: 'nominatim.org' },
  Haversine: { emoji: '📏' },
  'Web Scraping': { emoji: '🕷️' },

  FastAPI: { domain: 'fastapi.tiangolo.com' },
  'Node.js/Express': { domain: 'nodejs.org' },
  SQLAlchemy: { domain: 'sqlalchemy.org' },
  Pydantic: { domain: 'pydantic.dev' },
  Alembic: { domain: 'alembic.sqlalchemy.org' },
  PHP: { domain: 'php.net' },
  Java: { domain: 'java.com' },
  'API REST': { emoji: '🔌' },

  React: { domain: 'react.dev' },
  'Next.js': { domain: 'nextjs.org' },
  TypeScript: { domain: 'typescriptlang.org' },
  JavaScript: { domain: 'developer.mozilla.org' },
  HTML: { domain: 'developer.mozilla.org' },
  CSS: { domain: 'developer.mozilla.org' },
  'Tkinter/CustomTkinter': { domain: 'python.org' },

  Git: { domain: 'git-scm.com' },
  GitHub: { domain: 'github.com' },
  'GitHub Actions': { domain: 'github.com' },
  Docker: { domain: 'docker.com' },
  Vercel: { domain: 'vercel.com' },
  'Fly.io': { domain: 'fly.io' },
  Render: { domain: 'render.com' },
  'VS Code': { domain: 'code.visualstudio.com' },
}

const SKILL_GROUPS = [
  {
    name: 'Data & Machine Learning',
    tags: [
      'Python',
      'R',
      'SQL',
      'Power BI',
      'Tableau',
      'TensorFlow/Keras',
      'Scikit-learn',
      'Random Forest',
      'Pandas',
      'NumPy',
      'Matplotlib',
      'Seaborn',
      'ETL',
      'Statistiques',
    ],
  },
  {
    name: 'IA Générative & NLP',
    tags: ['Groq API', 'Whisper', 'LLaMA 3.3', 'Prompt Engineering', 'Analyse sémantique', "Extraction d'info", 'Web of Linked Data'],
  },
  {
    name: 'Data Engineering & BDD',
    tags: ['Schémas relationnels', 'Migrations DB', 'PostgreSQL', 'MySQL', 'JSONB', 'Géocodage', 'Haversine', 'Web Scraping'],
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
              {g.tags.map((t) => {
                const icon = SKILL_ICONS[t]
                return (
                  <span className="skill-chip" key={t}>
                    {icon && 'domain' in icon ? (
                      <img className="skill-chip-icon" src={faviconUrl(icon.domain)} alt="" width={16} height={16} />
                    ) : (
                      <span className="skill-chip-icon">{icon?.emoji ?? '⚙️'}</span>
                    )}
                    {t}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
