const mongoose = require('mongoose');

const photoSCHEMA = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pelliculeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pellicule', required: true },
    photoURL: { type: String, required: true },
    legende: { type: String, required: false },
    datePublication: { type: Date, default: Date.now },
    userPseudo: { type: String },
    likesCount: { type: Number, default: 0 }, // Nouveau champ pour compter les likes
    commentsCount: { type: Number, default: 0 } // Nouveau champ pour compter les commentaires
});

photoSCHEMA.pre('save', async function(next) {
    try {
        const user = await User.findById(this.userId);
        if (user) {
            this.userPseudo = user.pseudo;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Photo = mongoose.model('Photo', photoSCHEMA);

module.exports = Photo;
