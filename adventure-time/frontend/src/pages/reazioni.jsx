import React, { useState, useEffect } from "react";
import axios from "axios";

const Reactions = ({ targetId, targetType, user }) => {
  const [reactionTypes, setReactionTypes] = useState([]); // Reazioni disponibili
  const [reactions, setReactions] = useState([]); // Reazioni presenti su post/commento
  const [userReaction, setUserReaction] = useState(null); // Reazione dell'utente

  useEffect(() => {
    // Recupera le reazioni disponibili nel database
    const fetchReactionTypes = async () => {
      try {
        const response = await axios.get("/api/reactions/types");
        setReactionTypes(response.data);
      } catch (error) {
        console.error("Errore nel recupero delle reazioni", error);
      }
    };

    fetchReactionTypes();
    fetchReactions();
  }, []);

  // Recupera le reazioni per il post/commento
  const fetchReactions = async () => {
    try {
      const response = await axios.get(`/api/reactions/${targetId}/${targetType}`);
      setReactions(response.data);

      // Controlla se l'utente ha già reagito
      const existingReaction = response.data.find(r => r.user_id === user.id);
      setUserReaction(existingReaction || null);
    } catch (error) {
      console.error("Errore nel recupero delle reazioni", error);
    }
  };

  // Aggiunge una reazione
  const handleAddReaction = async (reactionType, icon) => {
    if (userReaction) {
      alert("Hai già reagito!");
      return;
    }

    try {
      await axios.post(
        "/api/reactions/add",
        { targetId, targetType, reactionType, icon },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      fetchReactions(); // Aggiorna le reazioni dopo l'aggiunta
    } catch (error) {
      console.error("Errore nell'aggiunta della reazione", error);
    }
  };

  // Rimuove una reazione
  const handleRemoveReaction = async () => {
    if (!userReaction) return;

    try {
      await axios.delete("/api/reactions/remove", {
        data: { targetId, targetType },
        headers: { Authorization: `Bearer ${user.token}` },
      });

      fetchReactions(); // Aggiorna le reazioni dopo la rimozione
    } catch (error) {
      console.error("Errore nella rimozione della reazione", error);
    }
  };

  return (
    <div>
      <h3>Reazioni</h3>
      {reactionTypes.map((reaction) => (
        <button key={reaction.reaction_id} onClick={() => handleAddReaction(reaction.name, reaction.icon)}>
          {reaction.icon} {reaction.name}
        </button>
      ))}

      {userReaction && (
        <button onClick={handleRemoveReaction} style={{ marginLeft: "10px", color: "red" }}>
          ❌ Rimuovi Reazione
        </button>
      )}

      <h4>Reazioni attuali:</h4>
      {reactions.map((reaction, index) => (
        <span key={index} style={{ marginRight: "10px" }}>
          {reaction.icon} {reaction.reaction_type}
        </span>
      ))}
    </div>
  );
};

export default Reactions;