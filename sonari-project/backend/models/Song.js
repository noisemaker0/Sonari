const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    default: null
  },
  duration: {
    type: Number,
    required: true,
    min: 0
  },
  audioFile: {
    type: String,
    required: true
  },
  coverArt: {
    type: String,
    default: null
  },
  genres: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  lyrics: {
    type: String,
    default: ''
  },
  explicit: {
    type: Boolean,
    default: false
  },
  playCount: {
    type: Number,
    default: 0
  },
  likeCount: {
    type: Number,
    default: 0
  },
  shareCount: {
    type: Number,
    default: 0
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  audioMetadata: {
    bitrate: Number,
    sampleRate: Number,
    channels: Number,
    format: String
  }
}, {
  timestamps: true
});

// Index for search functionality
songSchema.index({ title: 'text', genres: 'text', tags: 'text' });

// Virtual for formatted duration
songSchema.virtual('formattedDuration').get(function() {
  const minutes = Math.floor(this.duration / 60);
  const seconds = this.duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Ensure virtual fields are serialized
songSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Song', songSchema);