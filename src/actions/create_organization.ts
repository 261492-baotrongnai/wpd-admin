"use server";

import { getAuthToken } from "@/actions/auth";
import { getApiClient } from "@/services/api.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OrganizationCreate } from "@/types/organization.type";

export async function handleSubmit({ thai_name, eng_name }: { thai_name: string; eng_name: string }) {
  try {
    const organization: OrganizationCreate = {
      thai_name,
      eng_name,
    };

    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const result = await apiClient.post(`/organizations/create`, organization);

    (await cookies()).set(
      "create_organization_result",
      JSON.stringify(result.data),
      {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      }
    );
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
  redirect("/organization");
}
