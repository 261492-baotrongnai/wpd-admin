"use server";

import { getApiClient } from "@/services/api.service";
import { cookies } from "next/headers";

export async function getSignedUrl(key: string): Promise<string> {
  // Implementation for generating a signed URL
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) {
    throw new Error("Authentication token not found");
  }
  console.log("Auth token found:", authToken);
  const apiClient = await getApiClient(authToken);

  const response = await apiClient.get(`/images/admin/signed-url?key=${key}`);
  console.log("Signed URL response:", response.data);
  return response.data.signed_url;
}
