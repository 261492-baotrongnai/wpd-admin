"use client";
import { useEffect, useState } from "react";
import { getLineToken } from "../services/line.service";
import { registerWithIdToken } from "../services/auth.service";

export default function CallbackPage() {
  const [response, setResponse] = useState<unknown | null>(null);

  useEffect(() => {
    getLineToken().then((res) => {
      registerWithIdToken(res.data.id_token).then((res) => {
        setResponse(res.data);
      });
    });
  }, []);

  return (
    <div>
      <h1>Callback Page</h1>
      <p>{JSON.stringify(response)}</p>
    </div>
  );
}
