import React, { useState } from "react";
import Axios from 'axios';
import './Registrati.css';
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user_name, setUserName] = useState("");
  const [età, setEtà] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !user_name || !età) {
      setError("Tutti i campi sono obbligatori!");
      return;
    }

    if (!termsAccepted) {
      setError("Devi accettare i Termini e Condizioni per registrarti!");
      return;
    }

    const userData = {
      email, 
      password, 
      user_name, 
      età, 
      termsAccepted, 
      newsletterSubscribed 
    };

    setError("");
    setSuccess("");

    try {
      const response = await Axios.post('http://localhost:3000/api/user/register', userData);
      setSuccess("Registrazione completata con successo!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Errore durante la registrazione");
      } else if (error.request) {
        setError("Errore nella connessione al server");
      } else {
        setError("Errore sconosciuto");
      }
    }
  };

  return (
    <div className="registrati-container">
      <div className="registrati-card">
        <h2 className="registrati-title">Registrati</h2>
        
        {error && (
          <div className="error-message">
            <svg className="error-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"/>
            </svg>
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-message">
            <svg className="success-icon" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,17l-5-5l1.41-1.41L10,14.17l7.59-7.59L19,8l-9,9z"/>
            </svg>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="registrati-form">
          <div className="registrati-form-group">
            <label htmlFor="email" className="registrati-label">Email</label>
            <input
              type="email"
              id="email"
              className="registrati-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserisci la tua email"
            />
          </div>

          <div className="registrati-form-group">
            <label htmlFor="password" className="registrati-label">Password</label>
            <input
              type="password"
              id="password"
              className="registrati-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Inserisci la tua password"
            />
          </div>

          <div className="registrati-form-group">
            <label htmlFor="user_name" className="registrati-label">Nickname</label>
            <input
              type="text"
              id="user_name"
              className="registrati-input"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Crea un nickname"
            />
          </div>

          <div className="registrati-form-group">
            <label htmlFor="età" className="registrati-label">Età</label>
            <input
              type="number"
              id="età"
              className="registrati-input"
              value={età}
              onChange={(e) => setEtà(e.target.value)}
              placeholder="Inserisci la tua età"
              min={18}
              max={120}
            />
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="terms"
              className="registrati-checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="checkbox-label">Accetto i Termini e le Condizioni</label>
          </div>

          <div className="checkbox-container">
            <input
              type="checkbox"
              id="newsletter"
              className="registrati-checkbox"
              checked={newsletterSubscribed}
              onChange={(e) => setNewsletterSubscribed(e.target.checked)}
              required
            />
            <label htmlFor="newsletter" className="checkbox-label">Confermo di aver inserito l'età corretta</label>
          </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}  

        <button type="submit">Registrati</button>
      </form>
<Link to="/login">
      <a className="password-dimenticata" href="#">Hai già un account?</a>  
      </Link>
    </div>
    </div>
  );
};

export default RegisterForm;