import { RecruiterApplicationForm } from "@/components/become-a-recruiter/application-form";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/become-a-recruiter/apply",
  title: "Apply to Join as a Freelance Recruiter | EarlyJobs",
  description:
    "Complete your EarlyJobs freelance recruiter application. It takes a few minutes and our team responds after review.",
  ogTitle: "Apply to Join EarlyJobs as a Freelance Recruiter",
  ogDescription: "A few minutes to apply. Our team reviews every application.",
  image: "/og/become-a-recruiter.jpg",
  imageAlt: "EarlyJobs freelance recruiter application",
  twitterTitle: "Apply to Join EarlyJobs",
  twitterDescription: "A few minutes to apply. Our team reviews every application.",
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
