import { useParams } from 'react-router-dom'
import CatalogSection from '../components/CatalogSection'

const CategoryPage = ({ categories, items, onAction, onCategorySelect, searchQuery }) => {
  const { slug } = useParams()
  const category = categories.find((item) => item.slug === slug)

  if (!category) {
    return (
      <section className="category-hero">
        <div>
          <h2>Categoria no encontrada</h2>
          <p>Selecciona otra categoria desde el menu.</p>
        </div>
      </section>
    )
  }

  const subtitle =
    category.type === 'servicio'
      ? 'Servicios para impulsar tu negocio.'
      : 'Productos disponibles con entrega rapida.'

  const scopedCategories = categories.filter(
    (item) => item.type === category.type
  )

  return (
    <>
      <section className="category-hero">
        <img src={category.image} alt={category.name} />
        <div>
          <span className="category-badge">
            {category.type === 'servicio' ? 'Servicio' : 'Producto'}
          </span>
          <h2>{category.name}</h2>
          <p>{subtitle}</p>
        </div>
      </section>

      {category.details ? (
        <section className="category-details">
          <div>
            <h3>Detalle</h3>
            <p>
              {category.type === 'servicio'
                ? 'Incluye componentes clave para una entrega completa.'
                : 'Caracteristicas principales de la categoria.'}
            </p>
          </div>
          <ul>
            {category.details.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ) : null}

      <CatalogSection
        title={`Catalogo de ${category.name}`}
        subtitle="Filtra y encuentra lo que necesitas."
        items={items}
        categories={scopedCategories}
        activeCategory={category.slug}
        onCategorySelect={onCategorySelect}
        searchQuery={searchQuery}
        onAction={onAction}
        showMeta={false}
      />
    </>
  )
}

export default CategoryPage
