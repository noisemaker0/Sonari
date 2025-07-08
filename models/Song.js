const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true },
  album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
  duration: { type: Number }, // in seconds
  audioUrl: { type: String, required: true },
  coverUrl: { type: String },
  genre: { type: String },
  releaseDate: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);