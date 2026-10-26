import { AboutPage as AboutContent } from "@/components/about/page";
import { JsonLd } from "@/components/json-ld";
import { companyFacts } from "@/data/company-facts";
import { getPublicNetworkStats, networkStatsSentence } from "@/lib/dashboard";
import { pageMetadata } from "@/lib/page-metadata";
import aboutJsonLd from "@/schema/about.jsonld.json";

export const metadata = pageMetadata({
  path: "/about",
  title: "About EarlyJobs | Recruiter-First Hiring Network",
  description:
    "Learn about EarlyJobs, a recruiter-first hiring network connecting employers, recruiters and job seekers through human expertise, AI-assisted recruitment and distributed hiring execution.",
  ogTitle: "About EarlyJobs | Building a Better Hiring Network",
  ogDescription:
    "Discover how EarlyJobs connects employers, recruiters and job seekers through a recruiter-first network, AI-assisted hiring workflows and a broader hiring ecosystem.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs recruiter-first hiring network connecting people and technology",
  twitterTitle: "About EarlyJobs | Recruiter-First Hiring Network",
  twitterDescription:
    "Discover EarlyJobs' mission to connect people, recruiters and employers through human expertise and AI-assisted hiring.",
  twitterCard: "summary",
    
});

export default async function AboutPage() {
  const stats = await getPublicNetworkStats();
  const sentence = stats ? networkStatsSentence(stats) : null;
  const metrics = stats
    ? [
        { value: stats.recruiters, label: companyFacts.recruiters.label },
        { value: stats.companies, label: companyFacts.companies.label },
        { value: stats.interviews, label: companyFacts.interviews.label },
        { value: stats.joinings, label: companyFacts.joinings.label },
        { value: stats.collegePartners, label: companyFacts.collegePartners.label },
        { value: stats.hiringPartners, label: companyFacts.hiringPartners.label },
      ]
    : [];

  const schema = structuredClone(aboutJsonLd);
  for (const node of schema["@graph"]) {
    if (node["@type"] === "Organization" && Array.isArray(node.additionalProperty)) {
      if (!stats) {
        delete node.additionalProperty;
      } else {
        const values: Record<string, string> = {
          "Recruiters in network": stats.recruiters,
          Companies: stats.companies,
          "Interviews facilitated": stats.interviews,
          "Successful joinings": stats.joinings,
          "College partners": stats.collegePartners,
          "Hiring partners": stats.hiringPartners,
        };
        for (const prop of node.additionalProperty) {
          const next = values[prop.name];
          if (next) prop.value = next;
        }
      }
    }
    if (node["@type"] === "FAQPage" && Array.isArray(node.mainEntity)) {
      node.mainEntity = node.mainEntity.flatMap((question) => {
        if (question.name !== "How big is the EarlyJobs network?") return [question];
        if (!sentence) return [];
        return [{ ...question, acceptedAnswer: { ...question.acceptedAnswer, text: sentence } }];
      });
    }
  }

  return (
    <>
      <JsonLd data={schema} />
      <AboutContent metrics={metrics} networkSentence={sentence} />
    </>
  );
}
