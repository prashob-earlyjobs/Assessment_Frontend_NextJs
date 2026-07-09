"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Brain,
  Building2,
  CheckCircle2,
  ChevronDown,
  MapPin,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

const RELATED_PAGES = [
  { href: "/build-gcc-india", label: "Build GCC in India" },
  { href: "/gcc-recruitment-partner", label: "GCC Recruitment Partner" },
  { href: "/offshore-capability-center-hiring", label: "Offshore Capability Center Hiring" },
  { href: "/gcc-talent-acquisition", label: "GCC Talent Acquisition" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

const HERO_FLOW = [
  "Global Company",
  "India GCC",
  "Recruiter Network",
  "AI Layer",
  "Talent Pipeline",
  "Hiring Dashboard",
];

const CHALLENGES = [
  "Engineering talent shortages",
  "Leadership hiring complexity",
  "Offer drop-offs",
  "Multiple recruitment vendors",
  "Slow interview coordination",
  "Lack of hiring visibility",
  "Employer branding challenges",
  "Scaling recruiter capacity",
];

const COMPARISON_ROWS = [
  { traditional: "Recruitment agencies work role by role", enterprise: "GCC hiring requires long-term hiring strategy" },
  { traditional: "Recruiters work independently", enterprise: "Hiring needs coordinated execution" },
  { traditional: "Limited market visibility", enterprise: "Enterprises need talent intelligence" },
  { traditional: "Manual coordination", enterprise: "Hiring requires operational efficiency" },
  { traditional: "Reactive hiring", enterprise: "Continuous talent pipeline" },
];

const EARLYJOBS_CAPABILITIES = [
  "Dedicated recruiter pods",
  "Distributed recruiter network",
  "AI-assisted sourcing",
  "Interview coordination",
  "Employer branding support",
  "Candidate engagement",
  "Offer management",
  "Hiring analytics",
  "Recruitment operations",
];

const HIRE_CATEGORIES = [
  "Engineering",
  "Cloud",
  "DevOps",
  "Cybersecurity",
  "AI",
  "Machine Learning",
  "Product",
  "Design",
  "Finance",
  "Shared Services",
  "Operations",
  "HR",
  "Legal",
  "Customer Success",
  "Leadership",
  "Campus",
  "Volume Hiring",
];

const HOW_IT_WORKS = [
  "Discovery",
  "Hiring Strategy",
  "Recruiter Pod Setup",
  "Talent Mapping",
  "AI-assisted Candidate Discovery",
  "Screening",
  "Interview Coordination",
  "Offer Management",
  "Joining",
];

const DIFFERENTIATORS = [
  "Nationwide Recruiter Network",
  "Human + AI Hiring",
  "Dedicated Hiring Pods",
  "Recruitment Operations",
  "Faster Time-to-Hire",
  "Scalable Delivery",
];

const OUTCOMES = [
  "Reduce Time-to-Hire",
  "Increase Hiring Velocity",
  "Improve Recruiter Productivity",
  "Higher Offer-to-Join Ratio",
  "Better Candidate Experience",
  "Lower Vendor Complexity",
];

const INDUSTRIES = [
  "Technology",
  "SaaS",
  "BFSI",
  "Healthcare",
  "Retail",
  "Manufacturing",
  "Automotive",
  "Enterprise Software",
  "Global Business Services",
  "Shared Services",
];

const GCC_CITIES = [
  { city: "Bengaluru", density: "High" },
  { city: "Hyderabad", density: "High" },
  { city: "Pune", density: "High" },
  { city: "Chennai", density: "Medium" },
  { city: "NCR", density: "High" },
  { city: "Mumbai", density: "Medium" },
];

const SUCCESS_STORY = [
  {
    title: "Challenge",
    description: "Hiring bottlenecks during GCC expansion.",
  },
  {
    title: "Solution",
    description: "Dedicated recruiter pods and AI-assisted recruitment operations.",
  },
  {
    title: "Execution",
    description: "End-to-end hiring support across engineering and shared services.",
  },
  {
    title: "Outcome",
    description: "Faster hiring, improved visibility, and scalable recruitment execution.",
  },
];

const FAQS = [
  {
    question: "What is GCC hiring?",
    answer:
      "GCC hiring is the end-to-end process of building and scaling talent teams for Global Capability Centers in India—including workforce planning, sourcing, screening, interviews, offers, and joining at enterprise scale.",
  },
  {
    question: "Why India for GCC expansion?",
    answer:
      "India offers deep engineering talent, mature digital infrastructure, innovation ecosystems, and proven GCC delivery capability across technology, finance, and shared services.",
  },
  {
    question: "How is EarlyJobs different from recruitment agencies?",
    answer:
      "EarlyJobs is a hiring infrastructure partner—not a resume vendor. We combine recruiter pods, nationwide networks, AI-assisted operations, and hiring analytics to deliver predictable outcomes.",
  },
  {
    question: "What roles can you hire?",
    answer:
      "We hire across engineering, cloud, DevOps, cybersecurity, AI/ML, product, design, finance, shared services, operations, HR, legal, customer success, leadership, campus, and volume hiring.",
  },
  {
    question: "How do recruiter pods work?",
    answer:
      "Dedicated recruiter pods are aligned to your GCC functions and hiring priorities, operating as an extension of your talent team with structured workflows, SLAs, and reporting.",
  },
  {
    question: "Can you support leadership hiring?",
    answer: "Yes. We support leadership and specialized hiring with dedicated search expertise and structured evaluation workflows.",
  },
  {
    question: "Do you provide hiring analytics?",
    answer:
      "Yes. Hiring dashboards, funnel metrics, recruiter performance, offer acceptance rates, and leadership reporting are core to our recruitment operations model.",
  },
  {
    question: "Can you scale across multiple cities?",
    answer: "Yes. Our nationwide recruiter network supports multi-city GCC hiring across India's major talent hubs.",
  },
  {
    question: "How quickly can hiring begin?",
    answer:
      "After discovery and strategy alignment, recruiter pod deployment and sourcing can begin quickly based on your hiring roadmap and priorities.",
  },
  {
    question: "What is Human + AI hiring infrastructure?",
    answer:
      "It combines human recruiter expertise with AI-assisted sourcing, screening, coordination, and analytics—delivering faster, more consistent hiring without sacrificing quality.",
  },
  {
    question: "Can EarlyJobs support volume and campus hiring?",
    answer: "Yes. We support high-volume hiring and campus recruitment programs for GCC workforce build-out.",
  },
  {
    question: "How do you handle employer branding during hiring?",
    answer:
      "We support employer branding through candidate communication, interview experience, and market positioning to improve offer acceptance and talent quality.",
  },
  {
    question: "Can you replace multiple recruitment vendors?",
    answer:
      "Yes. EarlyJobs consolidates hiring execution under one partner—reducing vendor complexity while improving visibility and coordination.",
  },
  {
    question: "What industries do you specialize in?",
    answer:
      "We support technology, SaaS, BFSI, healthcare, retail, manufacturing, automotive, enterprise software, and global business services.",
  },
  {
    question: "How do you measure hiring success?",
    answer:
      "We track time-to-hire, hiring velocity, offer-to-join ratio, recruiter productivity, candidate experience, and cost-per-hire through structured reporting.",
  },
];

const GccHiringSolutionsPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white text-slate-900">
      {/* SECTION 1 — HERO */}
      <section className="relative overflow-hidden bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="grid gap-10 lg:grid-cols-1">
            <div className="relative overflow-hidden py-8 lg:min-h-[520px] lg:py-12">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-white/70 to-white blur-3xl" />
              <div
                className="absolute inset-0 bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url("/gcc/gcc-hero-skyline.png")',
                  backgroundPosition: "right center",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply"
                  style={{
                    background: "linear-gradient(135deg, #eef4ff 0%, #ffffff 35%, #fff7ef 72%, #fff3df 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 to-transparent lg:from-white lg:via-white/65 lg:to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#F08504]">
                  GCC Hiring Solutions
                </p>
                <h1 className="text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-5xl xl:text-[3.25rem]">
                  GCC Hiring Solutions Built for High-Growth Global Capability Centers
                </h1>
                <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                  Build and scale your Global Capability Center in India through a Human + AI hiring infrastructure
                  designed to deliver engineering, product, leadership, and business talent faster.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                  Whether you&apos;re establishing your first GCC or expanding an existing capability center, EarlyJobs
                  helps enterprise organizations hire with speed, quality, and consistency through dedicated recruiter
                  networks, structured hiring operations, and AI-assisted recruitment workflows.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="tel:+918217527926"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 transition hover:bg-orange-600"
                  >
                    Book a GCC Hiring Consultation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:info@earlyjobs.in"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-800 backdrop-blur-sm transition hover:bg-white"
                  >
                    Download GCC Hiring Playbook
                  </a>
                </div>

                {/* Hiring flow — horizontal on desktop */}
                <div className="mt-10 hidden lg:block">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Hiring Infrastructure
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {HERO_FLOW.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm"
                      >
                        <span className="font-bold text-[#F08504]">{index + 1}</span>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust bar */}
          <div className="mt-8 border-t border-slate-200/80 pt-6">
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Trusted for</span>
              {["Engineering Hiring", "Leadership Hiring", "Volume Hiring", "Campus Hiring", "Recruitment Operations"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm"
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core story strip */}
      <section className="border-b border-slate-200 bg-slate-50 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-base font-medium leading-relaxed text-slate-700 sm:text-lg">
            Most companies believe GCC hiring is a recruitment problem.{" "}
            <span className="font-bold text-slate-900">It isn&apos;t. It&apos;s an execution problem.</span> Building a
            successful Global Capability Center requires a scalable hiring engine, recruiter expertise, operational
            excellence, and deep knowledge of the Indian talent market.
          </p>
        </div>
      </section>

      {/* SECTION 2 — India GCC Growth Engine */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
          India Has Become the World&apos;s GCC Growth Engine
        </p>
        <div className="mt-8 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#1e3a8a]/5 to-slate-50 p-8">
            <div className="mb-6 flex items-center gap-3 text-[#1e3a8a]">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Major GCC Cities · Talent Density</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GCC_CITIES.map(({ city, density }) => (
                <div key={city} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="font-semibold text-slate-900">{city}</p>
                  <p className="mt-1 text-xs font-medium text-[#F08504]">Talent density: {density}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-dashed border-[#1e3a8a]/30 bg-white/60 p-4 text-center text-sm text-slate-500">
              India talent map — engineering, AI, product, finance &amp; shared services hubs
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              The Next Generation of Global Capability Centers Will Be Built on Better Hiring.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>
                Over the past decade, India has evolved from being a cost-efficient outsourcing destination into one of
                the world&apos;s largest innovation and capability hubs.
              </p>
              <p>
                Today, Global Capability Centers are driving engineering, AI, product development, cybersecurity,
                finance, customer success, and enterprise operations for some of the world&apos;s leading organizations.
              </p>
              <p>
                However, as more companies expand into India, hiring has become significantly more competitive. The
                challenge is no longer access to talent. The challenge is building a hiring system capable of
                identifying, engaging, and onboarding the right talent at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Challenges */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
            Why Scaling a GCC Is More Difficult Than Filling Open Roles
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHALLENGES.map((item, index) => (
              <div
                key={item}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#F08504]/10 text-sm font-bold text-[#F08504]">
                  {index + 1}
                </div>
                <Sparkles className="mb-3 h-5 w-5 text-[#F08504]" />
                <p className="text-sm font-semibold leading-relaxed text-slate-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Comparison */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
          Why Traditional Recruitment Models Fall Short
        </h2>
        <div className="mt-10 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 bg-[#0A0F10] text-sm font-semibold text-white">
            <div className="px-5 py-4">Traditional Approach</div>
            <div className="border-l border-white/10 px-5 py-4">Enterprise Reality</div>
          </div>
          {COMPARISON_ROWS.map((row) => (
            <div key={row.traditional} className="grid grid-cols-2 border-t border-slate-200 text-sm">
              <div className="bg-slate-50 px-5 py-4 text-slate-600">{row.traditional}</div>
              <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{row.enterprise}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg font-semibold text-[#1e3a8a]">
          Traditional recruitment solves vacancies. Modern GCCs require hiring infrastructure.
        </p>
      </section>

      {/* SECTION 5 — Introducing EarlyJobs (most important) */}
      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-24">
        <div
          className="absolute inset-0 bg-right bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url("/gcc/gcc-intro-bg.png")',
            backgroundSize: "420px auto",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F10] via-[#0A0F10]/92 to-[#0A0F10]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F10] via-transparent to-[#0A0F10]/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Introducing EarlyJobs</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Human + AI Hiring Infrastructure for GCCs</h2>
              <p className="mt-4 text-base text-slate-400">
                EarlyJobs is a hiring infrastructure partner that combines dedicated expertise with AI-assisted
                operations to deliver predictable, scalable hiring outcomes.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {EARLYJOBS_CAPABILITIES.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#F08504]" />
                    <span className="text-sm text-slate-200">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-xl font-bold text-[#F08504]">Outcome: A predictable, scalable hiring engine.</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">How It Connects</p>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl border border-blue-400/30 bg-blue-500/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-300" />
                    <span className="font-semibold text-blue-100">Human Layer</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Recruiter pods, networks &amp; domain expertise</p>
                </div>
                <div className="flex justify-center text-slate-500">+</div>
                <div className="rounded-2xl border border-[#F08504]/30 bg-[#F08504]/10 px-5 py-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-[#F08504]" />
                    <span className="font-semibold text-orange-100">AI Layer</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Sourcing, screening &amp; coordination automation</p>
                </div>
                <div className="flex justify-center text-[#F08504]">↓</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
                  <p className="font-semibold">Hiring Execution</p>
                </div>
                <div className="flex justify-center text-[#F08504]">↓</div>
                <div className="rounded-2xl border border-green-400/30 bg-green-500/10 px-5 py-4 text-center">
                  <p className="font-semibold text-green-100">Successful Joins</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — What We Help GCCs Hire */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What We Help GCCs Hire</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {HIRE_CATEGORIES.map((category) => (
            <div
              key={category}
              className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:border-[#F08504]/40 hover:bg-orange-50/50"
            >
              <Building2 className="h-4 w-4 shrink-0 text-[#F08504]" />
              <span className="text-sm font-semibold text-slate-800">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — How EarlyJobs Works */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How EarlyJobs Works</h2>
          <div className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            A clear operating sequence from hiring discovery to successful joins, designed to reduce coordination
            overhead and improve execution quality at scale.
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {HOW_IT_WORKS.map((step, index) => (
              <div
                key={step}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F08504] to-[#1e3a8a]" />
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                      Step {index + 1}
                    </p>
                    <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900">
                      {step}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8 — Why Enterprises Choose EarlyJobs */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why Enterprises Choose EarlyJobs</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#1e3a8a]/20 bg-gradient-to-br from-[#1e3a8a]/5 to-white p-6 shadow-sm"
            >
              <CheckCircle2 className="mb-3 h-6 w-6 text-[#1e3a8a]" />
              <p className="text-base font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 9 — Business Outcomes */}
      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-20">
        <div
          className="absolute inset-0 bg-right bg-no-repeat opacity-35"
          style={{
            backgroundImage: 'url("/gcc/gcc-outcomes-bg.png")',
            backgroundSize: "auto 120%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F10] via-[#0A0F10]/96 to-[#0A0F10]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F10] via-transparent to-[#0A0F10]/40" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Business Outcomes</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OUTCOMES.map((outcome) => (
              <div
                key={outcome}
                className="rounded-2xl border border-[#F08504]/30 bg-[#F08504]/10 p-8 text-center"
              >
                <TrendingUp className="mx-auto mb-4 h-8 w-8 text-[#F08504]" />
                <p className="text-lg font-bold text-white">{outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10 — Industries */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Industries We Support</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-slate-200 bg-slate-50 px-5 py-2.5 text-sm font-medium text-slate-700"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      {/* SECTION 11 — Success Story */}
      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Enterprise Hiring Success Story</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SUCCESS_STORY.map((step, index) => (
              <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                {index < SUCCESS_STORY.length - 1 && (
                  <span className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-[#F08504] lg:inline">
                    →
                  </span>
                )}
                <p className="text-xs font-bold uppercase tracking-wider text-[#F08504]">{step.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-3">
          {FAQS.map((faq, index) => (
            <div key={faq.question} className="overflow-hidden rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-slate-50 px-5 py-4 text-left"
              >
                <span className="font-semibold text-slate-900">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition ${openFaq === index ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === index && (
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 13 — Final CTA */}
      <section className="bg-[#1e3a8a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Build a Hiring Engine That Scales with Your GCC</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100">
            Whether you&apos;re launching a new Global Capability Center or expanding an existing one, EarlyJobs helps
            you hire exceptional talent through a structured, Human + AI hiring infrastructure built for enterprise
            growth.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918217527926"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book a GCC Hiring Consultation
            </a>
            <a
              href="mailto:info@earlyjobs.in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download the GCC Hiring Playbook
            </a>
          </div>
        </div>
      </section>

      {/* Related cluster pages */}
      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Explore GCC Resources</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {RELATED_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-[#F08504] hover:text-[#F08504]"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default GccHiringSolutionsPage;
