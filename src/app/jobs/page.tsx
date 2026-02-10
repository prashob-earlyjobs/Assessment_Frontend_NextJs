import { Metadata } from "next";
import { Suspense } from "react";
import JobsClient from "../components/jobs/JobsClient";

export const metadata: Metadata = {
  title:  "Find Your Dream Job| Freshers Jobs | Internships | Earlyjobs.ai",
  description: "Discover thousands of job opportunities across India. Browse latest job openings from top companies, filter by location, salary, experience & more. Apply now on EarlyJobs!",
  keywords: "jobs, job openings, employment opportunities, career, hiring, recruitment, job search, latest jobs, job vacancies, work from home, full time jobs, part time jobs, internships",
  openGraph: {
    title: "Find Your Dream Job | Latest Job Openings - EarlyJobs",
    description: "Discover thousands of job opportunities across India. Browse latest job openings from top companies, filter by location, salary, experience & more. Apply now on EarlyJobs!",
    type: "website",
    url: "https://www.earlyjobs.ai/jobs",
    siteName: "EarlyJobs",
    images: [
      {
        url: "/og_Jobs.png",
        width: 1200,
        height: 630,
        alt: "EarlyJobs - Find Your Dream Job",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Dream Job | Latest Job Openings - EarlyJobs",
    description: "Discover thousands of job opportunities across India. Browse latest job openings from top companies, filter by location, salary, experience & more. Apply now on EarlyJobs!",
    images: ["/og_Jobs.png"],
    site: "@EarlyJobsAI",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.earlyjobs.ai/jobs",
  },
};

export default function JobsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-earlyjobs-orange"></div>
    </div>}>
      <JobsClient />
    </Suspense>
  );
}