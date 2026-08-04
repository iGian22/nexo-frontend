import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import CircleCard from "../components/CircleCard";
import PageHeader from "../components/PageHeader";
import { useNexo } from "../context/NexoContext";

export default function Explore() {
  const { circles } = useNexo();
  const [params, setParams] = useSearchParams();
  const query = params.get("search") || "";
  const filtered = circles.filter(c => `${c.name} ${c.category} ${c.description}`.toLowerCase().includes(query.toLowerCase()));

  function update(value) {
    const next = new URLSearchParams(params);
    value ? next.set("search", value) : next.delete("search");
    setParams(next);
  }

  return (
    <div className="page">
      <PageHeader eyebrow="DESCUBRIR" title="Explorá tus conexiones" text="Buscá por nombre, categoría o descripción."/>
      <label className="search-box">
        <Search size={20}/><span className="sr-only">Buscar círculos</span>
        <input value={query} onChange={e => update(e.target.value)} placeholder="Buscar, por ejemplo: estudio" />
        {query && <button onClick={() => update("")} aria-label="Limpiar búsqueda"><X size={18}/></button>}
      </label>
      <p className="result-count">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{query && <> para <strong>“{query}”</strong></>}</p>
      <div className="circle-grid">{filtered.map(c => <CircleCard key={c.id} circle={c}/>)}</div>
      {!filtered.length && <div className="empty"><span>◎</span><h2>No encontramos ese círculo</h2><p>Probá con otra palabra.</p></div>}
    </div>
  );
}
