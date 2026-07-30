const INTERESTS = ['Five-a-side football', 'Chess', 'Photography', 'Hiking']

export function InterestsPanel() {
  return (
    <div>
      <span className="tag">Off the Pitch</span>
      <h2>Intérêts &amp; Loisirs</h2>
      <p style={{ marginBottom: 18 }}>What keeps the batteries charged — replace with your own.</p>
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
