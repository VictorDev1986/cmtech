import { useMemo } from 'react'

const CatalogSection = ({
  title,
  subtitle,
  items,
  categories,
  activeCategory,
  onCategorySelect,
  searchQuery,
  onAction,
  showMeta = true,
}) => {
  const visible = useMemo(() => {
    let filtered = items
    if (activeCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === activeCategory)
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((item) =>
        `${item.name} ${item.description || ''} ${item.brand || ''}`
          .toLowerCase()
          .includes(query)
      )
    }
    return filtered
  }, [items, activeCategory, searchQuery])

  const total = items.length
  const shown = visible.length

  return (
    <section className="catalog-section">
      <div className="section-title">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className="catalog-toolbar">
        <div className="catalog-summary">
          <strong>{shown}</strong>
          <span>de {total} items</span>
        </div>
        <div className="catalog-tags">
          <button
            type="button"
            className={activeCategory === 'all' ? 'active' : ''}
            onClick={() => onCategorySelect?.('all')}
          >
            Todo
          </button>
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={activeCategory === category.slug ? 'active' : ''}
              onClick={() => onCategorySelect?.(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="product-grid">
        {visible.map((item) => (
          <article className="product-card" key={item.id}>
            <div className="product-image">
              <img src={item.image} alt={item.name} />
            </div>
            <span className="badge">{item.badge}</span>
            <div className="product-body">
              {showMeta && item.brand ? (
                <span className="brand">{item.brand}</span>
              ) : null}
              <h3>{item.name}</h3>
              {item.description ? (
                <p className="product-description">{item.description}</p>
              ) : null}
              <div className="price-row">
                <p className="price">{item.price}</p>
              </div>
              {showMeta ? (
                <span className="product-stock">
                  {item.type === 'servicio'
                    ? 'Servicio'
                    : item.stock || 'Disponible'}
                </span>
              ) : null}
              <button type="button" onClick={() => onAction?.(item)}>
                {item.type === 'servicio' ? 'Solicitar' : 'Agregar al carro'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default CatalogSection
