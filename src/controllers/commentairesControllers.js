const Commentaire = require('../models/commentaires');
const User = require('../models/users'); // Importer le modèle User

exports.createCommentaire = async (req, res) => {
  try {
    const nouveauCommentaire = new Commentaire(req.body);
    await nouveauCommentaire.save();
    const commentWithUser = await Commentaire.findById(nouveauCommentaire._id).populate('userId', 'pseudo');
    res.status(201).json(commentWithUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCommentaires = async (req, res) => {
  try {
    const commentaires = await Commentaire.find().populate('userId', 'pseudo');
    res.status(200).json(commentaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentaireById = async (req, res) => {
    try {
      const commentaire = await Commentaire.findById(req.params.id).populate('userId', 'pseudo');
      if (!commentaire) {
        return res.status(404).json({ message: 'Commentaire not found' });
      }
      res.status(200).json(commentaire);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// Contrôleur pour la mise à jour des informations d'un commentaire
exports.updateCommentaire = async (req, res) => {
    try {
        // Mettre à jour le commentaire avec l'identifiant spécifié en utilisant les données du corps de la requête
        const commentaire = await Commentaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // Vérifier si le commentaire existe
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire not found" });
        }
        
        // Répondre avec le commentaire mis à jour
        res.status(200).json(commentaire);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la suppression d'un commentaire
exports.deleteCommentaire = async (req, res) => {
    try {
        // Supprimer le commentaire avec l'identifiant spécifié depuis la base de données
        const commentaire = await Commentaire.findByIdAndDelete(req.params.id);
        
        // Vérifier si le commentaire existe
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire not found" });
        }
        
        // Répondre avec un message de succès
        res.status(200).json({ message: "Commentaire deleted successfully" });
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération de tous les commentaires d'une photo
exports.getCommentairesByPhotoId = async (req, res) => {
    try {
        const { photoId } = req.params;
        const commentaires = await Commentaire.find({ photoId }).populate('userId', 'pseudo');

        // Répondre avec la liste des commentaires
        res.status(200).json(commentaires);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};
