"use server";
import axios from "axios";
import { getAuthToken } from "../actions/auth";
import { getLineProfile } from "./line.service";
import { NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function registerWithIdToken(idToken: string, name: string) {
  const url = `${API_URL}/admin/line-register`;
  return axios.post(
    url,
    { idToken, username: name },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export async function login(idToken: string) {
  try {
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
  } catch (error) {
    if (
      (error as { status: number }).status === 403 ||
      (error as { status: number }).status === 401
    ) {
      console.log("User not found, registering...", idToken);
      const name = await getLineProfile(idToken);
      console.log("name", name);
      const create_admin = await registerWithIdToken(idToken, name);
      console.log("create_admin", create_admin.data);
      const response = NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL}/request-approval`
      );
      response.cookies.set("IS_AUTHENTICATED", "false", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return response;
    }
  }
}

export async function getInfo() {
  const authToken = await getAuthToken();
  console.log("Auth token in getInfo:", authToken);

  const url = `${API_URL}/admin/info`;

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
}
