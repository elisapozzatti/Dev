//importazione modulo express
const express = require("express");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");
//middleware per proteggere le rotte dell'utente autenticato
const authMiddleware = require("../middleware/authMiddleware");

//aggiungere una reazione
router.post("/add", authMiddleware, async(req, res)=>{
    const {targetId, targetType, reactionType, icon} = req.body;
    const userId = req.user.id;

    try{
        //connessione alla query del database
        const[existingReaction] = await connection.query(
            "SELECT * FROM reactions WHERE (post_id = ? AND ? = 'post') OR (comment_id = ? AND ? = 'comment')",
            [targetId, targetType, targetId, targetType]
        );

        //se la reazione c'è già da errore
        if(existingReaction.length > 0){
            return res.status(400).json({error: "Hai già reagito"});
        }

        //connessione alla query del database
        const[result] = await connection.query(
            "INSERT INTO reactions (user_id, post_id, comment_id, reaction_type_id, icon) VALUES (?, ?, ?, ?, ?)",
            [userId, targetType === 'post' ? targetId : null, targetType === 'comment' ? targetId : null, reactionType, icon]
        );

        res.status(201).json({message: "Reazione aggiunta con successo", reactionId: result.insertId});
    //se si verifica un errore nel blocco try da errore
    }catch (error) {
        res.status(500).json({ error: "Errore nell'aggiunta della reazione" });
    }
});

//rimuovere una reazione
router.delete("/remove", authMiddleware, async (req, res) => {
    const { targetId, targetType } = req.body;
    const userId = req.user.id;

    try {
        //connessione alla query del database
        const [result] = await connection.query(
            "DELETE FROM reactions WHERE user_id = ? AND (post_id = ? OR comment_id = ?)",
            [userId, targetType === 'post' ? targetId : null, targetType === 'comment' ? targetId : null]
        );

        //se non c'è nessuna modifica da errore
        if (result.affectedRows === 0) {
            return res.status(403).json({ error: "Nessuna reazione trovata o non autorizzato" });
        }

        res.json({ message: "Reazione rimossa con successo" });
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        res.status(500).json({ error: "Errore nella rimozione della reazione" });
    }
});

//ottenere tutte le reazioni di un post
router.get("/:targetId/:targetType", async (req, res) => {
    const {targetId, targetType} = req.params;
    
    try {
        //se i due target non sono inseriti da errore
        if(!targetId || !targetType){
            return res.status(400).json({error: "errore di dati mancanti"});
        }

        //connessione alla query del database
        const [reactions] = await connection.query(
            "SELECT user_id, reaction_types.name AS reaction_type, reaction_types.icon FROM reactions JOIN reaction_types ON reactions.reaction_type_id = reaction_types.reaction_id WHERE post_id = ?  OR comment_id = ?",
            [targetId, targetType]
        );

        //invio dei dati al client
        res.json(reactions);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle reazioni" });
    }
});

// Ottenere tutte le reazioni disponibili
router.get("/types", async (req, res) => {
    try {
        const [reactions] = await connection.query("SELECT reaction_id, name, icon FROM reaction_types");
        res.json(reactions);
    } catch (error) {
        res.status(500).json({ error: "Errore nel recupero delle reazioni" });
    }
});

module.exports = router;
