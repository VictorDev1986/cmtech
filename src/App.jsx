import { useEffect, useMemo, useRef, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import CartDrawer from './components/CartDrawer'
import PromoToast from './components/PromoToast'
import LoadingOverlay from './components/LoadingOverlay'
import ChatWidget from './components/ChatWidget'
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
  serviceBanners,
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
  const [promoOpen, setPromoOpen] = useState(false)
  const [promoItem, setPromoItem] = useState(null)
  const [pageLoading, setPageLoading] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const promoTimeout = useRef(null)
  const lastPromo = useRef(0)
  const promoOpenRef = useRef(false)
  const firstLoad = useRef(true)

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

  const promoPool = useMemo(() => {
    const regex = /(oferta|promo|top)/i
    const pool = catalogItems.filter((item) => regex.test(item.badge || ''))
    return pool.length ? pool : catalogItems
  }, [catalogItems])

  useEffect(() => {
    const match = location.pathname.match(/^\/categoria\/([^/]+)/)
    setActiveCategory(match ? match[1] : 'all')
  }, [location.pathname])

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false
      return
    }
    setPageLoading(true)
    const timeout = setTimeout(() => setPageLoading(false), 600)
    return () => clearTimeout(timeout)
  }, [location.pathname])

  useEffect(() => {
    promoOpenRef.current = promoOpen
  }, [promoOpen])

  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now()
      if (promoOpenRef.current) return
      if (now - lastPromo.current < 15000) return
      if (!promoPool.length) return

      const randomItem = promoPool[Math.floor(Math.random() * promoPool.length)]
      setPromoItem(randomItem)
      setPromoOpen(true)
      lastPromo.current = now
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [promoPool])

  useEffect(() => {
    if (!promoOpen) return
    if (promoTimeout.current) {
      clearTimeout(promoTimeout.current)
    }
    promoTimeout.current = setTimeout(() => {
      setPromoOpen(false)
    }, 5000)
    return () => {
      clearTimeout(promoTimeout.current)
    }
  }, [promoOpen])

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
      const url = `https://wa.me/573246025577?text=${encodeURIComponent(message)}`
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
    window.open(`https://wa.me/573246025577?text=${message}`, '_blank')
  }

  const handleViewItem = (item) => {
    if (item?.category && item?.id) {
      navigate(`/categoria/${item.category}#item-${item.id}`)
      setPromoOpen(false)
      return
    }
    navigate('/')
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
                serviceBanners={serviceBanners}
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
      <PromoToast
        item={promoItem}
        visible={promoOpen}
        onView={handleViewItem}
        onClose={() => setPromoOpen(false)}
      />
      <ChatWidget />
      <a
        className="whatsapp-float"
        href="https://wa.me/573246025577"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <img
          src="https://cdn.simpleicons.org/whatsapp/ffffff"
          alt="WhatsApp"
        />
      </a>
      <LoadingOverlay show={pageLoading} />
    </>
  )
}

export default App
