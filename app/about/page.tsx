import type { Metadata } from "next";
import { AboutPage as AboutContent } from "@/components/about/page";

export const metadata: Metadata = {
  title: {
    absolute: "About EarlyJobs | The Recruiter-First Hiring Network",
  },
  description:
    "EarlyJobs is building a recruiter-first hiring network that combines distributed human expertise, AI-powered hiring infrastructure and local execution.",
};

export default function AboutPage() {
  return <AboutContent />;
}
