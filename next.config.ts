import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['10.5.0.2'],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
