export function HomePanel() {
  return (
    <div>
      <span className="tag">Titulaire</span>
      <h2>Ibrahima Poukone</h2>
      <p style={{ marginBottom: 18 }}>
        Passionné de data — je joue à tous les postes, du pipeline brut au tableau de bord
        soigné. Remplace ce texte par ton propre résumé, comme un manager annonce la
        composition avant le match.
      </p>

      <div className="stat-row">
        <span>Poste</span>
        <span>Passionné de Data</span>
      </div>
      <div className="stat-row">
        <span>Années dans le métier</span>
        <span>10+</span>
      </div>
      <div className="stat-row">
        <span>Coup de signature</span>
        <span>Transformer les prototypes en production</span>
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
