import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82],
    deviceSizes: [420, 640, 750, 828, 1080, 1200, 1600, 1920],
  },
};

export default nextConfig;
