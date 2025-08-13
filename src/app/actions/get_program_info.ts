"use server";
import { getApiClient } from "../services/api.service";
import { cookies } from "next/headers";

export async function getProgramInfo() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const apiClient = await getApiClient(authToken);
    const programs = await apiClient.get(`/program/info`);

    return programs.data;
  } catch (error) {
    console.error("Error fetching program info:", error);
    throw error;
  }
}
