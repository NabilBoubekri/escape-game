import React, { useState } from "react";
import { useAuth } from "../../../shared/context/AuthContext";

type Props = {
  onLoginSuccess: () => void;
};

export default function LoginForm({ onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Tous les champs sont requis.");
      return;
    }

    if (!email.includes("@")) {
      setError("Email invalide.");
      return;
    }

    const res = await fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("isAuth", "true");
        setAuth(true);
        onLoginSuccess();
      } else {
        setError("Email ou mot de passe incorrect.");
      }
    } else if (res.status === 401) {
      setError("Email ou mot de passe incorrect.");
    } else {
      console.log(res)
      setError("Erreur serveur.");
    }
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: "75vh" }}>
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-light rounded border shadow w-100"
        style={{ maxWidth: "50%", placeSelf: "center", marginTop: "20vh" }}
      >
        <h3>Connexion Employé</h3>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            required
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            className="form-control"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-dark" type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}
