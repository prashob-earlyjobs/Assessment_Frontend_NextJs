"use client";

import { Inter_Tight } from "next/font/google";
import { Chapter, StoryBody } from "@/components/story/chapter";
import { CTABlock } from "@/components/story/cta-block";
import { EcosystemSvg } from "@/components/story/ecosystem-svg";
import { StoryHero } from "@/components/story/hero";
import { InterludeQuote } from "@/components/story/interlude-quote";
import { PeopleRows } from "@/components/story/people-row";
import { ProblemStrips } from "@/components/story/problem-strips";
import { ReportCardSvg } from "@/components/story/report-card";
import { StatsBand } from "@/components/story/stats-band";
import { StoryTimeline } from "@/components/story/timeline";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export function StoryPage() {
  return (
    <main className={`${interTight.className} relative bg-white text-[#0A0A0A]`}>
      <StoryHero />

      <Chapter
        id="the-problem"
        number="01"
        eyebrow="Chapter 01"
        title="Hiring was broken on both sides of the table."
      >
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,0.45fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <StoryBody>
              <p>
                For job seekers — especially in India&apos;s Tier 2 and Tier 3 cities — applying
                meant sending a resume into a void. Hundreds of applications. Silence. Interviews
                that tested confidence, not capability.
              </p>
              <p>
                For employers, the void worked the other way: job portals delivered volume, not
                quality — thousands of unscreened applications for every role, and agencies that
                cost too much and reached too little of India.
              </p>
              <p>
                And beneath both problems sat a quiet waste: thousands of experienced women
                recruiters — many sidelined by relocation after marriage or career breaks after
                pregnancy — with world-class hiring judgment and no way to use it.
              </p>
            </StoryBody>
          </div>
          <ProblemStrips />
        </div>
      </Chapter>

      <InterludeQuote
        quote="A job board shows you who applied. It never tells you who was capable."
        attribution="The question that started EarlyJobs"
      />

      <Chapter
        id="the-insight"
        number="02"
        eyebrow="Chapter 02"
        title="Recruiters were the missing connective tissue."
      >
        <StoryBody>
          <p>
            Hiring has always run on trust — and trust lives with people, not databases. An
            independent recruiter in a small city knows which candidate is real, which family will
            support a woman&apos;s career, which &apos;fresher&apos; has actually been building
            skills.
          </p>
          <p>
            The insight: don&apos;t replace recruiters with software. Give recruiters superpowers. A
            network where independent recruiters, women returning to work, and local agencies work
            as one — with AI handling screening, matching and scheduling at a scale no single agency
            could reach.
          </p>
        </StoryBody>
        <EcosystemSvg />
      </Chapter>

      <Chapter
        id="the-beginning"
        number="03"
        eyebrow="Chapter 03"
        title="Built from a decade inside hiring."
      >
        <StoryBody>
          <p>
            EarlyJobs was founded in Bengaluru in 2024 — but its roots go back over seven years, to
            a traditional staffing business that taught us how hiring actually works on the ground:
            the mandates, the margins, the missed candidates.
          </p>
          <p>
            That experience surfaced a contradiction: technology was making applications easier, but
            decisions harder. So we started again — same conviction, new architecture. A
            tech-enabled recruitment ecosystem designed around recruiters first, powered by AI
            second.
          </p>
        </StoryBody>
        <aside className="mt-10 max-w-2xl border-l-2 border-[#F97316] pl-5 text-[15px] leading-6 text-[#525252]">
          EarlyJobs is part of Victa EarlyJobs Technologies Private Limited (CIN
          U78300KA2025PTC198732) — the AI evolution of a staffing legacy, not a startup guessing at
          hiring from the outside.
        </aside>
      </Chapter>

      <StoryTimeline />

      <Chapter
        id="what-we-built"
        number="04"
        eyebrow="Chapter 04"
        title="AI that gives people more reach, not less."
      >
        <StoryBody>
          <p>Three pieces, one network:</p>
          <p>
            <strong className="font-semibold text-[#0A0A0A]">1. AI-powered matching</strong> — every
            profile screened against real skill signals, not keyword luck.
          </p>
          <p>
            <strong className="font-semibold text-[#0A0A0A]">2. The 15-minute AI interview</strong> —
            candidates get a structured interview and a detailed feedback report before any employer
            call. Confidence built before the real thing.
          </p>
          <p>
            <strong className="font-semibold text-[#0A0A0A]">3. District partners</strong> — franchise
            owners who put recruiter coverage in cities the portals never reached.
          </p>
        </StoryBody>
        <ReportCardSvg />
      </Chapter>

      <Chapter
        id="the-people"
        number="05"
        eyebrow="Chapter 05"
        title="The network is the story."
      >
        <PeopleRows />
      </Chapter>

      {/* @verification Founder quote is a placeholder — replace with a verified Saurav Kumar quote before launch */}
      <InterludeQuote
        quote="Talent is evenly distributed. Opportunity is not. We exist to correct that."
        attribution="Saurav Kumar · Founder & CEO"
      />

      <StatsBand />

      <Chapter
        id="the-future"
        number="06"
        eyebrow="Chapter 06"
        title="A hiring network for all of Bharat."
      >
        <StoryBody>
          <p>
            Metro India hires on portals. The rest of India hires on trust — and trust has a
            postcode. Our bet: a recruiter in every district, an AI interview within reach of every
            candidate, and employers who stop buying databases and start joining a network.
          </p>
          <p>
            The future of hiring isn&apos;t a bigger job board. It&apos;s a network built around
            people.
          </p>
        </StoryBody>
      </Chapter>

      <CTABlock />
    </main>
  );
}
