import HeroSlider from '../components/HeroSlider'
import HighlightStrip from '../components/HighlightStrip'
import BrandSlider from '../components/BrandSlider'
import ServiceBanners from '../components/ServiceBanners'
import CategoryGrid from '../components/CategoryGrid'
import ProductSection from '../components/ProductSection'
import PromoBanners from '../components/PromoBanners'
import CtaBand from '../components/CtaBand'
import CatalogSection from '../components/CatalogSection'

const HomePage = ({
  heroSlides,
  highlights,
  brandMarquee,
  serviceBanners,
  categories,
  featuredProducts,
  newArrivals,
  promoBanners,
  cta,
  catalogItems,
  onAction,
  onCategorySelect,
  activeCategory,
  searchQuery,
}) => {
  const productCategories = categories.filter(
    (category) => category.type === 'producto'
  )
  const serviceCategories = categories.filter(
    (category) => category.type === 'servicio'
  )

  return (
    <>
      {searchQuery ? (
        <div id="search-results">
          <CatalogSection
            title={`Resultados para "${searchQuery}"`}
            subtitle="Busca en todo el catalogo."
            items={catalogItems}
            categories={categories}
            activeCategory="all"
            onCategorySelect={onCategorySelect}
            searchQuery={searchQuery}
            onAction={onAction}
          />
        </div>
      ) : null}
      <HeroSlider slides={heroSlides} />
      <HighlightStrip highlights={highlights} />
      <BrandSlider title="Marcas con las que trabajamos" items={brandMarquee} />
      <CategoryGrid
        categories={categories}
        activeCategory={activeCategory}
        onSelect={onCategorySelect}
      />
      <ServiceBanners items={serviceBanners} onAction={onAction} />
      <ProductSection
        title="Productos destacados"
        subtitle="Ofertas con stock limitado y entrega rapida."
        products={featuredProducts}
        onAction={onAction}
        className="featured"
        showMeta={false}
      />
      <PromoBanners banners={promoBanners} />
      <ProductSection
        title="Novedades"
        subtitle="Lo mas nuevo en tecnologia y equipos renovados."
        products={newArrivals}
        onAction={onAction}
        showMeta={false}
      />
      <CatalogSection
        title="Servicios"
        subtitle="Soluciones digitales para crecer tu negocio."
        items={catalogItems.filter((item) => item.type === 'servicio')}
        categories={serviceCategories}
        activeCategory={activeCategory}
        onCategorySelect={onCategorySelect}
        searchQuery={searchQuery}
        onAction={onAction}
        showMeta={false}
      />
      <CatalogSection
        title="Productos"
        subtitle="Hardware, computadores, portatiles y CCTV."
        items={catalogItems.filter((item) => item.type === 'producto')}
        categories={productCategories}
        activeCategory={activeCategory}
        onCategorySelect={onCategorySelect}
        searchQuery={searchQuery}
        onAction={onAction}
        showMeta={false}
      />
      <CtaBand
        title={cta.title}
        subtitle={cta.subtitle}
        buttonLabel={cta.buttonLabel}
      />
    </>
  )
}

export default HomePage
