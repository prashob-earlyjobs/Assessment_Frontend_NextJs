import type { Metadata } from "next";
import { CompanyTieUpsPage } from "@/components/clientele/page";

export const metadata: Metadata = {
  title: { absolute: "Company Tie-Ups | EarlyJobs" },
  description:
    "Companies hire through EarlyJobs, a recruiter-first network connecting employers with independent recruiters.",
};

export default function Page() {
  return <CompanyTieUpsPage />;
}
