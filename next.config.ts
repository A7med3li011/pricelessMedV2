import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  images: {
    remotePatterns: [{ hostname: "cdn.pricelessmed.com" }],
  },
};

export default nextConfig;
