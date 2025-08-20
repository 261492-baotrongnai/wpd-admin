"use server";
import { getApiClient } from "@/services/api.service";
import { cookies } from "next/headers";

export async function isEditor(): Promise<boolean> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  const apiClient = await getApiClient(authToken);

  try {
    const response = await apiClient.get("/food/is-editor");
    return response.data?.isEditor ?? false;
  } catch (error) {
    console.error("Error checking editor status:", error);
    return false;
  }
}
