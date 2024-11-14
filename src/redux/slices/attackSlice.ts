// src/redux/slices/attackSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234';

export const launchAttack = createAsyncThunk(
  'attack/launchAttack',
  async (
    { attackType, targetRegion }: 
    { attackType: string; targetRegion: string },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${API_URL}/attack`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attackType, targetRegion }),
      });

      if (!response.ok) {
        return thunkApi.rejectWithValue("Can't launch attack, please try again");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't launch attack, please try again");
    }
  }
);

interface AttackState {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AttackState = {
  status: 'idle',
  error: null,
};

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(launchAttack.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(launchAttack.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(launchAttack.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default attackSlice.reducer;