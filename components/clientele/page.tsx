"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CompanyLogosGrid } from "@/components/company-logos-grid";

const brandQuotes = [
  {
    quote:
      "Great hiring isn't about receiving more resumes. It's about finding the people who can make a difference.",
    name: "The EarlyJobs approach to hiring",
    role: "Trust built through delivery",
    brand: "EarlyJobs",
    brandImage: "/clientele/terradot-bg.jpg",
  },
] as const;

const stages = [
  { id: "need", label: "Need" },
  { id: "approach", label: "Approach" },
  { id: "talent", label: "Talent" },
  { id: "outcome", label: "Outcome" },
] as const;

const steps = [
  {
    id: "need",
    n: "01",
    title: "Tell us what you need",
    body: "Share your hiring goals, role requirements, locations, timelines and business context.",
    image: "/clientele/step-01.jpg",
    alt: "Share a hiring requirement",
  },
  {
    id: "approach",
    n: "02",
    title: "Build the right hiring approach",
    body: "We identify the relevant service, recruiting capabilities and delivery model for your requirements—whether corporate, global or frontline hiring.",
    image: "/clientele/step-02.jpg",
    alt: "Building a hiring approach",
  },
  {
    id: "talent",
    n: "03",
    title: "Reach the right talent",
    body: "Our recruitment teams and network partners work to source, engage and assess candidates against your requirements, supported by available recruitment technology.",
    image: "/clientele/step-03.jpg",
    alt: "Reaching the right talent",
  },
  {
    id: "outcome",
    n: "04",
    title: "Move towards successful hiring",
    body: "We coordinate the recruitment process with your team, from candidate submissions and interviews through the agreed hiring milestones.",
    image: "/clientele/step-01.jpg",
    alt: "Moving towards successful hiring",
  },
] as const;

const hiringTypes = [
  "Corporate & Professional Hiring",
  "Global Recruitment — US / UAE / Other",
  "GCC Hiring Solutions",
  "Frontline Workforce — GigKaro",
  "Recruitment Process Outsourcing",
  "Consultancy / Recruitment Partnership",
  "Other",
] as const;

const growthStages = [
  {
    id: "corporate",
    label: "Corporate Hiring",
    title: "Find the people who move your business forward.",
    blurb:
      "Recruitment for specialist, professional and leadership roles across functions and industries.",
    brand: "Corporate",
    brandBody:
      "IT, Finance & Accounting, Sales & Marketing, HR & Executive, and Top Executive Recruitment.",
    stat: "5",
    statLabel: "Specialist corporate hiring services",
    href: "/it-recruitment",
    cta: "Explore Corporate Hiring",
  },
  {
    id: "global",
    label: "Global Recruitment",
    title: "Build teams beyond borders.",
    blurb:
      "Recruitment support for businesses looking to access talent in international markets, including the US and UAE, based on active mandates and delivery capabilities.",
    brand: "Global",
    brandBody: "Global Recruitment, International Talent Acquisition, and US & UAE Hiring Support.",
    stat: "2",
    statLabel: "Priority markets: US & UAE",
    href: "/gcc",
    cta: "Explore Global Hiring",
  },
  {
    id: "gigkaro",
    label: "GigKaro",
    title: "The people who keep operations moving.",
    blurb:
      "GigKaro, by EarlyJobs, focuses on frontline and gig workforce hiring for businesses that need to connect with workers across operational roles and locations.",
    brand: "GigKaro",
    brandBody:
      "Delivery Executives, Drivers, Packers & Movers, E-commerce workforce and other frontline roles.",
    stat: "1",
    statLabel: "Frontline hiring network",
    href: "https://gigkaro.in",
    cta: "Hire Frontline Talent",
  },
] as const;

