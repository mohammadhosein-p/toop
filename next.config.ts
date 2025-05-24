import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    domains: ["crests.football-data.org"],
  },
};

export default nextConfig;
