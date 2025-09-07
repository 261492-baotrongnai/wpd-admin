"use server";
import { getApiClient } from "@/services/api.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function deleteFood(ids: number[]) {
  if (!Array.isArray(ids) || ids.length === 0) {
    return { success: false, message: "No ids provided" };
  }

  const cookiesStore = await cookies();
  const token = cookiesStore.get("auth_token")?.value;

  if (!token) {
    redirect("/signin");
  }

  try {
    const apiClient = await getApiClient(token);
    await apiClient.delete("/food-grade", { data: { ids } });

    // Optional: revalidatePath("/food"); // adjust to the route showing the table
    return { success: true, deleted: ids };
  } catch (e) {
    console.error("deleteFood action failed", e);
    return { success: false, message: "Delete failed" };
  }
}
