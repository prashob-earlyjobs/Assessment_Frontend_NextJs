import type { Metadata } from "next";
import { InvestorsPage } from "@/components/investors/page";

export const metadata: Metadata = {
  title: {
    absolute: "Investors | EarlyJobs",
  },
  description:
    "EarlyJobs is building a recruiter-first hiring network that connects employers, recruiters and talent through AI-powered recruitment infrastructure.",
};

export default function Page() {
  return <InvestorsPage />;
}
