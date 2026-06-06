import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  loginUserAPI,
  registerUserAPI,
  getCurrentUserAPI,
  logoutUserAPI,
} from "./authAPI";

const initialState = {
  user: null,
  accessToken:
  localStorage.getItem(
    "accessToken"
  ) || null,
  isAuthenticated: false,
  isLoading: false,
  isAuthInitialized: false,
  error: null,
};

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    try {
      return await registerUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      return await loginUserAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
);

// GET CURRENT USER
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await getCurrentUserAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      return await logoutUserAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    initializeAuth: (
      state
    ) => {
      state.isAuthInitialized =
        true;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // LOGIN
      // =========================

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

     .addCase(
      loginUser.fulfilled,
      (state, action) => {

        state.isLoading = false;

        state.user =
          action.payload.user;

        state.accessToken =
          action.payload.accessToken;

        state.isAuthenticated =
          true;

        state.isAuthInitialized =
          true;

        localStorage.setItem(
          "accessToken",
          action.payload.accessToken
        );
      }
    )

      .addCase(
        loginUser.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      // =========================
      // REGISTER
      // =========================

      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        registerUser.fulfilled,
        (state) => {
          state.isLoading = false;
          state.error = null;
        }
      )

      .addCase(
        registerUser.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )

      // =========================
      // GET CURRENT USER
      // =========================

      .addCase(
        getCurrentUser.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        getCurrentUser.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.user = action.payload.user;

          state.isAuthenticated = true;

          state.isAuthInitialized = true;

          state.error = null;
        }
      )

      .addCase(
        getCurrentUser.rejected,
        (state) => {
          state.isLoading = false;

          state.user = null;

          state.isAuthenticated = false;

          state.isAuthInitialized = true;
        }
      )

      // =========================
      // LOGOUT
      // =========================

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
  state.user = null;
  state.accessToken = null;
  state.isAuthenticated = false;

  localStorage.removeItem(
    "accessToken"
  );
})

      .addCase(
        logoutUser.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export default authSlice.reducer;
export const {
  initializeAuth,
} = authSlice.actions;