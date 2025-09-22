import React, { useEffect, useState } from 'react';
import "./ForumHomePage.css"; 
import axios from 'axios';
import { Link, useNavigate,useLocation } from "react-router-dom";
import CategorySidebar from '../components/CategorySidebar';
import CategoryInfoCard from '../components/CategoryInfoCard';

const ForumHomePage = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories/');
        setCategories(response.data.categories || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (location.state?.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
      handleCategoryClick(location.state.selectedCategory);
    }
  }, [location.state]);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setPostsLoading(true);
    setPosts([]);
    
    try {
      console.log(category.category_id);
      const response = await axios.get(`http://localhost:3000/api/categories/${category.category_id}`);
      setPosts(response.data.posts || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setPostsLoading(false);
    }
  };

  const handleCreatePost = () => {
    if (selectedCategory) {
      navigate(`/CreatePost`);
    } else {
      alert('Seleziona prima una categoria');
    }
  };

  if (loading) {
    return <div>Caricamento in corso...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <div className="forum-container">
      <CategorySidebar 
  categories={categories}
  mode="select"
  onCategorySelect={handleCategoryClick}
/>

      <div className="selected-category">
        {selectedCategory ? (
          <div className="category-header">
            <h3>Hai selezionato: {selectedCategory.name}</h3>
            <button 
              className="create-post-button"
              onClick={handleCreatePost}
            >
              Crea nuovo post
            </button>
           
          </div>
        ) : (
          <p>Seleziona una categoria per visualizzare le discussioni.</p>
        )}

        {postsLoading ? (
          <div>Caricamento dei post...</div>
        ) : (
          <div className="discussion-list">
            {posts.length === 0 ? (
              <p>Non ci sono discussioni in questa categoria.</p>
            ) : (
              posts.map((post) => (
                <div className="discussion-item" key={post.post_id}>
                  <h2>
                    <Link to={`/post/${post.post_id}`} className="discussion-title">
                      {post.title}
                    </Link>
                  </h2>
                  <div className="discussion-meta">
                    <p>Autore: {post.user_name}</p>
                    <p>Categoria: {post.category_name}</p>
                  </div>
                  <p>{post.content}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>


      {selectedCategory && (
  <CategoryInfoCard 
    categoryDetails={{
      description: selectedCategory.description || "Nessuna descrizione",
      rules: selectedCategory.rules || "Nessuna regola"
    }}
    title={`Informazioni su ${selectedCategory.name}`}
  />
)}
    </div>
  );
};

export default ForumHomePage;