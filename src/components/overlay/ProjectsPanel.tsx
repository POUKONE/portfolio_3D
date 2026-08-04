const PROJECTS: { number: string; name: string; status: string; desc: string; link?: string }[] = [
  {
    number: '01',
    name: '100Plante',
    status: 'En ligne',
    desc: 'Détection de maladies foliaires par transfer learning : pipeline ML sur 54 300 images (PlantVillage), MobileNetV2 à 96,5% d’accuracy, API FastAPI et frontend Next.js déployés en production.',
    link: 'https://100-plante.vercel.app',
  },
  {
    number: '02',
    name: 'DataFinder',
    status: 'En ligne',
    desc: 'Moteur de recherche de datasets : catalogue de 10 030 jeux de données depuis 5 API publiques, recherche plein texte, API REST authentifiée et 67 tests automatisés en CI.',
    link: 'https://github.com/POUKONE/DataFinder',
  },
  {
    number: '03',
    name: 'PoukAI',
    status: 'En ligne',
    desc: 'Assistant IA d’analyse de réunions : transcription audio (Whisper) puis résumé structuré (LLaMA 3.3), interface React avec authentification et crédits.',
    link: 'https://poukai.fr',
  },
  {
    number: '04',
    name: 'BatiPro ERP',
    status: 'Projet personnel',
    desc: 'ERP web full-stack pour une PME du bâtiment : base PostgreSQL centralisant clients, stocks, ventes et chantiers, API FastAPI, contrôles transactionnels et gestion des rôles.',
  },
  {
    number: '05',
    name: 'Fala AI',
    status: 'Projet personnel',
    desc: 'Plateforme de suivi de candidatures avec moteur de scoring candidat-offre, analyse sémantique des postes et IA générative pour l’extraction et la préparation aux entretiens.',
  },
  {
    number: '06',
    name: 'Gestion des patients',
    status: 'Projet académique',
    desc: 'Application desktop CRUD (Python/Tkinter/MySQL) : modélisation du schéma relationnel, requêtes paramétrées sécurisées et recherche full-text en mémoire.',
    link: 'https://github.com/POUKONE/Application-de-gestion-des-patients',
  },
  {
    number: '07',
    name: 'Pac-Man',
    status: 'Projet scolaire',
    desc: 'Jeu Java/Swing avec IA de fantômes (heuristique de distance Manhattan), sons synthétisés en temps réel et packaging en exécutable autonome (JLink).',
  },
  {
    number: '08',
    name: 'Météo Desktop',
    status: 'Projet personnel',
    desc: 'Application Python (Tkinter/CustomTkinter) consommant l’API OpenWeatherMap avec traitement asynchrone, design system cohérent et gestion sécurisée des clés API.',
    link: 'https://github.com/POUKONE/Application-M-t-o-Python',
  },
]

export function ProjectsPanel() {
  return (
    <div>
      <span className="tag">Best-of</span>
      <h2>Projets</h2>
      <p style={{ marginBottom: 18 }}>Mes meilleures actions, du machine learning au full-stack.</p>
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
            {p.link && (
              <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                Voir le projet ▸
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
