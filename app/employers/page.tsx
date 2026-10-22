import type { Metadata } from "next";
import { CompanyTieUpsPage } from "@/components/clientele/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import { getPublicNetworkStats } from "@/lib/dashboard";
import { getPublicCompanies } from "@/lib/public-companies";
import schema from "@/schema/employers.jsonld.json";

const employerFaqs = [
  {
    q: "Is EarlyJobs a recruitment agency?",
    a: "No. EarlyJobs is The Recruiter-First Hiring Network, connecting employers with independent recruiters supported by AI-powered hiring infrastructure.",
  },
  {
    q: "Can we hire for multiple roles?",
    a: "Yes. The network supports hiring across functions, industries, and geographies.",
  },
  {
    q: "How quickly can we receive candidates?",
    a: "Recruiters begin working once hiring requirements are shared, with qualified shortlists delivered based on role complexity.",
  },
  {
    q: "Do recruiters specialize in industries?",
    a: "Yes. Recruiters participate across domains such as technology, BFSI, healthcare, manufacturing, retail, executive search, and more.",
  },
  {
    q: "Can startups use EarlyJobs?",
    a: "Absolutely. From early-stage startups to global enterprises, the network is designed to support different hiring needs.",
  },
] as const;

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

export default async function EmployersPage() {
  const [stats, companies] = await Promise.all([
    getPublicNetworkStats(),
    getPublicCompanies().catch(() => []),
  ]);
  const metrics = stats
    ? [
        { value: stats.companies, label: "Companies" },
        { value: stats.recruiters, label: "Recruiters" },
        { value: stats.joinings, label: "Joinings" },
        { value: stats.interviews, label: "Interviews" },
      ]
    : [];

  return (
    <>
      <JsonLd data={schema} />
      <CompanyTieUpsPage
        companies={companies}
        metrics={metrics}
        faqs={employerFaqs}
        hero={{
          eyebrow: "For employers",
          titleLead: "Hire Better. Hire Faster.",
          titleMuted: "Hire Through Recruiters.",
          intro:
            "EarlyJobs connects employers with experienced recruiters and AI-assisted recruitment workflows to support role-based hiring across India. Hiring should begin with the right recruiters, whether you need one role or an entire team.",
          primaryHref: "/sign-in",
          primaryLabel: "Start Hiring",
          secondaryHref: "#solutions",
          secondaryLabel: "Explore Our Hiring Solutions",
          chips: "Recruiter-led sourcing · AI-assisted matching · Hiring across India",
        }}
      />
    </>
  );
}
