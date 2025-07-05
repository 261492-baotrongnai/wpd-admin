import axios from "axios";

export function lineLogin() {
  const lineLoginChannelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
  console.log("lineLoginChannelId", lineLoginChannelId);
  const redirectUrl = `${"https://4pg05g3k-3000.asse.devtunnels.ms/callback"}`;
  const scope = "profile%20openid%20email";
  const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineLoginChannelId}&redirect_uri=${redirectUrl}&scope=${scope}&state=12w3xt3x`;

  window.location.href = lineLoginUrl;
}

export function getLineToken() {
  const lineLoginChannelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
  const lineLoginChannelSecret = process.env.NEXT_PUBLIC_CHANNEL_SECRET;
  const redirectUrl = `${"https://4pg05g3k-3000.asse.devtunnels.ms/callback"}`;

  const url = `https://api.line.me/oauth2/v2.1/token`;
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get("code") || "";
  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUrl,
    client_id: lineLoginChannelId || "",
    client_secret: lineLoginChannelSecret || "",
  });

  return axios.post(url, params.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
}
