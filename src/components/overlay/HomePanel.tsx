export function HomePanel() {
  return (
    <div>
      <span className="tag">Alternance 2025</span>
      <h2>Ibrahima Poukone</h2>
      <p style={{ marginBottom: 18 }}>
        Doté de 2 années d'expérience dans le domaine de la data, je mets mon expertise —
        acquise au sein de plusieurs entreprises — au service d'un poste en alternance. Ma
        maîtrise des notions et outils de la data science, ainsi que mon engagement, sont mes
        principaux atouts.
      </p>

      <div className="stat-row">
        <span>Poste</span>
        <span>Convergence Énergie & Data</span>
      </div>
      <div className="stat-row">
        <span>Années d'expérience</span>
        <span>2+</span>
      </div>
      <div className="stat-row">
        <span>Coup de signature</span>
        <span>Des dashboards Power BI (+25% de clarté)</span>
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
