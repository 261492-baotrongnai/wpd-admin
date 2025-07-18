"use server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getApiClient(token?: string) {
  console.log("Loaded auth token:", token);
  const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error("API error:", error);
      return Promise.reject(error);
    }
  );

  return apiClient;
}
