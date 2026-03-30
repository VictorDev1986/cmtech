import { useMemo, useState } from 'react'

const BrandSlider = ({ title, items }) => {
  const [failed, setFailed] = useState({})
  const logos = useMemo(
    () => (items || []).filter((item) => item.logo && !failed[item.name]),
    [items, failed]
  )
  if (logos.length === 0) return null

  const handleError = (name) => {
    setFailed((prev) => ({ ...prev, [name]: true }))
  }

  return (
    <section className="brand-slider">
      <div className="brand-track">
        <div className="brand-marquee">
          {logos.map((item) => (
            <img
              key={item.name}
              src={item.logo}
              alt={item.name}
              loading="lazy"
              onError={() => handleError(item.name)}
            />
          ))}
          {logos.map((item) => (
            <img
              key={`${item.name}-dup`}
              src={item.logo}
              alt={item.name}
              loading="lazy"
              onError={() => handleError(item.name)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default BrandSlider
