import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Errore nel recupero dei commenti", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(
        "/api/comments/create",
        { post_id: postId, content: newComment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setNewComment("");
      fetchComments();com
    } catch (error) {
      console.error("Errore nell'aggiunta del commento", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      fetchComments();
    } catch (error) {
      console.error("Errore nell'eliminazione del commento", error);
    }
  };

  return (
    <div>
      <h3>Commenti</h3>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Scrivi un commento..."
        />
        <button onClick={handleAddComment}>Invia</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <p>
              <strong>{comment.user_name}:</strong> {comment.content}
            </p>
            {user && user.user_id === comment.user_id && (
              <button onClick={() => handleDeleteComment(comment.comment_id)}>
                Elimina
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;