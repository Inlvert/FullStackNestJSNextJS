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

interface APIError {
  response?: {
    data?: {
      errors?: string[];
    };
  };
  message: string;
}

const SLICE_NAME = "auth";

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

const loginUser = createAsyncThunk<User, LoginDto, { rejectValue: string[] }>(
  `${SLICE_NAME}/login`,
  async (userData: LoginDto, thunkAPI) => {
    try {
      const { data } = await API.login(userData);
      console.log(data.user.tokenPair);
      return data.user;
    } catch (err: unknown) {
      const error = err as APIError;
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
    } catch (err: unknown) {
      const error = err as APIError;
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
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || ["Unknown error"];
    });

    builder.addCase(refresh.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(refresh.fulfilled, (state, action) => {
      state.isLoading = false;
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

export { loginUser, refresh };

export default authReducer;
