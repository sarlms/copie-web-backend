const express = require('express');
const router = express.Router();
const likesController = require('../controllers//likesControllers');

// Route pour la création d'un nouveau like
router.post('/create', likesController.createLike);

// Route pour la récupération de tous les likes
router.get('/', likesController.getAllLikes);

// Route pour la suppression d'un like
router.delete('/:id', likesController.deleteLike);

module.exports = router;
