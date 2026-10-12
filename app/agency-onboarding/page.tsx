import type { Metadata } from "next";
import { CompanyTieUpsPage } from "@/components/clientele/page";

export const metadata: Metadata = {
  title: {
    absolute: "Recruitment Consultancy Partnerships | EarlyJobs",
  },
  description:
    "EarlyJobs helps recruitment consultancies extend their reach through a connected network of hiring opportunities, freelance recruiters and district partners.",
};

export default function Page() {
  return <CompanyTieUpsPage />;
}