const solutionCatalog = [
  {
    id: "corporate-full",
    title: "Corporate & Professional Hiring",
    headline: "Find the people who move your business forward.",
    body: "Recruitment for specialist, professional and leadership roles across functions and industries.",
    listLabel: "Services",
    items: [
      "IT Recruitment",
      "Finance & Accounting Recruitment",
      "Sales & Marketing Recruitment",
      "HR & Executive Recruitment",
      "Top Executive Recruitment",
    ],
    href: "/it-recruitment",
    cta: "Explore Corporate Hiring",
  },
  {
    id: "global-full",
    title: "Global Recruitment",
    headline: "Build teams beyond borders.",
    body: "Recruitment support for businesses looking to access talent in international markets, including the US and UAE, based on active mandates and delivery capabilities.",
    listLabel: "Services",
    items: [
      "Global Recruitment",
      "International Talent Acquisition",
      "US & UAE Hiring Support",
      "Recruitment Partnerships",
    ],
    href: "/global-recruitment",
    cta: "Explore Global Hiring",
  },
  {
    id: "gcc-full",
    title: "GCC Hiring Solutions",
    headline: "Build your next capability centre in India.",
    body: "Support for organisations building or expanding Global Capability Centres, from talent acquisition planning to specialised hiring requirements.",
    listLabel: "Services",
    items: [
      "GCC Recruitment Partner",
      "Build GCC India",
      "Offshore Capability Centre Hiring",
      "GCC Talent Acquisition",
      "India GCC Hiring Services",
    ],
    href: "/gcc-hiring-solutions",
    cta: "Explore GCC Solutions",
  },
  {
    id: "gigkaro-full",
    title: "GigKaro — Frontline Workforce Hiring",
    headline: "The people who keep operations moving deserve a hiring network that moves with them.",
    body: "GigKaro, by EarlyJobs, focuses on frontline and gig workforce hiring for businesses that need to connect with workers across operational roles and locations.",
    listLabel: "Workforce categories",
    items: [
      "Delivery Executives",
      "Drivers",
      "Packers & Movers",
      "E-commerce & Quick-Commerce Workforce",
      "Other Frontline and Blue-Collar Roles",
    ],
    href: "https://gigkaro.in",
    cta: "Hire Frontline Talent",
    external: true,
  },
  {
    id: "rpo-full",
    title: "Recruitment Process Outsourcing",
    headline: "More recruitment capacity. A process built around your business.",
    body: "Extend your talent acquisition capability through recruitment support aligned with your hiring volumes, workflows and business requirements.",
    listLabel: null,
    items: [] as string[],
    href: "/recruitment-process-outsourcing",
    cta: "Explore RPO",
  },
  {
    id: "network-full",
    title: "Recruitment Network Partnerships",
    headline: "When hiring grows, collaboration can help you go further.",
    body: "Work with EarlyJobs through suitable consultancy partnerships, company tie-ups and recruitment network collaborations. Depending on the mandate, delivery can involve specialist consultancies, independent recruiters and district franchise partners.",
    listLabel: null,
    items: [] as string[],
    href: "/agency-onboarding",
    cta: "Become a Hiring Partner",
  },
] as const;

const whyFeatures = [
  {
    n: "01",
    title: "People who understand hiring",
    body: "Recruitment expertise brings context and judgment to the process—not just a list of profiles.",
  },
  {
    n: "02",
    title: "A network that can extend your reach",
    body: "Recruitment partners, independent recruiters and local franchise teams can support suitable requirements where their capabilities and coverage align.",
  },
  {
    n: "03",
    title: "Technology that supports execution",
    body: "AI-enabled recruiting tools can support sourcing, matching, screening and outreach, helping recruitment professionals work more effectively.",
  },
  {
    n: "04",
    title: "Huntlo — recruiting technology alongside people",
    body: "Huntlo is EarlyJobs' AI recruiting agent, designed to support recruitment teams with talent sourcing and candidate outreach. It complements human expertise by helping teams discover potential candidates and streamline parts of the sourcing process.",
  },
  {
    n: "05",
    title: "Solutions for different workforce needs",
    body: "From professional and leadership roles to global recruitment and frontline hiring, our approach starts with the workforce you need to build.",
  },
  {
    n: "06",
    title: "A focus on outcomes",
    body: "We work towards relevant candidate pipelines, clear communication and agreed hiring milestones rather than treating applications as the finish line.",
  },
] as const;

