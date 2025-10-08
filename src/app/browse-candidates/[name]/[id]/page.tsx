import { Metadata } from "next";
import CandidateProfileClient from "../../../components/pages/CandidateProfileClient";

// Define the props type for the Page component, matching the dynamic route [name]/[id]
type PageProps = {
  params: {
    id: string;
    name: string;
  };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: { params: { id: string; name: string } }): Promise<Metadata> {
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
      const candidate = data.data.find((c: { _id: string }) => c._id === params.id);
      if (!candidate) {
        throw new Error("Candidate not found");
      }

      const fullName = candidate.name
        ? candidate.name
            .split(" ")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ")
        : "Unknown Candidate";
      const title = `${fullName} - Candidate | EarlyJobs`;
      const description =
        candidate.profile?.bio ||
        `${fullName} is a talented professional with experience in various projects and technologies.`;
      const keywords = `candidate, ${fullName}, hiring, talent, earlyjobs, ${candidate.profile?.skills?.join(", ") || "professional"}`;

      // Use candidate's avatar or generate initials image for OG
      const ogImage = candidate.avatar
        ? candidate.avatar
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=512&background=FF5E1F&color=FFFFFF`;

      return {
        title,
        description,
        keywords,
        openGraph: {
          title,
          description,
          type: "profile",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse-candidates/${params.name}/${params.id}`,
          images: [
            {
              url: ogImage,
              width: 512,
              height: 512,
              alt: `Profile of ${fullName} on EarlyJobs`,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: [ogImage],
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
    title: "Candidate Profile - EarlyJobs",
    description: "Explore the profile of a talented professional on EarlyJobs.",
    keywords: "candidate, hiring, talent, earlyjobs",
    openGraph: {
      title: "Candidate Profile - EarlyJobs",
      description: "Explore the profile of a talented professional on EarlyJobs.",
      type: "profile",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/browse-candidates`,
      images: [
        {
          url: "/assets/default-candidate.png",
          width: 512,
          height: 512,
          alt: "Default Candidate Profile",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Candidate Profile - EarlyJobs",
      description: "Explore the profile of a talented professional on EarlyJobs.",
      images: ["/assets/default-candidate.png"],
    },
  };
}

export default function Page({ params }: PageProps) {
  return <CandidateProfileClient id={params.id} />;
}