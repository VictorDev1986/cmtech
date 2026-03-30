const UtilityBar = ({ links }) => {
  return (
    <div className="utility-bar">
      <div className="utility-links">
        {links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="utility-actions">
        <button type="button" className="link">
          Iniciar sesion
        </button>
      </div>
    </div>
  )
}

export default UtilityBar
