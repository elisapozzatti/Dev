//importazione modulo express
const express = require("express");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");
//libreria per crittografare le password
const bcrypt = require("bcrypt");
//libreria che crea un token che contiene delle informazioni firmato con una chiave segreta
const jwt = require("jsonwebtoken");
//middleware per proteggere le rotte dell'utente autenticato
const authMiddleware = require("../middleware/authMiddleware");

//registrazione utente
router.post("/register", async (req, res) => {

    try {
        const { email, user_name, password,role_id} = req.body;
        const userRoleId = role_id !== undefined ? role_id : 1;
        console.log("Dati ricevuti:", req.body);

        //se i campi sono vuoti da errore
        if (!email || !user_name || !password) {
            return res.status(400).json({ error: "Attenzione, non hai inserito tutti i campi necessari" });
        }

        //prende l'email
        const risultato = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
        console.log(risultato);

        const rows = risultato[0];

        //se esiste gia una riga da errore
        if (rows.length > 0) {
            return res.status(400).json({ error: "Attenzione, esiste già un utente con quella mail" });
        }

      
        const [userRows] = await connection.execute('SELECT user_name FROM users WHERE user_name = ?', [user_name]);

        //se esiste gia una riga da errore
        if (userRows.length > 0) {
            return res.status(400).json({ error: "Attenzione, esiste già un utente con quel username" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //prende gli altri campi di registrazione
        const [result] = await connection.execute(`
            INSERT INTO users (email, user_name, password_hash, role_id)
            VALUES (?, ?, ?, ?)`,
            [email, user_name, hashedPassword, userRoleId]);

        
        

        res.status(200).json({
            message: "L'utente è stato inserito con successo",
            user_id: result.insertId

        });
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

//login utente
router.post("/login", async (req,res)=>{

    try{
        
        const{email,password} = req.body;

        //prende l'email
        const[emailTrovata,] = await connection.execute("SELECT user_id,email,password_hash,role_id FROM users WHERE email = ?", [email]);

        //se l'email non esiste da errore
        if(emailTrovata.length === 0){
            return res.status(400).json({errore: "Email non trovata"});
        }

        const userFound = emailTrovata[0];
        const match = await bcrypt.compare(password, userFound.password_hash);

        //se la password è sbagliata da errore
        if(!match){
            return res.status(400).json({errore : "Password sbagliata"});
        }
        
        const token = jwt.sign({user_id : userFound.user_id, role_id : userFound.role_id}, "segreto", {expiresIn:"24h"});

        res.status(200).json({ message: "Login effettuato con successo", token });

    //se si verifica un errore nel blocco try da errore
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Errore interno del server"});
    }
});

//recuperare dettagli di un utente
router.get("/users/:id", authMiddleware, async (req, res) => {
    const requestedUserId = req.params.id;  
    const loggedUserId = req.user.user_id; 

    //se l'utente sta cercando il proprio profilo si reinderizza al suo profilo
    if (requestedUserId == loggedUserId) {
        return res.redirect("/users/me");
    }

    try {
        //prende i dati dell'utente
        const [rows] = await connection.execute(
            "SELECT user_id, email, user_name, avatar_url, bio, created_at FROM users WHERE user_id = ?",
            [requestedUserId]
        );

        //se l'utente non esiste da errore
        if (rows.length === 0) {
            return res.status(404).json({ message: "Utente non trovato" });
        }

        //invio dati al client
        res.json(rows[0]);
    //se si verifica un errore nel blocco try da errore
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Errore interno del server" });
    }
});

module.exports = router;






