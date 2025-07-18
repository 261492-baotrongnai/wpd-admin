"use server";
import { NextResponse } from "next/server";
import { getApiClient } from "@/app/services/api.service";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  console.log("auth_token ii:", authToken);
  const apiClient = await getApiClient(authToken);

  const programs = await apiClient.get(`/program/info`);
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/program/pages`
  );
  response.cookies.set("programs", JSON.stringify(programs.data), {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  return response;
}
