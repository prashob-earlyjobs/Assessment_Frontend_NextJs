// File: app/assessments/[assessmentname]/[id]/page.tsx

import AssessmentDetails from "@/app/components/pages/AssessmentDetails";
import type { Metadata } from "next";
import { getAssessmentById } from "@/app/components/services/servicesapis";

type Props = {
  params: Promise<{
    assessmentname: string;
    id: string;
  }>;
};

// Optional: Fetch actual assessment data here using the `id` from a database or API
// async function getAssessmentDetails(id: string) { ... }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assessmentname, id } = await params;

  try {
    // Fetch actual assessment details using the API
    const response = await getAssessmentById(id);
    
    // Handle different possible response structures
    let assessment = null;
    if (response?.data?.data?.assessment) {
      assessment = response.data.data.assessment;
    } else if (response?.data?.assessment) {
      assessment = response.data.assessment;
    } else if (response?.data) {
      assessment = response.data;
    }

    // Use the proper title from the API response
    const properTitle = assessment?.title;
    const description = `View the assessment '${properTitle}' details in EarlyJobs.`;
    
    return {
      title: `${properTitle} Aseessment | EarlyJobs`,
      description,
      openGraph: {
        title: `${properTitle} Aseessment | EarlyJobs`,
        description: `Detailed view of '${properTitle}' assessment and results.`,
        url: `https://earlyjobs.ai/assessments/${assessmentname}/${id}`,
        siteName: "EarlyJobs",
        images: [
          {
            url: "https://earlyjobs.ai/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "Assessment",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${properTitle} | EarlyJobs`,
        description: `Detailed view of '${properTitle}' assessment and results.`,
        images: ["https://earlyjobs.ai/images/og-image.png"],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    // Fallback to URL parameter if API call fails
    const fallbackTitle = decodeURIComponent(assessmentname);
    
    return {
      title: `${fallbackTitle} | EarlyJobs`,
      description: `View the assessment '${fallbackTitle}' details in EarlyJobs.`,
      openGraph: {
        title: `${fallbackTitle} | EarlyJobs`,
        description: `Detailed view of '${fallbackTitle}' assessment and results.`,
        url: `https://earlyjobs.ai/assessments/${assessmentname}/${id}`,
        siteName: "EarlyJobs",
        images: [
          {
            url: "https://earlyjobs.ai/images/og-image.png",
            width: 1200,
            height: 630,
            alt: "Assessment",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${fallbackTitle} | EarlyJobs`,
        description: `Detailed view of '${fallbackTitle}' assessment and results.`,
        images: ["https://earlyjobs.ai/images/og-image.png"],
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  }
}

export default function Page() {
  return <AssessmentDetails />;
}
