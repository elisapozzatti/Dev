import React, { useState, useEffect } from "react";
import axios from "axios";

const Messages = ({ user, recipientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState("");

  // Recupera i messaggi tra l'utente e il destinatario
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/messages/${recipientId}/recover`, {
          headers: {
            Authorization: `Bearer ${user.token}`, // Autenticazione con token
          },
        });
        setMessages(response.data);
      } catch (error) {
        setError("Errore nel recupero dei messaggi.");
        console.error(error);
      }
    };

    fetchMessages();
  }, [recipientId, user.token]); // Quando recipientId o user.token cambiano, ricarica i messaggi

  // Gestisce l'invio di un messaggio
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      setError("Il messaggio non può essere vuoto.");
      return;
    }

    try {
      await axios.post(
        "/api/messages/send",
        { recipientId, content: newMessage },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setNewMessage(""); // Pulisce il campo del messaggio
      setError(""); // Reset dell'errore
      // Ricarica i messaggi dopo l'invio
      const response = await axios.get(`/api/messages/${recipientId}/recover`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      setError("Errore nell'inviare il messaggio.");
      console.error(error);
    }
  };

  // Gestisce l'eliminazione di un messaggio
  const handleDeleteMessage = async (messageId) => {
    try {
      await axios.delete(`/api/messages/${messageId}/delete`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // Rimuove il messaggio dalla lista
      setMessages(messages.filter((message) => message.id !== messageId));
    } catch (error) {
      setError("Errore nell'eliminazione del messaggio.");
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Messaggi con {recipientId}</h2>

      {/* Visualizza errore se presente */}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div>
        {/* Elenco dei messaggi */}
        {messages.length === 0 ? (
          <p>Non ci sono messaggi.</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <p>
                  <strong>{message.sender_id === user.id ? "Tu" : "Destinatario"}:</strong>
                  {message.content}
                </p>
                {message.sender_id === user.id && (
                  <button onClick={() => handleDeleteMessage(message.id)}>Elimina</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Form per inviare un messaggio */}
      <form onSubmit={handleSendMessage}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Scrivi il tuo messaggio"
        />
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};

export default Messages;