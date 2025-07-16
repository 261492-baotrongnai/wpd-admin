import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const AUTH_TOKEN = localStorage.getItem("auth_token");
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: AUTH_TOKEN ? `Bearer ${AUTH_TOKEN}` : "",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors
    console.error("API error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;

export function setAuthToken(token: string) {
  localStorage.setItem("auth_token", token);
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
}

export function clearAuthToken() {
  localStorage.removeItem("auth_token");
  delete apiClient.defaults.headers.Authorization;
}

