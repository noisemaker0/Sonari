const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
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
  coverArt: {
    type: String,
    default: null
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  genres: [{
    type: String,
    trim: true
  }],
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song'
  }],
  totalDuration: {
    type: Number,
    default: 0
  },
  trackCount: {
    type: Number,
    default: 0
  },
  releaseDate: {
    type: Date,
    default: Date.now
  },
  explicit: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
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
  isPublic: {
    type: Boolean,
    default: true
  },
  albumType: {
    type: String,
    enum: ['album', 'ep', 'single', 'compilation'],
    default: 'album'
  }
}, {
  timestamps: true
});

// Index for search functionality
albumSchema.index({ title: 'text', description: 'text', genres: 'text' });

// Virtual for formatted duration
albumSchema.virtual('formattedDuration').get(function() {
  const hours = Math.floor(this.totalDuration / 3600);
  const minutes = Math.floor((this.totalDuration % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
});

// Ensure virtual fields are serialized
albumSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Album', albumSchema);