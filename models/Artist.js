const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  displayName: { type: String, required: true },
  bio: { type: String },
  genres: [{ type: String }],
  socialLinks: {
    website: String,
    twitter: String,
    instagram: String,
    facebook: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);