import { getAuthToken } from "@/app/actions/auth";
import { getApiClient } from "@/app/services/api.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const apiClient = await getApiClient(await getAuthToken());

  const result = await apiClient.post(`/program/create`, body);
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/program`
  );
  response.cookies.set("create_program_result", JSON.stringify(result.data), {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
  return response;
}
