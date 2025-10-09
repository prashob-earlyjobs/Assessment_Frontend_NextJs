import AssessmentsPage from "./AssessmentPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";
  return {
    title: "EarlyJobs - Skill Assessments & Career Tests",
    description:
      "Take online skill tests, get feedback & map your career path with EarlyJobs’ precise assessments for entry level talent.",
    keywords: [
      "skill assessments",
      "career tests",
      "job assessments",
      "EarlyJobs",
      "job skills",
      "employment opportunities"
    ],
    openGraph: {
      title: "EarlyJobs - Skill Assessments & Career Tests",
      description:
        "Take online skill tests, get feedback & map your career path with EarlyJobs’ precise assessments for entry level talent.",
      url: baseUrl,
      siteName: "EarlyJobs",
      images: [
        {
          url: `/assets/og-image.png`,
          width: 1200,
          height: 630,
          alt: "EarlyJobs - Skill Assessments & Career Tests",
        },
      ],    
    },
    twitter: {
      card: "summary_large_image",
      title: "EarlyJobs - Skill Assessments & Career Tests",
      description:
        "Take online skill tests, get feedback & map your career path with EarlyJobs’ precise assessments for entry level talent.",
      images: [`/assets/og-image.png`],
    },
  };
}

const SkillAssessmentsPage = () => {
  return <AssessmentsPage />;
};

export default SkillAssessmentsPage;
