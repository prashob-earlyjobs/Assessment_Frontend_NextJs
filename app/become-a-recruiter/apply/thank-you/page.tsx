import { RecruiterThankYou } from "@/components/become-a-recruiter/thank-you";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/become-a-recruiter/apply/thank-you",
  title: "Application Received | EarlyJobs",
  description: "Your EarlyJobs freelance recruiter application has been received.",
  ogTitle: "Application Received | EarlyJobs",
  ogDescription: "Your freelance recruiter application has been received.",
  image: "/og/become-a-recruiter.jpg",
  imageAlt: "EarlyJobs freelance recruiter application",
  twitterTitle: "Application Received | EarlyJobs",
  twitterDescription: "Your freelance recruiter application has been received.",
  index: false,
  follow: false,
});

export default function Page() {
  return <RecruiterThankYou />;
}
