import { getApiClient } from "@/services/api.service";
import { cookies } from "next/headers";
export async function getMenus() {
  const cookieStore = await cookies();
  const auth_token = cookieStore.get("auth_token")?.value;
  if (!auth_token) {
    throw new Error("Unauthorized - No auth token found");
  }
  const apiClient = await getApiClient(auth_token);
  const response = await apiClient.get("/food-grade");
  return response.data;
}
