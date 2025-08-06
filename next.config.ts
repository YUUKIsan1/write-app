import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export の設定（必要に応じて）
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
