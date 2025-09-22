import React, { useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginReminder.css';

// Creiamo il context
const LoginReminderContext = createContext();

// Creiamo un provider
export const LoginReminderProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const showReminder = (customMessage) => {
    setMessage(customMessage || 'Devi effettuare il login per accedere a questa funzionalità');
    setIsVisible(true);
  };

  const handleLogin = () => {
    setIsVisible(false);
    navigate('/login');
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <LoginReminderContext.Provider value={{ showReminder }}>
      {children}
      {isVisible && (
        <div className="login-reminder-overlay">
          <div className="login-reminder-container">
            <div className="login-reminder-content">
              <h3>Accesso richiesto</h3>
              <p>{message}</p>
              
              <div className="login-reminder-buttons">
                <button 
                  className="reminder-secondary-button"
                  onClick={handleClose}
                >
                  Più tardi
                </button>
                <button 
                  className="reminder-primary-button"
                  onClick={handleLogin}
                >
                  Accedi ora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoginReminderContext.Provider>
  );
};

// Hook per utilizzare il reminder
export const useLoginReminder = () => {
  const context = useContext(LoginReminderContext);
  if (!context) {
    throw new Error('useLoginReminder must be used within a LoginReminderProvider');
  }
  return context.showReminder;
};

// Esportiamo anche il context per usi diretti
export { LoginReminderContext };