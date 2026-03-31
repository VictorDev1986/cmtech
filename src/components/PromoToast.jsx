const PromoToast = ({ item, visible, onView, onClose }) => {
  if (!item) return null

  return (
    <div className={`promo-toast ${visible ? 'show' : ''}`}>
      <div className="promo-thumb">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="promo-content">
        <div className="promo-header">
          <span className="promo-badge">Oferta</span>
          <button type="button" className="promo-close" onClick={onClose}>
            ×
          </button>
        </div>
        <strong>{item.name}</strong>
        {item.description ? <p>{item.description}</p> : null}
        <div className="promo-footer">
          <span>{item.price}</span>
          <button type="button" onClick={() => onView?.(item)}>
            Ver
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromoToast
