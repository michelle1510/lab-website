import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: "/lab-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
