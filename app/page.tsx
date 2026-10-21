import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { JobSeekers } from "@/components/job-seekers";
import { Journey } from "@/components/journey";
import { RecentJobs } from "@/components/recent-jobs";
import { RecruiterExperience } from "@/components/recruiter-experience";
import { ScrollLine } from "@/components/scroll-line";
import { SuccessStories } from "@/components/success-stories";
import { WhyEarlyJobs } from "@/components/why-earlyjobs";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata({
  path: "/",
  title: "EarlyJobs | Recruiter-First Hiring Network in India",
  description:
    "EarlyJobs links verified employers, freelance recruiters and job seekers in one AI-assisted hiring network. Hire faster, earn per placement, get found.",
  ogTitle: "EarlyJobs | The Recruiter-First Hiring Network",
  ogDescription:
    "One network where employers hire faster, recruiters earn per placement and job seekers get discovered.",
  image: "/og/home.jpg",
  imageAlt: "EarlyJobs network diagram connecting employers, recruiters and job seekers",
  twitterTitle: "EarlyJobs | The Recruiter-First Hiring Network",
  twitterDescription: "Employers hire faster, recruiters earn per placement, job seekers get discovered.",
});

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <RecentJobs />
      <JobSeekers />
      <Journey />
      <WhyEarlyJobs />
      <HowItWorks />
      <RecruiterExperience />
      <SuccessStories />
      <Faq />
      <ScrollLine />
    </main>
  );
}
