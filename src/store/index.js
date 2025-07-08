import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import playerReducer from './playerSlice';
import searchReducer from './searchSlice';
import playlistReducer from './playlistSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    search: searchReducer,
    playlists: playlistReducer,
  },
});

export default store;