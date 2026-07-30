const CONTACT_LINKS = [
  { label: 'Email', value: 'you@example.com', href: 'mailto:you@example.com' },
  { label: 'LinkedIn', value: 'linkedin.com/in/you', href: 'https://linkedin.com/in/you' },
  { label: 'GitHub', value: 'github.com/you', href: 'https://github.com/you' },
]

export function ContactPanel() {
  return (
    <div>
      <span className="tag">Goal!</span>
      <h2>Get in touch</h2>
      <p style={{ marginBottom: 18 }}>
        That's a goal — replace these links with your own contact details.
      </p>
      {CONTACT_LINKS.map((link) => (
        <div className="stat-row" key={link.label}>
          <span>{link.label}</span>
          <a href={link.href} target="_blank" rel="noreferrer">
            {link.value}
          </a>
        </div>
      ))}
    </div>
  )
}
