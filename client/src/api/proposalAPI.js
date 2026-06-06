import API from "./axios";

export const createProposalAPI =
  async (proposalData) => {
    const response =
      await API.post(
        "/proposals",
        proposalData
      );

    return response.data;
  };

  export const getProjectProposalsAPI =
  async (projectId) => {
    const response =
      await API.get(
        `/proposals/project/${projectId}`
      );

    return response.data;
  };