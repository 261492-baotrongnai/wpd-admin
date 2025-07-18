"use server";
import { cookies } from "next/headers";
import { getApiClient } from "../services/api.service";

export type Program = {
  name: string;
  hospitalName: string;
  code: string;
};

export async function createProgram(program: Program) {
  const cookieStore = await cookies();
  const apiClient = await getApiClient(cookieStore.get("auth_token")?.value);
  const response = await apiClient.post("/program/create", program);
  return response;
}
