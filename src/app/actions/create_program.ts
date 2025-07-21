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
    const programs = await apiClient.get(`/program/info`);

    // Store the result in cookies
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
    (await cookies()).set("programs", JSON.stringify(programs.data), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Use redirect from next/navigation instead of NextResponse
    redirect("/program");
  } catch (error) {
    console.error("Error creating program:", error);
    // Handle error appropriately
    throw error;
  }
}
