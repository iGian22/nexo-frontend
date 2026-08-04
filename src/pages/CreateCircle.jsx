import { ArrowLeft, Check } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNexo } from "../context/NexoContext";

export default function CreateCircle() {
  const { createCircle } = useNexo();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "Estudio",
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

  function submit(e) {
    e.preventDefault();

    if (form.name.trim().length < 3) {
      return setError(
        "El nombre del círculo debe tener al menos 3 caracteres."
      );
    }

    if (form.description.trim().length < 8) {
      return setError(
        "Escribí una descripción un poco más completa."
      );
    }

    const id = createCircle({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
    });

    navigate(`/circle/${id}`);
  }

  return (
    <div className="page narrow">

      <Link to="/" className="back-link">
        <ArrowLeft size={17} />
        Volver
      </Link>

      <div className="form-intro">
        <span className="eyebrow">NUEVO CÍRCULO</span>

        <h1>Crear un nuevo círculo</h1>

        <p>
          Organizá personas, ideas o proyectos en un mismo espacio.
          Elegí un nombre, una categoría y una breve descripción.
        </p>
      </div>

      <form className="form-card" onSubmit={submit}>

        <label>
          Nombre del círculo

          <input
            name="name"
            value={form.name}
            onChange={change}
            placeholder="Ej. Proyecto Aurora"
            maxLength="35"
          />
        </label>

        <label>
          Categoría

          <select
            name="category"
            value={form.category}
            onChange={change}
          >
            <option>Estudio</option>
            <option>Trabajo</option>
            <option>Proyecto</option>
            <option>Amigos</option>
            <option>Gaming</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          Descripción

          <textarea
            name="description"
            value={form.description}
            onChange={change}
            placeholder="Contanos brevemente de qué trata este círculo."
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
          Crear círculo
        </button>

      </form>

    </div>
  );
}