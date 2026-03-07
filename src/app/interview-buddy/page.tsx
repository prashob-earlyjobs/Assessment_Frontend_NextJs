import type { Metadata } from "next";
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

export default function InterviewBuddyPage() {
  return <InterviewBuddyClient />;
}

