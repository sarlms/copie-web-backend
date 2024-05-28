const Like = require('../models/likes');
const Photo = require('../models/photos');

// Contrôleur pour la création d'un nouveau like
exports.createLike = async (req, res) => {
    try {
        const { userId, photoId } = req.body;

        // Vérifier si le like existe déjà
        const existingLike = await Like.findOne({ userId, photoId });
        if (existingLike) {
            return res.status(400).json({ message: "Like already exists" });
        }

        const nouveauLike = new Like(req.body);
        await nouveauLike.save();

        // Mettre à jour le nombre de likes sur la photo
        const photo = await Photo.findById(photoId);
        if (photo) {
            photo.likesCount += 1;
            await photo.save();

            // Émission de l'événement WebSocket
            const io = req.app.get('io');
            io.emit('likeAdded', { photoId, userId });
        }

        res.status(201).json(nouveauLike);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLike = async (req, res) => {
    try {
        const { userId, photoId } = req.body;
        const like = await Like.findOneAndDelete({ userId, photoId });
        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }

        // Mettre à jour le nombre de likes sur la photo
        const photo = await Photo.findById(photoId);
        if (photo) {
            photo.likesCount -= 1;
            await photo.save();

            // Émission de l'événement WebSocket
            const io = req.app.get('io');
            io.emit('likeRemoved', { photoId, userId });
        }

        res.status(200).json({ message: "Like deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour récupérer les likes d'un utilisateur
exports.getUserLikes = async (req, res) => {
    try {
        const { userId } = req.params;
        const likes = await Like.find({ userId });
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération de tous les likes
exports.getAllLikes = async (req, res) => {
    try {
        const likes = await Like.find();
        res.status(200).json(likes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
