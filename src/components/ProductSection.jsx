const ProductSection = ({
  title,
  subtitle,
  products,
  onAction,
  className,
  showMeta = true,
}) => {
  return (
    <section className={`product-section ${className || ''}`.trim()}>
      <div className="section-title">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article
            className="product-card"
            key={product.id || product.name}
            id={product.id ? `item-${product.id}` : undefined}
          >
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <span className="badge">{product.badge}</span>
            <div className="product-body">
              {showMeta && product.brand ? (
                <span className="brand">{product.brand}</span>
              ) : null}
              <h3>{product.name}</h3>
              {product.description ? (
                <p className="product-description">{product.description}</p>
              ) : null}
              <div className="price-row">
                <p className="price">{product.price}</p>
                {product.oldPrice ? (
                  <span className="old-price">{product.oldPrice}</span>
                ) : null}
              </div>
              {showMeta ? (
                <span className="product-stock">
                  {product.type === 'servicio'
                    ? 'Servicio'
                    : product.stock || 'Disponible'}
                </span>
              ) : null}
              <button type="button" onClick={() => onAction?.(product)}>
                {product.type === 'servicio' ? 'Solicitar' : 'Agregar al carro'}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProductSection
