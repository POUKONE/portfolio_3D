const EXPERIENCE = [
  {
    club: 'SOGESCOM SARL, Cameroun',
    role: 'Stagiaire Analyse de données et Statistiques Numériques',
    period: '06/2024 - 08/2024',
    notes:
      'Conception de tableaux de bord interactifs sous Power BI (+25% de clarté des rapports internes), analyse avancée en Python et R pour identifier des tendances clés, et animation de sessions de formation aux outils d’analyse de données.',
  },
  {
    club: 'Locatech Services SARL, Cameroun',
    role: 'Stagiaire Analyste de données',
    period: '07/2023 - 09/2023',
    notes:
      'Implémentation d’un modèle de régression linéaire prédisant les dépenses sportives futures avec 85% de précision, optimisation des paramètres statistiques et intégration des résultats dans des supports visuels pour les décideurs.',
  },
  {
    club: 'Cyon Group International, Cameroun',
    role: 'Stagiaire Développeur Web',
    period: '06/2022 - 08/2022',
    notes:
      'Développement et maintenance de sites web dynamiques (HTML, CSS, JavaScript, PHP), conception d’interfaces utilisateur et contribution à de nouvelles fonctionnalités pour l’espace client.',
  },
  {
    club: 'Projets personnels',
    role: 'Assistant numérique & gestion hospitalière',
    period: '08/2018 - 01/2019',
    notes:
      'Outil automatisé de comptes rendus de réunion (-40% de temps de rédaction), analyse de la performance et de la rentabilité commerciale d’une entreprise, et implémentation d’un système de gestion hospitalière (Linux, API REST, sécurité web).',
  },
]

export function ExperiencePanel() {
  return (
    <div>
      <span className="tag">Historique des Matchs</span>
      <h2>Expérience</h2>
      <p style={{ marginBottom: 18 }}>Mon parcours professionnel, saison après saison.</p>
      {EXPERIENCE.map((c) => (
        <div className="timeline-item" key={c.club}>
          <span className="period">{c.period}</span>
          <h3>{c.club}</h3>
          <p className="role-label">{c.role}</p>
          <p>{c.notes}</p>
        </div>
      ))}
    </div>
  )
}
