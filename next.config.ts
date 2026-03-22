import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ['10.5.0.2'],
  output: "export",
  basePath: isProd ? "/Vaikunth-portfolio" : "",
  assetPrefix: isProd ? "/Vaikunth-portfolio/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
