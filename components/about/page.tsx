"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { companyFacts } from "@/data/company-facts";

const network = [
  {
    title: "EarlyJobs — Recruiter-Led Hiring",
    body: "Recruitment services and a recruiter network that connect employers, recruiters, and job seekers.",
  },
  {
    title: "Huntlo AI — AI Recruiting Tools",
    body: "AI-powered recruiting tools designed to support sourcing, candidate outreach, and recruitment workflows.",
  },
  {
    title: "GigKaro — Frontline and Gig Hiring",
    body: "A specialised hiring platform focused on frontline and gig-worker recruitment.",
  },
  {
    title: "Hiring Across Different Workforce Needs",
    body: "Through our recruitment services and specialised hiring initiatives, we support businesses with different talent requirements.",
  },
] as const;

const aboutFaqs = [
  {
    q: "What is EarlyJobs?",
    a: "EarlyJobs is a recruitment platform built around recruiter-led execution and AI-assisted hiring workflows. We connect employers, recruiters, and job seekers to support the recruitment process from candidate sourcing to hiring.",
  },
  {
    q: "Who runs EarlyJobs?",
    a: "EarlyJobs is operated by Victa EarlyJobs Technologies Private Limited, based in Koramangala, Bengaluru, Karnataka.",
  },
  {
    q: "How are EarlyJobs, Huntlo AI and GigKaro related?",
    a: "Together, these businesses address different parts of the hiring landscape through recruitment execution and technology.",
  },
  {
    q: "Does EarlyJobs hire outside major cities?",
    a: "Yes. The network is designed to reach talent across locations, including Tier 2 and Tier 3 cities, through recruiters who understand their local markets.",
  },
] as const;

/** TODO(content): leadership names, photos, LinkedIn links and milestone years must come from the founders. Render nothing until that copy exists. */
function AboutLeadershipScaffold() {
  return null;
}

const steps = [
  {
    n: "01",
    title: "A Distributed Recruiter Network",
    body: "Reach talent through recruiters who understand their industries, communities and local markets.",
  },
  {
    n: "02",
    title: "Technology That Enables Execution",
    body: "Use AI and recruitment workflows to support sourcing, engagement, screening and coordination.",
  },
  {
    n: "03",
    title: "Outcome-Oriented Hiring",
    body: "Focus on completed hiring outcomes rather than simply generating applications or providing software.",
  },
  {
    n: "04",
    title: "Reach Beyond Major Cities",
    body: "Build access to talent across diverse locations, including Tier 2 and Tier 3 cities.",
  },
  {
    n: "05",
    title: "Human Expertise at the Center",
    body: "Combine technology with recruiter judgment, candidate relationships and local knowledge.",
  },
] as const;

const pill =
  "inline-flex h-11 items-center justify-center rounded-[6px] px-5 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px]";

function SectionTag({ children }: { children: string }) {
  return (
    <span className="inline-flex bg-neutral-200/80 px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
      {children}
    </span>
  );
}