const customerStories = [
  {
    title: "How to build a more effective recruitment process.",
    date: "Corporate Hiring",
    featured: true,
  },
  {
    title: "What to consider when building teams across markets.",
    date: "Global Hiring",
    image: "/clientele/story-decagon.jpg",
    featured: false,
  },
  {
    title: "How to plan and scale frontline hiring across locations.",
    date: "Frontline Workforce",
    image: "/clientele/story-basis.jpg",
    featured: false,
  },
] as const;

const faqs = [
  {
    q: "What hiring services does EarlyJobs offer?",
    a: "EarlyJobs offers recruitment services across IT, finance, sales and marketing, HR, executive hiring, global recruitment, GCC talent acquisition and Recruitment Process Outsourcing. GigKaro focuses on frontline and gig workforce hiring.",
  },
  {
    q: "Can EarlyJobs support hiring across multiple Indian cities?",
    a: "We can explore multi-location hiring through the relevant recruitment teams and network partners, subject to role requirements, local coverage and delivery capacity.",
  },
  {
    q: "Does EarlyJobs support international recruitment?",
    a: "EarlyJobs is building global recruitment capabilities, including hiring support for the US and UAE. The markets, roles and delivery model available depend on the specific requirement.",
  },
  {
    q: "What is GigKaro?",
    a: "GigKaro is the EarlyJobs brand focused on frontline and gig workforce hiring, including delivery executives, drivers, packers, movers and other operational roles.",
  },
  {
    q: "How does Huntlo fit into the hiring process?",
    a: "Huntlo is an AI recruiting agent that supports talent sourcing and outreach. It complements EarlyJobs' recruitment execution rather than replacing the people and processes needed to deliver hiring outcomes.",
  },
  {
    q: "Can recruitment consultancies and agencies partner with EarlyJobs?",
    a: "Yes. Recruitment consultancies and agencies can express interest in suitable hiring collaborations. The scope, responsibilities and commercial terms are agreed for the relevant partnership or mandate.",
  },
  {
    q: "How do we get started?",
    a: "Tell us about your hiring requirements, locations, roles and expected timelines. Our team can assess the requirement and discuss a suitable service and delivery approach.",
  },
] as const;

