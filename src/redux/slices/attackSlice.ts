import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234/api';

export const launchAttack = createAsyncThunk(
  'attack/launch',
  async (attackData: { missileType: string; targetRegion: string;}) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/attack/launch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        missileType: attackData.missileType,
        target: attackData.targetRegion
      })
    });

    if (!response.ok) {
      throw new Error('Failed to launch attack');
    }

    return response.json();
  }
);

const attackSlice = createSlice({
  name: 'attack',
  initialState: {
    status: 'idle',
    error: null,
    currentAttack: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(launchAttack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(launchAttack.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentAttack = action.payload;
      })
      .addCase(launchAttack.rejected, (state, action) => {
        state.status = 'failed';
      });
  }
});

export default attackSlice.reducer;
