const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const http = require('http');
const socketIo = require('socket.io');
const userRoutes = require('./routes/usersRoutes');
const photoRoutes = require('./routes/photosRoutes');
const pelliculeRoutes = require('./routes/pelliculesRoutes');
const likeRoutes = require('./routes/likesRoutes');
const commentaireRoutes = require('./routes/commentairesRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ["http://localhost:3001", "https://sarargentique.cluster-ig3.igpolytech.fr", "http://localhost:3000", "https://sarargentique2.cluster-ig3.igpolytech.fr"],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Configuration CORS pour Express
const corsOptions = {
  origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:3001", "http://localhost:3000", "https://sarargentique2.cluster-ig3.igpolytech.fr"], // Split a comma-separated list from the environment variable
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Ajout du WebSocket à l'application Express
app.set('io', io);

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

  socket.on('likeAdded', (like) => {
    io.emit('likeAdded', like);
  });

  socket.on('likeRemoved', (like) => {
    io.emit('likeRemoved', like);
  });

  socket.on('commentAdded', (comment) => {
    io.emit('commentAdded', comment);
  });

  socket.on('commentDeleted', (comment) => {
    io.emit('commentDeleted', comment);
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
