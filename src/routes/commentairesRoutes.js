const express = require('express');
const router = express.Router();
const commentairesController = require('../controllers/commentairesControllers');

// Route pour la création d'un nouveau commentaire
router.post('/create', commentairesController.createCommentaire);

// Route pour la récupération de tous les commentaires
router.get('/', commentairesController.getAllCommentaires);

// Route pour la récupération d'un commentaire par son identifiant
router.get('/:id', commentairesController.getCommentaireById);

// Route pour la mise à jour des informations d'un commentaire
router.put('/:id', commentairesController.updateCommentaire);

// Route pour la suppression d'un commentaire
router.delete('/:id', commentairesController.deleteCommentaire);

module.exports = router;
