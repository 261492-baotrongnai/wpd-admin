"use server";

import { getAuthToken } from "@/app/actions/auth";
import { getApiClient } from "@/app/services/api.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleSubmit(formData: FormData) {
  try {
    const program = {
      name: formData.get("name"),
      hospitalName: formData.get("hospitalName"),
      code: formData.get("code"),
    };

    const token = await getAuthToken();
    const apiClient = await getApiClient(token);

    const result = await apiClient.post(`/program/create`, program);

    (await cookies()).set(
      "create_program_result",
      JSON.stringify(result.data),
      {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      }
    );


    redirect("/program");
  } catch (error) {
    console.error("Error creating program:", error);
    throw error;
  }
}