export function CompanyTieUpsPage() {
  const [index, setIndex] = useState(0);
  const [growthIndex, setGrowthIndex] = useState(0);
  const [whyIndex, setWhyIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiry, setEnquiry] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    locations: "",
    hiringType: "",
    roles: "",
    hires: "",
    timeline: "",
    context: "",
  });
  const [activeStage, setActiveStage] = useState<(typeof stages)[number]["id"]>("need");
  const item = brandQuotes[index] ?? brandQuotes[0];
  const growth = growthStages[growthIndex] ?? growthStages[0];
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});

  const updateEnquiry = (field: keyof typeof enquiry, value: string) => {
    setEnquiry((prev) => ({ ...prev, [field]: value }));
  };

  const submitEnquiry = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Full name: ${enquiry.fullName}`,
      `Company: ${enquiry.company}`,
      `Work email: ${enquiry.email}`,
      `Phone: ${enquiry.phone}`,
      `Hiring location(s): ${enquiry.locations}`,
      `Type of hiring: ${enquiry.hiringType}`,
      `Roles / skills: ${enquiry.roles}`,
      `Approximate hires: ${enquiry.hires}`,
      `Timeline: ${enquiry.timeline}`,
      `Additional context: ${enquiry.context || "—"}`,
    ];
    window.location.href = `mailto:info@earlyjobs.in?subject=${encodeURIComponent("Hiring enquiry")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setEnquirySent(true);
  };

  const prev = () => setIndex((i) => (i - 1 + brandQuotes.length) % brandQuotes.length);
  const next = () => setIndex((i) => (i + 1) % brandQuotes.length);
  const growthPrev = () => setGrowthIndex((i) => (i - 1 + growthStages.length) % growthStages.length);
  const growthNext = () => setGrowthIndex((i) => (i + 1) % growthStages.length);

  useEffect(() => {
    const nodes = steps
      .map((step) => stepRefs.current[step.id])
      .filter((node): node is HTMLElement => Boolean(node));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target.id) return;
        const id = visible.target.id.replace("how-", "") as (typeof stages)[number]["id"];
        if (stages.some((stage) => stage.id === id)) setActiveStage(id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.2, 0.45, 0.7] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-white text-neutral-950">
      <section className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
            Your hiring partner
          </p>
          <h1 className="mt-4 text-[2.4rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-[3.2rem]">
            The right people.{" "}
            <span className="text-neutral-400">Wherever your business needs them.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-7 text-neutral-600 sm:text-base">
            EarlyJobs brings recruitment expertise, a connected hiring network and intelligent
            technology together to help you hire across India, access global hiring support and
            build frontline workforces through GigKaro. One partner for the people your business
            needs to move forward.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#enquiry"
              className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Tell Us What You Need
            </Link>
          <Link
              href="#solutions"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
          >
              Explore Our Hiring Solutions
          </Link>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            Corporate &amp; professional hiring · Global recruitment · Frontline workforce hiring
          </p>
        </div>

        <div className="relative mx-auto aspect-[8/7] w-full max-w-[520px] overflow-hidden rounded-[18px] bg-red-500 ring-4 ring-red-600 lg:mx-0 lg:max-w-none">
          <span className="absolute top-3 left-3 z-20 rounded bg-red-700 px-2 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            Design leftover · hero asset
          </span>
          <Image
            src="/clientele/hero-recruiter.jpg"
            alt="Hiring partner reviewing candidates"
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="object-cover object-[center_20%] opacity-50"
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1120px] bg-red-500 px-5 py-6 pb-16 sm:px-8 sm:pb-24">
        <p className="mb-4 text-[12px] font-bold tracking-wide text-white uppercase">
          Design leftover · client story carousel + terradot asset
        </p>
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <blockquote className="flex min-h-[340px] flex-col justify-between rounded-[22px] bg-[#f2f2f2] p-8 sm:min-h-[400px] sm:p-10">
            <p className="max-w-lg text-[1.45rem] leading-[1.35] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.75rem]">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-10">
              <p className="text-[15px] font-semibold text-neutral-950">{item.name}</p>
              <p className="mt-1 text-sm text-neutral-500">{item.role}</p>
            </footer>
          </blockquote>

          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#111] p-8 text-white sm:min-h-[400px] sm:p-10">
            <Image
              src={item.brandImage}
              alt=""
              fill
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover object-center opacity-40"
            />
            <div className="relative">
              <p className="text-sm text-white/55">Trust built through delivery</p>
              <h2 className="mt-4 max-w-sm text-[1.6rem] leading-[1.2] font-medium tracking-[-0.03em] sm:text-[1.9rem]">
                Hiring challenges are different. The need for the right people isn&apos;t.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/70">
                From a specialist corporate role to a multi-location workforce requirement, we work
                to understand what the business needs before building the right hiring approach.
              </p>
            </div>
            <div className="relative mt-8 flex items-center justify-between gap-4">
              <p className="text-lg font-semibold tracking-[-0.02em]">{item.brand}</p>
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous story"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M8.5 3.5 5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next story"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-black/25 text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-500 text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
          <p className="mb-6 text-[12px] font-bold tracking-wide text-white uppercase">
            Design leftover · process media (Paraform step crops)
          </p>
          <div className="grid gap-8 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <p className="pt-1 text-[13px] text-white/55">One connected approach</p>
            <div className="max-w-3xl">
              <h2 className="text-[1.85rem] leading-[1.15] font-medium tracking-[-0.035em] sm:text-[2.45rem]">
                Tell us what you need. We&apos;ll help you build the way to get there.
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-7 text-white/55 sm:text-base">
                You shouldn&apos;t have to coordinate multiple disconnected vendors just to find the
                people your business needs. We start by understanding your roles, locations,
                timelines and expectations—then bring together the right recruitment expertise,
                sourcing capacity and technology.
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <nav aria-label="Hiring process stages" className="hidden lg:block">
              <ul className="sticky top-28 divide-y divide-white/15 border-y border-white/15">
                {stages.map((stage) => {
                  const active = activeStage === stage.id;
                  return (
                    <li key={stage.id}>
                      <a
                        href={`#how-${stage.id}`}
                        className={`flex items-center justify-between py-3.5 text-[15px] transition-colors ${
                          active ? "text-white" : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        <span>{stage.label}</span>
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${active ? "bg-white" : "bg-white/25"}`}
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="space-y-16 sm:space-y-24">
              {steps.map((step) => (
                <article
                  key={step.id}
                  id={`how-${step.id}`}
                  ref={(node) => {
                    stepRefs.current[step.id] = node;
                  }}
                  className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12"
                >
                  <div className="relative overflow-hidden rounded-[22px] bg-[#1a1a1a]">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      width={620}
                      height={step.id === "talent" ? 580 : 480}
                      className="h-auto w-full object-cover"
                      sizes="(min-width: 1024px) 34rem, 90vw"
                    />
                  </div>
                  <div className="max-w-md">
                    <p className="text-sm text-white/40">{step.n}</p>
                    <h3 className="mt-3 text-[1.7rem] leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-white/55 sm:text-base">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 lg:pl-[calc(7.5rem+2.5rem)]">
            <Link
              href="/employers"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-white/90"
            >
              Discuss Your Hiring Requirements
            </Link>
          </div>
        </div>
      </section>

      <CompanyLogosGrid
        title="Brands already hiring through EarlyJobs."
        body="Good partnerships are measured by the work we do together—clear communication, consistent execution and shared accountability."
      />

      <section id="solutions" className="scroll-mt-24 bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Design leftover · 3-tab growth UI + shared photo + fake stats
        </p>
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
            One partner. Different hiring needs.
          </p>
          <h2 className="mt-4 max-w-3xl text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.75rem]">
            From your next key hire to your next phase of expansion.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
            Every business has a different talent challenge. We bring together specialised
            recruitment services and workforce solutions to help you address the one in front of
            you.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {growthStages.map((stage, i) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setGrowthIndex(i)}
                  className={`inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium transition-colors ${
                    i === growthIndex
                      ? "bg-neutral-950 text-white"
                      : "bg-transparent text-neutral-700 hover:bg-black/5"
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-16 overflow-hidden rounded-full bg-black/10">
                <div
                  className="h-full bg-neutral-950 transition-all duration-300"
                  style={{ width: `${((growthIndex + 1) / growthStages.length) * 100}%` }}
                />
              </div>
              <p className="text-sm text-neutral-500">
                {growthIndex + 1} / {growthStages.length}
              </p>
              <button
                type="button"
                onClick={growthPrev}
                aria-label="Previous hiring solution"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-neutral-700 hover:bg-white"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M8.5 3.5 5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={growthNext}
                aria-label="Next hiring solution"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-neutral-700 hover:bg-white"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)]">
            <div className="grid overflow-hidden rounded-[22px] bg-[#ebebeb] sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="text-sm text-neutral-500">{growth.label}</p>
                  <h3 className="mt-3 max-w-xs text-[1.7rem] leading-[1.15] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[2rem]">
                    {growth.title}
                  </h3>
                  <Link
                    href={growth.href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-950"
                  >
                    {growth.cta}
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-950 text-white">
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                </div>
                <p className="mt-10 max-w-xs text-sm leading-6 text-neutral-600">{growth.blurb}</p>
              </div>
              <div className="relative min-h-[240px] sm:min-h-full">
                <Image
                  src="/clientele/growth-photo.jpg"
                  alt=""
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 22rem, 90vw"
                />
              </div>
            </div>

            <aside className="flex min-h-[280px] flex-col justify-between rounded-[22px] bg-[#171717] p-7 text-white sm:p-8">
              <div>
                <p className="text-lg font-semibold tracking-[-0.02em]">{growth.brand}</p>
                <p className="mt-5 text-[15px] leading-6 text-white/70">{growth.brandBody}</p>
              </div>
              <div>
                <p className="text-[3.5rem] leading-none font-medium tracking-[-0.05em]">{growth.stat}</p>
                <p className="mt-2 text-sm text-white/55">{growth.statLabel}</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Design leftover · why side card / why-bg asset
        </p>
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              What makes the difference
            </p>
            <h2 className="mt-4 max-w-md text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
              The right hiring approach is bigger than a database.
            </h2>
            <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
              {whyFeatures.map((feature, i) => {
                const open = whyIndex === i;
                return (
                  <li key={feature.n}>
                    <button
                      type="button"
                      onClick={() => setWhyIndex(i)}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <div className="min-w-0">
                        <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-neutral-950 sm:text-[1.15rem]">
                          {feature.title}
                        </p>
                        {open ? (
                          <p className="mt-3 max-w-md text-[15px] leading-7 text-neutral-600">
                            {feature.body}
                          </p>
                        ) : null}
                      </div>
                      <span className="shrink-0 pt-0.5 text-sm text-neutral-400">{feature.n}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-[460px] overflow-hidden rounded-[22px] sm:min-h-[540px]">
            <Image
              src="/clientele/why-bg.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 34rem, 90vw"
            />
            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <div className="w-full max-w-md rounded-[18px] bg-white p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] sm:p-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                  Huntlo by EarlyJobs
                </p>
                <h3 className="mt-3 text-[1.35rem] leading-snug font-medium tracking-[-0.03em] text-neutral-950">
                  Recruiting technology that works alongside people.
                </h3>
                <p className="mt-4 text-[14px] leading-6 text-neutral-600">
                  Huntlo is EarlyJobs&apos; AI recruiting agent—built to support sourcing and
                  outreach while recruitment professionals stay focused on judgment and delivery.
                </p>
                <ul className="mt-5 space-y-3 border-t border-black/8 pt-5">
                  {[
                    "Talent sourcing support",
                    "Candidate outreach assistance",
                    "Built for recruitment teams",
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-2 text-sm text-neutral-700">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                      {line}
              </li>
            ))}
          </ul>
                <Link
                  href="https://www.huntlo.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-4 text-[13px] font-medium text-white hover:bg-neutral-800"
                >
                  Explore Huntlo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Design leftover · insights cards (decagon / basis assets)
        </p>
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
                Better hiring starts with better questions.
        </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-600">
                Explore practical perspectives on talent acquisition, recruitment strategy,
                workforce planning and the changing world of work.
              </p>
            </div>
            <Link
              href="/blogs"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
            >
              Explore Hiring Insights
            </Link>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="flex min-h-[360px] flex-col justify-between rounded-[22px] bg-[#e9e9e9] p-7 sm:min-h-[420px] sm:p-8">
              <div>
                <p className="text-sm text-neutral-500">Hiring Insights</p>
                <h3 className="mt-4 max-w-md text-[1.55rem] leading-[1.2] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.85rem]">
                  {customerStories[0]!.title}
                </h3>
              </div>
              <div className="mt-10 flex items-end justify-between gap-4">
                <p className="text-sm text-neutral-500">{customerStories[0]!.date}</p>
                <Link
                  href="/blogs"
                  aria-label="Explore corporate hiring insights"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M4 10 10 4M5.5 4H10v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </article>

            <div className="grid gap-4">
              {customerStories
                .filter(
                  (story): story is (typeof customerStories)[number] & { image: string } =>
                    "image" in story && typeof story.image === "string",
                )
                .map((story) => (
                <article
                  key={story.title}
                  className="grid gap-4 rounded-[22px] bg-white p-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:p-6"
                >
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">Hiring Insights</p>
                      <h3 className="mt-3 text-[1.05rem] leading-snug font-medium tracking-[-0.02em] text-neutral-950 sm:text-[1.15rem]">
                        {story.title}
                      </h3>
                      <Link
                        href="/blogs"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-950"
                      >
                        Read more
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-950 text-white">
                          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
                            <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </Link>
                    </div>
                    <p className="mt-6 text-sm text-neutral-500">{story.date}</p>
                  </div>
                  <div className="relative min-h-[140px] overflow-hidden rounded-[16px]">
                    <Image
                      src={story.image}
                      alt=""
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 16rem, 90vw"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
            {faqs.map((faq, i) => {
              const open = faqIndex === i;
              return (
                <li key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setFaqIndex(open ? -1 : i)}
                    className="flex w-full items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={open}
                  >
                    <div className="min-w-0">
                      <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-neutral-950">
                        {faq.q}
                      </p>
                      {open ? (
                        <p className="mt-3 text-[15px] leading-7 text-neutral-600">{faq.a}</p>
                      ) : null}
                    </div>
                    <span aria-hidden className="mt-1 text-xl leading-none text-neutral-400">
                      {open ? "–" : "+"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section id="all-solutions" className="scroll-mt-24 border-t border-black/8 bg-[#f7f7f7] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              One partner. Different hiring needs.
            </p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
              From your next key hire to your next phase of expansion.
            </h2>
            <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600 sm:text-base">
              Every business has a different talent challenge. We bring together specialised
              recruitment services and workforce solutions to help you address the one in front of
              you.
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {solutionCatalog.map((solution) => {
              const external = "external" in solution && solution.external;
              return (
                <article
                  key={solution.id}
                  className="flex flex-col rounded-[22px] bg-white p-7 sm:p-8"
                >
                  <p className="text-[12px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
                    {solution.title}
                  </p>
                  <h3 className="mt-3 text-[1.35rem] leading-snug font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.5rem]">
                    {solution.headline}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-neutral-600">{solution.body}</p>
                  {solution.items.length > 0 ? (
                    <div className="mt-6 border-t border-black/8 pt-5">
                      {solution.listLabel ? (
                        <p className="text-[12px] font-medium text-neutral-500">
                          {solution.listLabel}
                        </p>
                      ) : null}
                      <ul className="mt-3 space-y-2">
                        {solution.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-[14px] leading-6 text-neutral-700"
                          >
                            <span
                              aria-hidden
                              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                            />
                            {item}
              </li>
            ))}
          </ul>
                    </div>
                  ) : null}
                  <div className="mt-auto pt-7">
                    <Link
                      href={solution.href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-5 text-[13px] font-medium text-white hover:bg-neutral-800"
                    >
                      {solution.cta}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="huntlo" className="scroll-mt-24 bg-neutral-950 py-16 text-white sm:py-24">
        <div className="mx-auto grid w-full max-w-[1120px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-white/50 uppercase">
              Introducing Huntlo
            </p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.6rem]">
              Let technology handle more of the search.{" "}
              <span className="text-white/45">Let people focus on the right fit.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
              Huntlo is EarlyJobs&apos; AI recruiting agent, designed to support recruitment teams
              with talent sourcing and candidate outreach.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
              It complements the human expertise behind recruitment by helping teams discover
              potential candidates and streamline parts of the sourcing process.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-white/65 sm:text-base">
              For businesses with recurring or high-volume hiring needs, technology and human-led
              recruitment can work together to build a more connected hiring workflow.
            </p>
            <Link
              href="https://www.huntlo.ai"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-[13px] font-medium text-neutral-950 hover:bg-white/90"
            >
              Explore Huntlo
            </Link>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-7 sm:p-8">
            <p className="text-[12px] font-semibold tracking-[0.14em] text-white/45 uppercase">
              Built to support, not replace
            </p>
            <ul className="mt-6 space-y-5">
              {[
                {
                  title: "Talent sourcing support",
                  body: "Help recruitment teams discover potential candidates faster.",
                },
                {
                  title: "Candidate outreach assistance",
                  body: "Streamline parts of outreach while people stay focused on fit.",
                },
                {
                  title: "Connected hiring workflows",
                  body: "Pair technology with EarlyJobs and GigKaro recruitment delivery.",
                },
              ].map((item) => (
                <li key={item.title} className="border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                  <p className="text-[1.05rem] font-medium tracking-[-0.02em]">{item.title}</p>
                  <p className="mt-2 text-[14px] leading-6 text-white/55">{item.body}</p>
              </li>
            ))}
          </ul>
            <p className="mt-8 text-[13px] leading-6 text-white/40">
              Huntlo&apos;s product capabilities stay distinct from the recruitment services
              delivered by EarlyJobs and GigKaro.
            </p>
          </div>
        </div>
      </section>

      <section id="enquiry" className="bg-white px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[28px] ring-4 ring-red-600">
          <p className="absolute top-4 left-4 z-20 rounded bg-red-700 px-2 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            Design leftover · cta-bg asset
          </p>
          <div className="relative flex min-h-[280px] items-center justify-center bg-red-500 px-5 py-14 sm:min-h-[320px] sm:px-10 sm:py-16">
            <Image
              src="/clientele/cta-bg.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-40"
              sizes="(min-width: 1120px) 1120px, 100vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/65 to-white/90"
            />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-600 uppercase">
                Let&apos;s build your team
              </p>
              <h2 className="mt-3 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.6rem]">
                Make hiring a competitive advantage.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-neutral-700 sm:text-base">
                Whether you&apos;re hiring a specialist professional, expanding into a new market,
                building a capability centre or scaling a frontline workforce, start with a clear
                conversation about the people your business needs.
              </p>
            </div>
          </div>

          <div className="border-t border-black/8 bg-white px-5 py-10 sm:px-10 sm:py-12">
            {enquirySent ? (
              <div className="mx-auto max-w-xl text-center">
                <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] text-neutral-950">
                  Thank you for sharing your hiring requirement.
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-neutral-600">
                  Our team will review your details and get in touch to discuss the next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="mx-auto max-w-3xl">
                <div className="max-w-xl">
                  <h3 className="text-[1.35rem] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.5rem]">
                    Tell us who you need.
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-neutral-600">
                    Share a few details about your hiring requirement and our team will follow up
                    with the right next step.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Full name</span>
                    <input
                      required
                      value={enquiry.fullName}
                      onChange={(e) => updateEnquiry("fullName", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Company name</span>
                    <input
                      required
                      value={enquiry.company}
                      onChange={(e) => updateEnquiry("company", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Work email</span>
                    <input
                      type="email"
                      required
                      value={enquiry.email}
                      onChange={(e) => updateEnquiry("email", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Phone number</span>
                    <input
                      type="tel"
                      required
                      value={enquiry.phone}
                      onChange={(e) => updateEnquiry("phone", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Hiring location(s)
                    </span>
                    <input
                      required
                      value={enquiry.locations}
                      onChange={(e) => updateEnquiry("locations", e.target.value)}
                      placeholder="City, region or country"
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">Type of hiring</span>
                    <select
                      required
                      value={enquiry.hiringType}
                      onChange={(e) => updateEnquiry("hiringType", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    >
                      <option value="" disabled>
                        Select hiring type
                      </option>
                      {hiringTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Roles or skills required
                    </span>
                    <input
                      required
                      value={enquiry.roles}
                      onChange={(e) => updateEnquiry("roles", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Approximate number of hires
                    </span>
                    <input
                      value={enquiry.hires}
                      onChange={(e) => updateEnquiry("hires", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Expected hiring timeline
                    </span>
                    <input
                      value={enquiry.timeline}
                      onChange={(e) => updateEnquiry("timeline", e.target.value)}
                      placeholder="e.g. Immediate, 30–60 days"
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none placeholder:text-neutral-400 focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Additional context{" "}
                      <span className="font-normal text-neutral-400">(optional)</span>
                    </span>
                    <textarea
                      rows={3}
                      value={enquiry.context}
                      onChange={(e) => updateEnquiry("context", e.target.value)}
                      className="mt-1.5 w-full resize-y rounded-xl border border-black/10 bg-[#fafafa] px-3.5 py-3 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-[13px] font-medium text-white hover:bg-neutral-800"
                  >
                    Discuss My Hiring Needs
                  </button>
                  <p className="text-[12px] text-neutral-500">
                    Or email{" "}
                    <a href="mailto:info@earlyjobs.in" className="underline underline-offset-2">
                      info@earlyjobs.in
                    </a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
