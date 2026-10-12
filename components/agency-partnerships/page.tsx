"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CompanyLogosGrid } from "@/components/company-logos-grid";
import { Reveal } from "@/components/ui/reveal";

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
    image: "/agency-partnerships/step-connect-v2.webp",
    alt: "Partners shaking hands to begin an agency collaboration",
  },
  {
    id: "collaborate",
    n: "02",
    title: "Collaborate",
    body: "Explore suitable mandates and partners that complement your capabilities.",
    image: "/agency-partnerships/step-collaborate.webp",
    alt: "Recruiters collaborating over hiring mandates and screen data",
  },
  {
    id: "deliver",
    n: "03",
    title: "Deliver",
    body: "Work together to source talent and move hiring forward, with clear responsibilities and agreed commercial terms.",
    image: "/agency-partnerships/step-deliver-v2.webp",
    alt: "Team finalizing a successful candidate delivery in a meeting",
  },
] as const;

const faqs = [
  {
    q: "Who is this partnership for?",
    a: "Recruitment consultancies and agencies that want to extend their reach through EarlyJobs' network of hiring opportunities, freelance recruiters and district partners—without rebuilding everything alone.",
  },
  {
    q: "How does the partnership work?",
    a: "We start by understanding your specialisations and ambitions, explore mandates and partners that fit your strengths, then collaborate on delivery with clear responsibilities and agreed commercial terms.",
  },
  {
    q: "What kinds of opportunities can partners access?",
    a: "Depending on fit and capacity, partners can explore hiring mandates, freelance recruiter collaboration, multi-city hiring support and other ways to grow through the EarlyJobs network.",
  },
  {
    q: "How do we get started?",
    a: "Contact our team through the Contact Us page. We'll review your consultancy details and get in touch to explore whether there's a good fit for collaboration.",
  },
] as const;

export function AgencyPartnershipsPage() {
  const [activeStage, setActiveStage] = useState<(typeof stages)[number]["id"]>("connect");
  const [faqIndex, setFaqIndex] = useState(0);
  const stepRefs = useRef<Record<string, HTMLElement | null>>({});

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
      <section className="page-shell page-section grid items-center gap-8 sm:gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14">
        <Reveal className="max-w-xl">
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
              href="/contact-us"
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
        </Reveal>

        <Reveal delay={80} className="media-frame mx-auto aspect-[8/7] w-full max-w-[520px] lg:mx-0 lg:max-w-none">
          <Image
            src="/agency-partnerships/hero-lounge.jpg"
            alt="Recruitment consultancy partnership"
            fill
            priority
            sizes="(min-width: 1024px) 34rem, 90vw"
            className="object-cover object-center"
          />
        </Reveal>
      </section>

      {/* 2. THE STORY — matches (two-column design shell) */}
      <section className="page-shell page-section !pt-0">
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
      <section className="bg-[#f4f4f4]">
        <div className="page-shell page-section">
          <Reveal className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.16em] text-neutral-500 uppercase">
              The network
            </p>
            <h2 className="mt-4 text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
              Different strengths. One shared purpose.
            </h2>
          </Reveal>

          <ul className="reveal-stagger mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {network.map((item, i) => (
              <Reveal as="li" key={item.title} className="rounded-[22px] bg-white p-6 sm:p-7">
                <p className="text-[12px] font-semibold tracking-[0.12em] text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-[1.05rem] font-medium tracking-[-0.02em] text-neutral-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-[14px] leading-6 text-neutral-600">{item.body}</p>
              </Reveal>
            ))}
          </ul>

          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-7 text-neutral-600">
            Every partner brings something different. Better collaboration brings those strengths
            together.
          </p>
        </div>
      </section>

      {/* 4. HOW WE WORK — matches */}
      <section id="how-we-work" className="scroll-mt-24 bg-[#f4f4f4] text-neutral-950">
        <div className="page-shell page-section">
          <div className="grid gap-8 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <p className="pt-1 text-[13px] text-neutral-500">How we work together</p>
            <div className="max-w-3xl">
              <h2 className="text-[1.85rem] leading-[1.15] font-medium tracking-[-0.035em] sm:text-[2.45rem]">
                Built around the way recruitment really works.
              </h2>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[7.5rem_minmax(0,1fr)] lg:gap-10">
            <nav aria-label="Partnership stages" className="hidden lg:block">
              <ul className="sticky top-28 divide-y divide-black/10 border-y border-black/10">
                {stages.map((stage) => {
                  const active = activeStage === stage.id;
                  return (
                    <li key={stage.id}>
                      <a
                        href={`#how-${stage.id}`}
                        className={`flex items-center justify-between py-3.5 text-[15px] transition-colors ${
                          active ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-700"
                        }`}
                      >
                        <span>{stage.label}</span>
                        <span
                          aria-hidden
                          className={`h-1.5 w-1.5 rounded-full ${active ? "bg-neutral-950" : "bg-black/20"}`}
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
                  <div className="media-frame aspect-[4/3] bg-neutral-200">
                    <Image
                      src={step.image}
                      alt={step.alt}
                      fill
                      className="object-cover object-center"
                      sizes="(min-width: 1024px) 34rem, 90vw"
                    />
                  </div>
                  <div className="max-w-md">
                    <p className="text-sm text-neutral-400">{step.n}</p>
                    <h3 className="mt-3 text-[1.7rem] leading-[1.15] font-medium tracking-[-0.03em] sm:text-[2.1rem]">
                      {step.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-neutral-600 sm:text-base">{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-14 lg:pl-[calc(7.5rem+2.5rem)]">
            <Link
              href="/contact-us"
              className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-[13px] font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Let&apos;s Explore a Partnership
            </Link>
          </div>
        </div>
      </section>

      <CompanyLogosGrid
        title="Brands already hiring through the EarlyJobs network."
        body="Partner consultancies can explore mandates across companies already connected to EarlyJobs."
      />

      <section id="faq" className="scroll-mt-24 bg-white py-16 sm:py-24">
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
                    className="flex w-full cursor-pointer items-start justify-between gap-6 py-5 text-left"
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

      {/* 5 + 6. FINAL CTA + PARTNERSHIP FORM — matches */}
      <section id="partnership-form" className="page-shell page-section scroll-mt-24">
        <div className="relative overflow-hidden rounded-[28px]">
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
              className="absolute inset-0 bg-gradient-to-b from-[#fff1ed]/90 via-[#ffe8e1]/80 to-[#fff1ed]/95"
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
                <Link
                  href="/contact-us"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-[13px] font-medium text-white hover:bg-neutral-800"
                >
                  Become an EarlyJobs Hiring Partner
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 bg-white px-6 text-[13px] font-medium text-neutral-950 hover:bg-neutral-50"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
