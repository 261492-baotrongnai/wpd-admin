"use server";
import { getApiClient } from "@/services/api.service";
import { ConfirmingFood } from "@/types/food.types";
import { cookies } from "next/headers";

export async function addFood(food: ConfirmingFood) {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  if (!authToken) {
    throw new Error("Unauthorized");
  }
  const apiClient = await getApiClient(authToken);

  try {
    const response = await apiClient.post("/food/edit", food);
    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error("Failed to add food");
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add food");
  }
}
