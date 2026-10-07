import type { Metadata } from "next";
import SalesMarketingServicePage from "@/components/legacy/pages/ourServices/SalesMarketingServicePage";

export const metadata: Metadata = { title: "Sales and Marketing Services | EarlyJobs" };

export default function Page() {
  return <SalesMarketingServicePage />;
}
