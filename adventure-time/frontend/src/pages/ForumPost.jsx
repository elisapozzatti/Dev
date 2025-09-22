import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./forumPost.css";
import CategorySidebar from '../components/CategorySidebar';
import { useLoginReminder } from '../components/LoginReminder';
import { useProfile } from '../context/ProfileContext';
import { Link } from "react-router-dom";

const ForumPost = () => {
  const { profile } = useProfile();
  const { post_id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
   const showReminder = useLoginReminder();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories/');
        setCategories(response.data.categories || []);
      } catch (error) {
        console.error("Errore nel caricamento delle categorie:", error);
        setError("Impossibile caricare le categorie");
      }
    };
    
    fetchCategories();
  }, []);

  const handleSelectCategory = (category) => {
    navigate('/forum', { 
      state: { selectedCategory: category} 
    });
  };

  useEffect(() => {
    fetchData();
  }, [post_id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [postRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:3000/api/post/${post_id}`),
        axios.get(`http://localhost:3000/api/comment/${post_id}/comments`)
      ]);
      console.log(postRes);
      
      setPost({
        ...postRes.data,
        user: {
          user_name: postRes.data.user_name,
          avatar_url: postRes.data.avatar_url || "http://localhost:3000/profile.png"
        }
      }
      
    );
   
    console.log(commentsRes);
      
      setComments(commentsRes.data);
    } catch (err) {
      console.error("Errore nel fetch dei dati:", err);
      setError(err.response?.data?.message || "Errore nel caricamento dei dati");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Il commento non può essere vuoto");
      return;
    }

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        showReminder('Per poter creare un post devi effettuare il login');
        return;
      }

      await axios.post(
        `http://localhost:3000/api/comment/create`,
        { post_id, content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setNewComment("");
      await fetchData();
    } catch (err) {
      console.error("Errore nell'invio del commento:", err);
      setError(err.response?.data?.message || "Errore nell'invio del commento");
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  if (loading) return <div className="loading">Caricamento...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post non trovato</div>;


  console.log("dati utente:", post.user_id);
  console.log("immagine: ", post.user.avatar_url)
  return (
    <div className="forum-post-page">
      <CategorySidebar 
        categories={categories}
        mode="navigate" 
        onCategorySelect={handleSelectCategory}
      />
      
      <div className="post-container">
        <div className="post-card">
          <div className="post-header">
            <div className="author-info">
            <Link to={ `/vediprofilo/${post.user_id}`}>
            <img
                  src={`http://localhost:3000${post.user?.avatar_url}` || "/profile.png"}
                  alt="Profile"
                  className="author-avatar"
                  onError={(e) => {
                    e.target.onerror = null; // evita loop infinito
                    e.target.src = "/profile.png";
                  }}
                />
              <div>
                <h2 className="author-name">{post.user?.user_name || "Anonimo"}</h2>
                <p className="post-date">
                  {formatDateTime(post.created_at)}
                </p>
              </div>
            </Link> 
            </div>
          </div>
          
          <div className="post-content-wrapper">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <button 
                onClick={() => window.location.href = `mailto:proprietarioCareHub@gmail.com?subject=Segnalazione post POST#${post_id} &body=Descrivi il problema qui...`}>
                Segnala
            </button>
          </div>
        </div>

        <div className="comments-section">
          <h4>Commenti ({comments.length})</h4>
          
          <form onSubmit={handleSubmitComment} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Scrivi un commento..."
              className="comment-input"
              rows="3"
            />
            <button type="submit" className="comment-submit">
              Invia
            </button>
          </form>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.comment_id} className="comment">
                <div className="comment-header">
                <Link to={ `/vediprofilo/${comment.user_id}`}>
                <img
                  src={`http://localhost:3000${comment.avatar_url}` || "/profile.png"}
                  alt="Profile"
                  className="comment-avatar"
                  onError={(e) => {
                    e.target.onerror = null; // evita loop infinito
                    e.target.src = "/profile.png";
                  }}
                />
                  <div>
                    <span className="comment-author">{comment.user_name || "Anonimo"}</span>
                    <span className="comment-date">
                      {formatDateTime(comment.created_at)}
                    </span>
                  </div>
                </Link>
                </div>
                <p className="comment-content">{comment.content}</p>
                <button 
                  onClick={() => window.location.href = `mailto:proprietarioCareHub@gmail.com?subject=Segnalazione commento COMMENTO#${comment.comment_id} del post POST#${post_id} &body=Descrivi il problema qui...`}>
                  Segnala
                </button>
              </div>
            ))
          ) : (
            <p className="no-comments">Nessun commento ancora</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPost;