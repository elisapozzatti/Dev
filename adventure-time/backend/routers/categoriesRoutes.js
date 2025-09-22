//importazione modulo express
const express = require("express");
//creazione router per definire le rotte
const router = express.Router();
//connessione al database
const connection = require("../database");
//middleware per proteggere le rotte dell'utente autenticato
const authMiddleware = require("../middleware/authMiddleware");

//recuperare tutte le categorie
router.get("/", async (req,res)=>{

    try{
        //connessione alla query del database
        const [result] = await connection.execute("SELECT * FROM categories;");
        //invio dei dati al client
        res.json({categories:result});
    //se si verifica un errore nel blocco try, esce "errore interno del server"
    }catch(error){
      console.log(error);
res.status(500).json({error:"errore interno del server"});
    }
});



router.get("/:id", async (req, res) => {
    const categoryId = req.params.id;  // ID della categoria
  
    // Connessione al database
    const query = `
      SELECT
        posts.post_id,
        posts.title,
        posts.content,
        users.user_name,
        users.avatar_url,
        categories.name AS category_name
      FROM
        posts
      JOIN
        users ON posts.user_id = users.user_id
      JOIN
        categories ON posts.category_id = categories.category_id
      WHERE
        posts.category_id = ?
      ORDER BY posts.created_at DESC;
    `;
  
    try {
      const [results] = await connection.execute(query, [categoryId]);  
      res.json({ posts: results });
    } catch (err) {
      console.error('Errore nel recupero dei post:', err);
      res.status(500).json({ error: 'Errore nel recupero dei post' });
    }
  });


//creazione di una categoria
router.post("/create",authMiddleware,async(req,res)=>{

    try{
        const nameCategory = req.body.name;
        const description = req.body.description;

        //se il nome della categoria e la descrizione non sono compilate nei campi da errore
        if (!nameCategory || !description) {
            return res.status(400).json({ error: "Attenzione, non hai inserito tutti i campi necessari" });
        }

        //inserimento della categoria creata nel database
        const [result] = await connection.execute(`INSERT INTO categories(name,description) VALUES (?,?)`,[nameCategory,description]);
        res.status(200).json({message:"categoria inserita con successo", categoryId : result.insertId});
    //se si verifica un errore nel blocco try, esce "errore interno del server"
    }catch(error){
        res.status(500).json({error:"errore interno del server"});

    }
});

module.exports = router