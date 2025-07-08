import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    currentTrack: null,
    isPlaying: false,
    queue: [],
    currentTrackIndex: 0,
    shuffle: false,
    repeat: false,
  },
  reducers: {
    setTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setQueue: (state, action) => {
      state.queue = action.payload;
    },
    setCurrentTrackIndex: (state, action) => {
      state.currentTrackIndex = action.payload;
    },
    setShuffle: (state, action) => {
      state.shuffle = action.payload;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
  },
});

export const { setTrack, setPlaying, setQueue, setCurrentTrackIndex, setShuffle, setRepeat } = playerSlice.actions;
export default playerSlice.reducer;