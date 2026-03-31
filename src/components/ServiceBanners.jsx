const ServiceBanners = ({ items, onAction }) => {
  if (!items || items.length === 0) return null

  return (
    <section className="service-banners">
      {items.map((item) => (
        <article className="service-banner" key={item.title}>
          <div className="service-banner-media">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="service-banner-overlay" />
          <div className="service-banner-content">
            <span className="service-label">Servicio</span>
            <h3>{item.title}</h3>
            <p className="service-subtitle">{item.subtitle}</p>
            <p className="service-description">{item.description}</p>
            <button type="button" onClick={() => onAction?.(item)}>
              {item.cta}
            </button>
          </div>
        </article>
      ))}
    </section>
  )
}

export default ServiceBanners
