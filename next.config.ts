import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "preview-chat-e151c751-c539-4bf7-bacc-ea07c099259b.space-z.ai",
  ],
};

export default nextConfig;
