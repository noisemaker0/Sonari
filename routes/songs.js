const express = require('express');
const { Song } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Create song (artist only)
router.post('/', auth, async (req, res) => {
  // TODO: Check if user is artist
  try {
    const song = new Song(req.body);
    await song.save();
    res.status(201).json(song);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get song by id
router.get('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id).populate('artist album');
    res.json(song);
  } catch (err) {
    res.status(404).json({ error: 'Song not found' });
  }
});

// Update song
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const song = await Song.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(song);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete song
router.delete('/:id', auth, async (req, res) => {
  try {
    await Song.findByIdAndDelete(req.params.id);
    res.json({ message: 'Song deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.find().populate('artist album');
    res.json(songs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;