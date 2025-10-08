import { Metadata } from "next";
import BrowseCandidatesClient from "../components/pages/BrowseCandidatesClient";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL not configured");
    }

    const response = await fetch(`${backendUrl}/browseCandidates/candidates`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch candidates (Status: ${response.status})`);
    }

    const data = await response.json();

    if (data.success && data.data) {
      const title = "Browse Top Candidates - EarlyJobs";
      const description = "Discover talented professionals ready to join your team. Browse candidates with verified skills and experience on EarlyJobs.";
      const keywords = "candidates, talent, hiring, professionals, earlyjobs";

      return {
        title,
        description,
        keywords,
        openGraph: {
          title,
          description,
          type: "website",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse-candidates`,
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
          title,
          description,
          images: ["/images/og-candidates.jpg"],
        },
      };
    } else {
      throw new Error("Invalid response data");
    }
  } catch (error) {
    console.error("Error in generateMetadata:", error);
  }

  // Fallback metadata
  return {
    title: "Browse Candidates - EarlyJobs",
    description: "Find and connect with top talent for your team on EarlyJobs.",
    keywords: "candidates, hiring, talent, earlyjobs",
  };
}

export default function Page() {
  return <BrowseCandidatesClient />;
}