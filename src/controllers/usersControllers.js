const User = require('../models/users');
const jwt = require('jsonwebtoken');

// fonction pour créer un token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// Controller pour obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller pour obtenir un utilisateur spécifique
exports.getUser = async (req, res) => {
  const { id } = req.params;  // Change from userId to id
  console.log(`Getting user profile for ID: ${id}`);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Retournez les données du profil utilisateur
    res.status(200).json({
      pseudo: user.pseudo,
      email: user.email,
      prenom: user.prenom,
      nom: user.nom,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller pour mettre à jour un utilisateur existant
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller pour supprimer un utilisateur existant
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // créer un token
    const token = createToken(user._id);

    res.status(200).json({ email, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
exports.signupUser = async (req, res) => {
  const { pseudo, email, password, nom, prenom } = req.body;

  try {
    const user = await User.signup(pseudo, email, password, nom, prenom);

    // créer le token
    const token = createToken(user._id);

    res.status(200).json({ email, _id: user._id, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



