import type { Metadata } from "next";
import GccHiringSolutionsPage from "@/components/legacy/gcc/GccHiringSolutionsPage";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/gcc-hiring-solutions.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/gcc-hiring-solutions",
  title: "GCC Hiring Solutions in India | Human + AI Recruitment | EarlyJobs",
  description:
    "EarlyJobs helps Global Capability Centers hire technology, engineering, product, finance, operations, and leadership talent through recruiter-led and AI-assisted recruitment.",
  ogTitle: "GCC Hiring Solutions in India",
  ogDescription:
    "Recruiter-led and AI-assisted recruitment for technology, engineering, product, finance, operations, and leadership roles.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "GCC Hiring Solutions in India",
  twitterDescription:
    "Recruiter-led and AI-assisted recruitment for technology, engineering, product, finance, operations, and leadership roles.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <GccHiringSolutionsPage />
    </>
  );
}
