import { ArrowUpRight, Star, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useNexo } from "../context/NexoContext";

export default function CircleCard({ circle }) {
  const { favorites, toggleFavorite, deleteCircle } = useNexo();
  const fav = favorites.includes(circle.id);
  const messages = circle.chats.reduce((sum, chat) => sum + chat.messages.length, 0);

  function handleDelete() {
    const confirmed = window.confirm(
      `¿Eliminar el círculo "${circle.name}"? Esta acción no se puede deshacer.`
    );
    if (confirmed) deleteCircle(circle.id);
  }

  return (
    <article className="circle-card">
      <div className="circle-top">
        <span className="circle-symbol">{circle.emoji}</span>

        <div className="circle-top-actions">
          <button
            className={`icon-button ${fav ? "fav" : ""}`}
            onClick={() => toggleFavorite(circle.id)}
            aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star size={18} fill={fav ? "currentColor" : "none"} />
          </button>

          <button
            className="icon-button danger"
            onClick={handleDelete}
            aria-label={`Eliminar ${circle.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <span className="tag">{circle.category}</span>
      <h3>{circle.name}</h3>
      <p>{circle.description}</p>

      <div className="card-footer">
        <span>{circle.chats.length} salas · {messages} mensajes</span>
        <Link to={`/circle/${circle.id}`} className="round-link" aria-label={`Abrir ${circle.name}`}>
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}