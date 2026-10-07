import type { Metadata } from "next";
import PrivacyPolicy from "@/components/legacy/pages/PrivacyPolicy";

export const metadata: Metadata = { title: "Privacy Policy | EarlyJobs" };

export default function Page() {
  return <PrivacyPolicy />;
}
