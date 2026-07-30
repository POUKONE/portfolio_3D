export function HomePanel() {
  return (
    <div>
      <span className="tag">Starting XI</span>
      <h2>Ibrahima Poukone</h2>
      <p style={{ marginBottom: 18 }}>
        Data Lover — playing every position from raw pipeline to polished dashboard. Replace
        this copy with your own TLDR, the same way a manager reads out the matchday lineup.
      </p>

      <div className="stat-row">
        <span>Position</span>
        <span>Data Lover</span>
      </div>
      <div className="stat-row">
        <span>Years in the league</span>
        <span>10+</span>
      </div>
      <div className="stat-row">
        <span>Signature move</span>
        <span>Turning prototypes into production</span>
      </div>
      <div className="stat-row">
        <span>Club</span>
        <span>IbraPkn FC</span>
      </div>

      <p style={{ marginTop: 18 }}>
        Click any <strong>player</strong> on the pitch to open a section, or shoot at the{' '}
        <strong>far goal</strong> to get in touch.
      </p>
    </div>
  )
}
