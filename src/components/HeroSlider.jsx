import { useEffect, useState } from 'react'

const HeroSlider = ({ slides }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => setActiveSlide(index)
  const goNext = () =>
    setActiveSlide((current) => (current + 1) % slides.length)
  const goPrev = () =>
    setActiveSlide((current) => (current - 1 + slides.length) % slides.length)

  return (
    <section className="hero-slider">
      <div className="slider">
        {slides.map((slide, index) => (
          <article
            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
            key={slide.title}
          >
            <div className="hero-content">
              <span className="hero-eyebrow">{slide.eyebrow}</span>
              <h1>{slide.title}</h1>
              <p>{slide.description}</p>
              <div className="hero-meta">
                <span className="badge">{slide.badge}</span>
                <strong>{slide.price}</strong>
              </div>
              <button type="button" className="primary">
                {slide.cta}
              </button>
            </div>
            <div className="hero-media">
              <img src={slide.image} alt={slide.title} />
            </div>
          </article>
        ))}
        <button className="slider-nav prev" type="button" onClick={goPrev}>
          ‹
        </button>
        <button className="slider-nav next" type="button" onClick={goNext}>
          ›
        </button>
      </div>
      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            className={index === activeSlide ? 'active' : ''}
            onClick={() => goToSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
