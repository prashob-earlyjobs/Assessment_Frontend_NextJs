"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Compass,
  MapPin,
  Network,
  Target,
  TrendingUp,
} from "lucide-react";

const HERO_FLOW = [
  "Global HQ",
  "India",
  "GCC",
  "Recruiter Network",
  "Hiring Engine",
  "Business Growth",
];

const GCC_CITIES = ["Bengaluru", "Hyderabad", "Pune", "Chennai", "NCR"];

const FIVE_QUESTIONS = [
  {
    question: "Why are you building a GCC?",
    answers: ["Innovation", "Engineering", "Shared Services", "Customer Operations"],
  },
  {
    question: "Which functions should be built first?",
    answers: ["Engineering", "Product", "Finance", "Operations", "Customer Success"],
  },
  {
    question: "Which city aligns with your hiring goals?",
    answers: ["Location strategy", "Talent availability", "Cost"],
  },
  {
    question: "What talent will you need over the next 24 months?",
    answers: ["Hiring roadmap", "Forecast"],
  },
  {
    question: "Can your recruitment model scale?",
    answers: ["One recruiter?", "Agency?", "Or hiring infrastructure?"],
  },
];

const STAGES = [
  "Business Strategy",
  "Location Selection",
  "Talent & Hiring Strategy",
  "Recruitment Execution",
  "Scale & Optimize",
];

const CHALLENGES = [
  "Competition for engineering talent",
  "Leadership hiring delays",
  "Offer drop-offs",
  "Employer branding",
  "Recruitment operations",
  "Hiring visibility",
  "Scaling recruiter capacity",
  "Interview coordination",
];

const SUPPORT_CARDS = [
  "GCC hiring strategy",
  "Workforce planning",
  "Talent mapping",
  "Dedicated recruiter pods",
  "Recruiter network across India",
  "AI-assisted sourcing",
  "Employer branding",
  "Interview operations",
  "Offer management",
  "Hiring analytics",
  "Leadership hiring",
  "Campus hiring",
  "Volume hiring",
];

const FRAMEWORK = [
  "Business Goals",
  "Hiring Forecast",
  "Recruiter Deployment",
  "AI Candidate Discovery",
  "Screening",
  "Interview Coordination",
  "Offer Management",
  "Joining",
  "Hiring Dashboard",
];

const ROLES = [
  "Software Development",
  "AI & ML",
  "Cloud",
  "Cybersecurity",
  "Data Engineering",
  "Product Management",
  "Finance",
  "HR",
  "Legal",
  "Operations",
  "Shared Services",
  "Leadership",
  "Graduate Programs",
];

const WHY_ROWS = [
  ["Resume sourcing", "Hiring strategy + execution"],
  ["Multiple agencies", "One hiring partner"],
  ["Reactive hiring", "Workforce planning"],
  ["Limited visibility", "Hiring dashboards"],
  ["Manual coordination", "AI-assisted operations"],
  ["Transactional", "Long-term hiring partner"],
];

const SUCCESS_FRAMEWORK = ["Discover", "Design", "Deploy", "Deliver", "Scale"];

const FAQS = [
  ["What is a Global Capability Center?", "A GCC is an in-country operating center that supports engineering, product, finance, operations, or shared services for a global enterprise."],
  ["Why should companies build a GCC in India?", "India offers deep talent pools, strong digital infrastructure, mature startup ecosystems, and proven global delivery capability."],
  ["How long does it take to hire a GCC team?", "Timelines depend on function, city, and hiring volume, but the right hiring strategy and recruiter deployment significantly reduce delays."],
  ["Which city is best for a GCC?", "It depends on your business goals, talent needs, hiring volume, and cost model. Bengaluru, Hyderabad, Pune, Chennai, and NCR each offer different advantages."],
  ["Can EarlyJobs support greenfield GCC launches?", "Yes. EarlyJobs supports greenfield GCC launches from hiring strategy and workforce planning to recruiter deployment and execution."],
  ["How do recruiter pods work?", "Recruiter pods are dedicated hiring teams aligned to your functions, geography, and hiring goals, giving you more structure and accountability."],
  ["Can you support engineering and leadership hiring?", "Yes. We support both specialist engineering hiring and leadership hiring as part of broader GCC build-out."],
  ["Do you help with workforce planning?", "Yes. Workforce planning, hiring roadmap design, and talent mapping are central to our India expansion support."],
];

