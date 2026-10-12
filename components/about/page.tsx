"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { toast } from "sonner";
import { companyFacts } from "@/data/company-facts";

const network = [
  {
    title: "EarlyJobs — Recruiter Network",
    body: "We connect employers with a distributed network of recruiters who execute hiring mandates across industries and geographies. Our network also creates flexible professional opportunities for recruiters, including women returning to work and professionals outside major metros.",
  },
  {
    title: "Huntlo AI — AI Hiring Infrastructure",
    body: "Huntlo helps recruitment teams use AI to streamline candidate sourcing, outreach, screening, scheduling and follow-ups. It reduces repetitive work so recruiters can focus on conversations, judgment and hiring outcomes.",
  },
  {
    title: "GigKaro — Frontline Workforce Hiring",
    body: "GigKaro focuses on frontline workforce hiring across categories such as delivery, warehousing, logistics, technical trades and manufacturing. It extends our hiring execution capabilities to the people who keep India's economy moving.",
  },
  {
    title: "EarlyJobs",
    body: "Connect the network and support recruitment delivery with technology.",
  },
] as const;

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

const impactMetrics = [
  companyFacts.recruiters,
  companyFacts.companies,
  companyFacts.interviews,
  companyFacts.joinings,
  companyFacts.collegePartners,
  companyFacts.hiringPartners,
] as const;

const exploreOptions = [
  "Hiring mandates",
  "Freelance recruiter network",
  "Multi-city hiring",
  "Other",
] as const;

const pill =
  "inline-flex h-11 items-center justify-center rounded-[6px] px-5 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px]";

const fieldClass =
  "h-11 w-full border border-black/10 bg-white px-3 text-sm text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-brand";

type FormState = {
  name: string;
  consultancy: string;
  email: string;
  phone: string;
  specialisation: string;
  regions: string;
  explore: string;
};

const initialForm: FormState = {
  name: "",
  consultancy: "",
  email: "",
  phone: "",
  specialisation: "",
  regions: "",
  explore: "",
};

function SectionTag({ children }: { children: string }) {
  return (
    <span className="inline-flex bg-neutral-200/80 px-2.5 py-1 text-[11px] font-semibold tracking-[0.14em] text-neutral-600 uppercase">
      {children}
    </span>
  );
}

