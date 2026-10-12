import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/page";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | EarlyJobs",
  },
  description:
    "Contact EarlyJobs about hiring, recruitment partnerships, the recruiter network, GigKaro frontline hiring, or general enquiries.",
};

export default function Page() {
  return <ContactPage />;
}
