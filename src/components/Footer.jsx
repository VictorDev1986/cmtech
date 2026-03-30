import logo from '../assets/CM-Tech1-1.png'

const Footer = ({ brand, groups }) => {
  return (
    <footer className="footer">
      <div>
        <div className="footer-logo">
          <img src={logo} alt="CM-Tech" />
        </div>
        <strong>{brand.name}</strong>
        <p>Venta de tecnologia y soluciones empresariales.</p>
      </div>
      {groups.map((group) => (
        <div key={group.title}>
          <h4>{group.title}</h4>
          {group.links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      ))}
    </footer>
  )
}

export default Footer
