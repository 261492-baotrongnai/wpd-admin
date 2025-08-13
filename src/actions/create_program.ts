"use server";

import { getAuthToken } from "@/actions/auth";
import { getApiClient } from "@/services/api.service";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function handleSubmit({
  name,
  organizationId,
}: {
  name: string;
  organizationId: number;
}) {
  const program = {
    name,
    organizationId,
  };
  if (!name || !organizationId) {
    throw new Error("Name and Organization ID are required");
  }

  console.log("Submitting Program:", program);

  const token = await getAuthToken();
  const apiClient = await getApiClient(token);

  const result = await apiClient.post(`/program/create`, program);

  (await cookies()).set("create_program_result", JSON.stringify(result.data), {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return redirect("/program");
}
