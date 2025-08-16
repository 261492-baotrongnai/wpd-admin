import { getApiClient } from "@/services/api.service";
import { getAuthToken } from "./auth";
import { User } from "@/types/user.types";

export async function getProgramUsers(programId: number): Promise<User[]> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const response = await apiClient.get(`/program/${programId}/users`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching program users:", error);
    return [];
  }
}
