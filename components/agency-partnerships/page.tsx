"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

const network = [
  {
    title: "Recruitment consultancies",
    body: "Bring your industry expertise, client relationships and hiring experience.",
  },
  {
    title: "Freelance recruiters",
    body: "Extend candidate discovery through a network of independent recruiting professionals.",
  },
  {
    title: "District franchise partners",
    body: "Explore local hiring reach through partners who understand their markets.",
  },
  {
    title: "EarlyJobs",
    body: "Connect the network and support recruitment delivery with technology.",
  },
] as const;

const stages = [
  { id: "connect", label: "Connect" },
  { id: "collaborate", label: "Collaborate" },
  { id: "deliver", label: "Deliver" },
] as const;

const steps = [
  {
    id: "connect",
    n: "01",
    title: "Connect",
    body: "Tell us about your business, specialisations and ambitions.",
    image: "/agency-partnerships/process-photo.jpg",
    alt: "Connect with EarlyJobs",
  },
  {
    id: "collaborate",
    n: "02",
    title: "Collaborate",
    body: "Explore suitable mandates and partners that complement your capabilities.",
    image: "/agency-partnerships/partnership-handshake.jpg",
    alt: "Collaborate on hiring mandates",
  },
  {
    id: "deliver",
    n: "03",
    title: "Deliver",
    body: "Work together to source talent and move hiring forward, with clear responsibilities and agreed commercial terms.",
    image: "/agency-partnerships/story-team.jpg",
    alt: "Deliver hiring outcomes together",
  },
] as const;

const exploreOptions = [
  "Hiring mandates",
  "Freelance recruiter network",
  "Multi-city hiring",
  "Other",
] as const;

/** Design-shell leftovers from the shared layout — no matching partnership copy. */
const unmatchedVoices = [
  { brand: "Placeholder", quote: "No matching partnership copy for this design block.", person: "Design leftover" },
  { brand: "Placeholder", quote: "Video-style carousel has no consultancy partnership content.", person: "Design leftover" },
  { brand: "Placeholder", quote: "Keep structure; replace only when verified partner voices exist.", person: "Design leftover" },
] as const;

const unmatchedGrowth = [
  {
    id: "a",
    label: "Tab A",
    title: "No matching partnership solution tabs.",
    blurb: "This 3-tab growth UI has no consultancy partnership content.",
    brand: "Unused",
    brandBody: "Design leftover · shared photo + fake stats pattern.",
    stat: "—",
    statLabel: "Unmatched",
  },
  {
    id: "b",
    label: "Tab B",
    title: "Partnership brief has no 3-tab catalog.",
    blurb: "Network section above carries the partnership content instead.",
    brand: "Unused",
    brandBody: "Design leftover.",
    stat: "—",
    statLabel: "Unmatched",
  },
  {
    id: "c",
    label: "Tab C",
    title: "Do not invent tab copy here.",
    blurb: "Marked red until a redesign maps real partnership offerings.",
    brand: "Unused",
    brandBody: "Design leftover.",
    stat: "—",
    statLabel: "Unmatched",
  },
] as const;

const unmatchedWhy = [
  {
    n: "01",
    title: "No matching “why” accordion copy",
    body: "Partnership brief has no why-EarlyJobs accordion. Network section covers partner roles instead.",
  },
  {
    n: "02",
    title: "Side card / why-bg is design leftover",
    body: "Visual shell only — no Huntlo or hiring-why content in the consultancy partnership brief.",
  },
] as const;

const unmatchedInsights = [
  {
    title: "No matching insights cards in partnership brief.",
    date: "Unmatched",
    featured: true,
  },
  {
    title: "Design leftover · insight image slot",
    date: "Unmatched",
    image: "/clientele/story-decagon.jpg",
    featured: false,
  },
  {
    title: "Design leftover · insight image slot",
    date: "Unmatched",
    image: "/clientele/story-basis.jpg",
    featured: false,
  },
] as const;

const unmatchedFaqs = [
  {
    q: "No matching FAQ in partnership brief",
    a: "This FAQ accordion is a design leftover from the shared shell. Partnership content does not include Q&As.",
  },
] as const;

