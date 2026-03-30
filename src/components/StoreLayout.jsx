import { Outlet } from 'react-router-dom'
import PromoBar from './PromoBar'
import UtilityBar from './UtilityBar'
import MainHeader from './MainHeader'
import CategoryNav from './CategoryNav'
import Footer from './Footer'

const StoreLayout = ({
  promoText,
  promoItems,
  utilityLinks,
  brand,
  categories,
  activeCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  showSearch,
  cartCount,
  onCartOpen,
  footerGroups,
}) => {
  return (
    <div className="commerce">
      <PromoBar text={promoText} items={promoItems} />
      <UtilityBar links={utilityLinks} />
      <MainHeader
        brand={brand}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        showSearch={showSearch}
        cartCount={cartCount}
        onCartOpen={onCartOpen}
      />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onSelect={onCategorySelect}
      />
      <Outlet />
      <Footer brand={brand} groups={footerGroups} />
    </div>
  )
}

export default StoreLayout
