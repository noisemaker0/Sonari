import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  const response = await api.post('/auth/login', credentials);
  // Store token and refreshToken in AsyncStorage
  await AsyncStorage.setItem('token', response.data.token);
  if (response.data.refreshToken) {
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response.data;
});

export const register = createAsyncThunk('auth/register', async (data, thunkAPI) => {
  const response = await api.post('/auth/register', data);
  // Optionally store token/refreshToken if returned
  if (response.data.token) {
    await AsyncStorage.setItem('token', response.data.token);
  }
  if (response.data.refreshToken) {
    await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response.data;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No refresh token');
  const response = await api.post('/auth/refresh', { refreshToken });
  await AsyncStorage.setItem('token', response.data.token);
  return response.data.token;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token || null;
        state.user = action.payload.user || null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;