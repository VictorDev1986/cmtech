import { Link } from 'react-router-dom'
import logo from '../assets/CM-Tech1-1.png'

const MainHeader = ({
  brand,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  showSearch,
  cartCount,
  onCartOpen,
}) => {
  return (
    <header className="main-header">
      <Link className="brand" to="/">
        <div className="logo-mark image">
          <img src={logo} alt="CM-Tech" />
        </div>
      </Link>
      {showSearch ? (
        <form
          className="search"
          onSubmit={(event) => {
            event.preventDefault()
            onSearchSubmit?.()
          }}
        >
          <input
            type="search"
            placeholder="Buscar"
            aria-label="Buscar"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      ) : (
        <div className="search-placeholder" />
      )}
      <button
        type="button"
        className="cart"
        onClick={onCartOpen}
        aria-label="Abrir carrito"
      >
        <span className="cart-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6h14l-2 8H8L6 6zm0 0L5 3H2m6 13a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="cart-count">{cartCount}</span>
      </button>
    </header>
  )
}

export default MainHeader
