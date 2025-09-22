//importazione modulo express
const express = require("express");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");

//ricerca utente
router.get("/searchUsers", async (req, res) => {
    const { query } = req.query; 

    //se il campo è vuoto da errore
    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Il parametro 'query' è obbligatorio" });
    }

    try {
        //prende l'utente
        const [users] = await connection.execute(
            "SELECT user_id, user_name, bio FROM users WHERE user_name LIKE ? OR email LIKE ?",
            ["%" + quey + "%", "%" + query + "%"]
        );

        //invio dati al client
        res.json(users);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        res.status(500).json({ error: "Errore nella ricerca utenti" });
    }
});

//ricerca post
router.get("/searchPost", async (req, res) => {
    const { query, category_id } = req.query; 

    //se il campo è vuoto da errore
    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Il parametro 'query' è obbligatorio" });
    }

    try {
        let sql = "SELECT post_id, title, content, user_id, category_id FROM posts WHERE title LIKE ? OR content LIKE ?";
        let params = [`%${query}%`, `%${query}%`];

        //se la categoria è definita trova i post con quella categoria
        if (category_id) {
            sql += " AND category_id = ?";
            params.push(category_id);
        }

        const [posts] = await connection.execute(sql, params);

        //invio dati al client
        res.json(posts);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        res.status(500).json({ error: "Errore nella ricerca post" });
    }
});

//ricerca commento
router.get("/searchComments", async (req, res) => {
    const { query, post_id } = req.query; 

    //se il campo è vuoto da errore
    if (!query || query.trim() === "") {
        return res.status(400).json({ error: "Il parametro 'query' è obbligatorio" });
    }

    try {
        let sql = "SELECT comment_id, content, user_id, post_id FROM comments WHERE content LIKE ?";
        let params = [`%${query}%`];

        //se il commento è definito trova quelli simili
        if (post_id) {
            sql += " AND post_id = ?";
            params.push(post_id);
        }

        const [comments] = await connection.execute(sql, params);

        //invio dati al client
        res.json(comments);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        res.status(500).json({ error: "Errore nella ricerca commenti" });
    }
});

module.exports = router;
