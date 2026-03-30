const HighlightStrip = ({ highlights }) => {
  return (
    <section className="highlight-strip">
      {highlights.map((item) => (
        <div className="highlight" key={item.title}>
          <strong>{item.title}</strong>
          <span>{item.subtitle}</span>
        </div>
      ))}
    </section>
  )
}

export default HighlightStrip
