export function HomePanel() {
  return (
    <div>
      <span className="tag">Alternance 2026</span>
      <h2>Ibrahima Poukone</h2>
      <p style={{ marginBottom: 18 }}>
        Étudiant en Bac+4 Data & IA, fort de 2 ans d'expérience en data et développement
        backend, et de plusieurs projets menés de bout en bout : machine learning appliqué,
        ingénierie de données et applications full-stack déployées en production. À l'aise sur
        tout le cycle d'un projet data, de la modélisation à la mise en production.
      </p>

      <div className="stat-row">
        <span>Poste</span>
        <span>Data & IA</span>
      </div>
      <div className="stat-row">
        <span>Années d'expérience</span>
        <span>2+</span>
      </div>
      <div className="stat-row">
        <span>Coup de signature</span>
        <span>Un pipeline ML à 96% d'accuracy, déployé en production</span>
      </div>
      <div className="stat-row">
        <span>Club</span>
        <span>IbraPkn FC</span>
      </div>

      <p style={{ marginTop: 18 }}>
        Clique sur un <strong>joueur</strong> du terrain pour ouvrir une section, ou tire dans
        le <strong>but lointain</strong> pour me contacter.
      </p>
    </div>
  )
}
