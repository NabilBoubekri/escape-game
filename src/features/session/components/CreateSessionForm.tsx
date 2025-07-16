import { useNavigate } from "react-router-dom"
import SessionForm from "./SessionForm"
import type { Session } from "../../shared/types"

export default function CreateSessionForm() {
  const navigate = useNavigate()

  const handleSubmit = async (newSession: Partial<Session>) => {
    const res = await fetch("/api/v1/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newSession)
    })

    if (!res.ok) {
      const error = await res.json()
      throw new Error(error?.error || "Erreur")
    }

    navigate("/admin")
  }

  return (
    <>
      <h1 style={{placeSelf: "center"}}>Créer une session</h1>
      <SessionForm
        initialSession={{ creneaux: [""] }}
        onSubmit={handleSubmit}
        submitLabel="Créer la session"
      />
    </>
  )
}
