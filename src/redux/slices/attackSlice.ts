import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Resource } from '../../types/interfaces/user'
import { RegionsEnum } from '../../types/enums/regions'
import { Attack } from '../../types/interfaces/attack';
import { DataStatus } from '../../types/redux'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234/api';

export const launchAttack = createAsyncThunk(
  'attack/launch',
  async (attackData: {missileType: string, targetRegion: string}) => {
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

interface attackState{
  status: DataStatus,
  error: string | null,
  attacks: Attack[]
}

const initialState: attackState ={
  status: DataStatus.IDLE,
  error: null,
  attacks: [{
    userId: 'a',
    id: 'a',
    missileType: 'a',
    target: 'a',
    status: '',
    speed: 0,
    startTime: 0
  }]
}

const attackSlice = createSlice({
  name: 'attack',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(launchAttack.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(launchAttack.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCSES;
        state.attacks.push(action.payload.data);
      })
      .addCase(launchAttack.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
      });
  }
});

export default attackSlice.reducer;
