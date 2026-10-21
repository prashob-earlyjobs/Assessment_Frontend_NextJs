import Link from "next/link";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { JobSeekers } from "@/components/job-seekers";
import { Journey } from "@/components/journey";
import { JsonLd } from "@/components/json-ld";
import { RecentJobs } from "@/components/recent-jobs";
import { RecruiterExperience } from "@/components/recruiter-experience";
import { ScrollLine } from "@/components/scroll-line";
import { SuccessStories } from "@/components/success-stories";
import { WhyEarlyJobs } from "@/components/why-earlyjobs";
import { announcements } from "@/data/newsroom-announcements";
import { pageMetadata } from "@/lib/page-metadata";
import { getNetworkMetrics } from "@/lib/dashboard";
import homeJsonLd from "@/schema/home.jsonld.json";

export const metadata = pageMetadata({
  path: "/",
  title: "EarlyJobs | Recruiter-First Hiring Network in India",
  description:
    "EarlyJobs connects employers, recruiters, and job seekers through recruiter-led hiring and AI-assisted recruitment workflows.",
  ogTitle: "EarlyJobs | The Recruiter-First Hiring Network",
  ogDescription:
    "Recruiter-led hiring and AI-assisted recruitment workflows for employers, recruiters, and job seekers.",
  image: "/og/home.jpg",
  imageAlt: "EarlyJobs network diagram connecting employers, recruiters and job seekers",
  twitterTitle: "EarlyJobs | The Recruiter-First Hiring Network",
  twitterDescription:
    "Recruiter-led hiring and AI-assisted recruitment workflows for employers, recruiters, and job seekers.",
});

export default async function Home() {
  const stats = (await getNetworkMetrics()) ?? [];
  return (
    <main className="relative">
      <JsonLd data={homeJsonLd} />
      <Hero stats={stats} />
      <section className="border-t border-black/10 bg-white">
        <div className="page-shell page-section">
          <h2 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[2.75rem]">
            What is EarlyJobs?
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-neutral-700 sm:text-base">
            EarlyJobs connects employers, recruiters, and job seekers through recruiter-led hiring
            and AI-assisted recruitment workflows. We bring people, technology, and recruitment
            execution together to help businesses find relevant talent and move hiring requirements
            forward.
          </p>
        </div>
      </section>
      <RecentJobs />
      <JobSeekers />
      <Journey />
      <WhyEarlyJobs />
      <HowItWorks />
      <RecruiterExperience />
      <SuccessStories />
      <section className="border-t border-black/10 bg-white">
        <div className="page-shell page-section">
          <h2 className="text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[2.75rem]">
            Latest from the blog and newsroom
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {announcements.slice(0, 3).map((item) => (
              <li key={item.id}>
                <p className="text-xs font-medium tracking-[0.08em] text-neutral-400 uppercase">
                  {item.date}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.02em] text-neutral-950">
                  <Link href="/newsroom" className="hover:text-brand">
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.excerpt}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Faq />
      <ScrollLine />
    </main>
  );
}
