"use server";
import { getApiClient } from "@/services/api.service";
import { getAuthToken } from "./auth";
import { UserWithProfile } from "@/types/user.types";

export async function getProgramUsers(
  code: string
): Promise<UserWithProfile[]> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);
    console.log(`Fetching users for program code: ${code}`);
    const response = await apiClient.get(`/program/${code}/users`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching program users:", error);
    return [];
  }
}
