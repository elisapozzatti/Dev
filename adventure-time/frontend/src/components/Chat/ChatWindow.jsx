import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../context/SocketContext';
import axios from 'axios';
import Message from './Message';

const ChatWindow = ({ currentUser, recipientUser }) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentChatId, setCurrentChatId] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Inizializza la chat e carica i messaggi
  useEffect(() => {
    if (!currentUser?.id || !recipientUser?.id) {
      console.log('[ChatWindow] Mancano currentUser o recipientUser, interrompo inizializzazione');
      return;
    }

    console.log(`[ChatWindow] Inizializzazione chat tra ${currentUser.id} e ${recipientUser.id}`);

    const initializeChat = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          console.warn('[ChatWindow] Token non trovato in sessionStorage');
          return;
        }

        // 1. Ottieni o crea chat
        console.log('[ChatWindow] Richiesta creazione/recupero chat...');
        const chatResponse = await axios.post(
          'http://localhost:3000/api/message/start-chat',
          { 
            user1_id: currentUser.id, 
            user2_id: recipientUser.id 
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        console.log(`[ChatWindow] Chat ID ricevuta: ${chatResponse.data.chat_id}`);
        setCurrentChatId(chatResponse.data.chat_id);

        // 2. Carica la cronologia messaggi
        console.log(`[ChatWindow] Caricamento messaggi per chat ${chatResponse.data.chat_id}...`);
        const messagesResponse = await axios.get(
          `http://localhost:3000/api/message/chat/${chatResponse.data.chat_id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log(`[ChatWindow] Ricevuti ${messagesResponse.data.length} messaggi`);
        setMessages(messagesResponse.data);

      } catch (error) {
        console.error('[ChatWindow] Errore inizializzazione chat:', {
          error: error.response?.data || error.message,
          config: error.config
        });
      } finally {
        console.log('[ChatWindow] Fine caricamento iniziale');
        setLoading(false);
      }
    };

    initializeChat();

    return () => {
      console.log('[ChatWindow] Pulizia effetto, reset chatId');
      setCurrentChatId(null);
    };
  }, [currentUser, recipientUser]);

  // Gestione WebSocket
  useEffect(() => {
    if (!socket) {
      console.log('[ChatWindow] Socket non disponibile');
      return;
    }
    
    if (!currentChatId) {
      console.log('[ChatWindow] Nessun chatId, interrompo connessione socket');
      return;
    }

    console.log(`[ChatWindow] Entro nella chat room WS: ${currentChatId}`);
    socket.emit('join_chat', currentChatId);

    const handleNewMessage = (message) => {
      console.log('[ChatWindow] Nuovo messaggio ricevuto via WS:', {
        id: message.message_id,
        sender: message.sender_id,
        timestamp: message.timestamp
      });
      setMessages(prev => [...prev, message]);
    };

    socket.on('new_message', handleNewMessage);

    return () => {
      console.log('[ChatWindow] Pulizia listener WS');
      socket.off('new_message', handleNewMessage);
    };
  }, [socket, currentChatId]);

  useEffect(() => {
    if (messages.length > 0 && messagesEndRef.current) {
      const container = messagesEndRef.current.parentElement;
      const targetPosition = messagesEndRef.current.offsetTop;
      
      // Scroll solo se necessario, mantenendo un margine di 100px dal fondo
      if (container.scrollTop + container.clientHeight < targetPosition + 100) {
        container.scrollTo({
          top: targetPosition - 50,  // 50px sopra l'elemento (regolabile)
          behavior: 'smooth'
        });
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      console.log('[ChatWindow] Tentativo invio messaggio vuoto ignorato');
      return;
    }

    if (!currentChatId) {
      console.warn('[ChatWindow] Nessun chatId, messaggio non inviato');
      return;
    }

    console.log(`[ChatWindow] Invio messaggio via WS a chat ${currentChatId}`, {
      length: newMessage.length,
      preview: newMessage.substring(0, 20) + (newMessage.length > 20 ? '...' : '')
    });

    socket.emit('send_message', {
      chat_id: currentChatId,
      sender_id: currentUser.id,
      recipient_id: recipientUser.id,
      content: newMessage
    });

    setNewMessage('');
  };

  if (loading) {
    console.log('[ChatWindow] Render stato loading...');
    return <div>Caricamento chat...</div>;
  }

  console.log('[ChatWindow] Render interfaccia chat', {
    messagesCount: messages.length,
    currentChatId
  });

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message 
            key={index}
            message={{
              text: msg.content || msg.message,
              timestamp: msg.timestamp
            }}
            isCurrentUser={msg.sender_id === currentUser.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Scrivi un messaggio..."
        />
        <button onClick={handleSendMessage}>Invia</button>
      </div>
    </div>
  );
};

export default ChatWindow;