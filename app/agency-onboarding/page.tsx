import AgencyOnboardingClient from "@/components/legacy/pages/AgencyOnboardingClient";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/agency-onboarding",
  title: "Agency Onboarding Form | EarlyJobs",
  description:
    "Complete your agency onboarding with EarlyJobs. For invited recruitment agencies and consultancies only.",
  ogTitle: "Agency Onboarding Form | EarlyJobs",
  ogDescription: "For invited recruitment agencies and consultancies only.",
  image: "/og/agency-onboarding.jpg",
  imageAlt: "EarlyJobs agency onboarding",
  twitterTitle: "Agency Onboarding Form | EarlyJobs",
  twitterDescription: "For invited recruitment agencies only.",
  twitterCard: "summary",
  index: false,
  follow: true,
});

export default function Page() {
  return (
    <main className="flex flex-1 justify-center bg-white">
      <AgencyOnboardingClient />
    </main>
  );
}
