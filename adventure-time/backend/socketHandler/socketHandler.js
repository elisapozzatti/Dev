const socketIO = require('socket.io');
const db = require('../database'); // Importa la connessione al database

const initSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    transports: ['websocket'],
    allowEIO3: true
  });

  const userConnections = new Map(); // { userId: Set<socketId> }

  io.on('connection', (socket) => {
    console.log('🟢 Nuova connessione - Socket ID:', socket.id);

    // Registra l'utente quando fornisce il suo ID
    socket.on('register_user', (userId) => {
      if (!userConnections.has(userId)) {
        userConnections.set(userId, new Set());
      }
      userConnections.get(userId).add(socket.id);
      
      console.log(`👤 Utente ${userId} registrato - Socket: ${socket.id}`);
      console.log('📊 Utenti unici connessi:', userConnections.size);
      
      socket.userId = userId;
    });

    // Entra in una chat specifica
    socket.on('join_chat', (chatId) => {
      socket.join(`chat_${chatId}`);
      console.log(`\n📥 Utente ${socket.userId} entra nella chat ${chatId}`);
    });

    // Gestione messaggi (ora con chat_id)
    socket.on('send_message', async ({ chat_id, sender_id, recipient_id, content }) => {
      try {
        // 1. Salva il messaggio nel database
        const [result] = await db.query(
          "INSERT INTO messages(chat_id, sender_id, recipient_id, message) VALUES (?, ?, ?, ?)",
          [chat_id, sender_id, recipient_id, content]
        );

        // 2. Prepara l'oggetto messaggio completo
        const message = {
          message_id: result.insertId,
          chat_id,
          sender_id,
          recipient_id,
          content,
          timestamp: new Date().toISOString()
        };

        console.log(`\n✉️ Nuovo messaggio in chat ${chat_id}`);
        console.log(`👤 Da: ${sender_id} | A: ${recipient_id}`);
        console.log(`📝 Contenuto: ${content}`);

        // 3. Invia il messaggio a tutti nella chat
        io.to(`chat_${chat_id}`).emit('new_message', message);

      } catch (error) {
        console.error('Errore nel salvataggio del messaggio:', error);
        // Notifica l'errore solo al mittente
        socket.emit('message_error', { 
          error: 'Errore nel salvataggio del messaggio' 
        });
      }
    });

    socket.on('disconnect', () => {
      console.log(`\n🔴 Disconnessione - Socket ID: ${socket.id}`);
      
      if (socket.userId) {
        const userSockets = userConnections.get(socket.userId);
        if (userSockets) {
          userSockets.delete(socket.id);
          if (userSockets.size === 0) {
            userConnections.delete(socket.userId);
          }
        }
      }
      
      console.log('📊 Utenti unici rimanenti:', userConnections.size);
    });
  });

  return io;
};

module.exports = { initSocket };