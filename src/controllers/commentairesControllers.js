const Commentaire = require('../models/commentaires');

// Contrôleur pour la création d'un nouveau commentaire
exports.createCommentaire = async (req, res) => {
    try {
        // Créer une nouvelle instance de commentaire avec les données du corps de la requête
        const nouveauCommentaire = new Commentaire(req.body);
        
        // Sauvegarder le nouveau commentaire dans la base de données
        await nouveauCommentaire.save();
        
        // Répondre avec le commentaire créé
        res.status(201).json(nouveauCommentaire);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération de tous les commentaires
exports.getAllCommentaires = async (req, res) => {
    try {
        // Récupérer tous les commentaires depuis la base de données
        const commentaires = await Commentaire.find();
        
        // Répondre avec la liste des commentaires
        res.status(200).json(commentaires);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération d'un commentaire par son identifiant
exports.getCommentaireById = async (req, res) => {
    try {
        // Récupérer le commentaire avec l'identifiant spécifié depuis la base de données
        const commentaire = await Commentaire.findById(req.params.id);
        
        // Vérifier si le commentaire existe
        if (!commentaire) {
            return res.status(404).json({ message: "Commentaire not found" });
        }
        
        // Répondre avec le commentaire récupéré
        res.status(200).json(commentaire);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
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
