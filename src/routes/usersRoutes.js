const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersControllers');

// Route pour créer un nouvel utilisateur (inscription)
router.post('/signup', userController.signupUser);

// Route pour la connexion d'un utilisateur
router.post('/login', userController.loginUser);

// Route pour récupérer tous les utilisateurs
router.get('/', userController.getAllUsers);

// Route pour récupérer un utilisateur par son ID
router.get('/:id', userController.getUser);

// Route pour mettre à jour les informations d'un utilisateur
router.put('/:id', userController.updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', userController.deleteUser);



module.exports = router;
  