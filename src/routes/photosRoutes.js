const express = require('express');
const router = express.Router();
const photoController = require('../controllers/photosControllers');
const likesController = require('../controllers/likesControllers');

// Route pour créer une nouvelle photo
router.post('/create', photoController.createPhoto);

// Route pour récupérer toutes les photos
router.get('/', photoController.getAllPhotos);

// Route pour récupérer les détails d'une photo par son identifiant
router.get('/details/:id', photoController.getPhotoById);

// Route pour mettre à jour une photo par son identifiant
router.put('/:id', photoController.updatePhoto);

// Route pour supprimer une photo par son identifiant
router.delete('/:id', photoController.deletePhoto);

// Route pour récupérer les photos par pelliculeId
router.get('/pellicule/:pelliculeId', photoController.getPhotosByPellicule);

// Route pour récupérer les photos par userId
router.get('/user/:userId', photoController.getPhotosByUser);

// Routes pour les likes
router.post('/:photoId/like', likesController.createLike);
router.delete('/:photoId/like/:id', likesController.deleteLike);
router.get('/likes/user/:userId', likesController.getUserLikes); // Nouvelle route

module.exports = router;