// Importazione moduli
const express = require("express");
const router = express.Router();
const connection = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

// Aggiungere un commento sotto un post
router.post("/create", authMiddleware, async (req, res) => {
    try {
        const { post_id, content, parent_comment_id } = req.body;
        const user_id = req.user.user_id;

        if (!post_id || !content) {
            return res.status(400).json({ error: "Tutti i campi sono obbligatori" });
        }

        // Controllo se il post esiste
        const [post] = await connection.execute("SELECT * FROM posts WHERE post_id = ?", [post_id]);
        if (post.length === 0) {
            return res.status(404).json({ error: "Post non trovato" });
        }

        // Controllo se il commento padre esiste
        if (parent_comment_id) {
            const [parentComment] = await connection.execute("SELECT * FROM comments WHERE comment_id = ?", [parent_comment_id]);
            if (parentComment.length === 0) {
                return res.status(404).json({ error: "Commento padre non trovato" });
            }
        }

        // Inserimento commento nel database
        const [result] = await connection.execute(
            "INSERT INTO comments (post_id, user_id, content, parent_comment_id) VALUES (?, ?, ?, ?)",
            [post_id, user_id, content, parent_comment_id || null]
        );

        res.status(201).json({ message: "Commento creato con successo", comment_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// Ottenere i commenti di un post
router.get("/:post_id/comments", async (req, res) => {
    try {
        const { post_id } = req.params;
        
        const [comments] = await connection.execute(
            `SELECT c.*, u.avatar_url, u.user_name FROM comments c 
            JOIN users u ON c.user_id = u.user_id 
            WHERE c.post_id = ? ORDER BY c.created_at DESC`, [post_id]
        );
        
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// Ottenere un commento specifico
router.get("/comments/:comment_id", async (req, res) => {
    try {
        const { comment_id } = req.params;
        
        const [comment] = await connection.execute(
            `SELECT c.*, u.user_name FROM comments c 
            JOIN users u ON c.user_id = u.user_id 
            WHERE c.comment_id = ?`, [comment_id]
        );

        if (comment.length === 0) {
            return res.status(404).json({ error: "Commento non trovato" });
        }

        res.json(comment[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// Eliminare un commento
router.delete("/comments/:comment_id", authMiddleware, async (req, res) => {
    try {
        const { comment_id } = req.params;
        const user_id = req.user.user_id;

        const [comment] = await connection.execute("SELECT * FROM comments WHERE comment_id = ?", [comment_id]);
        if (comment.length === 0) {
            return res.status(404).json({ error: "Commento non trovato" });
        }

        if (comment[0].user_id !== user_id) {
            return res.status(403).json({ error: "Non sei autorizzato a eliminare questo commento" });
        }

        await connection.execute("DELETE FROM comments WHERE comment_id = ?", [comment_id]);
        res.json({ message: "Commento eliminato con successo" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

// Aggiungere una reazione al commento
router.post("/reaction", authMiddleware, async (req, res) => {
    try {
        const { reactionType, commentId } = req.body;
        const userId = req.user.user_id;
        
        await connection.execute(
            "INSERT INTO comment_reactions(comment_id, user_id, reaction_type) VALUES (?, ?, ?)",
            [commentId, userId, reactionType]
        );
        
        res.status(201).json({ message: "Reazione aggiunta con successo" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore nell'aggiunta della reazione" });
    }
});

module.exports = router;