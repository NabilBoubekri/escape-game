import React, { useState } from 'react'
import { useAuth } from '../../../shared/context/AuthContext'

type Props = {
  onLoginSuccess: () => void
}

export default function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setAuth } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/v1/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (res.ok) {
      const result = await res.json()
      if (result.success) {
        localStorage.setItem('isAuth', 'true')
        setAuth(true)
        onLoginSuccess()
      } else {
        setError('Email ou mot de passe incorrect.')
      }
    } else {
      setError('Erreur serveur.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-light rounded border shadow">
      <h3>Connexion Employé</h3>
      <div className="mb-3">
        <label>Email</label>
        <input className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label>Mot de passe</label>
        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <button className="btn btn-dark" type="submit">Se connecter</button>
    </form>
  )
}