import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const searchContent = createAsyncThunk('search/content', async (query, thunkAPI) => {
  // TODO: Call backend API
  const response = await api.get(`/search?q=${query}`);
  return response.data;
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    loading: false,
    error: null,
    searchHistory: [],
  },
  reducers: {
    clearResults: (state) => {
      state.results = [];
    },
    addToHistory: (state, action) => {
      if (!state.searchHistory.includes(action.payload)) {
        state.searchHistory.unshift(action.payload);
        state.searchHistory = state.searchHistory.slice(0, 10);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearResults, addToHistory } = searchSlice.actions;
export default searchSlice.reducer;