import type { Metadata } from "next";
import { AgencyPartnershipsPage } from "@/components/agency-partnerships/page";

export const metadata: Metadata = {
  title: {
    absolute: "Recruitment Consultancy Partnerships | EarlyJobs",
  },
  description:
    "EarlyJobs helps recruitment consultancies extend their reach through a connected network of hiring opportunities, freelance recruiters and district partners.",
};

export default function Page() {
  return <AgencyPartnershipsPage />;
}
