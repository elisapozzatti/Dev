import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import ChatWindow from '../components/Chat/ChatWindow';
import UserList from '../components/Chat/UserList';
import { useLoginReminder } from '../components/LoginReminder';
import './chat.css';
import { useProfile } from '../context/ProfileContext';
import { Link } from 'react-router-dom';

const ChatPage = () => {
  const { profile } = useProfile();
  const { userId } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [recipientUser, setRecipientUser] = useState(null);
  const showReminder = useLoginReminder();

  useEffect(() => {
    const fetchCurrentUser = () => {
      const token = sessionStorage.getItem('token');
      if (!token) {
        showReminder('Per accedere alla chat devi effettuare il login');
        return;
      } 

      try {
        const decodedToken = jwtDecode(token);
        setCurrentUser({ id: decodedToken.user_id });
      } catch (error) {
        console.error("Errore nel decodificare il token:", error);
      }
    };

    fetchCurrentUser();
  }, [showReminder]);

  useEffect(() => {
    const fetchRecipient = async () => {
      if (!userId || !currentUser?.id || userId === currentUser.id) return;

      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:3000/api/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setRecipientUser({
          id: response.data.user_id,
          name: response.data.username,
          profile_pic: response.data.profile_pic || "/profile.png"
        });
      } catch (error) {
        console.error('Errore nel caricamento del destinatario:', error);
      }
    };

    fetchRecipient();
  }, [userId, currentUser]);

  const handleUserSelect = (user) => {
    setRecipientUser(user);
  };

  if (!currentUser) return <div>Caricamento informazioni utente...</div>;

  console.log("dati profilo: ", profile);
  console.log("userId:", userId);

  return (
    <div className="chat-page-container">
      <div className="chat-layout">
        <aside className="user-sidebar">
          <UserList 
            currentUserId={currentUser.id}
            onUserSelect={handleUserSelect}
          />
        </aside>
        
        <main className="chat-main">
          {recipientUser ? (
            <>
              <Link to={`/vediprofilo/${recipientUser.id}`}>
              <div className="chat-header">
              <img
                src={`http://localhost:3000${recipientUser?.profile_pic || "/profile.png"}`}
                alt="Profile"
                className="chatavatar"
                onError={(e) => {
                  e.target.onerror = null; // evita loop infinito
                  e.target.src = "/profile.png";
                }}
              />
                <h2>Chat con {recipientUser.name}</h2>
              </div>
              </Link>
              <ChatWindow currentUser={currentUser} recipientUser={recipientUser} />
            </>
          ) : (
            <div>Seleziona un contatto per iniziare a chattare</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ChatPage;