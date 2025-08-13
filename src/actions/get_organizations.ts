"use server";
import { Organization } from "@/types/organization.type";
import { getApiClient } from "../services/api.service";
import { getAuthToken } from "./auth";

export async function getOrganizations(): Promise<Organization[]> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const result = await apiClient.get(`admin/find-organization-admins`);
    return result.data;
  } catch (error) {
    console.error("Error fetching organizations:", error);
    throw error;
  }
}

export async function getOrganizationTable(): Promise<Organization[]> {
  try {
    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const result = await apiClient.get(`/organizations/table`);
    return result.data;
  } catch (error) {
    console.error("Error fetching organization table:", error);
    throw error;
  }
}