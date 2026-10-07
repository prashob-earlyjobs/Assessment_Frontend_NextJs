import type { Metadata } from "next";
import FinanceAccountingServicePage from "@/components/legacy/pages/ourServices/FinanceAccountingServicePage";

export const metadata: Metadata = { title: "Finance and Accounting Recruitment | EarlyJobs" };

export default function Page() {
  return <FinanceAccountingServicePage />;
}
