"use server";
import axios from "axios";

export async function getLineLoginUrl() {
  const lineLoginChannelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://4pg05g3k-3000.asse.devtunnels.ms";
  const redirectUrl = `${baseUrl}/callback`;
  const scope = "profile%20openid%20email";
  return `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineLoginChannelId}&redirect_uri=${redirectUrl}&scope=${scope}&state=12w3xt3x`;
}

export async function getLineToken(code: string) {
  const lineLoginChannelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
  const lineLoginChannelSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://4pg05g3k-3000.asse.devtunnels.ms";
  const redirectUrl = `${baseUrl}/callback`;

  const url = `https://api.line.me/oauth2/v2.1/token`;
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUrl,
    client_id: lineLoginChannelId || "",
    client_secret: lineLoginChannelSecret || "",
  });

  try {
    const response = await axios.post(url, params.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return response;
  } catch (error) {
    console.error("Error getting LINE token:", error);
    throw error;
  }
}
