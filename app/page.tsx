import { EmployerExperience } from "@/components/employer-experience";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { Impact } from "@/components/impact";
import { JobSeekers } from "@/components/job-seekers";
import { Journey } from "@/components/journey";
import { RecruiterCenter } from "@/components/recruiter-center";
import { RecruiterExperience } from "@/components/recruiter-experience";
import { ResourcesHub } from "@/components/resources-hub";
import { ScrollLine } from "@/components/scroll-line";
import { SuccessStories } from "@/components/success-stories";
import { Trust } from "@/components/trust";
import { TrustPillars } from "@/components/trust-pillars";
import { WhyEarlyJobs } from "@/components/why-earlyjobs";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Trust />
      <Journey />
      <WhyEarlyJobs />
      <HowItWorks />
      <RecruiterCenter />
      <JobSeekers />
      <RecruiterExperience />
      <EmployerExperience />
      <SuccessStories />
      <Impact />
      <ResourcesHub />
      <TrustPillars />
      <Faq />
      <FinalCta />
      <ScrollLine />
    </main>
  );
}
