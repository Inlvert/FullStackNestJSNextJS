import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as API from "@/api";

interface LoginDto {
  email: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string[] | null;
}

const SLICE_NAME = "auth";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const login = createAsyncThunk<User, LoginDto, { rejectValue: string[] }>(
  `${SLICE_NAME}/login`,
  async (userData, thunkAPI) => {
    try {
      const { data } = await API.login(userData);
      console.log(data.user.tokenPair);
      return data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || [error.message]
      );
    }
  }
);

const refresh = createAsyncThunk<User, string, { rejectValue: string[] }>(
  `${SLICE_NAME}/refresh`,
  async (refreshToken, thunkAPI) => {
    try {
      const { data } = await API.refresh(refreshToken);
      return data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || [error.message]
      );
    }
  }
);

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    logout: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });

    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = true;
      state.user = action.payload;
    });
    builder.addCase(refresh.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });
  },
});

const { reducer: authReducer, actions } = authSlice;

export const { logout } = actions;

export { login, refresh };

export default authReducer;
