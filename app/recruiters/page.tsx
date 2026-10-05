import type { Metadata } from "next";
import { AiSupport } from "@/components/recruiters/ai-support";
import { DesignedExperience } from "@/components/recruiters/experience";
import { RecruiterFaq } from "@/components/recruiters/faq";
import { RecruiterFinalCta } from "@/components/recruiters/final-cta";
import { RecruiterHero } from "@/components/recruiters/hero";
import { RecruiterHowItWorks } from "@/components/recruiters/how-it-works";
import { RecruiterStories } from "@/components/recruiters/stories";
import { TraditionalRecruiting } from "@/components/recruiters/traditional";
import { WhyChoose } from "@/components/recruiters/why-choose";

export const metadata: Metadata = {
  title: {
    absolute: "Freelance Recruiters & Recruiting Careers | EarlyJobs",
  },
  description:
    "Build a freelance recruiting career with the EarlyJobs recruiter network. Find recruiter opportunities and recruitment jobs, with hiring opportunities, AI recruiting tools, a recruiter community, and talent acquisition support.",
};

export default function RecruitersPage() {
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
        <RecruiterHero />
        <WhyChoose />
        <TraditionalRecruiting />
        <RecruiterHowItWorks />
        <DesignedExperience />
        <AiSupport />
        <RecruiterStories />
        <RecruiterFaq />
        <RecruiterFinalCta />
      </div>
    </main>
  );
}
