import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getApiClient } from "@/services/api.service";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  let isAuthenticated = !!token;

  try {
    const apiClient = await getApiClient(token);
    await apiClient.get("/auth/validate-token");
  } catch (error) {
    console.error("Token validation error:", error);
    isAuthenticated = false;
  }

  if (
    request.nextUrl.pathname.startsWith("/authentication/login") ||
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/_next") ||
    request.nextUrl.pathname.startsWith("/images") ||
    request.nextUrl.pathname.startsWith("/api") ||
    request.nextUrl.pathname.startsWith("/callback")
  ) {
    return NextResponse.next();
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}
