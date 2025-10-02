import { NextRequest, NextResponse } from "next/server";
import { getLineToken } from "@/services/line.service";
import { login, getInfo } from "@/services/auth.service";
import {
  isAuthenticated,
  setAuthenticated,
  setAuthToken,
  // setAuthToken,
  setCookie,
} from "@/actions/auth";

export async function GET(req: NextRequest) {
  await setAuthenticated("true");
  console.log("isAuthenticated: ", await isAuthenticated());
  console.log("Received request for callback");
  const code = req.nextUrl.searchParams.get("code");

  if (code) {
    const lineTokenRes = await getLineToken(code);

    const auth_token = await login(lineTokenRes.data.id_token);
    await setAuthToken(auth_token);
    const infoRes = await getInfo();
    await setCookie("user_info", JSON.stringify(infoRes.data));
    // Set cookies before redirecting
    const response = NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL}`
    );
    response.cookies.set("IS_AUTHENTICATED", "true", {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("user_info", JSON.stringify(infoRes.data), {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    response.cookies.set("auth_token", auth_token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return response;
  }
}
