import React, { useState } from "react";
import './Login.css';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Tutti i campi sono obbligatori!");
      setLoading(false);
      return;
    }

    try {
      const response = await Axios.post('http://localhost:3000/api/user/login', { email, password });
      sessionStorage.setItem("token", response.data.token);
      setError(null); // Nasconde l'errore in caso di successo
      navigate("/forum");
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.errore || "Errore durante il login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Accedi</h2>
        
        {error && (
          <div className="login-error">
            <svg className="login-error-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="password" className="login-label">Password</label>
            <input
              type="password"
              id="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci la tua password"
            />
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Accesso in corso...
              </>
            ) : 'Accedi'}
          </button>
        </form>

        <a className="login-link" href="#">Password dimenticata?</a>
      </div>
    </div>
  );
};

export default LoginForm;