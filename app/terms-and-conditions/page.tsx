import type { Metadata } from "next";
import TermsAndConditions from "@/components/legacy/pages/TermsAndConditions";

export const metadata: Metadata = { title: "Terms and Conditions | EarlyJobs" };

export default function Page() {
  return <TermsAndConditions />;
}
