import type { Metadata } from "next";
import { RecruiterApplicationForm } from "@/components/become-a-recruiter/application-form";

export const metadata: Metadata = {
  title: {
    absolute: "Apply — Freelance Recruiter | EarlyJobs",
  },
  description:
    "Complete your EarlyJobs freelance recruiter application and start onboarding.",
};

export default function Page() {
  return (
    <main className="flex flex-1 justify-center px-5 py-12 sm:px-8 sm:py-16">
      <RecruiterApplicationForm />
    </main>
  );
}
