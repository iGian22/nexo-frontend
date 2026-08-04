import { Save } from "lucide-react";
import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { useNexo } from "../context/NexoContext";

export default function Profile() {
  const { profile, setProfile } = useNexo();

  const [draft, setDraft] = useState(profile);
  const [saved, setSaved] = useState(false);

  function submit(e) {
    e.preventDefault();

    setProfile({
      name: draft.name.trim(),
      status: draft.status.trim(),
    });

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 1800);
  }

  return (
    <div className="page narrow">

      <PageHeader
        eyebrow="PERFIL"
        title="Mi perfil"
        text="Personalizá tu información para identificarte dentro de Nexo."
      />

      <div className="profile-card">

        <div className="avatar">
          {(draft.name || "G").charAt(0).toUpperCase()}
        </div>

        <form onSubmit={submit}>

          <label>
            Nombre

            <input
              value={draft.name}
              placeholder="Ingresá tu nombre"
              onChange={(e) =>
                setDraft({
                  ...draft,
                  name: e.target.value,
                })
              }
            />

          </label>

          <label>
            Estado

            <input
              value={draft.status}
              placeholder="¿En qué estás trabajando?"
              onChange={(e) =>
                setDraft({
                  ...draft,
                  status: e.target.value,
                })
              }
            />

          </label>

          <button
            className="button primary full"
            type="submit"
          >
            <Save size={18} />

            {saved ? "Perfil actualizado" : "Guardar cambios"}

          </button>

        </form>

      </div>

    </div>
  );
}