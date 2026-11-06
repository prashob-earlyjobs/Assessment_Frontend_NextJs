import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", statusCode: 301 },
      { source: "/about-us/our-story", destination: "/story", statusCode: 301 },
      { source: "/our-story", destination: "/story", statusCode: 301 },
      { source: "/teams", destination: "/team", statusCode: 301 },
      { source: "/top-executive-recruitment", destination: "/top-executive-recruitment-firm", statusCode: 301 },
      { source: "/value-staffing-service", destination: "/recruitment-process-outsourcing", statusCode: 301 },
      { source: "/value-staffing-services", destination: "/recruitment-process-outsourcing", statusCode: 301 },
      { source: "/refund-policy", destination: "/terms-and-conditions", statusCode: 301 },
      { source: "/freelance-career-counsellor", destination: "/become-a-recruiter", statusCode: 301 },
      { source: "/login", destination: "/contact-us", statusCode: 301 },
      { source: "/sign-in", destination: "/contact-us", statusCode: 301 },
      { source: "/dashboard", destination: "/contact-us", statusCode: 301 },
      { source: "/profile", destination: "/contact-us", statusCode: 301 },
      { source: "/airesumebuilder", destination: "/jobs", statusCode: 301 },
      { source: "/jobs/:title", destination: "/jobs", statusCode: 301 },
      { source: "/assessments/:path*", destination: "/jobs", statusCode: 301 },
      { source: "/franchise/allahabad", destination: "/franchise/prayagraj", statusCode: 301 },
      { source: "/franchise/gulbarga", destination: "/franchise/kalaburagi", statusCode: 301 },
      { source: "/franchise/bellary", destination: "/franchise/ballari", statusCode: 301 },
      { source: "/franchise/ganganagar", destination: "/franchise/sri-ganganagar", statusCode: 301 },
      { source: "/franchise/gautam_buddh_nagar", destination: "/franchise/gautam-buddha-nagar", statusCode: 301 },
      { source: "/franchise/khurda", destination: "/franchise/khordha", statusCode: 301 },
      { source: "/franchise/north_cachar_hills", destination: "/franchise/dima-hasao", statusCode: 301 },
      { source: "/franchise/bijapur", destination: "/franchise/vijayapura", statusCode: 301 },
      { source: "/franchise/jaipur", destination: "/franchise/jaipur-city", statusCode: 301 },
      { source: "/franchise/central", destination: "/franchise/central-delhi", statusCode: 301 },
      { source: "/franchise/cheyyar", destination: "/franchise/tiruvannamalai", statusCode: 301 },
      { source: "/franchise/palani", destination: "/franchise/dindigul", statusCode: 301 },
      { source: "/franchise/kovilpatti", destination: "/franchise/thoothukudi", statusCode: 301 },
      { source: "/franchise/paramakudi", destination: "/franchise/ramanathapuram", statusCode: 301 },
      { source: "/franchise/sankarankoil", destination: "/franchise/tenkasi", statusCode: 301 },
      { source: "/franchise/saidapet", destination: "/franchise/chennai", statusCode: 301 },
      { source: "/franchise/narela", destination: "/franchise/north-delhi", statusCode: 301 },
      { source: "/franchise/rohini", destination: "/franchise/north-west-delhi", statusCode: 301 },
      { source: "/franchise/najafgarh", destination: "/franchise/south-west-delhi", statusCode: 301 },
      { source: "/franchise/pratapgarh", destination: "/franchise/locations", statusCode: 301 },
      { source: "/franchise/nagercoil", destination: "/franchise/locations", statusCode: 301 },
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
