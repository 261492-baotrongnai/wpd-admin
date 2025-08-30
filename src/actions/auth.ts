"use server";
import { cookies } from "next/headers";

export async function setAuthenticated(value: "true" | "false") {
  const cookieStore = await cookies();
  cookieStore.set("IS_AUTHENTICATED", value, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function isAuthenticated(): Promise<"true" | "false"> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("IS_AUTHENTICATED");
  return authCookie ? (authCookie.value as "true" | "false") : "false";
}

export async function setAuthToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAuthToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get("auth_token")?.value;
}

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, { path: "/" });
}
