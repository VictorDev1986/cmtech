const CartDrawer = ({
  open,
  items,
  subtotal,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
  onCheckout,
}) => {
  if (!open) return null

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="cart-header">
          <div>
            <strong>Carrito</strong>
            <span>{items.length} items</span>
          </div>
          <button type="button" onClick={onClose}>
            Cerrar
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <p>Tu carrito esta vacio.</p>
            <button type="button" className="primary" onClick={onClose}>
              Seguir comprando
            </button>
          </div>
        ) : (
          <div className="cart-items">
            {items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-info">
                  <strong>{item.name}</strong>
                  <span>{item.price}</span>
                  <div className="cart-qty">
                    <button type="button" onClick={() => onDecrement(item.id)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button type="button" onClick={() => onIncrement(item.id)}>
                      +
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cart-remove"
                  onClick={() => onRemove(item.id)}
                >
                  Quitar
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="cart-footer">
          <div className="cart-total">
            <span>Subtotal</span>
            <strong>{subtotal}</strong>
          </div>
          <button
            type="button"
            className="primary"
            onClick={onCheckout}
            disabled={items.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    </div>
  )
}

export default CartDrawer
