import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", statusCode: 301 },
      { source: "/about-us/our-story", destination: "/story", statusCode: 301 },
      { source: "/teams", destination: "/team", statusCode: 301 },
      // Provisional until later batches confirm the targets:
      // { source: "/press-release", destination: "/newsroom", permanent: true },
      // { source: "/recruiter", destination: "/become-a-recruiter", permanent: true },
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
