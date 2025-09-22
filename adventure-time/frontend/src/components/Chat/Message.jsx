

const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  );
};

export default Message;