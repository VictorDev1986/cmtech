const PromoBar = ({ text, items }) => {
  const message = items && items.length ? items.join(' • ') : text
  return (
    <div className="promo-bar">
      <div className="promo-track">
        <div className="promo-marquee">
          <span>{message}</span>
          <span>{message}</span>
        </div>
      </div>
    </div>
  )
}

export default PromoBar
