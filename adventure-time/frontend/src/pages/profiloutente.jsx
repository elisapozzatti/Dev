import React, { useState, useEffect } from "react";
import axios from "axios";
import "./profiloutente.css";
import { useProfile } from '../context/ProfileContext';

const UserProfile = () => {
  const { updateProfileImage, profileImage, profile, setProfile } = useProfile();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    bio: "",
    avatar_url: "", 
    avatar_file: null,
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    setFormData({
      user_name: profile.user_name || "", 
      bio: profile.bio || "ciao!", 
      avatar_url: profile.avatar_url || "/profile.png", //usa un URL di fallback
      avatar_file: null,
    })
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/profile/", {
        headers: { Authorization: `Bearer ${token}` },

      });

      console.log("Dati del profilo ricevuti:", response.data); 

      //mi assicuro che i campi siano sempre definiti
      setProfile(response.data);
     
    } catch (error) {
      console.error("Errore nel recupero del profilo", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      console.log("Tentativo di aggiornamento profilo...");

      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token non presente! Utente non autenticato.");
        return;
      }

      const formDataToSend = new FormData();

      formDataToSend.append("user_name", formData.user_name);
      formDataToSend.append("bio", formData.bio);

      //se è stato caricato un file avatar, aggiungo al FormData
      if (formData.avatar_file) {
        console.log("Aggiungo avatar:", formData.avatar_file);
        formDataToSend.append("avatar", formData.avatar_file);
      } else if (formData.avatar_url) {
        formDataToSend.append("avatar_url", formData.avatar_url);
      }else {
        console.log("Nessun file immagine selezionato");
      }

      console.log("FormData inviato:", formDataToSend);

      const response = await axios.put("http://localhost:3000/api/profile/update", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },

      });

      console.log("Risposta server:", response);

      if (response.data.profile && response.data.profile.avatar_url) {
        const newAvatarUrl = response.data.profile.avatar_url;
        console.log("Nuovo avatar ricevuto:", newAvatarUrl);
        setFormData((prevData) => ({
          ...prevData,
          avatar_url: `${newAvatarUrl}?t=${new Date().getTime()}`, //cache buster
          avatar_file: null,
        }));
        updateProfileImage(response.data.profile.avatar_url);
      }

      //ricarico il profilo
      await fetchUserProfile();
      setEditMode(false);
    } catch (error) {
      console.error("Errore nell'aggiornamento del profilo", error);
      if (error.response) {
        console.error("Dettaglio errore:", error.response.data);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      setFormData((prevData) => ({
        ...prevData,
        avatar_url: URL.createObjectURL(file),
        avatar_file: file,
      }));
    }
  };

  return (
    <div className="containerprofile">
      {profile && (
        <>
          <img
            class="immagineprofilo"
            src={
            formData.avatar_file? formData.avatar_url
            : `http://localhost:3000${profile.avatar_url || "/profile.png"}`
            }
            width={100}
            alt="Avatar"
            onError={(e) => (e.target.src = "/profile.png")} //fallback
        />

          {editMode && (
            <div>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </div>
          )}

          <h2>Profilo di {editMode ? (
              <input
                type="text"
                name="user_name"
                value={formData.user_name}
                onChange={handleInputChange}
              />
            ) : (
              profile.user_name
            )}
          </h2>

          <div>
            <strong>Bio:</strong>{" "}
            {editMode ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
              />
            ) : (
              profile.bio || "Ciao!"
            )}
          </div>

          <div>
            <strong>Reazioni:</strong> {profile.reactions || "Nessuna reazione"}
          </div>
          <div>
            <strong>Badge:</strong> {profile.badges || "Nessun badge"}
          </div>
        </>
      )}

      {editMode ? (
        <div>
          <button onClick={handleUpdateProfile}>Salva</button>
          <button onClick={() => setEditMode(false)}>Annulla</button>
        </div>
      ) : (
        <div>
        <button onClick={() => setEditMode(true)}>Modifica Profilo</button>
        <button onClick={handleLogout}>Esci</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;