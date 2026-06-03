import API from "./axios";

export const createProjectAPI = async (
  projectData
) => {
  const response = await API.post(
    "/projects",
    projectData
  );

  return response.data;
};

export const getProjectsAPI =
  async () => {
    const response = await API.get(
      "/projects"
    );

    return response.data;
  };

export const getProjectByIdAPI =
  async (id) => {
    const response = await API.get(
      `/projects/${id}`
    );

    return response.data;
  };