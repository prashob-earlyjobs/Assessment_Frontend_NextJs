import type { Metadata } from "next";
import { EmployerFaq } from "@/components/employers/faq";
import { EmployerHero } from "@/components/employers/hero";
import { EmployerHowItWorks } from "@/components/employers/how-it-works";
import { Industries } from "@/components/employers/industries";
import { HiringSolutions } from "@/components/employers/solutions";
import { EmployerStories } from "@/components/employers/stories";
import { WhyCompaniesChoose } from "@/components/employers/why-choose";
import { WhyHiringChanged } from "@/components/employers/why-hiring";

export const metadata: Metadata = {
  title: {
    absolute: "Hire Exceptional Talent Faster | EarlyJobs",
  },
  description:
    "Hire through The Recruiter-First Hiring Network. EarlyJobs connects employers with experienced recruiters and AI-powered talent matching for faster hiring and stronger candidates.",
};

export default function EmployersPage() {
  return (
    <main className="relative bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 12% 0%, rgba(96,140,190,0.12), transparent 32%), radial-gradient(ellipse at 92% 12%, rgba(96,140,190,0.08), transparent 26%)",
        }}
      />
      <div className="relative">
        <EmployerHero />
        <WhyHiringChanged />
        <EmployerHowItWorks />
        <WhyCompaniesChoose />
        <HiringSolutions />
        <Industries />
        <EmployerStories />
        <EmployerFaq />
      </div>
    </main>
  );
}
