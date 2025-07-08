const express = require('express');
const { auth, optionalAuth } = require('../middleware/auth');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const Playlist = require('../models/Playlist');
const router = express.Router();

// @route   GET /api/search
// @desc    Search across all content types
// @access  Public
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { q, type, page = 1, limit = 20 } = req.query;

    if (!q || q.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchQuery = q.trim();
    const skip = (page - 1) * limit;
    const results = {};

    // Search songs
    if (!type || type === 'songs') {
      const songs = await Song.find({
        $and: [
          { isPublic: true },
          {
            $or: [
              { $text: { $search: searchQuery } },
              { title: { $regex: searchQuery, $options: 'i' } },
              { genres: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      })
        .populate('artist', 'artistName profilePicture')
        .populate('album', 'title coverArt')
        .sort({ playCount: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalSongs = await Song.countDocuments({
        $and: [
          { isPublic: true },
          {
            $or: [
              { $text: { $search: searchQuery } },
              { title: { $regex: searchQuery, $options: 'i' } },
              { genres: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      });

      results.songs = {
        data: songs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalSongs,
          pages: Math.ceil(totalSongs / limit)
        }
      };
    }

    // Search artists
    if (!type || type === 'artists') {
      const artists = await Artist.find({
        $or: [
          { $text: { $search: searchQuery } },
          { artistName: { $regex: searchQuery, $options: 'i' } },
          { bio: { $regex: searchQuery, $options: 'i' } },
          { genres: { $in: [new RegExp(searchQuery, 'i')] } }
        ]
      })
        .populate('user', 'username firstName lastName')
        .sort({ monthlyListeners: -1, totalPlays: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalArtists = await Artist.countDocuments({
        $or: [
          { $text: { $search: searchQuery } },
          { artistName: { $regex: searchQuery, $options: 'i' } },
          { bio: { $regex: searchQuery, $options: 'i' } },
          { genres: { $in: [new RegExp(searchQuery, 'i')] } }
        ]
      });

      results.artists = {
        data: artists,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalArtists,
          pages: Math.ceil(totalArtists / limit)
        }
      };
    }

    // Search albums
    if (!type || type === 'albums') {
      const albums = await Album.find({
        $and: [
          { isPublic: true },
          {
            $or: [
              { $text: { $search: searchQuery } },
              { title: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
              { genres: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      })
        .populate('artist', 'artistName profilePicture')
        .sort({ playCount: -1, releaseDate: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalAlbums = await Album.countDocuments({
        $and: [
          { isPublic: true },
          {
            $or: [
              { $text: { $search: searchQuery } },
              { title: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
              { genres: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      });

      results.albums = {
        data: albums,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalAlbums,
          pages: Math.ceil(totalAlbums / limit)
        }
      };
    }

    // Search playlists
    if (!type || type === 'playlists') {
      const playlistQuery = {
        $and: [
          { isPublic: true },
          {
            $or: [
              { $text: { $search: searchQuery } },
              { name: { $regex: searchQuery, $options: 'i' } },
              { description: { $regex: searchQuery, $options: 'i' } },
              { tags: { $in: [new RegExp(searchQuery, 'i')] } }
            ]
          }
        ]
      };

      const playlists = await Playlist.find(playlistQuery)
        .populate('owner', 'username firstName lastName profilePicture')
        .sort({ playCount: -1, likeCount: -1 })
        .skip(skip)
        .limit(parseInt(limit));

      const totalPlaylists = await Playlist.countDocuments(playlistQuery);

      results.playlists = {
        data: playlists,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalPlaylists,
          pages: Math.ceil(totalPlaylists / limit)
        }
      };
    }

    res.json({
      success: true,
      data: results,
      query: searchQuery
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during search'
    });
  }
});

// @route   GET /api/search/suggestions
// @desc    Get search suggestions
// @access  Public
router.get('/suggestions', optionalAuth, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length === 0) {
      return res.json({
        success: true,
        data: { suggestions: [] }
      });
    }

    const searchQuery = q.trim();
    const suggestions = [];

    // Get song suggestions
    const songs = await Song.find({
      $and: [
        { isPublic: true },
        { title: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .populate('artist', 'artistName')
      .limit(5);

    songs.forEach(song => {
      suggestions.push({
        type: 'song',
        id: song._id,
        title: song.title,
        subtitle: song.artist.artistName,
        image: song.coverArt
      });
    });

    // Get artist suggestions
    const artists = await Artist.find({
      artistName: { $regex: searchQuery, $options: 'i' }
    })
      .populate('user', 'username')
      .limit(5);

    artists.forEach(artist => {
      suggestions.push({
        type: 'artist',
        id: artist._id,
        title: artist.artistName,
        subtitle: artist.user.username,
        image: artist.profilePicture
      });
    });

    // Get album suggestions
    const albums = await Album.find({
      $and: [
        { isPublic: true },
        { title: { $regex: searchQuery, $options: 'i' } }
      ]
    })
      .populate('artist', 'artistName')
      .limit(5);

    albums.forEach(album => {
      suggestions.push({
        type: 'album',
        id: album._id,
        title: album.title,
        subtitle: album.artist.artistName,
        image: album.coverArt
      });
    });

    // Sort by relevance and limit total suggestions
    const sortedSuggestions = suggestions
      .sort((a, b) => {
        // Prioritize exact matches
        const aExact = a.title.toLowerCase().startsWith(searchQuery.toLowerCase());
        const bExact = b.title.toLowerCase().startsWith(searchQuery.toLowerCase());
        
        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;
        
        return 0;
      })
      .slice(0, 10);

    res.json({
      success: true,
      data: { suggestions: sortedSuggestions }
    });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting search suggestions'
    });
  }
});

// @route   GET /api/search/trending
// @desc    Get trending searches
// @access  Public
router.get('/trending', optionalAuth, async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Get trending songs
    const trendingSongs = await Song.find({ isPublic: true })
      .populate('artist', 'artistName profilePicture')
      .sort({ playCount: -1, likeCount: -1 })
      .limit(parseInt(limit));

    // Get trending artists
    const trendingArtists = await Artist.find()
      .populate('user', 'username firstName lastName')
      .sort({ monthlyListeners: -1, totalPlays: -1 })
      .limit(parseInt(limit));

    // Get trending playlists
    const trendingPlaylists = await Playlist.find({ isPublic: true })
      .populate('owner', 'username firstName lastName profilePicture')
      .sort({ playCount: -1, likeCount: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: {
        songs: trendingSongs,
        artists: trendingArtists,
        playlists: trendingPlaylists
      }
    });
  } catch (error) {
    console.error('Trending search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while getting trending content'
    });
  }
});

module.exports = router;