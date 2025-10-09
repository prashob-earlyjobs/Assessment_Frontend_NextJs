import Franchise from "./franchise";
import { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";
  return {
    title: "EarlyJobs Franchise - AI-Powered Recruitment",
    description:
      "Join EarlyJobs, India's leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.",
    keywords: ["EarlyJobs", "franchise", "recruitment", "AI recruitment", "job placement"],
    openGraph: {
      title: "EarlyJobs Franchise",
      description:
        "Join EarlyJobs, India's leading hybrid AI + human recruiter platform. Discover franchise opportunities and revolutionize recruitment with us.",
      url: baseUrl + "/franchise",
      images: [
        {
          url: `/images/og-franchise.jpg`,
          width: 1200,
          height: 627,
          alt: "EarlyJobs Franchise",
        },
      ],
    },
  };
}   

export default function Page() {
  return <Franchise />;
}