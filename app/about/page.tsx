import { AboutPage as AboutContent } from "@/components/about/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import aboutJsonLd from "@/schema/about.jsonld.json";

export const metadata = pageMetadata({
  path: "/about",
  title: "About EarlyJobs | Recruiter-First Hiring Network, India",
  description:
    "EarlyJobs is a recruitment platform built around recruiter-led execution and AI-assisted hiring workflows.",
  ogTitle: "About EarlyJobs | Building Better Hiring Through People and Technology",
  ogDescription:
    "A recruitment platform that connects employers, recruiters, and job seekers from sourcing to hiring.",
  image: "/og/about.jpg",
  imageAlt: "EarlyJobs team and network statistics",
  twitterTitle: "About EarlyJobs",
  twitterDescription:
    "Recruiter-led hiring and AI-assisted workflows for employers, recruiters, and job seekers.",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}
