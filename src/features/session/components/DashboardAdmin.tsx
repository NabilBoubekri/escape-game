import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Session } from "../../shared/types"
import { Pen, Plus, Trash } from "lucide-react"

export default function DashboardAdmin() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const fetchSessions = async () => {
    try {
      const res = await fetch("/api/v1/sessions")
      if (!res.ok) throw new Error("Erreur lors du chargement")
      const data = await res.json()
      setSessions(data)
    } catch (err: any) {
      setError(err.message)
    }
  }

  useEffect(() => {
    fetchSessions()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette session ?")) return
    const res = await fetch(`/api/v1/sessions/${id}`, { method: "DELETE" })
    if (res.ok) {
      setSessions((prev) => prev.filter((s) => s.id !== id))
    } else {
      alert("Erreur lors de la suppression")
    }
  }

  const handleEdit = (id: string) => {
    navigate(`/admin/edit/${id}`)
  }

  return (
    <div className="container mt-5" style={{"minHeight": "75vh"}}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dashboard Admin</h2>
        <button className="btn btn-success" onClick={() => navigate("/admin/create")}>
          <Plus /> Créer une session
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {sessions.length === 0 ? (
        <p>Aucune session enregistrée.</p>
      ) : (
        <div className="table-responsive">
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
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(s.id)}><Trash /></button>
                    </div>
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
