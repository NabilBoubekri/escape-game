import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Session, Reservation } from "../../shared/types"
import { Pen, Plus, Trash } from "lucide-react"

export default function DashboardAdmin() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/v1/sessions")
      if (!res.ok) throw new Error("Erreur lors du chargement des sessions")
      const data = await res.json()
      setSessions(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  const fetchReservations = async () => {
    try {
      const res = await fetch("/api/v1/reservations")
      if (!res.ok) throw new Error("Erreur lors du chargement des réservations")
      const data = await res.json()
      setReservations(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchSessions()
    fetchReservations()
  }, [])

  const handleDeleteSession = async (id: string) => {
    if (!confirm("Supprimer cette session ?")) return
    const res = await fetch(`/api/v1/sessions/${id}`, { method: "DELETE" })
    if (res.ok) {
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } else {
      alert("Erreur lors de la suppression")
    }
  }

  const handleDeleteReservation = async (id: string) => {
    if (!confirm("Supprimer cette réservation ?")) return
    const res = await fetch(`/api/v1/reservations/${id}`, { method: "DELETE" })
    if (res.ok) {
      setReservations((prev) => prev.filter((r) => r.id !== id))
    } else {
      alert("Erreur lors de la suppression")
    }
  }

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`)
  }

  const getSessionTitle = (id: string) =>
    sessions.find((s) => s.id === id)?.title || "Inconnue"

  return (
    <div className="container mt-5" style={{ minHeight: "75vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard Admin</h2>
        <button className="btn btn-success" onClick={() => navigate("/admin/create")}>
          <Plus /> Créer une session
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <h4 className="mt-4">Sessions enregistrées</h4>
      {sessions.length === 0 ? (
        <p>Aucune session enregistrée.</p>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Titre</th>
                <th>Thème</th>
                <th>Durée</th>
                <th>Prix</th>
                <th>Participants</th>
                <th>Créneaux</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.theme}</td>
                  <td>{s.duree} min</td>
                  <td>{s.prix} €</td>
                  <td>{s.participantsMin}+</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {s.creneaux.map((c, i) => (
                        <li key={i}>{new Date(c).toLocaleString()}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-warning btn-sm" onClick={() => handleEdit(s.id)}><Pen /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSession(s.id)}><Trash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h4 className="mt-4">Réservations</h4>
      {reservations.length === 0 ? (
        <p>Aucune réservation enregistrée.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Session</th>
                <th>Email</th>
                <th>Créneau</th>
                <th>Participants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((r) => (
                <tr key={r.id}>
                  <td>{getSessionTitle(r.sessionId)}</td>
                  <td>{r.email}</td>
                  <td>{new Date(r.creneau).toLocaleString()}</td>
                  <td>{r.participants}</td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReservation(r.id)}>
                      <Trash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
