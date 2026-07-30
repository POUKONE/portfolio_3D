const EXPERIENCE = [
  {
    club: 'Current Club Inc.',
    role: 'Senior Architect',
    period: '2022 - Present',
    notes: 'Leading platform architecture and mentoring the squad.',
  },
  {
    club: 'Previous Club Co.',
    role: 'Technical Architect',
    period: '2019 - 2022',
    notes: 'Led the frontend chapter and design system rollout.',
  },
  {
    club: 'First Startup FC',
    role: 'Founding Engineer',
    period: '2012 - 2019',
    notes: 'Wore every jersey number: backend, frontend, DevOps.',
  },
]

export function ExperiencePanel() {
  return (
    <div>
      <span className="tag">Match History</span>
      <h2>Experience</h2>
      <p style={{ marginBottom: 18 }}>Work history across clubs — replace with your own timeline.</p>
      {EXPERIENCE.map((c) => (
        <div className="timeline-item" key={c.club}>
          <h3>
            {c.role} · {c.club}
          </h3>
          <span className="period">{c.period}</span>
          <p>{c.notes}</p>
        </div>
      ))}
    </div>
  )
}
