const express = require('express');
const cors = require('cors'); 
const connection = require('./database'); 
const path = require("path");
const fs = require("fs");
const { initSocket } = require('./socketHandler/socketHandler');
const http = require('http');

// Crea la cartella se non esiste

const app = express();
const server = http.createServer(app); // Crea il server HTTP
initSocket(server); // Configura WebSocket

// Middleware
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}));
app.use(express.json());

// Routes
app.use("/api/categories", require("./routers/categoriesRoutes"));
app.use("/api/comment", require("./routers/commentRoutes"));
app.use("/api/message", require("./routers/messageRoutes"));
app.use("/api/post", require("./routers/postRoutes"));
app.use("/api/profile", require("./routers/profileRoutes"));
app.use("/api/reaction", require("./routers/reactionRoutes"));
app.use("/api/search", require("./routers/searchRoutes"));
app.use("/api/user", require("./routers/userRoutes"));
app.use("/api/friend", require("./routers/friendshipRoutes"));

// Avvia il server (usa server.listen invece di app.listen)
server.listen(3000, function() {
  console.log('Server in ascolto su porta 3000 (HTTP + WebSocket)');
});