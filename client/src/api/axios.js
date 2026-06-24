import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh-token") &&
      !originalRequest.url.includes("/auth/me")
    ) {
      originalRequest._retry = true;

      try {
  const response = await API.post(
    "/auth/refresh-token"
  );

  localStorage.setItem(
    "accessToken",
    response.data.accessToken
  );

  return API(originalRequest);
} catch (refreshError) {
  return Promise.reject(refreshError);
}
    }

    return Promise.reject(error);
  }
);

export default API;