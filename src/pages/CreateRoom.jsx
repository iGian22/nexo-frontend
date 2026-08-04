import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNexo } from "../context/NexoContext";

export default function CreateRoom() {
  const { circleId } = useParams();
  const { circles, createRoom } = useNexo();
  const navigate = useNavigate();

  const circle = circles.find((c) => c.id === circleId);

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [error, setError] = useState("");

  function change(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (error) setError("");
  }

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

  function submit(e) {
    e.preventDefault();

    if (form.name.trim().length < 3) {
      return setError(
        "El nombre de la sala debe tener al menos 3 caracteres."
      );
    }

    if (form.description.trim().length < 8) {
      return setError(
        "Escribí una descripción un poco más completa."
      );
    }

    const roomId = createRoom(circle.id, {
      name: form.name.trim(),
      description: form.description.trim(),
    });

    navigate(`/circle/${circle.id}/chat/${roomId}`);
  }

  return (
    <div className="page narrow">

      <Link to={`/circle/${circle.id}`} className="back-link">
        <ArrowLeft size={17} />
        Volver
      </Link>

      <div className="form-intro">
        <span className="eyebrow">NUEVA SALA</span>

        <h1>Crear una sala en {circle.name}</h1>

        <p>
          Las salas son espacios de conversación dentro de este círculo.
          Elegí un nombre y una breve descripción.
        </p>
      </div>

      <form className="form-card" onSubmit={submit}>

        <label>
          Nombre de la sala

          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Ej. General"
            maxLength="35"
          />
        </label>

        <label>
          Descripción

          <textarea
            name="description"
            value={form.description}
            onChange={change}
            placeholder="Contanos brevemente de qué se habla en esta sala."
            rows="4"
            maxLength="140"
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button className="button primary full" type="submit">
          <Check size={18} />
          Crear sala
        </button>

      </form>

    </div>
  );
}