"use client";

import { lineLogin } from "../services/line.service";

export default function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => lineLogin()}> line </button>
    </div>
  );
}
