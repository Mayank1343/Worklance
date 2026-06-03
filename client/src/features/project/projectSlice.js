import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createProjectAPI,
  getProjectsAPI,
} from "../../api/projectAPI";

export const createProject =
  createAsyncThunk(
    "project/createProject",

    async (
      projectData,
      thunkAPI
    ) => {
      try {
        return await createProjectAPI(
          projectData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

export const getProjects =
  createAsyncThunk(
    "project/getProjects",

    async (_, thunkAPI) => {
      try {
        return await getProjectsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "project",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        createProject.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        createProject.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.projects.push(
            action.payload.project
          );
        }
      )

      .addCase(
        createProject.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      )

      .addCase(
        getProjects.pending,
        (state) => {
          state.isLoading = true;
        }
      )

      .addCase(
        getProjects.fulfilled,
        (state, action) => {
          state.isLoading = false;

          state.projects =
            action.payload.projects;
        }
      )

      .addCase(
        getProjects.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error = action.payload;
        }
      );
  },
});

export default projectSlice.reducer;