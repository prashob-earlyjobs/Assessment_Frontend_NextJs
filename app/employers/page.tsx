import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/employers.jsonld.json";
import { EmployerFaq } from "@/components/employers/faq";
import { EmployerHero } from "@/components/employers/hero";
import { EmployerHowItWorks } from "@/components/employers/how-it-works";
import { Industries } from "@/components/employers/industries";
import { HiringSolutions } from "@/components/employers/solutions";
import { EmployerStories } from "@/components/employers/stories";
import { WhyCompaniesChoose } from "@/components/employers/why-choose";
import { WhyHiringChanged } from "@/components/employers/why-hiring";

export const metadata: Metadata = pageMetadata({
  path: "/employers",
  title: "Recruitment Solutions for Employers | Hire Through EarlyJobs",
  description:
    "EarlyJobs connects employers with experienced recruiters and AI-assisted recruitment workflows to support role-based hiring across India.",
  ogTitle: "Recruitment Solutions for Employers",
  ogDescription:
    "Employers can work with experienced recruiters and AI-assisted recruitment workflows for role-based hiring across India.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Recruitment Solutions for Employers",
  twitterDescription:
    "Employers can work with experienced recruiters and AI-assisted recruitment workflows for role-based hiring across India.",
  twitterCard: "summary",
});

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
        <JsonLd data={schema} />
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
