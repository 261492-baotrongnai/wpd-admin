"use server";
import { getApiClient } from "@/app/services/api.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  console.log("auth_token ii:", authToken);
  const apiClient = await getApiClient(authToken);

  const programs = await apiClient.get(`/program/info`);
  cookieStore.set("programs", JSON.stringify(programs.data), {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  return redirect("/program/pages");
}
