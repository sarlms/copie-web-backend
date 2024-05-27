const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/usersRoutes');
const photoRoutes = require('./routes/photosRoutes');
const pelliculeRoutes = require('./routes/pelliculesRoutes');
const likeRoutes = require('./routes/likesRoutes');
const commentaireRoutes = require('./routes/commentairesRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:3001', 'https://sarargentique.cluster-ig3.igpolytech.fr', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Configuration CORS pour Express
app.use(cors({
  origin: ['http://localhost:3001', 'https://sarargentique.cluster-ig3.igpolytech.fr', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // Ajout du middleware cookie-parser

// Routes
app.use('/api/user', userRoutes);
app.use('/api/photo', photoRoutes);
app.use('/api/pellicule', pelliculeRoutes);
app.use('/api/commentaire', commentaireRoutes);
app.use('/api/like', likeRoutes);

// Gestion des connexions Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('createPhoto', (photo) => {
    io.emit('photoCreated', photo);
  });

  socket.on('deleteDiscussion', (photoId) => {
    io.emit('discussionDeleted', photoId);
  });

  socket.on('createCommentaire', (commentaire) => {
    io.emit('commentaireCreated', commentaire);
  });

  socket.on('deleteCommentaire', (commentaireId) => {
    io.emit('commentaireDeleted', commentaireId);
  });

  socket.on('likeMessage', (likeInfo) => {
    io.emit('messageLiked', likeInfo);
  });

  socket.on('unlikeMessage', (likeInfo) => {
    io.emit('messageUnliked', likeInfo);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Connexion à la base de données MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log('Server is running on PORT', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB...', err);
  });