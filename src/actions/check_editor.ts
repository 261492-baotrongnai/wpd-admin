"use server";
import { cookies } from "next/headers";

// interface Payload {
//   roles: string[];
//   internalId: string;
// }

export async function isEditor(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  return decodeAuthToken(authToken);
}

function decodeAuthToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded auth token:", decoded);
    return decoded?.roles.includes("editor");
  } catch (error) {
    console.error("Error decoding auth token:", error);
    return false;
  }
}
