import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        // process.env.CODESPACE_NAME
        //   ? `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
        //   : undefined,
        // process.env.ALLOWED_ORIGIN, // Add this to your .env file
        "4pg05g3k-3000.asse.devtunnels.ms",
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
      ].filter((origin): origin is string => typeof origin === "string"),
    },
  },
};

export default nextConfig;
