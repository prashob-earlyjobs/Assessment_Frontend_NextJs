import Assessments from "../components/pages/Assessments";
import Footer from "../components/pages/footer";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";
  return {
    title: "Skill Assessments for Job Readiness | EarlyJobs",
    description:
      "Take industry relevant skill assessments to evaluate your job readiness. Get insights into your strengths and improve your chances of getting hired with EarlyJobs.",
    keywords: [
      "skill assessments",
      "job readiness",
      "career tests",
      "job assessments",
      "EarlyJobs",
      "job skills",
      "employment opportunities"
    ],
    openGraph: {
      title: "Skill Assessments for Job Readiness | EarlyJobs",
      description:
        "Take industry relevant skill assessments to evaluate your job readiness. Get insights into your strengths and improve your chances of getting hired with EarlyJobs.",
      url: `${baseUrl}/assessments`,
      siteName: "EarlyJobs",
      images: [
        {
          url: `/assets/skill_assessments.jpg`,
          width: 1200,
          height: 630,
          alt: "Skill Assessments for Job Readiness | EarlyJobs",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Skill Assessments for Job Readiness | EarlyJobs",
      description:
        "Take industry relevant skill assessments to evaluate your job readiness. Get insights into your strengths and improve your chances of getting hired with EarlyJobs.",
      images: [`/assets/skill_assessments.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/assessments`,
    },
  };
}

const AssessmentsPage = () => {
  return (
    <>
      <Assessments />
      <Footer/>
      </>
  );
};
export default AssessmentsPage;