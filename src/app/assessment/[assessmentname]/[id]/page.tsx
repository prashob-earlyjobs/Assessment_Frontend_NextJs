// File: /app/assessment/[assessmentname]/[id]/page.tsx

import AssessmentDetails from "@/app/components/pages/AssessmentDetails";
import type { Metadata } from "next";

type Props = {
  params: Promise<{
    assessmentname: string;
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assessmentname, id } = await params;

  // Example: You can also fetch actual details using `id` if needed
  // const assessment = await fetchAssessmentById(id);

  return {
    title: `View ${decodeURIComponent(assessmentname)} | EarlyJobs`,
    description: `View the assessment '${decodeURIComponent(
      assessmentname
    )}' details in EarlyJobs.`,
    openGraph: {
      title: `${decodeURIComponent(assessmentname)} | EarlyJobs`,
      description: `Detailed view of '${decodeURIComponent(
        assessmentname
      )}' assessment and results.`,
      url: `https://earlyjobs.ai/assessment/${assessmentname}/${id}`, // Optional but recommended
      siteName: "EarlyJobs",
      images: [
        {
          url: "https://earlyjobs.ai/assets/og-image.png", // Replace with actual image
          width: 1200,
          height: 630,
          alt: "Assessment Page",
        },
      ],
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Page() {
  return <AssessmentDetails />;
}
