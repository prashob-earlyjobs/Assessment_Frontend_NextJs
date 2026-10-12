import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/teams", destination: "/team", permanent: true },
      { source: "/press-release", destination: "/newsroom", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/earlyjobs_datas/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "earlyjobs-company-logo.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
