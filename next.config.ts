import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Trigger fresh build: 2026-03-17 21:32 */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
