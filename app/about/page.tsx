import { AboutPage as AboutContent } from "@/components/about/page";
import { JsonLd } from "@/components/json-ld";
import { companyFacts } from "@/data/company-facts";
import { getPublicNetworkStats, networkStatsSentence } from "@/lib/dashboard";
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
