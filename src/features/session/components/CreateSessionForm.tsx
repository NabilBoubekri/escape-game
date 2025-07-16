import { useState } from "react"

export default function CreateSessionForm() {
  const [title, setTitle] = useState("")
  const [theme, setTheme] = useState("")
  const [description, setDescription] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [duree, setDuree] = useState(60)
  const [prix, setPrix] = useState(25)
  const [participantsMin, setParticipantsMin] = useState(2)
  const [creneaux, setCreneaux] = useState([""])

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const session = {
      title,
      theme,
      description,
      imgUrl,
      duree,
      prix,
      participantsMin,
      creneaux: creneaux.filter(c => c.trim() !== "")
    }

    const res = await fetch("/api/v1/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(session)
    })

    if (res.ok) {
      setSuccess(true)
      setTitle("")
      setTheme("")
      setDescription("")
      setImgUrl("")
      setDuree(60)
      setPrix(25)
      setParticipantsMin(2)
      setCreneaux([""])
    } else {
      const result = await res.json()
      setError(result.error || "Erreur lors de la création")
    }
  }

  const handleCreneauChange = (value: string, index: number) => {
    const updated = [...creneaux]
    updated[index] = value
    setCreneaux(updated)
  }

  const addCreneau = () => setCreneaux([...creneaux, ""])
  const removeCreneau = (i: number) => setCreneaux(creneaux.filter((_, idx) => idx !== i))

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h3>Créer une Session</h3>

      <div className="mb-3">
        <label>Titre</label>
        <input className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Thème</label>
        <input className="form-control" value={theme} onChange={e => setTheme(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Image URL</label>
        <input className="form-control" value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Durée (minutes)</label>
        <input type="number" className="form-control" value={duree} onChange={e => setDuree(Number(e.target.value))} />
      </div>

      <div className="mb-3">
        <label>Prix (€)</label>
        <input type="number" className="form-control" value={prix} onChange={e => setPrix(Number(e.target.value))} />
      </div>

      <div className="mb-3">
        <label>Participants minimum</label>
        <input type="number" className="form-control" value={participantsMin} onChange={e => setParticipantsMin(Number(e.target.value))} />
      </div>

      <div className="mb-3">
        <label>Créneaux disponibles</label>
        {creneaux.map((c, i) => (
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

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Session créée avec succès !</div>}

      <button className="btn btn-primary mt-3" type="submit">Créer la session</button>
    </form>
  )
}
    