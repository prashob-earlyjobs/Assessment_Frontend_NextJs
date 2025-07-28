// File: app/assessments/[assessmentname]/[id]/page.tsx

import AssessmentDetails from "@/app/components/pages/AssessmentDetails";
import type { Metadata } from "next";

type Props = {
  params: {
    assessmentname: string;
    id: string;
  };
};

// Optional: Fetch actual assessment data here using the `id` from a database or API
// async function getAssessmentDetails(id: string) { ... }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { assessmentname, id } = params;

  const title = decodeURIComponent(assessmentname) + "Assessment | EarlyJobs";
  const description = `View detailed information for the assessment "${decodeURIComponent(assessmentname)}".`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://earlyjobs.ai/assessments/${assessmentname}/${id}`,
      siteName: "EarlyJobs",
      images: [
        {
          url: "https://earlyjobs.ai/images/og-image.png", // Replace with actual OG image
          width: 1200,
          height: 630,
          alt: "Assessment",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://earlyjobs.ai/images/og-image.png"],
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
