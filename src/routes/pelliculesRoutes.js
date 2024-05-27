const express = require('express');
const router = express.Router();
const pelliculeController = require('../controllers/pelliculesControllers');

// Route pour la création d'une nouvelle pellicule
router.post('/create', pelliculeController.createPellicule);

// Route pour la récupération de toutes les pellicules
router.get('/', pelliculeController.getAllPellicules);

// Route pour la récupération d'une pellicule par son identifiant
router.get('/:id', pelliculeController.getPelliculeById);

// Route pour la mise à jour des informations d'une pellicule
router.put('/:id', pelliculeController.updatePellicule);

// Route pour la suppression d'une pellicule
router.delete('/:id', pelliculeController.deletePellicule);

module.exports = router;
