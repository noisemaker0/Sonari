const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Artist = require('../models/Artist');
const Song = require('../models/Song');
const Album = require('../models/Album');
const Playlist = require('../models/Playlist');

describe('Search Endpoints', () => {
  let testUser, testArtist, testSong, testAlbum, testPlaylist;

  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/sonari_test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear database before each test
    await User.deleteMany({});
    await Artist.deleteMany({});
    await Song.deleteMany({});
    await Album.deleteMany({});
    await Playlist.deleteMany({});
    
    // Create test user
    testUser = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPass123',
      firstName: 'Test',
      lastName: 'User'
    });
    await testUser.save();

    // Create test artist
    testArtist = new Artist({
      user: testUser._id,
      artistName: 'Test Artist',
      bio: 'A test artist for testing purposes',
      genres: ['Pop', 'Rock'],
      location: {
        city: 'Test City',
        country: 'Test Country'
      }
    });
    await testArtist.save();

    // Create test song
    testSong = new Song({
      title: 'Test Song',
      artist: testArtist._id,
      duration: 180,
      audioFile: 'https://example.com/test-song.mp3',
      coverArt: 'https://example.com/cover.jpg',
      genres: ['Pop'],
      tags: ['test', 'demo'],
      isPublic: true
    });
    await testSong.save();

    // Create test album
    testAlbum = new Album({
      title: 'Test Album',
      artist: testArtist._id,
      coverArt: 'https://example.com/album-cover.jpg',
      description: 'A test album for testing purposes',
      genres: ['Pop', 'Rock'],
      songs: [testSong._id],
      totalDuration: 180,
      trackCount: 1,
      isPublic: true
    });
    await testAlbum.save();

    // Create test playlist
    testPlaylist = new Playlist({
      name: 'Test Playlist',
      description: 'A test playlist for testing purposes',
      owner: testUser._id,
      songs: [{
        song: testSong._id,
        addedAt: new Date(),
        addedBy: testUser._id
      }],
      isPublic: true,
      totalDuration: 180,
      songCount: 1,
      tags: ['test', 'demo']
    });
    await testPlaylist.save();
  });

  describe('GET /api/search', () => {
    it('should search across all content types', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'test' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.query).toBe('test');
      
      // Check if all content types are returned
      expect(response.body.data.songs).toBeDefined();
      expect(response.body.data.artists).toBeDefined();
      expect(response.body.data.albums).toBeDefined();
      expect(response.body.data.playlists).toBeDefined();
    });

    it('should search songs specifically', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'test', type: 'songs' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs).toBeDefined();
      expect(response.body.data.songs.data).toHaveLength(1);
      expect(response.body.data.songs.data[0].title).toBe('Test Song');
    });

    it('should search artists specifically', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'artist', type: 'artists' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.artists).toBeDefined();
      expect(response.body.data.artists.data).toHaveLength(1);
      expect(response.body.data.artists.data[0].artistName).toBe('Test Artist');
    });

    it('should search albums specifically', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'album', type: 'albums' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.albums).toBeDefined();
      expect(response.body.data.albums.data).toHaveLength(1);
      expect(response.body.data.albums.data[0].title).toBe('Test Album');
    });

    it('should search playlists specifically', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'playlist', type: 'playlists' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.playlists).toBeDefined();
      expect(response.body.data.playlists.data).toHaveLength(1);
      expect(response.body.data.playlists.data[0].name).toBe('Test Playlist');
    });

    it('should support pagination', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'test', page: 1, limit: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.pagination).toBeDefined();
      expect(response.body.data.songs.pagination.page).toBe(1);
      expect(response.body.data.songs.pagination.limit).toBe(5);
    });

    it('should filter by genre', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'test', genre: 'Pop' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.data).toHaveLength(1);
    });

    it('should filter by artist', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: 'test', artist: 'Test Artist' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.data).toHaveLength(1);
    });

    it('should filter featured content', async () => {
      // Create a featured song
      const featuredSong = new Song({
        title: 'Featured Song',
        artist: testArtist._id,
        duration: 200,
        audioFile: 'https://example.com/featured-song.mp3',
        featured: true,
        isPublic: true
      });
      await featuredSong.save();

      const response = await request(app)
        .get('/api/search')
        .query({ q: 'featured', featured: 'true' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.data).toHaveLength(1);
      expect(response.body.data.songs.data[0].title).toBe('Featured Song');
    });

    it('should filter trending content', async () => {
      // Create a trending song
      const trendingSong = new Song({
        title: 'Trending Song',
        artist: testArtist._id,
        duration: 200,
        audioFile: 'https://example.com/trending-song.mp3',
        trending: true,
        isPublic: true
      });
      await trendingSong.save();

      const response = await request(app)
        .get('/api/search')
        .query({ q: 'trending', trending: 'true' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.data).toHaveLength(1);
      expect(response.body.data.songs.data[0].title).toBe('Trending Song');
    });

    it('should fail without search query', async () => {
      const response = await request(app)
        .get('/api/search')
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Search query is required');
    });

    it('should fail with empty search query', async () => {
      const response = await request(app)
        .get('/api/search')
        .query({ q: '   ' })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Search query is required');
    });
  });

  describe('GET /api/search/suggestions', () => {
    it('should return search suggestions', async () => {
      const response = await request(app)
        .get('/api/search/suggestions')
        .query({ q: 'test' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.suggestions).toBeDefined();
      expect(Array.isArray(response.body.data.suggestions)).toBe(true);
    });

    it('should return empty suggestions for non-matching query', async () => {
      const response = await request(app)
        .get('/api/search/suggestions')
        .query({ q: 'nonexistent' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.suggestions).toHaveLength(0);
    });

    it('should return empty suggestions for empty query', async () => {
      const response = await request(app)
        .get('/api/search/suggestions')
        .query({ q: '' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.suggestions).toHaveLength(0);
    });

    it('should prioritize exact matches', async () => {
      const response = await request(app)
        .get('/api/search/suggestions')
        .query({ q: 'Test Song' })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.suggestions.length).toBeGreaterThan(0);
      
      // Check if exact matches come first
      const firstSuggestion = response.body.data.suggestions[0];
      expect(firstSuggestion.title.toLowerCase()).toContain('test song');
    });
  });

  describe('GET /api/search/trending', () => {
    it('should return trending content', async () => {
      const response = await request(app)
        .get('/api/search/trending')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(response.body.data.songs).toBeDefined();
      expect(response.body.data.artists).toBeDefined();
      expect(response.body.data.playlists).toBeDefined();
    });

    it('should respect limit parameter', async () => {
      const response = await request(app)
        .get('/api/search/trending')
        .query({ limit: 5 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.length).toBeLessThanOrEqual(5);
      expect(response.body.data.artists.length).toBeLessThanOrEqual(5);
      expect(response.body.data.playlists.length).toBeLessThanOrEqual(5);
    });

    it('should return trending songs sorted by play count', async () => {
      // Create songs with different play counts
      const popularSong = new Song({
        title: 'Popular Song',
        artist: testArtist._id,
        duration: 200,
        audioFile: 'https://example.com/popular-song.mp3',
        playCount: 1000,
        isPublic: true
      });
      await popularSong.save();

      const lessPopularSong = new Song({
        title: 'Less Popular Song',
        artist: testArtist._id,
        duration: 200,
        audioFile: 'https://example.com/less-popular-song.mp3',
        playCount: 100,
        isPublic: true
      });
      await lessPopularSong.save();

      const response = await request(app)
        .get('/api/search/trending')
        .query({ limit: 10 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.songs.length).toBeGreaterThan(0);
      
      // Check if songs are sorted by play count (descending)
      const songs = response.body.data.songs;
      for (let i = 0; i < songs.length - 1; i++) {
        expect(songs[i].playCount).toBeGreaterThanOrEqual(songs[i + 1].playCount);
      }
    });
  });
});