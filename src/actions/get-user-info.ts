"use server";
import { getApiClient } from "@/services/api.service";
import { Meal } from "@/types/meal.types";
import { User, UserProfile } from "@/types/user.types";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

export async function getUserPageInfo(userId: string): Promise<{
  user: User | null;
  profile: UserProfile | null;
  meals: Meal[] | null;
}> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    if (!authToken) {
      throw new Error("Authentication token not found");
    }
    console.log("Auth token found:", authToken);
    const apiClient = await getApiClient(authToken);

    const response = await apiClient.get(`/users/${userId}`);

    return {
      user: response.data.user.user,
      profile: response.data.user.profile,
      meals: response.data.meals,
    };
  } catch (error) {
    console.error("Error fetching user page info:", error);
    if (isAxiosError(error) && error.response?.status === 404) {
      return {
        user: null,
        profile: null,
        meals: null,
      };
    }
    throw error;
  }
}
