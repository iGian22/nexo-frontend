import { Link } from "react-router-dom";
export default function NotFound() {
  return <div className="page center"><div className="empty"><span>404</span><h1>Te fuiste del círculo</h1><p>Esta página no existe.</p><Link className="button primary" to="/">Volver al inicio</Link></div></div>;
}
