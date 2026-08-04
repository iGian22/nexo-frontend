import { ArrowLeft, MessageCircle, ArrowRight, Plus, Trash2 } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useNexo } from "../context/NexoContext";

export default function Circle() {
  const { circleId } = useParams();
  const { circles, deleteRoom, deleteCircle } = useNexo();
  const navigate = useNavigate();

  const circle = circles.find((c) => c.id === circleId);

  if (!circle) {
    return (
      <div className="page">
        <h1>Círculo no encontrado</h1>
        <Link to="/" className="button">
          Volver al inicio
        </Link>
      </div>
    );
  }

  function handleDeleteCircle() {
    const confirmed = window.confirm(
      `¿Eliminar el círculo "${circle.name}" y todas sus salas? Esta acción no se puede deshacer.`
    );
    if (confirmed) {
      deleteCircle(circle.id);
      navigate("/");
    }
  }

  function handleDeleteRoom(e, chatId, chatName) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `¿Eliminar la sala "${chatName}"? Esta acción no se puede deshacer.`
    );
    if (confirmed) deleteRoom(circle.id, chatId);
  }

  return (
    <div className="page">
      <Link to="/" className="back-link">
        <ArrowLeft size={17} />
        Inicio
      </Link>

      <section className="circle-hero">
        <span className="circle-symbol large">
          {circle.emoji}
        </span>

        <span className="tag">
          {circle.category}
        </span>

        <h1>{circle.name}</h1>

        <p>{circle.description}</p>

        <button className="button danger" onClick={handleDeleteCircle}>
          <Trash2 size={18} />
          Eliminar círculo
        </button>
      </section>

      <section className="section">

        <div className="section-title">

          <div>
            <span className="eyebrow">SALAS</span>
            <h2>Conversaciones</h2>
          </div>

          <Link to={`/circle/${circle.id}/create-room`} className="button primary">
            <Plus size={18} />
            Nueva sala
          </Link>

        </div>

        <div className="room-list">

          {circle.chats.length > 0 ? (

            circle.chats.map((chat) => (
              <Link
                className="room"
                key={chat.id}
                to={`/circle/${circle.id}/chat/${chat.id}`}
              >
                <span className="room-icon">
                  <MessageCircle size={20} />
                </span>

                <div>
                  <h3>{chat.name}</h3>
                  <p>{chat.description}</p>
                </div>

                <span className="room-meta">
                  {chat.messages.length} mensajes
                </span>

                <button
                  className="icon-button danger"
                  onClick={(e) => handleDeleteRoom(e, chat.id, chat.name)}
                  aria-label={`Eliminar sala ${chat.name}`}
                >
                  <Trash2 size={18} />
                </button>

                <ArrowRight size={18} />
              </Link>
            ))

          ) : (

            <div className="empty compact">

              <span>○</span>

              <h2>Este círculo todavía no tiene salas</h2>

              <p>
                Cuando agregues la primera sala,
                las conversaciones aparecerán aquí.
              </p>

              


  <span></span>

  

            </div>

          )}

        </div>

      </section>

    </div>
  );
}