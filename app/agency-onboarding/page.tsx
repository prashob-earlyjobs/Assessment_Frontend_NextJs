import AgencyOnboardingClient from "@/components/legacy/pages/AgencyOnboardingClient";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/agency-onboarding",
  title: "Recruitment Agency Onboarding Form | EarlyJobs",
  description:
    "Complete your recruitment agency onboarding with EarlyJobs. Submit your agency details, recruitment specialisations, client references and required business information for review.",
  ogTitle: "Recruitment Agency Onboarding | EarlyJobs",
  ogDescription: "Register your recruitment agency with EarlyJobs. Provide your business details, hiring expertise and client references for onboarding review.",
  image: "/images/logo.png",
  imageAlt: "Recruitment agency onboarding with EarlyJobs",
  twitterTitle: "Recruitment Agency Onboarding | EarlyJobs",
  twitterDescription: "Submit your recruitment agency information and specialisations for EarlyJobs onboarding review.",
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
