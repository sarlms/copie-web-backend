const mongoose = require('mongoose');

const likeSCHEMA = new mongoose.Schema({
  photoId: {type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

const Like = mongoose.model('Like', likeSCHEMA);

module.exports = Like;