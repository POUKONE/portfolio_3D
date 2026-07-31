const INTERESTS = [
  { number: '01', name: 'Football', detail: 'AS AFC Clamart' },
  { number: '02', name: 'Otaku', detail: 'Anime & manga' },
  { number: '03', name: 'Musique', detail: '' },
]

export function InterestsPanel() {
  return (
    <div>
      <span className="tag">En Dehors du Terrain</span>
      <h2>Intérêts &amp; Loisirs</h2>
      <p style={{ marginBottom: 18 }}>Ma feuille de match, en dehors du terrain.</p>
      <div className="teamsheet">
        {INTERESTS.map((i) => (
          <div className="teamsheet-row" key={i.number}>
            <span className="teamsheet-number">{i.number}</span>
            <span className="teamsheet-name">{i.name}</span>
            {i.detail && <span className="teamsheet-detail">{i.detail}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
