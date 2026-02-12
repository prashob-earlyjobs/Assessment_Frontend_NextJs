import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/sitemap-:index.xml',
        destination: '/api/sitemap/:index',
      },
    ];
  },
};

export default nextConfig;
