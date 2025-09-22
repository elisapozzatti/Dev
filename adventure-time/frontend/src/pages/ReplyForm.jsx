import React, { useState } from "react";
import "./forumPost.css";

const ReplyForm = ({ onAddComment }) => {
  const [reply, setReply] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reply.trim() === "") return;
    onAddComment(reply);
    setReply("");
  };

  return (
    <div className="reply-form-container">
      <h3 className="reply-form-title">Lascia una Risposta</h3>
      <form onSubmit={handleSubmit} className="reply-form">
        <textarea
          className="reply-textarea"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Scrivi la tua risposta..."
        />
        <button type="submit" className="reply-submit-btn">
          Invia
        </button>
      </form>
    </div>
  );
};

export default ReplyForm;
