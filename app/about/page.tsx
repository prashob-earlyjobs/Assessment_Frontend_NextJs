import type { Metadata } from "next";
import { AboutBelief } from "@/components/about/belief";
import { AboutFooter } from "@/components/about/footer";
import { AboutHero } from "@/components/about/hero";
import { AboutImpact } from "@/components/about/impact";
import { AboutJoin } from "@/components/about/join";
import { AboutJourney } from "@/components/about/journey";
import { AboutLeadership } from "@/components/about/leadership";
import { AboutMission } from "@/components/about/mission";
import { AboutNetwork } from "@/components/about/network";
import { AboutWhy } from "@/components/about/why";

export const metadata: Metadata = {
  title: {
    absolute: "About EarlyJobs | The Recruiter-First Hiring Network",
  },
  description:
    "About EarlyJobs, the recruiter-first hiring network. Recruiters, employers, and professionals hire through people, relationships, and AI-powered hiring infrastructure.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-white">
      <AboutHero />
      <AboutBelief />
      <AboutWhy />
      <AboutNetwork />
      <AboutJourney />
      <AboutImpact />
      <AboutMission />
      <AboutLeadership />
      <AboutJoin />
      <AboutFooter />
    </main>
  );
}
