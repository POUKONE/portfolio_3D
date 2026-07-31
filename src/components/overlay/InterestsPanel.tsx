const INTERESTS = ['Football (AS AFC Clamart)', 'Otaku', 'Musique']

export function InterestsPanel() {
  return (
    <div>
      <span className="tag">En Dehors du Terrain</span>
      <h2>Intérêts &amp; Loisirs</h2>
      <p style={{ marginBottom: 18 }}>Ce qui recharge les batteries — remplace par les tiens.</p>
      <div className="badges">
        {INTERESTS.map((i) => (
          <span className="badge" key={i}>
            {i}
          </span>
        ))}
      </div>
    </div>
  )
}
