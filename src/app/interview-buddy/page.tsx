import type { Metadata } from "next";
import { Suspense } from "react";
import InterviewBuddyClient from "../components/pages/InterviewBuddyClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

export const metadata: Metadata = {
  title: "Interview Buddy - Practice Smarter Interviews | EarlyJobs",
  description:
    "Meet your Interview Buddy – a guided space to prepare for interviews, practice questions, and get ready with confidence on EarlyJobs.",
  openGraph: {
    title: "Interview Buddy - Practice Smarter Interviews | EarlyJobs",
    description:
      "Prepare for interviews with Interview Buddy on EarlyJobs. Practice, review, and track your progress.",
    url: `${baseUrl}/interview-buddy`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Interview Buddy - Practice Smarter Interviews | EarlyJobs",
    description:
      "Prepare for interviews with Interview Buddy on EarlyJobs. Practice, review, and track your progress.",
  },
};

function InterviewBuddyFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white flex items-center justify-center">
      <div className="animate-pulse text-slate-500 text-sm">Loading...</div>
    </div>
  );
}

export default function InterviewBuddyPage() {
  return (
    <Suspense fallback={<InterviewBuddyFallback />}>
      <InterviewBuddyClient />
    </Suspense>
  );
}

