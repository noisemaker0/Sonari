const express = require('express');
const { body } = require('express-validator');
const { auth, optionalAuth } = require('../middleware/auth');
const validate = require('../middleware/validation');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const User = require('../models/User');
const router = express.Router();

// Song validation rules
const songValidation = [
  body('title')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .trim(),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be a positive integer'),
  body('audioFile')
    .notEmpty()
    .withMessage('Audio file URL is required'),
  body('genres')
    .optional()
    .isArray()
    .withMessage('Genres must be an array'),
  body('explicit')
    .optional()
    .isBoolean()
    .withMessage('Explicit must be a boolean')
];

// @route   GET /api/songs
// @desc    Get all songs with pagination and filters
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      genre,
      artist,
      featured,
      trending,
      search
    } = req.query;

    const query = { isPublic: true };

    // Add filters
    if (genre) {
      query.genres = { $in: [genre] };
    }

    if (artist) {
      const artistDoc = await Artist.findOne({ artistName: { $regex: artist, $options: 'i' } });
      if (artistDoc) {
        query.artist = artistDoc._id;
      }
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const songs = await Song.find(query)
      .populate('artist', 'artistName profilePicture')
      .populate('album', 'title coverArt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Song.countDocuments(query);

    res.json({
      success: true,
      data: {
        songs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get songs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching songs'
    });
  }
});

// @route   GET /api/songs/:id
// @desc    Get song by ID
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate('artist', 'artistName profilePicture bio')
      .populate('album', 'title coverArt description');

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    if (!song.isPublic && (!req.user || req.user._id.toString() !== song.artist.user.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Increment play count if user is authenticated
    if (req.user) {
      song.playCount += 1;
      await song.save();
    }

    res.json({
      success: true,
      data: { song }
    });
  } catch (error) {
    console.error('Get song error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching song'
    });
  }
});

// @route   POST /api/songs
// @desc    Create a new song
// @access  Private (Artist only)
router.post('/', auth, songValidation, validate, async (req, res) => {
  try {
    // Check if user is an artist
    if (!req.user.isArtist) {
      return res.status(403).json({
        success: false,
        message: 'Only artists can create songs'
      });
    }

    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist) {
      return res.status(403).json({
        success: false,
        message: 'Artist profile not found'
      });
    }

    const songData = {
      ...req.body,
      artist: artist._id
    };

    const song = new Song(songData);
    await song.save();

    // Add song to artist's songs array
    artist.songs.push(song._id);
    await artist.save();

    const populatedSong = await Song.findById(song._id)
      .populate('artist', 'artistName profilePicture')
      .populate('album', 'title coverArt');

    res.status(201).json({
      success: true,
      message: 'Song created successfully',
      data: { song: populatedSong }
    });
  } catch (error) {
    console.error('Create song error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating song'
    });
  }
});

// @route   PUT /api/songs/:id
// @desc    Update a song
// @access  Private (Song owner only)
router.put('/:id', auth, songValidation, validate, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist');

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    // Check if user owns the song
    if (song.artist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    Object.assign(song, req.body);
    await song.save();

    const updatedSong = await Song.findById(song._id)
      .populate('artist', 'artistName profilePicture')
      .populate('album', 'title coverArt');

    res.json({
      success: true,
      message: 'Song updated successfully',
      data: { song: updatedSong }
    });
  } catch (error) {
    console.error('Update song error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating song'
    });
  }
});

// @route   DELETE /api/songs/:id
// @desc    Delete a song
// @access  Private (Song owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist');

    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    // Check if user owns the song
    if (song.artist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await song.remove();

    // Remove song from artist's songs array
    const artist = await Artist.findById(song.artist._id);
    artist.songs = artist.songs.filter(id => id.toString() !== song._id.toString());
    await artist.save();

    res.json({
      success: true,
      message: 'Song deleted successfully'
    });
  } catch (error) {
    console.error('Delete song error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting song'
    });
  }
});

// @route   POST /api/songs/:id/like
// @desc    Like/unlike a song
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        message: 'Song not found'
      });
    }

    const user = await User.findById(req.user._id);
    const isLiked = user.likedSongs.includes(song._id);

    if (isLiked) {
      // Unlike
      user.likedSongs = user.likedSongs.filter(id => id.toString() !== song._id.toString());
      song.likeCount = Math.max(0, song.likeCount - 1);
    } else {
      // Like
      user.likedSongs.push(song._id);
      song.likeCount += 1;
    }

    await user.save();
    await song.save();

    res.json({
      success: true,
      message: isLiked ? 'Song unliked' : 'Song liked',
      data: { liked: !isLiked, likeCount: song.likeCount }
    });
  } catch (error) {
    console.error('Like song error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while liking song'
    });
  }
});

module.exports = router;