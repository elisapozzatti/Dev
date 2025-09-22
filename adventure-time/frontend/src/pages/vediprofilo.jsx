import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profiloutente.css";
import { useProfile } from '../context/ProfileContext';
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  console.log("id: ", id);
  const [userProfile, setUserProfile] = useState(null); //stato locale per il profilo da visualizzare
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/profile/see/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Dati del profilo ricevuti:", response.data);
      setUserProfile(response.data); 
      setLoading(false);
    } catch (error) {
      console.error("Errore nel recupero del profilo", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Caricamento del profilo utente</p>; 
  }

  //il profilo non è stato caricato
  if (!userProfile) {
    return <p>Profilo non trovato.</p>;
  }

  return (
    <div className="containerprofile">
      {userProfile && (
        <>
          <img
            class="immagineprofilo"
            src={`http://localhost:3000${userProfile?.avatar_url || "/profile.png"}`}
            width={100}
            alt="Avatar"
            onError={(e) => (e.target.src = "/profile.png")} //fallback
        />

          <h2>Profilo di {
              userProfile?.user_name
              }
          </h2>

          <div>
            <strong>Bio:</strong>{userProfile?.bio || "Ciao!"}
          </div>

          <div>
            <strong>Reazioni:</strong> {userProfile?.reactions || "Nessuna reazione"}
          </div>
          <div>
            <strong>Badge:</strong> {userProfile?.badges || "Nessun badge"}
          </div>
          <div>
            <button 
              onClick={() => window.location.href = `mailto:proprietarioCareHub@gmail.com?subject=Segnalazione utente UTENTE#${id} &body=Descrivi il problema qui...`}>
              Segnala
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;