/**
 * API client and auth functions
 */
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

/**
 * Axios instance for authenticated requests
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Attach JWT access token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Refresh JWT access token using refresh token
 */
export const refreshTokenAPI = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error("No refresh token found");

  try {
    const response = await apiClient.post("/auth/refresh", {
      refresh_token: refreshToken, // backend expects this key
    });

    // Save new access token
    if (response.data?.access_token) {
      localStorage.setItem("accessToken", response.data.access_token);
    }

    return response.data;
  } catch (error) {
    console.error("Failed to refresh token:", error.response?.data || error);
    throw error;
  }
};

/**
 * Login function
 */
export const loginAPI = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });

    const { access_token, refresh_token } = response.data;
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);

    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error);
    throw error;
  }
};

/**
 * Signup function
 */
export const signupAPI = async (data) => {
  try {
    const response = await apiClient.post("/auth/signup", data);
    return response.data;
  } catch (err) {
    console.error("Signup error:", err.response?.data || err);
    throw err;
  }
};

/**
 * Default export (optional)
 */
export default {
  apiClient,
  refreshTokenAPI,
  loginAPI,
  signupAPI, // 
};
