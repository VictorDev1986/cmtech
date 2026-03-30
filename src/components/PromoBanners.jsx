const PromoBanners = ({ banners }) => {
  return (
    <section className="promo-banners">
      {banners.map((banner) => (
        <article className="promo" key={banner.title}>
          <img src={banner.image} alt={banner.title} />
          <div>
            <span>Destacado</span>
            <h3>{banner.title}</h3>
            <p>{banner.subtitle}</p>
          </div>
          <button type="button">Ver categoria</button>
        </article>
      ))}
    </section>
  )
}

export default PromoBanners
