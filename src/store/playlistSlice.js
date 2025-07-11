import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchPlaylists = createAsyncThunk('playlists/fetchAll', async (thunkAPI) => {
  const response = await api.get('/playlists');
  return response.data;
});

export const createPlaylist = createAsyncThunk('playlists/create', async (playlistData, thunkAPI) => {
  const response = await api.post('/playlists', playlistData);
  return response.data;
});

export const addSongToPlaylist = createAsyncThunk('playlists/addSong', async ({ playlistId, songId }, thunkAPI) => {
  const response = await api.post(`/playlists/${playlistId}/songs`, { songId });
  return response.data;
});

const playlistSlice = createSlice({
  name: 'playlists',
  initialState: {
    playlists: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeSongFromPlaylist: (state, action) => {
      const { playlistId, songId } = action.payload;
      const playlist = state.playlists.find(p => p.id === playlistId);
      if (playlist) {
        playlist.songs = playlist.songs.filter(s => s.id !== songId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaylists.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPlaylist.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addSongToPlaylist.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
        if (playlist) {
          playlist.songs.push(action.payload.song);
        }
      })
      .addCase(addSongToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeSongFromPlaylist } = playlistSlice.actions;
export default playlistSlice.reducer;