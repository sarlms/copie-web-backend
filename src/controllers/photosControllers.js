const Photo = require('../models/photos');
const Like = require('../models/likes'); // Assurez-vous d'importer le modèle Like
const Commentaire = require('../models/commentaires'); // Assurez-vous d'importer le modèle Commentaire

// Contrôleur pour la création d'une nouvelle photo
exports.createPhoto = async (req, res) => {
    try {
        console.log('Creating photo with data:', req.body); // Log les données de la requête
        const nouvellePhoto = new Photo({
            ...req.body,
            createdAt: new Date()
        });
        
        await nouvellePhoto.save();
        
        // Émission de l'événement WebSocket
        const io = req.app.get('io');
        io.emit('photoCreated', nouvellePhoto);
        
        res.status(201).json(nouvellePhoto);
    } catch (error) {
        console.error('Error creating photo:', error); // Log l'erreur
        res.status(500).json({ message: error.message });
    }
};
// Contrôleur pour la récupération de toutes les photos
exports.getAllPhotos = async (req, res) => {
    try {
        const photos = await Photo.find().populate('userId', 'pseudo').populate('pelliculeId', 'nom');

        for (const photo of photos) {
            photo.likesCount = await Like.countDocuments({ photoId: photo._id });
            photo.commentsCount = await Commentaire.countDocuments({ photoId: photo._id });
        }

        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération d'une photo par son identifiant
exports.getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id)
                                 .populate('userId', 'pseudo') // Peupler userId avec pseudo
                                 .populate('pelliculeId', 'nom'); // Peupler pelliculeId avec nom
        
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }

        photo.likesCount = await Like.countDocuments({ photoId: photo._id });
        photo.commentsCount = await Commentaire.countDocuments({ photoId: photo._id });
        
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la mise à jour des informations d'une photo
exports.updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la suppression d'une photo
exports.deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findByIdAndDelete(req.params.id);
        
        if (!photo) {
            return res.status(404).json({ message: "Photo not found" });
        }
        
        const io = req.app.get('io');
        io.emit('photoDeleted', req.params.id);
        
        res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
        console.error('Error deleting photo:', error);
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour récupérer les photos par pelliculeId
exports.getPhotosByPellicule = async (req, res) => {
    try {
        const { pelliculeId } = req.params;
        const photos = await Photo.find({ pelliculeId }).lean();

        for (const photo of photos) {
            photo.likesCount = await Like.countDocuments({ photoId: photo._id });
            photo.commentsCount = await Commentaire.countDocuments({ photoId: photo._id });
        }

        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error });
    }
};


exports.getPhotosByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const photos = await Photo.find({ userId }).sort({ datePublication: -1 }).lean();

        for (const photo of photos) {
            photo.likesCount = await Like.countDocuments({ photoId: photo._id });
            photo.commentsCount = await Commentaire.countDocuments({ photoId: photo._id });
        }

        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching photos', error });
    }
};