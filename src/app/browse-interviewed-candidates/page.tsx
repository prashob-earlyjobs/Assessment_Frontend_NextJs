import { Metadata } from "next";
import { Suspense } from "react";
import BrowseCandidatesClient from "../components/pages/BrowseCandidatesClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

export const metadata: Metadata = {
  title: "Browse Top Interviewed Candidates - EarlyJobs",
  description: "Discover talented professionals ready to join your team. Browse candidates with verified skills and experience on EarlyJobs.",
  keywords: "candidates, talent, hiring, professionals, earlyjobs",
  openGraph: {
    title: "Browse Top Interviewed Candidates - EarlyJobs",
    description: "Discover talented professionals ready to join your team. Browse candidates with verified skills and experience on EarlyJobs.",
    type: "website",
    url: `${baseUrl}/browse-interviewed-candidates`,
    images: [
      {
        url: "/images/og-candidates.jpg",
        width: 1200,
        height: 627,
        alt: "Browse Candidates on EarlyJobs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Top Interviewed Candidates - EarlyJobs",
    description: "Discover talented professionals ready to join your team on EarlyJobs.",
    images: ["/images/og-candidates.jpg"],
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-600">Loading candidates...</div>}>
      <BrowseCandidatesClient />
    </Suspense>
  );
}