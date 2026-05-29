import API from "../../api/axios";

export const registerUserAPI = async (userData) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

export const loginUserAPI = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};

export const getCurrentUserAPI = async () => {
  const response = await API.get("/auth/me");

  return response.data;
};

export const logoutUserAPI = async () => {
  const response = await API.post("/auth/logout");

  return response.data;
};

export const refreshTokenAPI = async () => {
  const response = await API.post(
    "/auth/refresh-token"
  );

  return response.data;
};