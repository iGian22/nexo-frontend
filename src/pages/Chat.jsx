import { ArrowLeft, Send } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNexo } from "../context/NexoContext";

export default function Chat() {
  const { circleId, chatId } = useParams();

  const { circles, sendMessage, profile } = useNexo();

  const [text, setText] = useState("");

  const circle = circles.find((c) => c.id === circleId);
  const chat = circle?.chats.find((c) => c.id === chatId);

  if (!circle || !chat) {
    return (
      <div className="page">
        <h1>Conversación no encontrada</h1>

        <Link to="/" className="button">
          Volver al inicio
        </Link>
      </div>
    );
  }

  function submit(e) {
    e.preventDefault();

    if (!text.trim()) return;

    sendMessage(circleId, chatId, text);

    setText("");
  }

  return (
    <div className="chat-page">

      <header className="chat-header">

        <Link
          to={`/circle/${circleId}`}
          className="icon-button"
          aria-label="Volver"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <span className="eyebrow">{circle.name}</span>
          <h1>{chat.name}</h1>
        </div>

        <span className="live-dot">
          {profile.name || "Conectado"}
        </span>

      </header>

      <div className="messages" aria-live="polite">

        <div className="day-pill">
          HOY
        </div>

        {chat.messages.map((m) => (

          <div
            key={m.id}
            className={`message-row ${m.mine ? "mine" : ""}`}
          >

            <div className="message">

              <span className="message-author">
                {m.author}
              </span>

              <p>{m.text}</p>

              <time>{m.time}</time>

            </div>

          </div>

        ))}

      </div>

      <form
        className="composer"
        onSubmit={submit}
      >

        <label
          className="sr-only"
          htmlFor="message"
        >
          Escribir mensaje
        </label>

        <input
          id="message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={`Mensaje en ${
            chat.name
          }...`}
          autoComplete="off"
        />

        <button
          className="send-button"
          type="submit"
          disabled={!text.trim()}
          aria-label="Enviar mensaje"
        >
          <Send size={19} />
        </button>

      </form>

    </div>
  );
}