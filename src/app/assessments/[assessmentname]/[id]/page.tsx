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
    const description = `Evaluate your skills in '${properTitle}'. Test your knowledge, improve your expertise, and stand out in your career.`;
    
    return {
      title: `${properTitle} Aseessment | EarlyJobs`,
      description,
      openGraph: {
        title: `${properTitle} Aseessment | EarlyJobs`,
        description: `Evaluate your skills in '${properTitle}'. Test your knowledge, improve your expertise, and stand out in your career.`,
        url: `https://earlyjobs.ai/assessments/${assessmentname}/${id}`,
        siteName: "EarlyJobs",
        images: [
          {
            url: "https://earlyjobs.ai/assets/og-image.png",
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
        description: `Evaluate your skills in '${properTitle}'. Test your knowledge, improve your expertise, and stand out in your career.`,
        images: ["https://earlyjobs.ai/assets/og-image.png"],
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
        description: `Evaluate your skills in '${fallbackTitle}'. Test your knowledge, improve your expertise, and stand out in your career .`,
        url: `https://earlyjobs.ai/assessments/${assessmentname}/${id}`,
        siteName: "EarlyJobs",
        images: [
          {
            url: "https://earlyjobs.ai/assets/og-image.png",
            width: 1200,
            height: 627,
            alt: "Assessment",
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${fallbackTitle} | EarlyJobs`,
        description: `Evaluate your skills in '${fallbackTitle}'. Test your knowledge, improve your expertise, and stand out in your career .`,
        images: ["https://earlyjobs.ai/assets/og-image.png"],
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
