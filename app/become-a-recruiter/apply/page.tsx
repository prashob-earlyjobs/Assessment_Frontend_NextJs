import { RecruiterApplicationForm } from "@/components/become-a-recruiter/application-form";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/become-a-recruiter/apply",
  title: "Apply to Join as a Freelance Recruiter | EarlyJobs",
  description:
    "Complete the EarlyJobs recruiter application with accurate information about your background and recruitment interests.",
  ogTitle: "Apply to Become a Recruiter | EarlyJobs",
  ogDescription:
    "Your details will be used as described in the EarlyJobs Privacy Policy. Applications are reviewed through the applicable onboarding process.",
  image: "/og/become-a-recruiter.jpg",
  imageAlt: "EarlyJobs freelance recruiter application",
  twitterTitle: "Apply to Join EarlyJobs",
  twitterDescription:
    "Applications are reviewed through the applicable onboarding process.",
  index: false,
  follow: true,
});

export default function Page() {
  return (
    <main className="flex flex-1 justify-center px-5 py-12 sm:px-8 sm:py-16">
      <RecruiterApplicationForm />
    </main>
  );
}
