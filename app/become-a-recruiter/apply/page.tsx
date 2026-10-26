import { RecruiterApplicationForm } from "@/components/become-a-recruiter/application-form";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata } from "@/lib/page-metadata";
import schema from "@/schema/become-a-recruiter-apply.jsonld.json";

export const metadata = pageMetadata({
  path: "/become-a-recruiter/apply",
  title: "Freelance Recruiter Application Form | EarlyJobs",
  description:
    "Apply to join the EarlyJobs recruiter network. Submit your professional background, recruitment experience and hiring interests for review and onboarding.",
  ogTitle: "Apply to Become a Freelance Recruiter | EarlyJobs",
  ogDescription:
    "Interested in freelance recruitment? Apply to join EarlyJobs by sharing your background, experience and recruitment interests.",
  image: "/images/logo.png",
  imageAlt: "EarlyJobs freelance recruiter application",
  twitterTitle: "Freelance Recruiter Application | EarlyJobs",
  twitterDescription:
    "Submit your application to join the EarlyJobs recruiter network.",
  index: false,
  follow: true,
});

export default function Page() {
  return (
    <>
      <JsonLd data={schema} />
      <main className="flex flex-1 justify-center px-5 py-12 sm:px-8 sm:py-16">
        <RecruiterApplicationForm />
      </main>
    </>
  );
}
