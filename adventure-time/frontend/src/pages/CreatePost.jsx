import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreatePost.css";
import CategoryInfoCard from '../components/CategoryInfoCard';
import { useLoginReminder } from '../components/LoginReminder';
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categoryDetails, setCategoryDetails] = useState({ description: "", rules: "" });
  const showReminder = useLoginReminder();
  const navigate = useNavigate();
 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/categories");
        const categoriesArray = response.data?.categories || [];
        setCategories(categoriesArray);
        
        if (categoriesArray.length > 0) {
          setCategory(categoriesArray[0].category_id);
        }
      } catch (err) {
        handleError("Errore nel caricamento delle categorie", err);
        setCategories([]);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && category) {
      const selectedCategory = categories.find(cat => 
        String(cat.category_id) === String(category)
      );
  
      if (selectedCategory) {
        setCategoryDetails({
          description: selectedCategory.description || "",
          rules: selectedCategory.rules || ""
        });
      }
    }
  }, [category, categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const category_id = category;

    try {
      const token = sessionStorage.getItem('token');
      if (!token){
        showReminder('Per poter creare un post devi effettuare il login');
        return;
      }
  
      const response = await axios.post(
        "http://localhost:3000/api/post/create", 
        {
          category_id,
          title,
          content
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
  
      resetForm();
      console.log("Post creato:", response.data);
      navigate(`/categorie/${category_id}`, {
        state: { 
          message: "Post creato con successo!",
          
        }
      });
      
      
    } catch (err) {
      let errorMessage = "Errore nell'invio del post";
      
      if (err.response) {
        if (err.response.status === 400) {
          errorMessage = "Dati non validi: " + 
            (err.response.data?.message || "controlla i campi inseriti");
        } else if (err.response.status === 401) {
          errorMessage = "Accesso non autorizzato";
          sessionStorage.removeItem('token');
        }
      }
      
      setError(errorMessage);
      console.error("Errore dettagliato:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    if (categories.length > 0) {
      setCategory(categories[0].category_id);
    }
  };

  const handleError = (message, error) => {
    setError(message);
    console.error(error);
    setTimeout(() => setError(null), 5000);
  };

  return (
    <div className="post-creator">
      <div className="post-creator-container">
        <div className="post-creator-card">
          <h2 className="post-creator-title">Crea un nuovo post</h2>

          {error && (
            <div className="post-creator-alert error">
              <svg className="alert-icon" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"
                />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="post-creator-form">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Titolo
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="form-input"
                placeholder="Inserisci un titolo accattivante"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content" className="form-label">
                Contenuto
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="form-textarea"
                placeholder="Scrivi il contenuto del tuo post qui..."
                rows={10}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Categoria
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
                required
              >
                {categories.map((cat) => (
                  <option key={cat.category_id} value={cat.category_id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || categories.length === 0}
              className={`submit-button ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Invio in corso...
                </>
              ) : (
                "Crea Post"
              )}
            </button>
          </form>
        </div>

        <CategoryInfoCard 
          categoryDetails={categoryDetails}
          title="Dettagli Categoria"
        />
      </div>
    </div>
  );
};

export default CreatePost;