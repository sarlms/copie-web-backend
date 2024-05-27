const Like = require('../models/likes');

// Contrôleur pour la création d'un nouveau like
exports.createLike = async (req, res) => {
    try {
        // Créer une nouvelle instance de like avec les données du corps de la requête
        const nouveauLike = new Like(req.body);
        
        // Sauvegarder le nouveau like dans la base de données
        await nouveauLike.save();
        
        // Répondre avec le like créé
        res.status(201).json(nouveauLike);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération de tous les likes
exports.getAllLikes = async (req, res) => {
    try {
        // Récupérer tous les likes depuis la base de données
        const likes = await Like.find();
        
        // Répondre avec la liste des likes
        res.status(200).json(likes);
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la suppression d'un like
exports.deleteLike = async (req, res) => {
    try {
        // Supprimer le like avec l'identifiant spécifié depuis la base de données
        const like = await Like.findByIdAndDelete(req.params.id);
        
        // Vérifier si le like existe
        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }
        
        // Répondre avec un message de succès
        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        // En cas d'erreur, répondre avec un message d'erreur et un code d'erreur appropriés
        res.status(500).json({ message: error.message });
    }
};
