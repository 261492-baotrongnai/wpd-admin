import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function registerWithIdToken(idToken: string) {
  const url = `${API_URL}/admin/line-register`;
  return axios.post(
    url,
    { idToken },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
