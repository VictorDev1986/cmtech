import { useState } from 'react'

const ChatWidget = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`chat-widget ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="chat-toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Abrir chat"
      >
        <span className="chat-icon">💬</span>
      </button>

      <div className="chat-panel">
        <div className="chat-header">
          <div>
            <strong>CMTech Chat</strong>
            <span>Soporte en linea</span>
          </div>
          <button type="button" onClick={() => setOpen(false)}>
            ×
          </button>
        </div>

        <div className="chat-body">
          <div className="chat-message bot">
            <p>Hola! Soy el asistente de CMTech.</p>
            <p>Puedo ayudarte con servicios, productos o cotizaciones.</p>
          </div>
          <div className="chat-quick">
            <button type="button">Soporte TI</button>
            <button type="button">Desarrollo web</button>
            <button type="button">Computadores</button>
            <button type="button">CCTV</button>
          </div>
        </div>

        <form className="chat-input" onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            aria-label="Mensaje"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default ChatWidget
