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