export function AgencyPartnershipsPage() {
  const [sent, setSent] = useState(false);
  const [activeStage, setActiveStage] = useState<(typeof stages)[number]["id"]>("connect");
  const [carousel, setCarousel] = useState(1);
  const [growthIndex, setGrowthIndex] = useState(0);
  const [whyIndex, setWhyIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);
  const [form, setForm] = useState({
    name: "",
    consultancy: "",
    email: "",
    phone: "",
    specialisation: "",
    regions: "",
    explore: "",
  });
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});
  const growth = unmatchedGrowth[growthIndex] ?? unmatchedGrowth[0];

  const update = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Consultancy / Agency Name: ${form.consultancy}`,
      `Work Email: ${form.email}`,
      `Phone Number: ${form.phone}`,
      `Primary Recruitment Specialisation: ${form.specialisation}`,
      `City / Regions Served: ${form.regions}`,
      `What would you like to explore?: ${form.explore}`,
    ];
    window.location.href = `mailto:info@earlyjobs.in?subject=${encodeURIComponent("Recruitment consultancy partnership")}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  const carouselPrev = () =>
    setCarousel((i) => (i - 1 + unmatchedVoices.length) % unmatchedVoices.length);
  const carouselNext = () => setCarousel((i) => (i + 1) % unmatchedVoices.length);
  const growthPrev = () =>
    setGrowthIndex((i) => (i - 1 + unmatchedGrowth.length) % unmatchedGrowth.length);
  const growthNext = () => setGrowthIndex((i) => (i + 1) % unmatchedGrowth.length);

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
      {/* 1. HERO — matches */}
      <section className="mx-auto grid w-full max-w-[1120px] items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
            For recruitment consultancies
          </p>
          <h1 className="mt-4 text-[2.4rem] leading-[1.05] font-medium tracking-[-0.045em] sm:text-[3.2rem]">
            You&apos;ve built the relationships.{" "}
            <span className="text-neutral-400">Let&apos;s build what&apos;s next.</span>
          </h1>
          <p className="mt-6 max-w-lg text-[15px] leading-7 text-neutral-600 sm:text-base">
            Great recruitment businesses are built on trust, expertise and the ability to find the
            right people. EarlyJobs helps recruitment consultancies extend their reach through a
            connected network of hiring opportunities, freelance recruiters and district
            partners—so you can explore more ways to grow without building everything alone.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#partnership-form"
              className="inline-flex h-10 items-center justify-center rounded-full bg-neutral-950 px-5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Become a Hiring Partner
            </Link>
            <Link
              href="#how-we-work"
              className="inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
            >
              How It Works
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[8/7] w-full max-w-[520px] overflow-hidden rounded-[18px] lg:mx-0 lg:max-w-none">
          <Image
            src="/agency-partnerships/hero-lounge.jpg"
            alt="Recruitment consultancy partnership"
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* 2. THE STORY — matches (two-column design shell) */}
      <section className="mx-auto w-full max-w-[1120px] px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          <div className="flex min-h-[340px] flex-col justify-between rounded-[22px] bg-[#f2f2f2] p-8 sm:min-h-[400px] sm:p-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                The story
              </p>
              <h2 className="mt-4 max-w-md text-[1.55rem] leading-[1.2] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.85rem]">
                Your next opportunity shouldn&apos;t stop at your network.
              </h2>
            </div>
            <div className="mt-8 max-w-md space-y-4 text-[15px] leading-7 text-neutral-600">
              <p>A new client. A bigger mandate. A role in a city you don&apos;t cover.</p>
              <p>
                Growth brings opportunity—but it also brings new demands on your time, team and
                resources.
              </p>
            </div>
          </div>

          <div className="relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] bg-[#111] p-8 text-white sm:min-h-[400px] sm:p-10">
            <Image
              src="/agency-partnerships/story-team.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 34rem, 90vw"
              className="object-cover object-center opacity-40"
            />
            <div className="relative">
              <p className="text-sm text-white/55">That&apos;s the idea behind EarlyJobs.</p>
              <h2 className="mt-4 max-w-sm text-[1.5rem] leading-[1.25] font-medium tracking-[-0.03em] sm:text-[1.75rem]">
                What if you could work alongside a wider network of recruitment professionals,
                access complementary sourcing capacity and collaborate on suitable hiring
                requirements?
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-7 text-white/70">
                You bring your expertise. Together, we create more ways to get the right people
                hired.
              </p>
            </div>
            <p className="relative mt-8 text-lg font-semibold tracking-[-0.02em]">EarlyJobs</p>
          </div>
        </div>
      </section>

      {/* 3. THE NETWORK — surplus (added under current flow) */}
      <section className="bg-[#f4f4f4] py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              The network
            </p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
              Different strengths. One shared purpose.
            </h2>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {network.map((item, i) => (
              <li key={item.title} className="rounded-[22px] bg-white p-6 sm:p-7">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[1.05rem] font-medium tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-7 text-neutral-600">
            Every partner brings something different. Better collaboration brings those strengths
            together.
          </p>
        </div>
      </section>

      {/* 4. HOW WE WORK — matches */}
      <section id="how-we-work" className="scroll-mt-24 bg-[#121212] text-white">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <p className="pt-1 text-[13px] text-white/55">How we work together</p>
            <div className="max-w-3xl">
              <h2 className="text-[1.85rem] leading-[1.15] font-medium tracking-[-0.035em] sm:text-[2.45rem]">
                Built around the way recruitment really works.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <nav aria-label="Partnership stages" className="hidden lg:block">
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
                      height={480}
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
              href="#partnership-form"
              className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-white/90"
            >
              Let&apos;s Explore a Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* UNMATCHED — voices carousel */}
      <section className="overflow-hidden bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Unmatched · video-style voices carousel (no partnership copy)
        </p>
        <div className="mx-auto w-full max-w-[1120px] px-5 text-center sm:px-8">
          <p className="inline-flex items-center gap-2 text-[13px] text-white/80">
            <span aria-hidden className="h-2 w-2 rounded-[3px] bg-white" />
            Client voices
          </p>
          <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-white sm:text-[2.75rem]">
            Design leftover — no consultancy partner quotes provided.
          </h2>
        </div>

        <div className="relative mt-12 sm:mt-14">
          <div className="flex items-start justify-center gap-5 overflow-hidden px-5 sm:gap-6 sm:px-8">
            {[-1, 0, 1].map((offset) => {
              const i =
                (carousel + offset + unmatchedVoices.length * 10) % unmatchedVoices.length;
              const card = unmatchedVoices[i]!;
              const active = offset === 0;
              return (
                <article
                  key={`${card.brand}-${offset}-${i}`}
                  className={`w-[min(86vw,34rem)] shrink-0 transition-opacity duration-500 ${
                    active ? "opacity-100" : "pointer-events-none opacity-40 max-sm:hidden"
                  }`}
                  aria-hidden={!active}
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-[18px] ${
                      active ? "bg-[#141414]" : "bg-[#b0b0b0]"
                    }`}
                  >
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-white">
                      <span
                        aria-hidden
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/95 text-[10px] font-semibold text-neutral-950"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-medium tracking-[-0.01em]">{card.brand}</span>
                    </div>
                  </div>
                  <div className="mt-5 text-left">
                    <p className="text-[15px] leading-6 text-white sm:text-base">{card.quote}</p>
                    <p className="mt-2 text-sm text-white/70">{card.person}</p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={carouselPrev}
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M8.5 3.5 5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={carouselNext}
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* UNMATCHED — 3-tab solutions */}
      <section className="scroll-mt-24 bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Unmatched · 3-tab growth UI (no partnership copy — network section used instead)
        </p>
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {unmatchedGrowth.map((stage, i) => (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setGrowthIndex(i)}
                  className={`inline-flex h-9 items-center rounded-full px-4 text-[13px] font-medium transition-colors ${
                    i === growthIndex
                      ? "bg-neutral-950 text-white"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={growthPrev}
                aria-label="Previous"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M8.5 3.5 5 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={growthNext}
                aria-label="Next"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 text-white hover:bg-white/10"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.7fr)]">
            <div className="grid overflow-hidden rounded-[22px] bg-white sm:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div className="flex flex-col justify-between p-7 sm:p-8">
                <div>
                  <p className="text-sm text-neutral-500">{growth.label}</p>
                  <h3 className="mt-3 max-w-xs text-[1.7rem] leading-[1.15] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[2rem]">
                    {growth.title}
                  </h3>
                </div>
                <p className="mt-10 max-w-xs text-sm leading-6 text-neutral-600">{growth.blurb}</p>
              </div>
              <div className="relative min-h-[240px] bg-red-600 sm:min-h-full">
                <Image
                  src="/clientele/growth-photo.jpg"
                  alt=""
                  fill
                  className="object-cover object-center opacity-50"
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

      {/* UNMATCHED — why accordion */}
      <section className="bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Unmatched · why accordion + side card (no partnership copy)
        </p>
        <div className="mx-auto grid w-full max-w-[1120px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-white sm:text-[2.5rem]">
              Design leftover — no why-EarlyJobs accordion in brief.
            </h2>
            <ul className="mt-10 divide-y divide-white/20 border-y border-white/20">
              {unmatchedWhy.map((feature, i) => {
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
                        <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-white sm:text-[1.15rem]">
                          {feature.title}
                        </p>
                        {open ? (
                          <p className="mt-3 max-w-md text-[15px] leading-7 text-white/80">
                            {feature.body}
                          </p>
                        ) : null}
                      </div>
                      <span className="shrink-0 pt-0.5 text-sm text-white/60">{feature.n}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative min-h-[360px] overflow-hidden rounded-[22px] ring-4 ring-red-700 sm:min-h-[420px]">
            <Image
              src="/clientele/why-bg.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-50"
              sizes="(min-width: 1024px) 34rem, 90vw"
            />
            <div className="absolute inset-0 flex items-center justify-center p-5 sm:p-8">
              <div className="w-full max-w-md rounded-[18px] bg-white p-5 sm:p-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] text-red-600 uppercase">
                  Unmatched side card
                </p>
                <h3 className="mt-3 text-[1.35rem] leading-snug font-medium tracking-[-0.03em] text-neutral-950">
                  No matching partnership side-card content.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNMATCHED — insights */}
      <section className="bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-[1120px] px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Unmatched · insights cards (no partnership copy)
        </p>
        <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
          <h2 className="text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-white sm:text-[2.5rem]">
            Design leftover — no insights section in brief.
          </h2>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <article className="flex min-h-[280px] flex-col justify-between rounded-[22px] bg-white/15 p-7 sm:p-8">
              <h3 className="max-w-md text-[1.55rem] leading-[1.2] font-medium tracking-[-0.03em] text-white">
                {unmatchedInsights[0]!.title}
              </h3>
              <p className="mt-10 text-sm text-white/70">{unmatchedInsights[0]!.date}</p>
            </article>
            <div className="grid gap-4">
              {unmatchedInsights
                .filter(
                  (story): story is (typeof unmatchedInsights)[number] & { image: string } =>
                    "image" in story && typeof story.image === "string",
                )
                .map((story) => (
                  <article
                    key={story.title}
                    className="grid gap-4 rounded-[22px] bg-white p-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] sm:p-6"
                  >
                    <div>
                      <h3 className="text-[1.05rem] leading-snug font-medium tracking-[-0.02em] text-neutral-950">
                        {story.title}
                      </h3>
                      <p className="mt-6 text-sm text-neutral-500">{story.date}</p>
                    </div>
                    <div className="relative min-h-[120px] overflow-hidden rounded-[16px] bg-red-200">
                      <Image
                        src={story.image}
                        alt=""
                        fill
                        className="object-cover object-center opacity-60"
                        sizes="(min-width: 1024px) 16rem, 90vw"
                      />
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNMATCHED — FAQ */}
      <section className="bg-red-500 py-16 sm:py-24">
        <p className="mx-auto mb-6 w-full max-w-3xl px-5 text-[12px] font-bold tracking-wide text-white uppercase sm:px-8">
          Unmatched · FAQ accordion (no partnership copy)
        </p>
        <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
          <h2 className="text-center text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-white sm:text-[2.5rem]">
            Frequently asked questions
          </h2>
          <ul className="mt-10 divide-y divide-white/20 border-y border-white/20">
            {unmatchedFaqs.map((faq, i) => {
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
                      <p className="text-[1.05rem] font-medium tracking-[-0.02em] text-white">
                        {faq.q}
                      </p>
                      {open ? (
                        <p className="mt-3 text-[15px] leading-7 text-white/80">{faq.a}</p>
                      ) : null}
                    </div>
                    <span aria-hidden className="mt-1 text-xl leading-none text-white/60">
                      {open ? "–" : "+"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 5 + 6. FINAL CTA + PARTNERSHIP FORM — matches */}
      <section id="partnership-form" className="scroll-mt-24 bg-white px-5 py-16 sm:px-8 sm:py-24">
        <div className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[28px]">
          <div className="relative flex min-h-[280px] items-center justify-center px-5 py-14 sm:min-h-[320px] sm:px-10 sm:py-16">
            <Image
              src="/agency-partnerships/cta-photo.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1120px) 1120px, 100vw"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/65 to-white/90"
            />
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.6rem]">
                You&apos;ve built a business worth growing. You don&apos;t have to grow it alone.
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-neutral-700 sm:text-base">
                Bring your experience. Expand your connections. Discover what&apos;s possible when
                recruitment businesses work together.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#partnership-fields"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-[13px] font-medium text-white hover:bg-neutral-800"
                >
                  Become an EarlyJobs Hiring Partner
                </a>
                <a
                  href="mailto:info@earlyjobs.in?subject=Recruitment%20consultancy%20partnership"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
                >
                  Talk to Our Team
                </a>
              </div>
            </div>
          </div>

          <div
            id="partnership-fields"
            className="scroll-mt-24 border-t border-black/8 bg-white px-5 py-10 sm:px-10 sm:py-12"
          >
            {sent ? (
              <div className="mx-auto max-w-xl text-center">
                <h3 className="text-[1.5rem] font-medium tracking-[-0.03em] text-neutral-950">
                  Thank you for sharing your details.
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-neutral-600">
                  Our team will review your information and get in touch to explore whether
                  there&apos;s a good fit for collaboration.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mx-auto max-w-3xl">
                <div className="max-w-xl">
                  <h3 className="text-[1.35rem] font-medium tracking-[-0.03em] text-neutral-950 sm:text-[1.5rem]">
                    Let&apos;s get to know your business.
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-neutral-600">
                    Share a few details. We&apos;ll explore whether there&apos;s a good fit for
                    collaboration.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Name</span>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Consultancy / Agency Name
                    </span>
                    <input
                      required
                      value={form.consultancy}
                      onChange={(e) => update("consultancy", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Work Email</span>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left">
                    <span className="text-[12px] font-medium text-neutral-500">Phone Number</span>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      Primary Recruitment Specialisation
                    </span>
                    <input
                      required
                      value={form.specialisation}
                      onChange={(e) => update("specialisation", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      City / Regions Served
                    </span>
                    <input
                      required
                      value={form.regions}
                      onChange={(e) => update("regions", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    />
                  </label>
                  <label className="block text-left sm:col-span-2">
                    <span className="text-[12px] font-medium text-neutral-500">
                      What would you like to explore?
                    </span>
                    <select
                      required
                      value={form.explore}
                      onChange={(e) => update("explore", e.target.value)}
                      className="mt-1.5 h-11 w-full rounded-xl border border-black/10 bg-[#fafafa] px-3.5 text-sm text-neutral-950 outline-none focus:border-black/25"
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {exploreOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-[13px] font-medium text-white hover:bg-neutral-800"
                  >
                    Start the Conversation
                  </button>
                  <p className="max-w-md text-[12px] leading-5 text-neutral-500">
                    Partnerships and hiring opportunities are subject to suitability, availability
                    and mutually agreed terms.
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
