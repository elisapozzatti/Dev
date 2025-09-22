const express = require('express');
const router = express.Router();
const connection = require("../database");
const authMiddleware = require("../middleware/authMiddleware");

// Modifica l'endpoint /following
router.get('/friendships', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.user_id;
        console.log(`Fetching friendships for user ${userId}`); // Debug

        const [friendships] = await connection.query(`
            SELECT 
                f.*,
                u1.user_name as user_username,
                u1.avatar_url as user_avatar,
                u2.user_name as friend_username,
                u2.avatar_url as friend_avatar
            FROM friendships f
            LEFT JOIN users u1 ON f.user_id = u1.user_id
            LEFT JOIN users u2 ON f.friend_id = u2.user_id
            WHERE f.user_id = ? OR f.friend_id = ?
        `, [userId, userId]);

        console.log(`Found ${friendships.length} friendships`); // Debug

        const formatted = friendships.map(f => {
            const isRequester = f.user_id === userId;
            return {
                id: isRequester ? f.friend_id : f.user_id,
                username: isRequester ? f.friend_username : f.user_username,
                profile_pic: (isRequester ? f.friend_avatar : f.user_avatar) || '/default-avatar.png',
                status: f.status,
                is_requester: f.is_requester, 
                is_friend: f.status === 'accepted'
            };
        });

        res.json(formatted);
    } catch (error) {
        console.error('Database error:', {
            message: error.message,
            sql: error.sql,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
router.get('/friendships/accepted', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.user_id;
        console.log(`Fetching accepted friendships for user ${userId}`); // Debug

        const [friendships] = await connection.query(`
            SELECT 
                f.*,
                u1.user_name as user_username,
                u1.avatar_url as user_avatar,
                u2.user_name as friend_username,
                u2.avatar_url as friend_avatar
            FROM friendships f
            LEFT JOIN users u1 ON f.user_id = u1.user_id
            LEFT JOIN users u2 ON f.friend_id = u2.user_id
            WHERE (f.user_id = ? OR f.friend_id = ?)
            AND f.status = 'accepted'
        `, [userId, userId]);

        console.log(`Found ${friendships.length} accepted friendships`); // Debug

        const formatted = friendships.map(f => {
            const isRequester = f.user_id === userId;
            return {
                id: isRequester ? f.friend_id : f.user_id,
                username: isRequester ? f.friend_username : f.user_username,
                profile_pic: (isRequester ? f.friend_avatar : f.user_avatar) || '/default-avatar.png',
                status: f.status,
                is_requester: f.is_requester, 
                is_friend: true // Ora sarà sempre true poiché filtriamo solo 'accepted'
            };
        });

        res.json(formatted);
    } catch (error) {
        console.error('Database error:', {
            message: error.message,
            sql: error.sql,
            stack: error.stack
        });
        res.status(500).json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
// Modifica l'endpoint di ricerca
router.get('/search', authMiddleware, async (req, res) => {
    try {
        const { query } = req.query;
        if(!query) return res.status(400).json({ error: 'Parametro query mancante' });

        const [users] = await connection.execute(`
            SELECT 
                u.user_id as id,
                u.user_name as username,
                u.avatar_url as profile_pic,
                MAX(CASE 
                    WHEN f.status = 'accepted' THEN 'accepted'
                    WHEN f.status = 'rejected' THEN 'rejected'
                    WHEN f.status = 'pending' THEN 'pending'
                    ELSE 'none'
                END) as status,
                MAX(
                    CASE WHEN f.status IS NOT NULL THEN f.is_requester ELSE NULL END
                ) as is_requester
            FROM users u
            LEFT JOIN friendships f ON 
                (f.user_id = ? AND f.friend_id = u.user_id) OR
                (f.user_id = u.user_id AND f.friend_id = ?)
            WHERE u.user_name LIKE ? AND u.user_id != ?
            GROUP BY u.user_id
            LIMIT 10
        `, [req.user.user_id, req.user.user_id, `%${query}%`, req.user.user_id]);
        
        // Formatta i risultati per essere consistenti con /friendships
        const formattedUsers = users.map(user => ({
            ...user,
            is_requester: user.is_requester || null, // Assicura che sia null se non esiste
            status: user.status || 'none'
        }));

        res.json(formattedUsers);
    } catch(error) {
        console.error("Errore in /search:", error);
        res.status(500).json({ error: 'Errore del server' });
    }
});
// Endpoint migliorato per gestire le amicizie
// Nuova versione con gestione bidirezionale
router.post('/manage-friendship', authMiddleware, async (req, res) => {
    console.log('\n--- INIZIO manage-friendship ---');
    console.log('Request body:', req.body);

    const { friend_id, action } = req.body;
    const user_id = req.user.user_id; // ID dall'autenticazione JWT
    console.log(`Utente autenticato ID: ${user_id}, Azione: ${action} su friend ID: ${friend_id}`);

    // Normalizza la direzione per consistenza del database
    const [minId, maxId] = [Math.min(user_id, friend_id), Math.max(user_id, friend_id)];
    console.log(`Normalizzazione: minId=${minId}, maxId=${maxId}`);

    try {
        // 1. Cerca l'amicizia esistente
        const [existing] = await connection.query(
            `SELECT * FROM friendships 
             WHERE user_id = ? AND friend_id = ?`, 
            [minId, maxId]
        );
        console.log('Amicizia esistente:', existing[0]);

        let result;
        
        // 2. Gestisci le azioni
        switch (action) {
            case 'request':
                if (existing.length === 0) {
                    // Memorizza direttamente l'ID dell'utente che fa la richiesta
                    [result] = await connection.query(
                        `INSERT INTO friendships 
                         (user_id, friend_id, status, is_requester, created_at, updated_at)
                         VALUES (?, ?, 'pending', ?, NOW(), NOW())`,
                        [minId, maxId, user_id] 
                    );
                    console.log(`Nuova richiesta creata. Requester: ${user_id}`);
                } else if (existing[0].status === 'rejected') {
                    // Mantieni lo stesso is_requester originale
                    const originalRequester = existing[0].is_requester;
                    [result] = await connection.query(
                        `UPDATE friendships SET 
                         status = 'pending', 
                         updated_at = NOW()
                         WHERE user_id = ? AND friend_id = ?`,
                        [minId, maxId]
                    );
                    console.log(`Richiesta riattivata. Original requester: ${originalRequester}`);
                }
                break;

            case 'accept':
                if (existing.length === 0) throw new Error('Richiesta non trovata');
                [result] = await connection.query(
                    `UPDATE friendships SET 
                     status = 'accepted',
                     updated_at = NOW()
                     WHERE user_id = ? AND friend_id = ?`,
                    [minId, maxId]
                );
                break;

                case 'reject':
                    if (existing.length === 0) throw new Error('Richiesta non trovata');
                    [result] = await connection.query(
                        `DELETE FROM friendships 
                         WHERE user_id = ? AND friend_id = ?`,
                        [minId, maxId]
                    );
                    console.log(minId,maxId);
                    break;

            case 'unfriend':
                if (existing.length === 0) throw new Error('Amicizia non trovata');
                [result] = await connection.query(
                    `DELETE FROM friendships 
                     WHERE user_id = ? AND friend_id = ?`,
                    [minId, maxId]
                );
                break;

            default:
                throw new Error('Azione non valida');
        }

        // 3. Ottieni lo stato aggiornato
        const [updated] = await connection.query(
            `SELECT * FROM friendships 
             WHERE user_id = ? AND friend_id = ?`,
            [minId, maxId]
        );


        const responseData = {
            status: updated[0]?.status || null,
            is_requester: updated[0]?.is_requester || null, // <-- Mantieni lo stesso nome
            shouldRemove: action === 'unfriend' || action === 'reject'
        };
        console.log('Risposta:', responseData);

        res.json(responseData);

    } catch (error) {
        console.error('Errore in manage-friendship:', {
            message: error.message,
            stack: error.stack,
            action,
            user_id,
            friend_id
        });
        res.status(400).json({ 
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    } finally {
        console.log('--- FINE manage-friendship ---\n');
    }
});
module.exports = router;