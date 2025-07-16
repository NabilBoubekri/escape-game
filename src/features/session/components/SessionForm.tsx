import { useState } from "react";
import type { Session } from "../../shared/types";
import { X } from "lucide-react";

type Props = {
  initialSession: Partial<Session>;
  onSubmit: (session: Partial<Session>) => Promise<void>;
  submitLabel?: string;
};

export default function SessionForm({
  initialSession,
  onSubmit,
  submitLabel = "Enregistrer",
}: Props) {
  const [session, setSession] = useState<Partial<Session>>(initialSession);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field: keyof Session, value: any) => {
    setSession((prev) => ({ ...prev, [field]: value }));
  };

  const handleCreneauChange = (value: string, index: number) => {
    const updated = [...(session.creneaux || [])];
    updated[index] = value;
    handleChange("creneaux", updated);
  };

  const addCreneau = () => {
    handleChange("creneaux", [...(session.creneaux || []), ""]);
  };

  const removeCreneau = (i: number) => {
    handleChange(
      "creneaux",
      (session.creneaux || []).filter((_, idx) => idx !== i)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await onSubmit(session);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'envoi");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="p-4 border rounded bg-light mt-4 container"
      >
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Session enregistrée !</div>
        )}

        <div className="mb-3">
          <label>Titre</label>
          <input
            className="form-control"
            value={session.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Thème</label>
          <input
            className="form-control"
            value={session.theme || ""}
            onChange={(e) => handleChange("theme", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={session.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Image URL</label>
          <input
            className="form-control"
            value={session.imgUrl || ""}
            onChange={(e) => handleChange("imgUrl", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Durée (minutes)</label>
          <input
            type="number"
            className="form-control"
            value={session.duree || 60}
            onChange={(e) => handleChange("duree", +e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Prix (€)</label>
          <input
            type="number"
            className="form-control"
            value={session.prix || 0}
            onChange={(e) => handleChange("prix", +e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Participants minimum</label>
          <input
            type="number"
            className="form-control"
            value={session.participantsMin || 1}
            onChange={(e) => handleChange("participantsMin", +e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Créneaux disponibles</label>
          {(session.creneaux || []).map((c, i) => (
            <div key={i} className="d-flex mb-2">
              <input
                type="datetime-local"
                className="form-control me-2"
                value={c}
                onChange={(e) => handleCreneauChange(e.target.value, i)}
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => removeCreneau(i)}
              >
                <X />
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary mt-2"
            onClick={addCreneau}
          >
            Ajouter un créneau
          </button>
        </div>

        <button className="btn btn-primary mt-3" type="submit">
          {submitLabel}
        </button>
      </form>
      <div className="mt-5" />
    </>
  );
}
