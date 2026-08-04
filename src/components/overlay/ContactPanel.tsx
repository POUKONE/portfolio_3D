const CONTACT_LINKS: { label: string; value: string; href?: string }[] = [
  { label: 'Email', value: 'ibrahimapoukone@gmail.com', href: 'mailto:ibrahimapoukone@gmail.com' },
  { label: 'Téléphone', value: '+33 7 59 86 87 22', href: 'tel:+33759868722' },
  { label: 'LinkedIn', value: 'ibrahima-poukone', href: 'https://linkedin.com/in/ibrahima-poukone' },
  { label: 'GitHub', value: 'ibrahimapoukone', href: 'https://github.com/ibrahimapoukone' },
  { label: 'Localisation', value: 'Paris, France' },
]

export function ContactPanel() {
  return (
    <div>
      <span className="tag">But !</span>
      <h2>Contacte-moi</h2>
      <p style={{ marginBottom: 18 }}>N'hésite pas à me contacter pour une alternance ou un projet.</p>
      {CONTACT_LINKS.map((link) => (
        <div className="stat-row" key={link.label}>
          <span>{link.label}</span>
          {link.href ? (
            <a href={link.href} target="_blank" rel="noreferrer">
              {link.value}
            </a>
          ) : (
            <span>{link.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}
