import { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import CartDrawer from './components/CartDrawer'
import StoreLayout from './components/StoreLayout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import {
  promoText,
  promoItems,
  utilityLinks,
  brand,
  categories,
  heroSlides,
  highlights,
  brandMarquee,
  catalogItems,
  featuredProducts,
  newArrivals,
  promoBanners,
  cta,
  footerGroups,
} from './data/storefront'

function App() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('cmtech-cart')
    if (saved) {
      setCartItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cmtech-cart', JSON.stringify(cartItems))
  }, [cartItems])

  const resolveItems = (ids) =>
    ids
      .map((id) => catalogItems.find((item) => item.id === id))
      .filter(Boolean)

  const featuredList = useMemo(
    () => resolveItems(featuredProducts),
    [featuredProducts]
  )
  const newArrivalsList = useMemo(
    () => resolveItems(newArrivals),
    [newArrivals]
  )

  useEffect(() => {
    const match = location.pathname.match(/^\/categoria\/([^/]+)/)
    setActiveCategory(match ? match[1] : 'all')
  }, [location.pathname])

  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      navigate('/')
    } else {
      navigate(`/categoria/${slug}`)
    }
  }

  const handleSearchSubmit = () => {
    navigate('/')
    if (!query.trim()) return
    requestAnimationFrame(() => {
      const target = document.getElementById('search-results')
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    })
  }

  const addToCart = (item) => {
    if (item.type === 'servicio') {
      const message = `Hola! Quiero informacion sobre el servicio: ${item.name}.`
      const url = `https://wa.me/573197089082?text=${encodeURIComponent(message)}`
      window.open(url, '_blank')
      return
    }

    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id)
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry
        )
      }
      return [...prev, { ...item, qty: 1 }]
    })
    setCartOpen(true)
  }

  const updateQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((entry) =>
          entry.id === id ? { ...entry, qty: entry.qty + delta } : entry
        )
        .filter((entry) => entry.qty > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((entry) => entry.id !== id))
  }

  const parsePrice = (value) => {
    const digits = `${value}`.replace(/[^0-9]/g, '')
    return digits ? Number(digits) : 0
  }

  const subtotalValue = cartItems.reduce(
    (total, entry) => total + parsePrice(entry.price) * entry.qty,
    0
  )
  const subtotal = `$ ${subtotalValue.toLocaleString('es-CO')}`
  const cartCount = cartItems.reduce((total, entry) => total + entry.qty, 0)

  const handleCheckout = () => {
    if (cartItems.length === 0) return
    const lines = cartItems.map(
      (item) => `- ${item.name} x${item.qty} (${item.price})`
    )
    const message = `Hola! Quiero finalizar la compra:%0A${lines.join(
      '%0A'
    )}%0ASubtotal: ${subtotal}`
    window.open(`https://wa.me/573197089082?text=${message}`, '_blank')
  }

  return (
    <>
      <Routes>
        <Route
          element={
            <StoreLayout
              promoText={promoText}
              promoItems={promoItems}
              utilityLinks={utilityLinks}
              brand={brand}
              categories={categories}
              activeCategory={activeCategory}
              onCategorySelect={handleCategorySelect}
              searchQuery={query}
              onSearchChange={setQuery}
              onSearchSubmit={handleSearchSubmit}
              showSearch={location.pathname === '/'}
              cartCount={cartCount}
              onCartOpen={() => setCartOpen(true)}
              footerGroups={footerGroups}
            />
          }
        >
          <Route
            index
            element={
              <HomePage
                heroSlides={heroSlides}
                highlights={highlights}
                brandMarquee={brandMarquee}
                categories={categories}
                featuredProducts={featuredList}
                newArrivals={newArrivalsList}
                promoBanners={promoBanners}
                cta={cta}
                catalogItems={catalogItems}
                onAction={addToCart}
                onCategorySelect={handleCategorySelect}
                activeCategory={activeCategory}
                searchQuery={query}
              />
            }
          />
          <Route
            path="categoria/:slug"
            element={
              <CategoryPage
                categories={categories}
                items={catalogItems}
                onAction={addToCart}
                onCategorySelect={handleCategorySelect}
                searchQuery={query}
              />
            }
          />
        </Route>
      </Routes>
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        subtotal={subtotal}
        onClose={() => setCartOpen(false)}
        onIncrement={(id) => updateQty(id, 1)}
        onDecrement={(id) => updateQty(id, -1)}
        onRemove={removeItem}
        onCheckout={handleCheckout}
      />
    </>
  )
}

export default App
