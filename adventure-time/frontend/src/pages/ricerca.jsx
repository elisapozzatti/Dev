import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [postId, setPostId] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const handleSearchUsers = async () => {
    try {
      const response = await axios.get(`/api/search/searchUsers?query=${query}`);
      setUsers(response.data);
      setError("");
    } catch (err) {
      setError("Errore nella ricerca utenti");
    }
  };

  const handleSearchPosts = async () => {
    try {
      const response = await axios.get(`/api/search/searchPost?query=${query}&category_id=${categoryId}`);
      setPosts(response.data);
      setError("");
    } catch (err) {
      setError("Errore nella ricerca post");
    }
  };

  const handleSearchComments = async () => {
    try {
      const response = await axios.get(`/api/search/searchComments?query=${query}&post_id=${postId}`);
      setComments(response.data);
      setError("");
    } catch (err) {
      setError("Errore nella ricerca commenti");
    }
  };

  return (
    <div>
      <h2>Ricerca</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        placeholder="Cerca..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearchUsers}>Cerca Utenti</button>
      <button onClick={handleSearchPosts}>Cerca Post</button>
      <button onClick={handleSearchComments}>Cerca Commenti</button>

      <div>
        <h3>Risultati Utenti</h3>
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <strong>{user.user_name}</strong> - {user.bio}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Risultati Post</h3>
        <input
          type="text"
          placeholder="Filtra per categoria"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />
        <ul>
          {posts.map((post) => (
            <li key={post.post_id}>
              <strong>{post.title}</strong>: {post.content}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Risultati Commenti</h3>
        <input
          type="text"
          placeholder="Filtra per post ID"
          value={postId}
          onChange={(e) => setPostId(e.target.value)}
        />
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id}>
              <strong>User {comment.user_id}:</strong> {comment.content}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;