import { AboutPage as AboutContent } from "@/components/about/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import aboutJsonLd from "@/schema/about.jsonld.json";

export const metadata = pageMetadata({
  path: "/about",
  title: "About EarlyJobs | Recruiter-First Hiring Network, India",
  description:
    "EarlyJobs is a Bengaluru-based hiring network: 3,449+ recruiters, 266+ companies and 5,500+ joinings delivered through recruiter-led, AI-assisted hiring.",
  ogTitle: "About EarlyJobs | Building the Infrastructure Behind Modern Hiring",
  ogDescription: "A recruiter-first hiring network: 3,449+ recruiters, 266+ companies, 5,500+ joinings.",
  image: "/og/about.jpg",
  imageAlt: "EarlyJobs team and network statistics",
  twitterTitle: "About EarlyJobs",
  twitterDescription: "Recruiter-first hiring network with AI infrastructure and local execution.",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd} />
      <AboutContent />
    </>
  );
}
