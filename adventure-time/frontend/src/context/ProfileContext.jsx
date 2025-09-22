import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

//crea il Context per l'immagine del profilo
const ProfileContext = createContext();

//provider che avvolge l'app per fornire lo stato globale dell'immagine
export const ProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || '/profile.png');
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (!token) {
          console.warn("Nessun token trovato, utente non autenticato");
          return;
        }

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

    fetchUserProfile();
  }, []);

  //per aggiornare l'immagine del profilo
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
    localStorage.setItem('profileImage', newImage);
  };

  return (
    <ProfileContext.Provider value={{ profileImage, updateProfileImage, profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

//hook personalizzato per usare facilmente il context
export const useProfile = () => useContext(ProfileContext);
