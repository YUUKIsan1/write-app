import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // リモートアクセス用の設定
  experimental: {
    turbo: {
      rules: {
        '*.tsx': ['@turbo/loader']
      }
    }
  },
  // 外部からのアクセスを許可
  devIndicators: {
    buildActivity: false,
  },
  // Static export の設定（必要に応じて）
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
