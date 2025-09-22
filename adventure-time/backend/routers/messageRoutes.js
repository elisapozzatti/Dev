const express = require("express");
const router = express.Router();
const connection = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

// Helper per ottenere chat_id
const getOrCreateChat = async (user1_id, user2_id) => {
    // 1. Cerca chat ESISTENTI in entrambe le direzioni
    const [existingChats] = await connection.query(
      `SELECT chat_id FROM chats 
       WHERE (user1_id = ? AND user2_id = ?)
       OR (user1_id = ? AND user2_id = ?)
       ORDER BY created_at DESC LIMIT 1`, // Prendi la più recente
      [user1_id, user2_id, user2_id, user1_id]
    );
  
    // 2. Se esiste già, ritorna quella
    if (existingChats.length > 0) {
      console.log(`Trovata chat esistente: ${existingChats[0].chat_id}`);
      return existingChats[0].chat_id;
    }
  
    // 3. Altrimenti crea nuova chat
    const [result] = await connection.query(
      `INSERT INTO chats (user1_id, user2_id) 
       VALUES (?, ?)`,
      [user1_id, user2_id]
    );
  
    console.log(`Creata nuova chat: ${result.insertId}`);
    return result.insertId;
  };

// Invia messaggio (aggiornato con chat_id)
router.post("/send", authMiddleware, async(req, res) => {
    const { recipient_id, content } = req.body;
    const sender_id = req.user.user_id;

    try {
        // Ottieni o crea chat
        const chat_id = await getOrCreateChat(sender_id, recipient_id);

        const [result] = await connection.query(
            "INSERT INTO messages(chat_id, sender_id, recipient_id, message) VALUES (?, ?, ?, ?)",
            [chat_id, sender_id, recipient_id, content]
        );

        const newMessage = {
            message_id: result.insertId,
            chat_id,
            sender_id,
            recipient_id,
            message: content,
            timestamp: new Date()
        };

        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Errore nell'invio del messaggio" });
    }
});

// Recupera messaggi della chat (versione unificata)
router.get("/chat/:chat_id", authMiddleware, async (req, res) => {
    try {
        // Validazione aggiuntiva
        const chat_id = parseInt(req.params.chat_id);
        if (isNaN(chat_id)) {
            return res.status(400).json({ error: "ID chat non valido" });
        }

        const [messages] = await connection.query(
            `SELECT m.*, u.user_name as sender_name
             FROM messages m
             JOIN users u ON m.sender_id = u.user_id
             WHERE m.chat_id = ?
             ORDER BY m.timestamp ASC`,
            [chat_id] // Usa la variabile già validata
        );
        
        res.json(messages);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Errore nel recupero dei messaggi" });
    }
});

// Recupera tutte le chat dell'utente (nuovo endpoint)
router.get("/chats", authMiddleware, async (req, res) => {
    try {
        const [chats] = await connection.query(
            `SELECT c.chat_id, 
                    c.user1_id, 
                    c.user2_id,
                    u.username as other_user_name,
                    (SELECT message FROM messages 
                     WHERE chat_id = c.chat_id 
                     ORDER BY timestamp DESC LIMIT 1) as last_message
             FROM chats c
             JOIN users u ON (u.user_id = CASE 
                                          WHEN c.user1_id = ? THEN c.user2_id 
                                          ELSE c.user1_id 
                                        END)
             WHERE c.user1_id = ? OR c.user2_id = ?`,
            [req.user.user_id, req.user.user_id, req.user.user_id]
        );
        
        res.json(chats);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Errore nel recupero delle chat" });
    }
});

// Elimina messaggio (versione sicura)
router.delete("/:message_id", authMiddleware, async (req, res) => {
    try {
        // Verifica che l'utente sia il mittente
        const [verify] = await connection.query(
            "SELECT sender_id FROM messages WHERE message_id = ?",
            [req.params.message_id]
        );

        if (verify.length === 0 || verify[0].sender_id !== req.user.user_id) {
            return res.status(403).json({ error: "Non autorizzato" });
        }

        await connection.query(
            "DELETE FROM messages WHERE message_id = ?",
            [req.params.message_id]
        );

        res.json({ message: "Messaggio eliminato con successo" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Errore nell'eliminazione del messaggio" });
    }
});
// Nuovo endpoint per creare/iniziare chat
router.post("/start-chat", authMiddleware, async (req, res) => {
    try {
      const { user1_id, user2_id } = req.body;
      const chat_id = await getOrCreateChat(user1_id, user2_id);
      res.json({ chat_id });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Errore nella creazione della chat" });
    }
  });

module.exports = router;