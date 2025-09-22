//importazione modulo express
const express = require("express");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");
//middleware per proteggere le rotte dell'utente autenticato
const authMiddleware = require("../middleware/authMiddleware");

//creazione di un post
router.post("/create", authMiddleware, async (req, res) => {

    try {
        const { category_id, title, content } = req.body;
        const user_id = req.user.user_id;

        //se uno di questi campi non è compilato da errore
        if (!category_id || !title || !content) {
            return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
        }

        //aggiunge il post al database
        const [result] = await connection.execute(
            "INSERT INTO posts (user_id, category_id, title, content) VALUES (?, ?, ?, ?)",
            [user_id, category_id, title, content]
        );

        res.status(201).json({ message: "Post creato con successo", post_id: result.insertId });
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

//ottenere tutti i post
router.get("/", async (req, res) => {

    try {
        //prende tutti i post
        const [posts] = await connection.execute(
            "SELECT p.*, u.user_name, c.name AS category_name FROM posts p " +
            "JOIN users u ON p.user_id = u.user_id " +
            "JOIN categories c ON p.category_id = c.category_id " +
            "ORDER BY p.created_at DESC"
        );

        //invia i dati al client
        res.json(posts);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

//cercare un post
router.get("/:post_id", async (req, res) => {
    try {
        const post_id = req.params.post_id;

        //prende il post con la sua categoria e l'utente che l'ha creato
        const [post] = await connection.execute(
            "SELECT p.*,u.avatar_url,u.user_name, c.name AS category_name FROM posts p " +
            "JOIN users u ON p.user_id = u.user_id " +
            "JOIN categories c ON p.category_id = c.category_id " +
            "WHERE p.post_id = ? "
            ,
            [post_id]
        );

        //se il post non esiste da errore
        if (post.length === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        //invio i dati al client
        res.json(post[0]);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

//modificare un post
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const post_id = req.params.id;
        const { title, content } = req.body;
        const user_id = req.user.user_id;

        //prende il post desiderato
        const [post] = await connection.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);
        if (post.length === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        //se l'utente non coincide con il proprietario del post da errore
        if (post[0].user_id !== user_id) {
            return res.status(403).json({ error: "Non sei autorizzato a modificare questo post" });
        }

        //modifica il post
        await connection.execute(
            "UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE post_id = ?",
            [title, content, post_id]
        );

        res.json({ message: "Post aggiornato con successo" });
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

//eliminare un post
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const post_id = req.params.id;
        const user_id = req.user.user_id;

        //prende il post da cancellare
        const [post] = await connection.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);

        //se il post non esiste da errore
        if (post.length === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        //se l'utente e il proprietario del post non coincidono da errore
        if (post[0].user_id !== user_id) {
            return res.status(403).json({ error: "Non sei autorizzato a eliminare questo post" });
        }

        //elimina il post
        await connection.execute("DELETE FROM posts WHERE post_id = ?", [post_id]);
        res.json({ message: "Post eliminato con successo" });
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

module.exports = router;
