import axios from "axios";
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  refreshAuthToken,
} from "@/services/auth.service";

// let isRedirectingToLogin = false;

const isUnauthorizedError = (error) => {
  return (
    error.response?.status === 401 || error.response?.data?.statusCode === 401
  );
};

const getSessionAccessToken = (session) => {
  return (
    session?.access_token ||
    session?.accessToken ||
    session?.token ||
    session?.data?.access_token ||
    session?.data?.accessToken ||
    session?.data?.token
  );
};

const redirectToLogin = () => {
  if (window.location.pathname === "/login") return;

  clearAuthSession();

  window.location.replace("/login");
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
console.log("BASE URL:", import.meta.env.VITE_API_URL);

// request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error("API Error:", error.response?.data);

    const originalRequest = error.config;

    if (
      isUnauthorizedError(error) &&
      originalRequest &&
      !originalRequest._retry &&
      getRefreshToken()
    ) {
      originalRequest._retry = true;

      try {
        const session = await refreshAuthToken();
        const token = getSessionAccessToken(session);

        if (!token) {
          return Promise.reject(error);
        }

        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        if (isUnauthorizedError(refreshError)) {
          redirectToLogin();
        }

        return Promise.reject(refreshError);
      }
    }

    if (isUnauthorizedError(error)) {
      redirectToLogin();
    }

    return Promise.reject(error);
  },
);
