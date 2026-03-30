const CategoryGrid = ({ categories, activeCategory, onSelect }) => {
  return (
    <section className="category-grid">
      <div className="section-title">
        <h2>Comprar por categorias</h2>
        <p>Encuentra lo que necesitas para tu empresa o hogar.</p>
      </div>
      <div className="grid">
        {categories.map((category) => (
          <article
            className={`product-card category-card ${
              activeCategory === category.slug ? 'active' : ''
            }`}
            key={category.slug}
            onClick={() => onSelect(category.slug)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                onSelect(category.slug)
              }
            }}
          >
            <div className="product-image">
              <img src={category.image} alt={category.name} />
            </div>
            <div className="product-body">
              <h3>{category.name}</h3>
              <p className="product-description">
                {category.details
                  ? category.details.slice(0, 2).join(' · ')
                  : 'Ver soluciones y catalogo disponible.'}
              </p>
              <span className="product-stock">
                {category.type === 'servicio' ? 'Servicio' : 'Producto'}
              </span>
              <button type="button">Ver categoria</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CategoryGrid
