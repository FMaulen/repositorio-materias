import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user || !password) {
      setError("Ambos campos son obligatorios.");
      return;
    }
    setError("");
    const hashedPassword = crypto.subtle
      ? crypto.subtle.digest("SHA-256", new TextEncoder().encode(password))
      : null;
    console.log("Usuario:", user);
    console.log("Contraseña encriptada (hash):", hashedPassword);
    alert(`Login simulado exitoso para el usuario: ${user}`);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "150px" }}>
      <form className="form-login p-4" onSubmit={handleSubmit} noValidate>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        {error && (
          <div role="alert" className="alert alert-danger text-center mb-3">
            {error}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="user" className="form-label">Usuario</label>
          <input
            type="text"
            id="user"
            name="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="form-control"
            placeholder="Ingrese usuario o correo"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Ingrese contraseña"
            required
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" id="remember" className="form-check-input" />
          <label htmlFor="remember" className="form-check-label">
            Recordar inicio de sesión
          </label>
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary login-btn">
            Iniciar Sesión
          </button>
          <Link to="/registrarse" className="btn btn-secondary login-btn">
            Registrarse
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;