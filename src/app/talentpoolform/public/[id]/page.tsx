import PublicTalentPoolForm from "./talentpoolform";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Join Our Talent Pool | EarlyJobs",
    description:
      "Join EarlyJobs Talent Pool to accelerate your career with AI-powered job matching, verified profiles, and optional skill assessments. Connect with top employers in just 30 days.",
    keywords:
      "talent pool, AI job placement, EarlyJobs, job matching, skill assessments, verified profiles, career acceleration, hiring",
    openGraph: {
      title: "Join Our Talent Pool | EarlyJobs",
      description:
        "Join EarlyJobs Talent Pool and land jobs faster with AI-powered matching. Optional skill assessments, verified profiles, and a 30-day placement guarantee.",
      type: "website",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/talent-pool`,
      images: [
        {
          url: `/images/og-talent.jpg`,
          width: 1200,
          height: 627,
          alt: "EarlyJobs Talent Pool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Join Our Talent Pool | EarlyJobs",
      description:
        "Join EarlyJobs Talent Pool and land jobs faster with AI-powered matching. Optional skill assessments, verified profiles, and a 30-day placement guarantee.",
      images: ["/images/og-image.jpg"],
    },
    robots: "index, follow",
    viewport: "width=device-width, initial-scale=1.0",
  };
}

export default function Page() {    
  return <PublicTalentPoolForm />;
}