const mongoose = require('mongoose');

const pelliculeSCHEMA = new mongoose.Schema({
    nom : {type : String, required: true,unique: true},
    iso: {type : String, required: true},
    description : {type : String, required : false},
    url : {type : String, required: true},
    couleur: {type: String,enum: ['N&B', 'couleur'],default: 'couleur', required: true}
});

const Pellicule = mongoose.model('Pellicule', pelliculeSCHEMA);

module.exports = Pellicule;