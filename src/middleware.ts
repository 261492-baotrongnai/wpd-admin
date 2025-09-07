import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = new Set(["/signin", "/authentication/login", "/callback"]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public paths: allow through
  if (PUBLIC_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  let isAuthenticated = false;

  try {
    // Prefer absolute API base (env) so we don't hit Next middleware again.
    const apiBase = process.env.NEXT_PUBLIC_API_URL;
    if (!apiBase) {
      console.warn("API base URL missing");
      return NextResponse.redirect(new URL("/signin", request.url));
    }

    const res = await fetch(`${apiBase}/auth/validate-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      // Prevent following backend redirects (e.g., to /signin)
      redirect: "manual",
      cache: "no-store",
    });

    if (res.ok) {
      isAuthenticated = true;
    } else {
      // 3xx/401/403 → treat as invalid
      isAuthenticated = false;
    }
  } catch (e) {
    console.error("Token validation failure (treated as unauthenticated):", e);
    isAuthenticated = false;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

// Limit middleware to non-public, non-static paths
export const config = {
  matcher: ["/((?!_next|images|api|signin|authentication/login|callback).*)"],
};
