const express = require('express');
const { Artist } = require('../models');
const auth = require('../middleware/auth');

const router = express.Router();

// Get artist profile
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate('user', 'username email');
    res.json(artist);
  } catch (err) {
    res.status(404).json({ error: 'Artist not found' });
  }
});

// Update artist profile
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = req.body;
    const artist = await Artist.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create artist profile (for user)
router.post('/', auth, async (req, res) => {
  try {
    const artist = new Artist({ ...req.body, user: req.user.id });
    await artist.save();
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// List all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find().populate('user', 'username');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;