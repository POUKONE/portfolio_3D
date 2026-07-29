export function HomePanel() {
  return (
    <div>
      <span className="tag">Starting XI</span>
      <h2>Your Name</h2>
      <p style={{ marginBottom: 18 }}>
        Full Stack Developer &amp; Architect — playing every position from backend defense to
        frontend attack. Replace this copy with your own TLDR, the same way a manager reads out
        the matchday lineup.
      </p>

      <div className="stat-row">
        <span>Position</span>
        <span>Full Stack / Architect</span>
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
        <span>Your Company</span>
      </div>

      <p style={{ marginTop: 18 }}>
        Click the <strong>goals</strong> on the pitch to see career history, or the{' '}
        <strong>ball</strong> to see the project lineup.
      </p>
    </div>
  )
}
