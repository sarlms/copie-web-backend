const mongoose = require('mongoose');

const commentaireSCHEMA = new mongoose.Schema({
    photoId: {type: mongoose.Schema.Types.ObjectId,ref: 'Photo',required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    contenu: {type: String,required: true}
});

const Commentaire = mongoose.model('Commentaire', commentaireSCHEMA);

module.exports = Commentaire;