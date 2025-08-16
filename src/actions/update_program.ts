"use server";
import { getApiClient } from "@/services/api.service";
import { getAuthToken } from "./auth";

export async function updateProgramName(
  programId: number,
  newName: string
): Promise<void> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const response = await apiClient.put(`/program/name`, {
      name: newName,
      programId,
    });
    if (response.status !== 200) {
      throw new Error("Failed to update program name");
    }
    console.log("Program name updated successfully:", response.data);
    return response.data.name;
  } catch (error) {
    console.error("Error updating program name:", error);
  }
}

export async function updateProgramOrganizatio(
  programId: number,
  organizationId: number
): Promise<void> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const response = await apiClient.put(`/program/org`, {
      organizationId,
      programId,
    });
    if (response.status !== 200) {
      throw new Error("Failed to update program organization");
    }
    console.log("Program organization updated successfully:", response.data);
    return response.data.organizationId;
  } catch (error) {
    console.error("Error updating program organization:", error);
  }
}
