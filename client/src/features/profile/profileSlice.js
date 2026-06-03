import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getProfileAPI,
  updateProfileAPI,
} from "./profileAPI";

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

// GET PROFILE THUNK
export const getProfile =
  createAsyncThunk(
    "profile/getProfile",

    async (_, thunkAPI) => {
      try {
        return await getProfileAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

// UPDATE PROFILE THUNK
export const updateProfile =
  createAsyncThunk(
    "profile/updateProfile",

    async (profileData, thunkAPI) => {
      try {
        return await updateProfileAPI(
          profileData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET PROFILE

      .addCase(
        getProfile.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        getProfile.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.profile =
            action.payload.profile;
        }
      )

      .addCase(
        getProfile.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )

      // UPDATE PROFILE

      .addCase(
        updateProfile.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        updateProfile.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.profile =
            action.payload.profile;
        }
      )

      .addCase(
        updateProfile.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      );
  },
});

export default profileSlice.reducer;