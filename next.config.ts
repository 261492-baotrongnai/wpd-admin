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
        "wpd-bucket.sgp1.digitaloceanspaces.com",
        "sprofile.line-scdn.net",
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
      ].filter((origin): origin is string => typeof origin === "string"),
    },
  },
  images: {
    domains: [
      "wpd-bucket.sgp1.cdn.digitaloceanspaces.com",
      "wpd-bucket.sgp1.digitaloceanspaces.com",
      "sprofile.line-scdn.net",
    ],
  },
  webpack(config: { module: { rules: { test: RegExp; use: string[] }[] } }) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
