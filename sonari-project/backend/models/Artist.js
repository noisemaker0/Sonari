const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artistName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  bio: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  profilePicture: {
    type: String,
    default: null
  },
  coverImage: {
    type: String,
    default: null
  },
  genres: [{
    type: String,
    trim: true
  }],
  location: {
    city: String,
    country: String
  },
  socialLinks: {
    website: String,
    instagram: String,
    twitter: String,
    facebook: String,
    youtube: String
  },
  monthlyListeners: {
    type: Number,
    default: 0
  },
  totalPlays: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  albums: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album'
  }],
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for search functionality
artistSchema.index({ artistName: 'text', bio: 'text', genres: 'text' });

module.exports = mongoose.model('Artist', artistSchema);