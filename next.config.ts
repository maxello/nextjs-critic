import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'www.metacritic.com',
      },
    ],
  },
};

export default nextConfig;
