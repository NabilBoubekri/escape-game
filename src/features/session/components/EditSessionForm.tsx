import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Session } from "../../shared/types";
import SessionForm from "./SessionForm";

export default function EditSessionForm() {
  const { id } = useParams<{ id: string }>();
  const [session, setSession] = useState<Partial<Session> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch("/api/v1/sessions");
      const data = await res.json();
      const found = data.find((s: Session) => s.id === id);
      if (found) setSession(found);
    };
    fetchSession();
  }, [id]);

  const handleUpdate = async (updated: Partial<Session>) => {
    const res = await fetch(`/api/v1/sessions/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || "Erreur");
    }

    navigate("/admin");
  };

  if (!session) return <p>Chargement...</p>;

  return (
    <>
      <h1 style={{placeSelf: "center"}}>Modifier {session.title}</h1>
      <SessionForm
        initialSession={session}
        onSubmit={handleUpdate}
        submitLabel="Mettre à jour"
      />
    </>
  );
}
