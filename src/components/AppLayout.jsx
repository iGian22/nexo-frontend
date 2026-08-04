import { NavLink, Outlet } from "react-router-dom";
import { Home, Compass, Plus, UserRound, Sparkles } from "lucide-react";

const links = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/explore", label: "Explorar", icon: Compass },
  { to: "/create", label: "Crear", icon: Plus },
  { to: "/profile", label: "Perfil", icon: UserRound }
];

export default function AppLayout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/" className="brand" aria-label="Nexo, inicio">
          <span className="brand-mark"><Sparkles size={20}/></span>
          <span>NEXO</span>
        </NavLink>
        <nav className="nav-list" aria-label="Navegación principal">
          {links.map(({to,label,icon:Icon,end}) => (
            <NavLink key={to} to={to} end={end} className={({isActive}) => `nav-link ${isActive ? "active" : ""}`}>
              <Icon size={20}/><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-note">
          <span className="eyebrow">TU ESPACIO</span>
          <p>Ideas, personas y proyectos en un mismo lugar.</p>
        </div>
      </aside>
      <main className="main"><Outlet /></main>
      <nav className="mobile-nav" aria-label="Navegación móvil">
        {links.map(({to,label,icon:Icon,end}) => (
          <NavLink key={to} to={to} end={end} className={({isActive}) => isActive ? "active" : ""}>
            <Icon size={20}/><small>{label}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
