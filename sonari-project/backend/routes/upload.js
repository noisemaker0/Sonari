const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { auth } = require('../middleware/auth');
const Song = require('../models/Song');
const Artist = require('../models/Artist');
const { parseFile } = require('music-metadata');

const router = express.Router();

// Ensure uploads/audio directory exists
const uploadDir = path.join(__dirname, '../uploads/audio');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const unique = `${base}-${Date.now()}${ext}`;
    cb(null, unique);
  }
});

// File filter for audio
const audioMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac', 'audio/x-flac'];
const fileFilter = (req, file, cb) => {
  if (audioMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only MP3, WAV, FLAC allowed.'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB
});

// @route   POST /api/upload/audio
// @desc    Upload audio file (artist only)
// @access  Private
router.post('/audio', auth, upload.single('audio'), async (req, res) => {
  try {
    if (!req.user.isArtist) {
      return res.status(403).json({ success: false, message: 'Only artists can upload audio.' });
    }
    const artist = await Artist.findOne({ user: req.user._id });
    if (!artist) {
      return res.status(403).json({ success: false, message: 'Artist profile not found.' });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded.' });
    }
    // Save file metadata (optionally, use a library to get duration)
    const fileUrl = `/uploads/audio/${req.file.filename}`;
    let audioMetadata = {};
    try {
      const meta = await parseFile(req.file.path);
      audioMetadata = {
        duration: meta.format.duration || null,
        bitrate: meta.format.bitrate || null,
        sampleRate: meta.format.sampleRate || null,
        channels: meta.format.numberOfChannels || null,
        format: meta.format.container || meta.format.codec || req.file.mimetype
      };
    } catch (metaErr) {
      console.warn('Could not extract audio metadata:', metaErr.message);
    }
    const metadata = {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      url: fileUrl,
      audioMetadata
    };
    res.status(201).json({ success: true, message: 'Audio uploaded successfully.', data: metadata });
  } catch (error) {
    console.error('Audio upload error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/upload/audio/:filename
// @desc    Delete an uploaded audio file (artist only)
// @access  Private
router.delete('/audio/:filename', auth, async (req, res) => {
  try {
    if (!req.user.isArtist) {
      return res.status(403).json({ success: false, message: 'Only artists can delete audio files.' });
    }
    const { filename } = req.params;
    const filePath = path.join(uploadDir, filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }
    fs.unlinkSync(filePath);
    res.status(200).json({ success: true, message: 'Audio file deleted successfully.' });
  } catch (error) {
    console.error('Audio delete error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;