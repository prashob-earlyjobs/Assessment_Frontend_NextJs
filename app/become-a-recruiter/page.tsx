import type { Metadata } from "next";
import { FreelanceRecruitersPage } from "@/components/freelance-recruiters/page";

export const metadata: Metadata = {
  title: {
    absolute: "Become a Freelance Recruiter | EarlyJobs",
  },
  description:
    "Build a career in recruitment on your terms. Join EarlyJobs as a freelance recruiter and work with flexibility across hiring opportunities.",
};

export default function BecomeARecruiterPage() {
  return <FreelanceRecruitersPage />;
}
