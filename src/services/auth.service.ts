"use server";
import axios from "axios";
import { getAuthToken } from "../actions/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function registerWithIdToken(idToken: string) {
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

  return response.data.access_token;
}

export async function getInfo() {
  const authToken = await getAuthToken();
  
  const url = `${API_URL}/admin/info`;
  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
