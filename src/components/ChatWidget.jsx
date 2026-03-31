import { useEffect, useMemo, useRef, useState } from 'react'
import { chatbotResponses, fallbackReply } from '../data/chatbot-responses'

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hola! Soy el asistente de CMTech.',
    },
    {
      role: 'assistant',
      content: 'Puedo ayudarte con servicios, productos o cotizaciones.',
    },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [idleSent, setIdleSent] = useState(false)
  const idleTimer = useRef(null)

  const responses = useMemo(() => chatbotResponses, [])
  const sheetsWebhook = import.meta.env.VITE_SHEETS_WEBHOOK || ''

  const logToSheets = async (payload) => {
    if (!sheetsWebhook) return
    try {
      await fetch(sheetsWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      // Ignore logging errors
    }
  }

  const sendMessage = async (text) => {
    if (!text.trim() || sending) return
    const userMessage = { role: 'user', content: text }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setSending(true)
    setLastActivity(Date.now())
    setIdleSent(false)

    logToSheets({
      role: 'user',
      message: text,
      timestamp: new Date().toISOString(),
      page: window.location.pathname,
    })

    const normalized = text.toLowerCase()
    const match = responses.find((item) =>
      item.keywords.some((keyword) => normalized.includes(keyword))
    )
    const reply = match ? match.reply : fallbackReply

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
      logToSheets({
        role: 'assistant',
        message: reply,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
      })
      setSending(false)
    }, 500)
  }


  useEffect(() => {
    if (!open) return
    setLastActivity(Date.now())
    setIdleSent(false)
  }, [open])

  useEffect(() => {
    if (!open || idleSent) return
    if (idleTimer.current) {
      clearTimeout(idleTimer.current)
    }

    idleTimer.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Gracias por escribir. Si necesitas algo mas, aqui estare para ayudarte.',
        },
      ])
      setIdleSent(true)
    }, 30000)

    return () => {
      clearTimeout(idleTimer.current)
    }
  }, [open, lastActivity, idleSent])

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
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`chat-message ${
                message.role === 'user' ? 'user' : 'bot'
              }`}
            >
              <p>{message.content}</p>
            </div>
          ))}
          <div className="chat-quick">
            <button type="button" onClick={() => sendMessage('Soporte TI')}>
              Soporte TI
            </button>
            <button type="button" onClick={() => sendMessage('Desarrollo web')}>
              Desarrollo web
            </button>
            <button type="button" onClick={() => sendMessage('Computadores')}>
              Computadores
            </button>
            <button type="button" onClick={() => sendMessage('CCTV')}>
              CCTV
            </button>
          </div>
        </div>

        <form
          className="chat-input"
          onSubmit={(event) => {
            event.preventDefault()
            sendMessage(input)
          }}
        >
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            aria-label="Mensaje"
            value={input}
            onChange={(event) => {
              setInput(event.target.value)
              setLastActivity(Date.now())
              setIdleSent(false)
            }}
          />
          <button type="submit" disabled={sending}>
            {sending ? '...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatWidget
