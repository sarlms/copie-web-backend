const Pellicule = require('../models/pellicules');

// Contrôleur pour la création d'une nouvelle pellicule
exports.createPellicule = async (req, res) => {
    try {
        const newPellicule = new Pellicule(req.body);
        await newPellicule.save();
        res.status(201).json(newPellicule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération de toutes les pellicules
exports.getAllPellicules = async (req, res) => {
    try {
        const pellicules = await Pellicule.find();
        res.status(200).json(pellicules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la récupération d'une pellicule par son identifiant
exports.getPelliculeById = async (req, res) => {
    try {
        const pellicule = await Pellicule.findById(req.params.id);
        if (!pellicule) {
            return res.status(404).json({ message: "Pellicule not found" });
        }
        res.status(200).json(pellicule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la mise à jour des informations d'une pellicule
exports.updatePellicule = async (req, res) => {
    try {
        const pellicule = await Pellicule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pellicule) {
            return res.status(404).json({ message: "Pellicule not found" });
        }
        res.status(200).json(pellicule);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Contrôleur pour la suppression d'une pellicule
exports.deletePellicule = async (req, res) => {
    try {
        const pellicule = await Pellicule.findByIdAndDelete(req.params.id);
        if (!pellicule) {
            return res.status(404).json({ message: "Pellicule not found" });
        }
        res.status(200).json({ message: "Pellicule deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
