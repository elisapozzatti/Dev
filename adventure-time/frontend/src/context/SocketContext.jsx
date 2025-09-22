import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const getUserIdFromToken = () => {
      const token = sessionStorage.getItem('token');
      if (!token) return null;
      
      try {
        const payload = token.split('.')[1];
        const decoded = JSON.parse(atob(payload));
        return decoded.user_id || decoded.sub;
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    };

    const userId = getUserIdFromToken();
    console.log('Initializing socket for user:', userId);

    const socketInstance = io('http://localhost:3000', {
      transports: ['websocket'],
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      autoConnect: true,
      auth: { userId } // Invia l'ID utente durante la connessione
    });

    const onConnect = () => {
      setIsConnected(true);
      console.log('Socket connected successfully');
      
      // Registra l'utente dopo la connessione
      if (userId) {
        socketInstance.emit('register_user', userId);
      }
    };

    const onDisconnect = (reason) => {
      setIsConnected(false);
      console.log('Socket disconnected, reason:', reason);
    };

    const onConnectError = (err) => {
      console.error('Socket connection error:', err);
    };

    socketInstance.on('connect', onConnect);
    socketInstance.on('disconnect', onDisconnect);
    socketInstance.on('connect_error', onConnectError);

    setSocket(socketInstance);

    return () => {
      socketInstance.off('connect', onConnect);
      socketInstance.off('disconnect', onDisconnect);
      socketInstance.off('connect_error', onConnectError);
      
      if (socketInstance.connected) {
        socketInstance.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};