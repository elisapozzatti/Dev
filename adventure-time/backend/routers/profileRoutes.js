//importazione modulo express
const express = require("express");
//importazione modulo multer
const multer = require("multer");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");
//middleware per proteggere le rotte dell'utente autenticato
const authMiddleware = require("../middleware/authMiddleware");

const path = require("path");

//multer per il caricamento dell'avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/avatars"); //cartella di destinazione per gli avatar
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); //estraggo l'estensione del file
      cb(null, Date.now() + ext); //timestamp come nome del file
    },
  });
  
  //inizializza Multer con la configurazione
  const upload = multer({ storage });
  
  //ottenere il profilo dell'utente autenticato
  router.get("/", authMiddleware, async (req, res) => {
      const userId = req.user.user_id;

      try {
          const [rows] = await connection.query(
              "SELECT user_id, user_name, role, avatar_url, bio, last_active FROM users WHERE user_id = ?",
              [userId]
          );
  
          if (!rows || rows.length === 0) {
              return res.status(404).json({ error: "Utente non trovato" });
          }
        
          console.log(rows);

          res.json(rows[0]);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: error });
      }
  });
  
  //aggiornare il profilo, inclusa la gestione dell'avatar
  router.put("/update", authMiddleware, upload.single("avatar"), async (req, res) => {
      const userId = req.user.user_id;
      const { user_name, bio } = req.body;
      let avatar_url = req.body.avatar_url;  // Usa l'avatar URL passato dal client, se presente
  
      // Se un file è stato caricato, aggiorniamo l'avatar_url con il percorso dell'immagine
      if (req.file) {
          avatar_url = `/uploads/avatars/${req.file.filename}`; // Usa il percorso dell'immagine salvata
      }
  
      if (!user_name) {
          return res.status(400).json({ error: "L'username è obbligatorio" });
      }
  
      try {
          // Controlliamo se l'utente esiste
          const [existingUser] = await connection.query(
              "SELECT user_id FROM users WHERE user_id = ?",
              [userId]
          );
  
          if (!existingUser.length) {
              return res.status(404).json({ error: "Utente non trovato" });
          }
  
          // Aggiorniamo i dati dell'utente
          await connection.query(
              "UPDATE users SET user_name = ?, bio = ?, avatar_url = ? WHERE user_id = ?",
              [user_name, bio, avatar_url, userId]
          );

          // Recupera il profilo aggiornato
          const [updatedProfile] = await connection.query(
          "SELECT user_id, user_name, bio, avatar_url FROM users WHERE user_id = ?",
          [userId]
          );
  
          res.json({
            message: "Profilo aggiornato con successo",
            profile: updatedProfile[0],  // Restituisci il profilo aggiornato
          });
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Errore nell'aggiornamento del profilo" });
      }
  });
  
  // Vedere il profilo di un altro utente
  router.get("/see/:userId", async (req, res) => {
      const { userId } = req.params;
  
      try {
          const [rows] = await connection.query(
              "SELECT user_id, user_name, bio, avatar_url FROM users WHERE user_id = ?",
              [userId]
          );
  
          if (!rows || rows.length === 0) {
              return res.status(404).json({ error: "Utente non trovato" });
          }
  
          res.json(rows[0]);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Errore nel recupero del profilo" });
      }
  });
  
  module.exports = router;