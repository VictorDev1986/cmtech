import { useMemo, useState } from 'react'

const PRIMARY_SLUGS = [
  'paginas-web',
  'software-medida',
  'automatizaciones-ia',
  'soporte-ti',
]

const CategoryNav = ({ categories, activeCategory, onSelect }) => {
  const [restOpen, setRestOpen] = useState(false)

  const { primary, all } = useMemo(() => {
    const primaryList = categories.filter((category) =>
      PRIMARY_SLUGS.includes(category.slug)
    )
    return { primary: primaryList, all: categories }
  }, [categories])

  const handleSelect = (slug) => {
    onSelect(slug)
    setRestOpen(false)
  }

  return (
    <nav className={`category-nav ${restOpen ? 'open-rest' : ''}`}>
      <button
        className="category-button"
        type="button"
        onClick={() => setRestOpen((prev) => !prev)}
        aria-expanded={restOpen}
      >
        ☰ Buscar categorias
      </button>
      <div className="category-links">
        {primary.map((category) => (
          <button
            key={category.slug}
            type="button"
            className={activeCategory === category.slug ? 'active' : ''}
            onClick={() => handleSelect(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="category-dropdown" aria-hidden={!restOpen}>
        <button
          type="button"
          className={activeCategory === 'all' ? 'active' : ''}
          onClick={() => handleSelect('all')}
        >
          Todas las categorias
        </button>
        {all.map((category) => (
          <button
            key={category.slug}
            type="button"
            className={activeCategory === category.slug ? 'active' : ''}
            onClick={() => handleSelect(category.slug)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </nav>
  )
}

export default CategoryNav
