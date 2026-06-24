import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createProposalAPI,
  getProjectProposalsAPI,
  updateProposalStatusAPI,
  getMyProposalsAPI,
  getClientProposalsAPI,
} from "../../api/proposalAPI";

// CREATE PROPOSAL
export const createProposal = createAsyncThunk(
  "proposal/createProposal",
  async (proposalData, thunkAPI) => {
    try {
      return await createProposalAPI(proposalData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

// GET PROJECT PROPOSALS
export const getProjectProposals = createAsyncThunk(
  "proposal/getProjectProposals",
  async (projectId, thunkAPI) => {
    try {
      return await getProjectProposalsAPI(projectId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const updateProposalStatus = createAsyncThunk(
  "proposal/updateStatus",
  async ({ proposalId, status }, thunkAPI) => {
    try {
      return await updateProposalStatusAPI(proposalId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getMyProposals = createAsyncThunk(
  "proposal/getMyProposals",
  async (_, thunkAPI) => {
    try {
      return await getMyProposalsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getClientProposals = createAsyncThunk(
  "proposal/getClientProposals",
  async (_, thunkAPI) => {
    try {
      return await getClientProposalsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  proposals: [],
  clientProposals: [],
  isLoading: false,
  error: null,
  success: false,
};

const proposalSlice = createSlice({
  name: "proposal",
  initialState,
  reducers: {
    resetProposalState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProposal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProposal.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(createProposal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProjectProposals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProjectProposals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.proposals = action.payload.proposals;
      })
      .addCase(getProjectProposals.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProposalStatus.fulfilled, (state, action) => {
        const updatedProposal = action.payload.proposal;
        state.proposals = state.proposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        );
        state.clientProposals = state.clientProposals.map((proposal) =>
          proposal._id === updatedProposal._id ? updatedProposal : proposal
        );
      });
  },
});

export const { resetProposalState } = proposalSlice.actions;
export default proposalSlice.reducer;
