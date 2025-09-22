import React, { useState, useEffect } from "react";
import axios from "axios";

const Categories = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Recupera tutte le categorie
  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Errore nel recupero delle categorie", error);
    }
  };

  // Crea una nuova categoria
  const handleCreateCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      alert("Compila tutti i campi!");
      return;
    }

    try {
      await axios.post(
        "/api/categories/create",
        { name: newCategory.name, description: newCategory.description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setNewCategory({ name: "", description: "" });
      fetchCategories();
    } catch (error) {
      console.error("Errore nella creazione della categoria", error);
    }
  };

  return (
    <div>
      <h2>Categorie</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <strong>{category.name}</strong>: {category.description}
          </li>
        ))}
      </ul>

      <h3>Crea una nuova categoria</h3>
      <input
        type="text"
        placeholder="Nome categoria"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Descrizione"
        value={newCategory.description}
        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
      />
      <button onClick={handleCreateCategory}>Aggiungi Categoria</button>
    </div>
  );
};

export default Categories;