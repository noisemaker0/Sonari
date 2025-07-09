const express = require('express');
const { Song, Artist, Album } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Missing query' });
  try {
    const regex = new RegExp(q, 'i');
    const songs = await Song.find({ title: regex });
    const artists = await Artist.find({ displayName: regex });
    const albums = await Album.find({ title: regex });
    res.json({ songs, artists, albums });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;