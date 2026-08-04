const INTERESTS = [
  {
    number: '01',
    name: 'Football',
    detail: 'AS AFC Clamart',
    note: 'J’évolue au poste de défenseur central. Un groupe qui vit bien, sur le terrain comme en dehors.',
  },
  {
    number: '02',
    name: 'Otaku',
    detail: 'Anime & manga',
    note: 'Les mangas transmettent des valeurs que j’essaie de garder au quotidien : la motivation et le dépassement de soi face à l’échec, la persévérance, et l’esprit d’équipe.',
  },
  {
    number: '03',
    name: 'Musique',
    detail: '',
    note: 'Un facteur qui apaise l’esprit et augmente la productivité au quotidien.',
  },
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
            <div className="teamsheet-header">
              <span className="teamsheet-number">{i.number}</span>
              <span className="teamsheet-name">{i.name}</span>
              {i.detail && <span className="teamsheet-detail">{i.detail}</span>}
            </div>
            {i.note && <p className="teamsheet-note">{i.note}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