export function AboutPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const set =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      !form.name.trim() ||
      !form.consultancy.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.specialisation.trim() ||
      !form.regions.trim() ||
      !form.explore
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    const subject = encodeURIComponent("Recruitment consultancy partnership inquiry");
    const body = encodeURIComponent(
      [
        `Name: ${form.name.trim()}`,
        `Consultancy / Agency Name: ${form.consultancy.trim()}`,
        `Work Email: ${form.email.trim()}`,
        `Phone Number: ${form.phone.trim()}`,
        `Primary Recruitment Specialisation: ${form.specialisation.trim()}`,
        `City / Regions Served: ${form.regions.trim()}`,
        `What would you like to explore?: ${form.explore}`,
      ].join("\n"),
    );
    window.location.href = `mailto:info@earlyjobs.in?subject=${subject}&body=${body}`;
    toast.success("Opening your email client to start the conversation.");
    setSubmitting(false);
  };

  return (
    <main className="relative bg-[#f7f5f2] text-neutral-950">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden bg-[#0A0F10]">
        <Image
          src="/agency-partnerships/hero-lounge.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[62%_center]"
          sizes="100vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent"
        />
        <div className="relative mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-8 sm:pb-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-white/70 uppercase">
            About EarlyJobs
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[3.5rem]">
            Building the Infrastructure Behind Modern Hiring.
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            EarlyJobs is building a recruiter-first hiring network that combines distributed human
            expertise, AI-powered hiring infrastructure and local execution to help companies hire
            across India and beyond.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7">
            We bring employers, recruiters, technology and talent together in one connected hiring
            ecosystem.
          </p>
          <p className="mt-4 max-w-2xl text-sm font-semibold leading-6 text-white sm:text-base sm:leading-7">
            We don&apos;t just help companies find candidates. We help execute hiring.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/employers" className={`${pill} bg-brand text-white hover:bg-[#d85c42]`}>
              For Employers
            </Link>
            <Link
              href="/become-a-recruiter"
              className={`${pill} border border-white/30 bg-white/5 text-white hover:bg-white/10`}
            >
              Become a Recruiter
            </Link>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="scroll-mt-24 border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionTag>What We Do</SectionTag>
          <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end">
            <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
              Hiring is more than posting a job and waiting for applications.
            </h2>
            <p className="max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
              It requires finding relevant talent, building conversations, screening candidates,
              coordinating interviews and converting hiring demand into successful joinings.
            </p>
          </div>
          <div className="mt-10 relative aspect-[16/10] w-full overflow-hidden sm:aspect-[2/1]">
            <Image
              src="/agency-partnerships/story-team.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          </div>
          <div className="mx-auto mt-10 max-w-2xl space-y-4 text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            <p>
              EarlyJobs brings these activities together through a distributed recruiter network
              supported by technology and structured hiring execution.
            </p>
            <p>
              Our model is designed for companies that need to hire efficiently across multiple
              roles, locations and workforce categories.
            </p>
            <p className="font-semibold text-neutral-950">That&apos;s the idea behind EarlyJobs.</p>
            <p>
              You bring your expertise. Together, we create more ways to get the right people hired.
            </p>
          </div>
        </div>
      </section>

      {/* NETWORK */}
      <section id="network" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="relative mb-14 aspect-[16/10] w-full overflow-hidden sm:aspect-[21/9]">
            <Image
              src="/agency-partnerships/partnership-handshake.jpg"
              alt=""
              fill
              className="object-cover object-center"
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          </div>
          <div className="text-center">
            <SectionTag>How Our Hiring Ecosystem Works</SectionTag>
            <h2 className="mx-auto mt-5 max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
              How Our Hiring Ecosystem Works
            </h2>
          </div>
          <ul className="mt-14 grid gap-0 border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
            {network.map((item, index) => (
              <li
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
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-medium leading-6 text-neutral-700 sm:text-base">
            Together, these capabilities address different parts of the hiring lifecycle while
            supporting one larger vision.
          </p>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how-we-work" className="scroll-mt-24 border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <SectionTag>Why EarlyJobs Is Different</SectionTag>
          <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start lg:gap-14">
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
                href="#partnership-form"
                className={`${pill} mt-10 bg-brand text-white hover:bg-[#d85c42]`}
              >
                Let&apos;s Explore a Partnership
              </a>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/agency-partnerships/partnership-handshake.jpg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 28rem, 100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
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
          <ul className="mt-12 grid grid-cols-2 gap-0 border-t border-black/10 sm:grid-cols-3">
            {impactMetrics.map((item) => (
              <li
                key={item.label}
                className="border-b border-r border-black/10 px-4 py-8 last:border-r-0 sm:px-6 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0"
              >
                <p className="text-[2rem] font-semibold tracking-[-0.04em] text-neutral-950 sm:text-[2.4rem]">
                  {item.value}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{item.label}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] tracking-[0.04em] text-neutral-400 uppercase">
            {companyFacts.updatedLabel}
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section id="mission" className="scroll-mt-24 border-t border-black/5">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <ul className="grid gap-0 border-t border-black/10 lg:grid-cols-2">
            <li className="border-b border-black/10 px-0 py-10 lg:border-r lg:border-b-0 lg:px-8 lg:py-12 lg:pl-0">
              <SectionTag>Our Mission</SectionTag>
              <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.25rem]">
                Our Mission
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                To connect employers, recruiters and talent through technology-enabled hiring
                execution that creates better opportunities and better outcomes.
              </p>
            </li>
            <li className="border-b border-black/10 px-0 py-10 lg:border-b-0 lg:px-8 lg:py-12 lg:pr-0">
              <SectionTag>Our Vision</SectionTag>
              <h2 className="mt-5 text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.25rem]">
                Our Vision
              </h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                To build a trusted, globally relevant hiring network that combines human expertise, AI
                and distributed execution to make hiring more accessible and scalable.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="grow" className="scroll-mt-24 relative overflow-hidden bg-[#0A0F10]">
        <div className="relative min-h-[28rem] sm:min-h-[32rem]">
          <div className="relative mx-auto flex min-h-[28rem] w-full max-w-6xl flex-col justify-between px-5 py-16 sm:min-h-[32rem] sm:px-8 sm:py-20">
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
          </div>
        </div>
      </section>

      {/* PARTNERSHIP FORM */}
      <section id="partnership-form" className="scroll-mt-24 border-t border-black/5 bg-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <SectionTag>Partnership</SectionTag>
              <h2 className="mt-5 max-w-md text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
                Let&apos;s get to know your business.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
                Share a few details. We&apos;ll explore whether there&apos;s a good fit for
                collaboration.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 border border-black/10 bg-[#f7f5f2] p-5 sm:p-8">
              <div>
                <label htmlFor="name" className="text-[12px] font-medium text-neutral-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={set("name")}
                  className={`mt-1.5 ${fieldClass}`}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label htmlFor="consultancy" className="text-[12px] font-medium text-neutral-700">
                  Consultancy / Agency Name
                </label>
                <input
                  id="consultancy"
                  name="consultancy"
                  value={form.consultancy}
                  onChange={set("consultancy")}
                  className={`mt-1.5 ${fieldClass}`}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="text-[12px] font-medium text-neutral-700">
                    Work Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className={`mt-1.5 ${fieldClass}`}
                    autoComplete="email"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="text-[12px] font-medium text-neutral-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={set("phone")}
                    className={`mt-1.5 ${fieldClass}`}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="specialisation" className="text-[12px] font-medium text-neutral-700">
                  Primary Recruitment Specialisation
                </label>
                <input
                  id="specialisation"
                  name="specialisation"
                  value={form.specialisation}
                  onChange={set("specialisation")}
                  className={`mt-1.5 ${fieldClass}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="regions" className="text-[12px] font-medium text-neutral-700">
                  City / Regions Served
                </label>
                <input
                  id="regions"
                  name="regions"
                  value={form.regions}
                  onChange={set("regions")}
                  className={`mt-1.5 ${fieldClass}`}
                  required
                />
              </div>
              <div>
                <label htmlFor="explore" className="text-[12px] font-medium text-neutral-700">
                  What would you like to explore?
                </label>
                <select
                  id="explore"
                  name="explore"
                  value={form.explore}
                  onChange={set("explore")}
                  className={`mt-1.5 ${fieldClass}`}
                  required
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
              </div>
              <button
                type="submit"
                disabled={submitting}
                className={`${pill} mt-2 w-full bg-brand text-white hover:bg-[#d85c42] disabled:opacity-60`}
              >
                {submitting ? "Opening…" : "Start the Conversation"}
              </button>
              <p className="pt-1 text-[12px] leading-5 text-neutral-500">
                Partnerships and hiring opportunities are subject to suitability, availability and
                mutually agreed terms.
              </p>
            </form>
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
