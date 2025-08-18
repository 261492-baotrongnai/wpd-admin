"use server";
import { getApiClient } from "../services/api.service";
import { cookies } from "next/headers";

export async function getProgramByCode(code: string) {
  // console.log("Fetching program by code:", code);
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;
    if (!authToken) {
      throw new Error("Authentication token not found");
    }
    console.log("Auth token found:", authToken);
    const apiClient = await getApiClient(authToken);
    const response = await apiClient.get(`/program/find-by-code/${code}`);
    console.log("Program fetched successfully:", response.data);
    // await setProgramNameCookie(response.data.name);
    if (response.status !== 200) {
      throw new Error("Failed to fetch program by code");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching program by code:", error);
    throw error;
  }
}

export async function getProgramInfo(programId: number) {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const apiClient = await getApiClient(authToken);
    const programs = await apiClient.get(`/program/${programId}/info`);

    return programs.data;
  } catch (error) {
    console.error("Error fetching program info:", error);
    throw error;
  }
}

export async function getProgramTable() {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth_token")?.value;

    if (!authToken) {
      throw new Error("Authentication token not found");
    }

    const apiClient = await getApiClient(authToken);
    const programs = await apiClient.get(`/program/table`);
    if (!programs.data) {
      throw new Error("No program data found");
    }
    // console.log("Program table data:", programs.data);
    return programs.data;
  } catch (error) {
    console.error("Error fetching program table:", error);
    throw error;
  }
}

export async function setProgramNameCookie(name: string) {
  const cookieStore = await cookies();
  cookieStore.set("program_name_header", name, {
    path: "/",
    sameSite: "lax",
    secure: true,
  });
}
