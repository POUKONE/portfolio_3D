const FORMATION = [
  {
    school: 'University Name',
    degree: 'M.Sc. in Something',
    period: '2010 - 2012',
    notes: 'Academy graduate — replace with your own qualifications.',
  },
  {
    school: 'Another Institution',
    degree: 'B.Sc. in Something',
    period: '2007 - 2010',
    notes: 'Where the fundamentals were drilled in.',
  },
]

export function FormationPanel() {
  return (
    <div>
      <span className="tag">Academy</span>
      <h2>Formation</h2>
      <p style={{ marginBottom: 18 }}>Youth academy and training — replace with your own education history.</p>
      {FORMATION.map((f) => (
        <div className="timeline-item" key={f.school}>
          <h3>
            {f.degree} · {f.school}
          </h3>
          <span className="period">{f.period}</span>
          <p>{f.notes}</p>
        </div>
      ))}
    </div>
  )
}
