import type { Metadata } from "next";
import TermsAndConditions from "@/components/legacy/pages/TermsAndConditions";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  path: "/terms-and-conditions",
  title: "Terms and Conditions | EarlyJobs",
  description:
    "Terms and conditions for accessing or using the EarlyJobs website and services. Effective July 7, 2025.",
  ogTitle: "Terms and Conditions | EarlyJobs",
  ogDescription: "Terms and conditions for accessing or using the EarlyJobs website and services.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs logo",
  twitterTitle: "Terms and Conditions | EarlyJobs",
  twitterDescription: "Terms and conditions for using the EarlyJobs website and services.",
  twitterCard: "summary",
});

export default function Page() {
  return <TermsAndConditions />;
}
