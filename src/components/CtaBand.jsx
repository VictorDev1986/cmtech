const CtaBand = ({ title, subtitle, buttonLabel }) => {
  return (
    <section className="cta-band">
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
      <button type="button" className="primary">
        {buttonLabel}
      </button>
    </section>
  )
}

export default CtaBand
