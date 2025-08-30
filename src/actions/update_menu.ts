"use server";
import { getApiClient } from "@/services/api.service";
import { Menu } from "@/types/menu.types";
import { cookies } from "next/headers";

export async function updateMenu(
  menu: Menu
): Promise<{ success: boolean; error?: string }> {
    console.log("Updating menu:", menu);
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const apiClient = await getApiClient(token);

  const response = await apiClient.put(`/food-grade`, menu);
  console.log("Menu updated successfully:", response.data);

  if (response.status < 200 || response.status >= 300) {
    const error = response.data;
    return { success: false, error: error?.message || "Failed to update menu" };
  }

  return { success: true };
}
