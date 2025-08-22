"use server";

import { getApiClient } from "@/services/api.service";
import { Food } from "@/types/food.types";
import { cookies } from "next/headers";

export async function getWaitingConfirmation(): Promise<Food[]> {
  console.log("Fetching waiting confirmation items...");
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) {
    throw new Error("Authentication token not found");
  }
  const apiClient = await getApiClient(authToken);
  try {
    const response = await apiClient.get("/food/waiting-confirmation");
    if (response.status !== 200) {
      throw new Error("Failed to fetch waiting confirmation");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching waiting confirmation:", error);
    throw error;
  }
}

export async function getSignedUrl(key: string): Promise<string> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) {
    throw new Error("Authentication token not found");
  }
  const apiClient = await getApiClient(authToken);
  try {
    const response = await apiClient.get(
      `/images/admin/signed-url?key=${encodeURIComponent(key)}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch signed URL");
    }

    return response.data.signed_url;
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    throw error;
  }
}
