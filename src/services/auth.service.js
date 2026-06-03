import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const getAccessToken = () =>
  localStorage.getItem("access_token") || localStorage.getItem("token");

export const getRefreshToken = () => localStorage.getItem("refresh_token");

export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setAuthSession = ({ access_token, refresh_token, user }) => {
  if (access_token) {
    localStorage.setItem("token", access_token);
    localStorage.setItem("access_token", access_token);
  }

  if (refresh_token) {
    localStorage.setItem("refresh_token", refresh_token);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  sessionStorage.clear();
};

export const login = async (payload) => {
  const res = await authApi.post("/api/auth/login", payload);
  setAuthSession(res.data);
  return res.data;
};

export const logout = async () => {
  try {
    await authApi.post("/api/auth/logout", null, {
      headers: getAccessToken()
        ? { Authorization: `Bearer ${getAccessToken()}` }
        : undefined,
    });
  } catch (error) {
    console.error("Logout request failed:", error.response?.data || error.message);
  } finally {
    clearAuthSession();
  }
};

export const refreshAuthToken = async () => {
  const refresh_token = getRefreshToken();

  if (!refresh_token) {
    throw new Error("Refresh token is missing.");
  }

  const res = await authApi.post("/api/auth/refresh", { refresh_token });
  setAuthSession(res.data);
  return res.data;
};
