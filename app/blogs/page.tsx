import type { Metadata } from "next";
import BlogsPage from "@/components/legacy/blogs/page";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import blogsSchema from "@/schema/blogs.jsonld.json";

export const metadata: Metadata = pageMetadata({
  path: "/blogs",
  title: "Recruitment Insights, Hiring Guides & Career Advice | EarlyJobs",
  description:
    "Explore practical recruitment insights, hiring guides, and career advice from EarlyJobs for employers, recruiters, and job seekers.",
  ogTitle: "Recruitment Insights, Hiring Guides & Career Advice",
  ogDescription:
    "Practical recruitment insights and hiring guides from EarlyJobs for employers, recruiters, and job seekers.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Recruitment Insights, Hiring Guides & Career Advice",
  twitterDescription:
    "Practical recruitment insights and hiring guides from EarlyJobs for employers, recruiters, and job seekers.",
  twitterCard: "summary",
});

export default function Page() {
  return (
    <>
      <JsonLd data={blogsSchema} />
      <BlogsPage />
    </>
  );
}
