import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../types/interfaces/user'; // Assuming you have a user type defined
import { DataStatus } from '../../types/redux'; // Assuming you have DataStatus defined

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1234/api';

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
      localStorage.setItem("token", data.token); // Store the token in local storage
      return data // Return the user details
    } catch (err) {
      return thunkApi.rejectWithValue("Can't login, please try again");
    }
  }
);

export const fetchRegister = createAsyncThunk(
  'user/fetchRegister',
  async (
    { username, password, role, organization, region }: {
      username: string;
      password: string;
      role: string;
      organization: string;
      region: string;
    },
    thunkApi
  ) => {
    const requestBody = { username, password, role, organization, region };
    console.log("Sending request with body:", requestBody);
  
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Server error response:", errorText);
        return thunkApi.rejectWithValue("Can't register, please try again");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      return data;
    } catch (err) {
      console.log("Registration error:", err);
      return thunkApi.rejectWithValue("Can't register, please try again");
    }
  });


interface UserState {
  user: IUser | null;
  status: DataStatus.IDLE | DataStatus.LOADING | DataStatus.SUCCSES | DataStatus.FAILED;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  status: DataStatus.IDLE,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegister.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = DataStatus.SUCCSES;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
      })
      .addCase(fetchLogin.pending, (state) => {
        state.status = DataStatus.LOADING;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = DataStatus.SUCCSES;
        state.user = action.payload.user;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = DataStatus.FAILED;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;