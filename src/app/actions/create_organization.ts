"use server";

import { getAuthToken } from "@/app/actions/auth";
import { getApiClient } from "@/app/services/api.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { OrganizationCreate } from "@/types/organization.type";

export async function handleSubmit(formData: FormData) {
  try {
    const organization: OrganizationCreate = {
      thai_name: formData.get("thai_name") as string,
      eng_name: formData.get("eng_name") as string,
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
