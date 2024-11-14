import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/interfaces/user'; // Assuming you have a user type defined



const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234';

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async (
    { username, password, role, organization, region }: 
    { username: string; password: string; role: 'defense' | 'attack'; organization: string; region: string },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role, organization, region }),
      });

      if (!response.ok) {
        return thunkApi.rejectWithValue("Can't register, please try again");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't register, please try again");
    }
  }
);

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async (
    { username, password }: 
    { username: string; password: string },
    thunkApi
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return thunkApi.rejectWithValue("Can't login, please try again");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${API_URL}/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return thunkApi.rejectWithValue("Can't fetch user data, please try again");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue("Can't fetch user data, please try again");
    }
  }
);

interface UserState {
  user: IUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;