const RELATED = [
  { href: "/gcc-hiring-solutions", label: "GCC Hiring Solutions" },
  { href: "/gcc-recruitment-partner", label: "GCC Recruitment Partner" },
  { href: "/offshore-capability-center-hiring", label: "Offshore Capability Center Hiring" },
  { href: "/gcc-talent-acquisition", label: "GCC Talent Acquisition" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

export default function BuildGccIndiaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative overflow-hidden py-6">
              <div
                className="absolute inset-0 bg-right bg-no-repeat"
                style={{
                  backgroundImage: 'url("/gcc/build-gcc-soft.png")',
                  backgroundSize: "90%",
                  backgroundPosition: "right center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="relative z-10 max-w-3xl">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                  Build GCC in India
                </p>
                <h1 className="text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
                  Build Your Global Capability Center in India with Confidence
                </h1>
                <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                  Whether you&apos;re launching your first Global Capability Center or expanding an existing operation,
                  EarlyJobs helps you build high-performing teams through strategic hiring, recruiter networks, and
                  Human + AI recruitment operations.
                </p>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                  India has become the world&apos;s leading destination for Global Capability Centers, but success depends
                  on more than choosing a city. It depends on building the right hiring strategy, attracting
                  exceptional talent, and creating a scalable recruitment engine from day one.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="tel:+918217527926"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/20 transition hover:bg-orange-600"
                  >
                    Book a GCC Strategy Consultation
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:info@earlyjobs.in"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                  >
                    Download the GCC Expansion Guide
                  </a>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {["Greenfield GCC", "Expansion Hiring", "Workforce Planning", "Multi-City Hiring", "Leadership Hiring"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50/40 p-6 shadow-sm">
              <div
                className="min-h-[420px] rounded-[1.5rem] bg-right-bottom bg-no-repeat"
                style={{
                  backgroundImage: 'url("/gcc/build-gcc-hero.png")',
                  backgroundSize: "cover",
                }}
              >
                <div className="rounded-[1.5rem] bg-gradient-to-t from-[#0A0F10]/70 via-[#0A0F10]/25 to-transparent p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">GCC Build Flow</p>
                  <div className="mt-5 space-y-3">
                    {HERO_FLOW.map((step, index) => (
                      <div key={step} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                          {index + 1}
                        </div>
                        <div className="text-sm font-medium text-white">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <div className="mb-6 flex items-center gap-3 text-[#1e3a8a]">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Top GCC Cities</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {GCC_CITIES.map((city) => (
                <div key={city} className="rounded-xl bg-white px-4 py-3 shadow-sm">
                  <p className="font-semibold text-slate-900">{city}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
              Why Global Companies Are Building GCCs in India
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              India Has Become the Global Innovation Hub for Enterprise Growth.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>India is no longer only an outsourcing destination.</p>
              <p>
                GCCs now drive engineering, AI, cybersecurity, product development, finance, and shared services.
              </p>
              <p>
                Enterprises are choosing India because of talent depth, a mature startup ecosystem, strong digital
                infrastructure, a vibrant innovation ecosystem, and proven global delivery capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
            Before You Build a GCC
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Ask These Five Questions First
          </h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {FIVE_QUESTIONS.map((item, index) => (
              <div key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.answers.map((answer) => (
                    <span
                      key={answer}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-600"
                    >
                      {answer}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
          The Five Stages of Building a Successful GCC
        </p>
        <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="grid gap-4 md:grid-cols-5">
            {STAGES.map((stage, index) => (
              <div key={stage} className="relative rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div
                  className={`mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                    index >= 2 ? "bg-[#F08504] text-white" : "bg-slate-900 text-white"
                  }`}
                >
                  Stage {index + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{stage}</h3>
                {index === 2 && (
                  <p className="mt-2 text-sm font-medium text-[#F08504]">EarlyJobs starts creating leverage here.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            The Hiring Challenges Most GCCs Underestimate
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CHALLENGES.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Target className="mb-3 h-5 w-5 text-[#F08504]" />
                <p className="text-sm font-semibold leading-relaxed text-slate-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base font-medium text-slate-700">
            Most hiring problems don&apos;t appear on Day 1. They appear when companies need to scale from 20 hires to
            200.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-24">
        <div
          className="absolute inset-0 bg-right bg-no-repeat opacity-25"
          style={{
            backgroundImage: 'url("/gcc/build-gcc-tower.png")',
            backgroundSize: "auto 115%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F10] via-[#0A0F10]/94 to-[#0A0F10]/78" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
            How EarlyJobs Supports GCC Expansion
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
            Your Hiring Infrastructure Partner from Planning to Scale
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_CARDS.map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <CheckCircle2 className="mb-3 h-5 w-5 text-[#F08504]" />
                <p className="text-sm font-medium text-slate-100">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-orange-50/30 p-8">
            <div className="space-y-3">
              {FRAMEWORK.map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="text-sm font-medium text-slate-700">{step}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">GCC Hiring Framework</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              A Hiring Roadmap That Moves from Planning to Predictability
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Build a connected system from business goals and hiring forecasts to recruiter deployment, candidate
              discovery, coordination, joining, and dashboard visibility.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Roles We Help Build</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {ROLES.map((role) => (
              <span
                key={role}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Why EarlyJobs</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Build Your GCC with the Right Hiring Strategy from Day One
        </h2>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 bg-slate-900 text-sm font-semibold text-white">
            <div className="px-5 py-4">Traditional Recruitment</div>
            <div className="border-l border-white/10 px-5 py-4">EarlyJobs</div>
          </div>
          {WHY_ROWS.map(([left, right]) => (
            <div key={left} className="grid grid-cols-2 border-t border-slate-200 text-sm">
              <div className="bg-slate-50 px-5 py-4 text-slate-600">{left}</div>
              <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{right}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Success Framework</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            A Repeatable Enterprise Methodology
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {SUCCESS_FRAMEWORK.map((step, index) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">Frequently Asked Questions</h2>
        <div className="mt-10 space-y-3">
          {FAQS.map(([question, answer], index) => (
            <div key={question} className="overflow-hidden rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-slate-50 px-5 py-4 text-left"
              >
                <span className="font-semibold text-slate-900">{question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-slate-500 transition ${openFaq === index ? "rotate-180" : ""}`}
                />
              </button>
              {openFaq === index && (
                <div className="border-t border-slate-200 px-5 py-4 text-sm leading-relaxed text-slate-600">
                  {answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#1e3a8a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">Planning to Build a GCC in India?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100">
            Talk to EarlyJobs and design a hiring strategy that supports long-term growth, not just immediate hiring.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918217527926"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book a GCC Strategy Consultation
            </a>
            <a
              href="mailto:info@earlyjobs.in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download the India GCC Expansion Playbook
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Related Resources</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {RELATED.map((page) => (
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
}
