import axios from "axios";
import { setAuthToken } from "./api.service";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function registerWithIdToken(idToken: string) {
  const url = `${API_URL}/admin/line-register`;
  return axios.post(
    url,
    { idToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function login(idToken: string) {
  const url = `${API_URL}/auth/login-admin`;
  const response = await axios.post(
    url,
    { idToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Response data:", response.data);

  if (response.data.access_token) {
    // clear previous auth token
    localStorage.removeItem("auth_token");

    setAuthToken(response.data.access_token);
    console.log("auth_token:", response.data.access_token);
  }
  return response;
}

export function getInfo() {
  console.log(`auth_token: ${localStorage.getItem("auth_token")}`);
  const url = `${API_URL}/admin/info`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
    },
  });
}