export function AboutPage({
  metrics,
  networkSentence,
}: {
  metrics: { value: string; label: string }[];
  networkSentence: string | null;
}) {
  const faqs = networkSentence
    ? [...aboutFaqs, { q: "How big is the EarlyJobs network?", a: networkSentence }]
    : [...aboutFaqs];
  return (
    <main className="relative bg-[#f7f5f2] text-neutral-950">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[#0A0F10]">
        <Image
          src="/agency-partnerships/hero-lounge.jpg"
          alt="EarlyJobs team in a Bengaluru meeting space"
          fill
          priority
          className="object-cover object-[62%_center]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        />
        <div className="page-shell relative flex min-h-[88vh] flex-col justify-end pb-16 pt-28 sm:pb-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            About EarlyJobs
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.88rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[4.2rem]">
            Building Better Hiring Through People and Technology
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
            EarlyJobs is a recruitment platform built around recruiter-led execution and AI-assisted
            hiring workflows. We connect employers, recruiters, and job seekers to support the
            recruitment process from candidate sourcing to hiring.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#lets-talk" className={`${pill} bg-brand text-white hover:bg-[#d85c42]`}>
              Talk to our team
            </a>
            <Link
              href="/story"
              className={`${pill} border border-white/30 bg-white/5 text-white hover:bg-white/10`}
            >
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="scroll-mt-24 border-t border-black/5">
        <div className="page-shell page-section">
          <Reveal>
            <SectionTag>What We Do</SectionTag>
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
              <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
                What we do
              </h2>
              <p className="max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                Recruitment support for employers, a platform for recruiters, AI-assisted workflows,
                and hiring for different workforce needs.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80} className="mt-10">
            <div className="media-frame aspect-[16/10] w-full !rounded-none sm:aspect-[2/1]">
              <Image
                src="/agency-partnerships/story-team.jpg"
                alt="EarlyJobs colleagues collaborating on a hiring plan"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 72rem, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={120} className="mx-auto mt-10 max-w-2xl space-y-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            <p>
              <span className="font-semibold text-neutral-950">Recruitment Solutions for Employers. </span>
              We help employers address recruitment requirements through candidate sourcing, recruiter
              collaboration, and hiring coordination.
            </p>
            <p>
              <span className="font-semibold text-neutral-950">Recruiter Network. </span>
              We provide a platform for recruiters to explore relevant hiring requirements and
              participate in recruitment activities.
            </p>
            <p>
              <span className="font-semibold text-neutral-950">AI-Assisted Recruitment. </span>
              We use technology to support recruitment workflows, including candidate discovery and
              matching, helping recruiters organise and progress their hiring activities.
            </p>
            <p>
              <span className="font-semibold text-neutral-950">Our approach. </span>
              We believe effective hiring requires more than access to candidate profiles. It requires
              understanding the role, identifying relevant candidates, maintaining communication, and
              coordinating the hiring process. EarlyJobs combines human recruitment expertise with
              technology to support this work.
            </p>
          </Reveal>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="page-shell page-section">
          <Reveal>
            <div className="media-frame mb-14 aspect-[16/10] w-full !rounded-none sm:aspect-[21/9]">
              <Image
                src="/agency-partnerships/partnership-handshake.jpg"
                alt="Handshake between EarlyJobs and a hiring partner"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 72rem, 100vw"
              />
            </div>
          </Reveal>
          <Reveal delay={60} className="text-center">
            <SectionTag>How Our Hiring Ecosystem Works</SectionTag>
            <h2 className="mx-auto mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
              Different Solutions for Different Hiring Needs
            </h2>
          </Reveal>
          <ul className="reveal-stagger mt-14 grid gap-0 border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {network.map((item, index) => (
              <Reveal
                as="li"
                key={item.title}
                className="border-b border-black/10 px-0 py-8 sm:border-b-0 sm:px-5 sm:py-8 lg:border-r lg:border-black/10 lg:last:border-r-0"
              >
                <span className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={100}>
            <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-medium leading-6 text-neutral-700 sm:text-base">
              Together, these businesses address different parts of the hiring landscape through
              recruitment execution and technology.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how-we-work" className="scroll-mt-24 border-t border-black/5">
        <div className="page-shell page-section">
          <Reveal>
            <SectionTag>Why EarlyJobs Is Different</SectionTag>
          </Reveal>
          <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
            <Reveal>
              <div>
                <h2 className="max-w-xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
                  Why EarlyJobs Is Different
                </h2>
                <ol className="mt-10 space-y-8">
                  {steps.map((step) => (
                    <li key={step.n} className="flex gap-4">
                      <span className="flex size-10 shrink-0 items-center justify-center bg-brand text-[12px] font-semibold text-white">
                        {step.n}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold tracking-[-0.02em] text-neutral-950">
                          {step.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-neutral-600">{step.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <a
                  href="#lets-talk"
                  className={`${pill} mt-10 bg-brand text-white hover:bg-[#d85c42]`}
                >
                  Let&apos;s talk
                </a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="media-frame aspect-[4/5] !rounded-none">
                <Image
                src="/about/people.jpg"
                alt="People working together in the EarlyJobs network"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 28rem, 100vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="page-shell page-section">
          <Reveal>
            <SectionTag>Our Impact</SectionTag>
            <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
              <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
                Our Impact
              </h2>
              <p className="max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                We believe the strength of a hiring network should be measured by the opportunities it
                creates and the hiring outcomes it delivers.
              </p>
            </div>
            <p className="mt-8 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              Our network brings together recruiters, employers, candidates, colleges and hiring
              partners to create more connected recruitment opportunities.
            </p>
          </Reveal>
          <ul className="reveal-stagger mt-12 grid grid-cols-2 gap-0 border-t border-black/10 sm:grid-cols-3">
            {metrics.map((item) => (
              <Reveal
                as="li"
                key={item.label}
                className="border-b border-r border-black/10 px-4 py-8 last:border-r-0 sm:px-6 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0"
              >
                <p className="text-[2rem] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[2.4rem]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{item.label}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-[12px] tracking-[0.04em] text-neutral-400 uppercase">
            {companyFacts.updatedLabel}
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section id="mission" className="scroll-mt-24 border-t border-black/5">
        <div className="page-shell page-section">
          <ul className="reveal-stagger grid gap-0 border-t border-black/10 lg:grid-cols-2">
            <Reveal
              as="li"
              className="border-b border-black/10 px-0 py-10 lg:border-r lg:border-b-0 lg:px-8 lg:py-12 lg:pl-0"
            >
              <SectionTag>Our Mission</SectionTag>
              <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.25rem]">
                Our Mission
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                To connect employers, recruiters and talent through technology-enabled hiring
                execution that creates better opportunities and better outcomes.
              </p>
            </Reveal>
            <Reveal
              as="li"
              className="border-b border-black/10 px-0 py-10 lg:border-b-0 lg:px-8 lg:py-12 lg:pr-0"
            >
              <SectionTag>Our Vision</SectionTag>
              <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.25rem]">
                Our Vision
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                To build a trusted, globally relevant hiring network that combines human expertise, AI
                and distributed execution to make hiring more accessible and scalable.
              </p>
            </Reveal>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="grow" className="scroll-mt-24 relative overflow-hidden bg-[#0A0F10]">
        <div className="page-shell relative flex min-h-[28rem] flex-col justify-between py-16 sm:min-h-[32rem] sm:py-20">
          <Reveal>
            <div>
              <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-[2.75rem]">
                Built Around People. Designed to Scale.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
                We believe the future of hiring will not be defined by technology alone. It will be
                shaped by how effectively technology connects people, expands access and helps
                organizations make better hiring decisions.
              </p>
              <p className="mt-4 max-w-xl text-sm font-semibold leading-6 text-white sm:text-base sm:leading-7">
                EarlyJobs is building that connection.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/story" className={`${pill} bg-brand text-white hover:bg-[#d85c42]`}>
                Explore Our Story
              </Link>
              <Link
                href="/employers"
                className={`${pill} border border-white/30 bg-white/5 text-white hover:bg-white/10`}
              >
                Start Hiring
              </Link>
              <Link
                href="/become-a-recruiter"
                className={`${pill} border border-white/30 bg-white/5 text-white hover:bg-white/10`}
              >
                Become a Recruiter
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <AboutLeadershipScaffold />

      <section id="faq" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="page-shell page-section">
          <SectionTag>FAQ</SectionTag>
          <h2 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            FAQ
          </h2>
          <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none text-base font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                </summary>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="lets-talk" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="page-shell page-section">
          <SectionTag>Let&apos;s talk</SectionTag>
          <h2 className="mt-5 max-w-xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Let&apos;s talk
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            Employers, agencies, investors and press: tell us what you&apos;re exploring.
            Applications are reviewed through the applicable onboarding process.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/employers" className={`${pill} bg-brand text-white hover:bg-[#d85c42]`}>
              Start hiring
            </Link>
            <Link
              href="/agency-partnerships"
              className={`${pill} border border-black/10 bg-white text-neutral-950 hover:bg-neutral-50`}
            >
              Partner as an agency
            </Link>
            <Link
              href="/investor-relations"
              className={`${pill} border border-black/10 bg-white text-neutral-950 hover:bg-neutral-50`}
            >
              Investor relations
            </Link>
          </div>
        </div>
      </section>


      <div className="border-t border-black/5 bg-[#f7f5f2] py-8 text-center">
        <Link href="/" className="text-[13px] font-medium text-brand hover:text-[#d85c42]">
          ← Back to EarlyJobs
        </Link>
      </div>
    </main>
  );
}
