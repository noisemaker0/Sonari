const express = require('express');
const { Playlist } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Create playlist
router.post('/', auth, async (req, res) => {
  try {
    const playlist = new Playlist({ ...req.body, user: req.user.id });
    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get playlist by id
router.get('/:id', async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate('songs user');
    res.json(playlist);
  } catch (err) {
    res.status(404).json({ error: 'Playlist not found' });
  }
});

// Update playlist
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const playlist = await Playlist.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete playlist
router.delete('/:id', auth, async (req, res) => {
  try {
    await Playlist.findByIdAndDelete(req.params.id);
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all playlists for user
router.get('/', auth, async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user.id }).populate('songs');
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;