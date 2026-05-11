import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@agentdynamics/ui", "@agentdynamics/types"],
  experimental: {
    typedRoutes: true,
  },
};

export default nextConfig;
