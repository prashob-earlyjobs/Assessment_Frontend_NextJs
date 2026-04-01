import type { Metadata } from "next";
import { Suspense } from "react";
import InterviewDetailsClient from "../../components/pages/InterviewDetailsClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

export const metadata: Metadata = {
  title: "Interview Details | Interview Buddy | EarlyJobs",
  description:
    "Review your AI interview setup, see skills and duration, and start your Interview Buddy practice session on EarlyJobs.",
  openGraph: {
    title: "Interview Details | Interview Buddy | EarlyJobs",
    description:
      "Open a practice interview, review the role and skills, and start your session with Interview Buddy on EarlyJobs.",
    url: `${baseUrl}/interview-buddy/details`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/images/og_interview_buddy.png`,
        width: 1200,
        height: 630,
        alt: "Interview Buddy on EarlyJobs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Details | Interview Buddy | EarlyJobs",
    description:
      "Review your practice interview and start your Interview Buddy session on EarlyJobs.",
    images: [`${baseUrl}/images/og_interview_buddy.png`],
  },
  alternates: {
    canonical: `${baseUrl}/interview-buddy/details`,
  },
};

export default function InterviewDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth flex flex-col">
          <main className="flex-1 pt-32 pb-20">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-sm text-slate-500">
              Loading interview details...
            </div>
          </main>
        </div>
      }
    >
      <InterviewDetailsClient />
    </Suspense>
  );
}

