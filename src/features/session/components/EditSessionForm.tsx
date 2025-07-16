import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Session } from "../../shared/types"

export default function EditSessionForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/v1/sessions")
        const data = await res.json()
        const found = data.find((s: Session) => s.id === id)
        if (!found) throw new Error("Session non trouvée")
        setSession(found)
      } catch (err: any) {
        setError(err.message)
      }
    }
    fetchSession()
  }, [id])

  const handleChange = (field: keyof Session, value: any) => {
    if (!session) return
    setSession({ ...session, [field]: value })
  }

  const handleCreneauChange = (value: string, index: number) => {
    if (!session) return
    const updated = [...session.creneaux]
    updated[index] = value
    handleChange("creneaux", updated)
  }

  const addCreneau = () => {
    if (!session) return
    handleChange("creneaux", [...session.creneaux, ""])
  }

  const removeCreneau = (i: number) => {
    if (!session) return
    handleChange(
      "creneaux",
      session.creneaux.filter((_, idx) => idx !== i)
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const res = await fetch(`/api/v1/sessions/${session!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session)
    })

    if (res.ok) {
      setSuccess(true)
      setTimeout(() => navigate("/admin"), 1000)
    } else {
      const result = await res.json()
      setError(result.error || "Erreur lors de la mise à jour")
    }
  }

  if (!session) return <p>Chargement...</p>

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mt-4 container">
      <h3>Modifier la Session</h3>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Session mise à jour !</div>}

      <div className="mb-3">
        <label>Titre</label>
        <input className="form-control" value={session.title} onChange={e => handleChange("title", e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Thème</label>
        <input className="form-control" value={session.theme} onChange={e => handleChange("theme", e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea className="form-control" value={session.description} onChange={e => handleChange("description", e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Image URL</label>
        <input className="form-control" value={session.imgUrl} onChange={e => handleChange("imgUrl", e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Durée (minutes)</label>
        <input type="number" className="form-control" value={session.duree} onChange={e => handleChange("duree", +e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Prix (€)</label>
        <input type="number" className="form-control" value={session.prix} onChange={e => handleChange("prix", +e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Participants minimum</label>
        <input type="number" className="form-control" value={session.participantsMin} onChange={e => handleChange("participantsMin", +e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Créneaux disponibles</label>
        {session.creneaux.map((c, i) => (
          <div key={i} className="d-flex mb-2">
            <input
              type="datetime-local"
              className="form-control me-2"
              value={c}
              onChange={e => handleCreneauChange(e.target.value, i)}
            />
            <button type="button" className="btn btn-danger" onClick={() => removeCreneau(i)}>✕</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mt-2" onClick={addCreneau}>Ajouter un créneau</button>
      </div>

      <button className="btn btn-primary mt-3" type="submit">Enregistrer</button>
    </form>
  )
}
