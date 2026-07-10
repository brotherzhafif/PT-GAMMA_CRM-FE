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
  localStorage.getItem("access_token") ||
  localStorage.getItem("accessToken") ||
  localStorage.getItem("token");

export const getRefreshToken = () =>
  localStorage.getItem("refresh_token") || localStorage.getItem("refreshToken");

export const getStoredUser = () => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const setAuthSession = (session) => {
  const payload = session?.data || session || {};
  const accessToken = payload.access_token || payload.accessToken || payload.token;
  const refreshToken = payload.refresh_token || payload.refreshToken;
  const user = payload.user;

  if (accessToken) {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("refreshToken", refreshToken);
  }

  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("access_token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("refreshToken");
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

export const logoutAllDevices = async () => {
  try {
    await authApi.post("/api/auth/logout-all", null, {
      headers: getAccessToken()
        ? { Authorization: `Bearer ${getAccessToken()}` }
        : undefined,
    });
  } catch (error) {
    console.error(
      "Logout all devices request failed:",
      error.response?.data || error.message,
    );
    throw error; 
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
