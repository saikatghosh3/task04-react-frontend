import axios from "axios";
import { configs } from "../configs/const";
import { getAccessToken } from "../utils/auth";
export const publicClient = axios.create({
  baseURL: configs.apiBaseUrl,
});

export const protectedClient = axios.create({
  baseURL: configs.apiBaseUrl,
});

protectedClient.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers["Authorization"] = "Bearer " + getAccessToken();
  return config;
});

protectedClient.interceptors.response.use(
  (response) => response, // Directly return successful responses.
  async (error) => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the stored refresh token.
        // Make a request to your auth server to refresh the token.
        const response = await publicClient.post("/auth/refresh-token", {
          refreshToken,
        });
        const { accessToken, user } = response.data;

        // Store the new access and refresh tokens.
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return protectedClient(originalRequest); // Retry the original request with the new access token.
      } catch (refreshError) {
        // Handle refresh token errors by clearing stored tokens and redirecting to the login page.
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/sign-in";
        return Promise.reject(refreshError);
      }
    }
    localStorage.clear();
    window.location.href = "/sign-in";
    return Promise.reject(error); // For all other errors, return the error as is.
  }
);
export const handleHttpError = (e) => {
  if (axios.isAxiosError(e)) {
    return {
      data: null,
      error: e?.response?.data?.message,
    };
  } else {
    return {
      data: null,
      error: "something went't wrong",
    };
  }
};
