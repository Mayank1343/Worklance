import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createProjectAPI,
  getProjectsAPI,
  getProjectByIdAPI,
  updateProjectAPI,
  deleteProjectAPI,
  completeProjectAPI,
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

export const getProjectById =
  createAsyncThunk(
    "project/getProjectById",

    async (id, thunkAPI) => {
      try {
        return await getProjectByIdAPI(
          id
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

const initialState = {
  projects: [],
  selectedProject: null,
  isLoading: false,
  error: null,
};

export const updateProject =
  createAsyncThunk(
    "project/updateProject",

    async (
      { id, projectData },
      thunkAPI
    ) => {
      try {
        return await updateProjectAPI(
          id,
          projectData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

  export const deleteProject =
  createAsyncThunk(
    "project/deleteProject",
    async (id, thunkAPI) => {
      try {
        return await deleteProjectAPI(id);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response.data.message
        );
      }
    }
  );

  export const completeProject =
    createAsyncThunk(
      "project/completeProject",

      async (
        id,
        thunkAPI
      ) => {
        try {
          return await completeProjectAPI(
            id
          );
        } catch (error) {
          return thunkAPI.rejectWithValue(
            error.response.data.message
          );
        }
      }
    );


const projectSlice = createSlice({
  name: "project",

  initialState,
  clientProposals: [],

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
      )

  .addCase(
  getProjectById.pending,
  (state) => {
    state.isLoading = true;
    state.error = null;
    state.selectedProject = null;
  }
  )

.addCase(
  getProjectById.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.selectedProject =
      action.payload.project;
  }
)

.addCase(
  getProjectById.rejected,
  (state, action) => {
    state.isLoading = false;

    state.error = action.payload;
  }
)

.addCase(
  updateProject.pending,
  (state) => {
    state.isLoading = true;
  }
)

.addCase(
  updateProject.fulfilled,
  (state, action) => {
    state.isLoading = false;

    state.selectedProject =
      action.payload.project;

    state.projects =
      state.projects.map(
        (project) =>
          project._id ===
          action.payload.project._id
            ? action.payload.project
            : project
      );
  }
)

.addCase(
  updateProject.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)

.addCase(
  deleteProject.fulfilled,
  (state) => {
    state.isLoading = false;
  }
)

.addCase(
  deleteProject.pending,
  (state) => {
    state.isLoading = true;
  }
)

.addCase(
  deleteProject.rejected,
  (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
)

  .addCase(
    completeProject.fulfilled,
    (state, action) => {

      state.selectedProject =
        action.payload.project;

      state.projects =
        state.projects.map(
          (project) =>
            project._id ===
            action.payload.project._id
              ? action.payload.project
              : project
        );
    }
  )
}
});

export default projectSlice.reducer;