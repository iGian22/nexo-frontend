import { Link } from "react-router-dom";
import { ArrowRight, Plus, Search } from "lucide-react";
import CircleCard from "../components/CircleCard";
import { useNexo } from "../context/NexoContext";

export default function Home() {
  const { circles, profile } = useNexo();

  const hasName = profile.name && profile.name.trim() !== "";

  return (
    <div className="page">
      <section className="hero">
        <div>
          <span className="eyebrow">NEXO</span>

          <h1>
            {hasName ? (
              <>
                Hola, {profile.name}.
                <br />
                <span>¿Dónde seguimos?</span>
              </>
            ) : (
              <>
                Bienvenido a Nexo.
                <br />
                <span>Creá tu primer círculo.</span>
              </>
            )}
          </h1>

          <p>
            Organizá conversaciones, proyectos y comunidades en un solo lugar.
            Creá círculos, compartí ideas y mantené todo conectado.
          </p>

          <div className="hero-actions">
            <Link to="/create" className="button primary">
              <Plus size={18} />
              Crear círculo
            </Link>

            <Link to="/explore" className="button ghost">
              <Search size={18} />
              Explorar
            </Link>
          </div>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit orbit-a"></div>
          <div className="orbit orbit-b"></div>

          <div className="orb-core">N</div>

          <span className="sat s1"></span>
          <span className="sat s2"></span>
          <span className="sat s3"></span>
        </div>
      </section>

      <section className="section">
        <div className="section-title">
          <div>
            <span className="eyebrow">TUS CÍRCULOS</span>
            <h2>Volvé a conectar</h2>
          </div>

          <Link to="/explore" className="text-link">
            Ver todos <ArrowRight size={16} />
          </Link>
        </div>

        {circles.length === 0 ? (
          <div className="empty-state">
            <h3>Todavía no creaste ningún círculo</h3>

            <p>
              Empezá creando un espacio para organizar conversaciones,
              proyectos o grupos.
            </p>

            <Link to="/create" className="button primary">
              <Plus size={18} />
              Crear primer círculo
            </Link>
          </div>
        ) : (
          <div className="circle-grid">
            {circles.map((circle) => (
              <CircleCard key={circle.id} circle={circle} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}