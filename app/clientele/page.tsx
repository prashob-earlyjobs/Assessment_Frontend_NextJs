import type { Metadata } from "next";
import { CompanyTieUpsPage } from "@/components/clientele/page";

export const metadata: Metadata = {
  title: { absolute: "Company Tie-Ups | EarlyJobs" },
  description:
    "EarlyJobs helps companies hire across India and beyond—corporate recruitment, global hiring support, and frontline workforce hiring through GigKaro.",
};

export default function Page() {
  return <CompanyTieUpsPage />;
}
