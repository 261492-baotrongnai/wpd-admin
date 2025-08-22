"use server";
import { getApiClient } from "@/services/api.service";
import { ConfirmingFood } from "@/types/food.types";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addFood(food: ConfirmingFood) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      throw new Error("Unauthorized - No auth token found");
    }

    const apiClient = await getApiClient(authToken);
    const response = await apiClient.post("/food/edit", food);

    if (!(response.status >= 200 && response.status < 300)) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    // Revalidate any relevant paths after successful update
    revalidatePath("/food/pending"); // Adjust path as needed

    return { success: true, data: response.data };
  } catch (error) {
    console.error("Server action error:", error);

    // Return a serializable error object instead of throwing
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add food",
    };
  }
}
