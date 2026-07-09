"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Layers3,
  MessageSquareQuote,
  Network,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

const HERO_FLOW = [
  "Talent Ecosystem",
  "Employer Brand",
  "Recruiter Network",
  "AI Layer",
  "Hiring Operations",
  "Talent Community",
  "Business Growth",
];

const CHALLENGES = [
  "Engineering talent shortage",
  "Employer branding",
  "Candidate experience",
  "Passive talent engagement",
  "Leadership hiring",
  "Offer drop-offs",
  "Recruiter productivity",
  "Hiring visibility",
  "Multi-city hiring",
  "Forecasting workforce demand",
];

const FRAMEWORK = [
  "Business Goals",
  "Workforce Planning",
  "Talent Intelligence",
  "Recruiter Network",
  "Employer Branding",
  "AI Candidate Discovery",
  "Recruitment Operations",
  "Interview Coordination",
  "Offer Management",
  "Hiring Analytics",
  "Talent Community",
];

const CAPABILITIES = [
  "Talent Intelligence",
  "Recruiter Marketplace",
  "Dedicated Recruiter Pods",
  "Employer Branding",
  "Recruitment Marketing",
  "Candidate Engagement",
  "Interview Operations",
  "Offer Management",
  "Leadership Hiring",
  "Engineering Hiring",
  "Campus Hiring",
  "Volume Hiring",
  "Hiring Analytics",
  "Workforce Planning",
];

const CANDIDATE_EXPERIENCE = [
  "Communication",
  "Speed",
  "Transparency",
  "Interview experience",
  "Offer journey",
  "Joining support",
];

const BRANDING_POINTS = [
  "Offer acceptance",
  "Talent quality",
  "Hiring velocity",
  "Candidate trust",
];

const COMPARISON_ROWS = [
  ["Fill vacancies", "Build talent ecosystems"],
  ["Agency relationship", "Strategic partnership"],
  ["Resume delivery", "End-to-end hiring operations"],
  ["Limited visibility", "Hiring intelligence"],
  ["One-time engagement", "Continuous talent acquisition"],
];

const OUTCOMES = [
  "Reduce Time-to-Hire",
  "Improve Candidate Experience",
  "Increase Offer Acceptance",
  "Build Talent Communities",
  "Improve Recruiter Productivity",
  "Strengthen Employer Brand",
  "Scalable Hiring Operations",
  "Better Workforce Planning",
];

const MATURITY = [
  "Reactive Recruitment",
  "Agency Hiring",
  "Internal TA",
  "Human + AI Hiring",
  "Talent Acquisition Infrastructure",
];

const SUCCESS = [
  "Challenge",
  "Talent Acquisition Strategy",
  "Execution",
  "Hiring Outcomes",
  "Business Growth",
];

const FAQS = [
  ["What is Talent Acquisition for GCCs?", "Talent Acquisition for GCCs is the strategic function of building long-term talent pipelines, workforce plans, employer brand, and hiring operations—not just filling current openings."],
  ["How is Talent Acquisition different from recruitment?", "Recruitment is reactive vacancy filling. Talent Acquisition is proactive workforce building supported by planning, branding, analytics, and ongoing talent engagement."],
  ["Why does employer branding matter?", "Strong employer branding improves offer acceptance, talent quality, candidate trust, and hiring velocity—especially for engineering and specialist roles."],
  ["How do recruiter networks improve hiring?", "Recruiter networks improve reach, sourcing speed, market coverage, and access to hard-to-find talent across multiple locations."],
  ["Can EarlyJobs support workforce planning?", "Yes. Workforce planning is a core part of our Talent Acquisition infrastructure support."],
  ["Do you help with talent intelligence?", "Yes. We support talent intelligence through market mapping, role prioritization, hiring signals, and better decision-making inputs."],
  ["Can you support engineering leadership hiring?", "Yes. We support leadership hiring alongside engineering and specialist talent acquisition needs."],
  ["How do you improve candidate experience?", "We improve candidate experience through structured communication, faster coordination, greater transparency, and better offer/joining support."],
  ["Can you build long-term talent pipelines?", "Yes. EarlyJobs helps GCCs build repeatable, long-term talent pipelines through recruiter networks, employer branding, and AI-enabled hiring operations."],
];

const RELATED = [
  { href: "/gcc-hiring-solutions", label: "GCC Hiring Solutions" },
  { href: "/build-gcc-india", label: "Build GCC in India" },
  { href: "/gcc-recruitment-partner", label: "GCC Recruitment Partner" },
  { href: "/offshore-capability-center-hiring", label: "Offshore Capability Center Hiring" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

export default function GccTalentAcquisitionPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                GCC Talent Acquisition
              </p>
              <h1 className="text-3xl font-bold leading-[1.12] text-slate-900 sm:text-4xl lg:text-5xl">
                Modern Talent Acquisition for Global Capability Centers
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
                Build a scalable Talent Acquisition function that combines Human expertise, AI-powered hiring
                workflows, recruiter networks, and structured recruitment operations to help your GCC grow faster.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                EarlyJobs partners with Global Capability Centers to design and execute modern talent acquisition
                strategies, from workforce planning and employer branding to engineering hiring, recruiter operations,
                and candidate experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+918217527926"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Book Talent Strategy Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@earlyjobs.in"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  Download GCC Talent Acquisition Playbook
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">Talent Ecosystem</p>
              <div className="mt-6 space-y-3">
                {HERO_FLOW.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl border border-violet-100 bg-white px-4 py-3 shadow-sm">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium text-slate-700">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
              Talent Acquisition Is No Longer Recruitment
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              The Best GCCs Build Talent Pipelines—Not Hiring Pipelines.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-slate-600">
              <p>Traditional recruitment is reactive. Someone resigns. A recruiter searches. An interview happens. A position gets filled.</p>
              <p>Modern Talent Acquisition is proactive. Companies continuously build relationships with talent before roles even open.</p>
              <p>
                Talent communities, employer branding, workforce planning, recruiter networks, candidate experience, and hiring intelligence now define high-performing GCC Talent Acquisition.
              </p>
            </div>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-100 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-red-500">Traditional</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Hiring Funnel</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Vacancy-driven, reactive, transactional, and focused on immediate filling.
                </p>
              </div>
              <div className="rounded-2xl border border-violet-100 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">Modern</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Talent Ecosystem</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Community-led, brand-aware, data-informed, and built for continuous long-term growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Challenges Modern GCC Talent Teams Face</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CHALLENGES.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Sparkles className="mb-3 h-5 w-5 text-violet-600" />
                <p className="text-sm font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base font-medium text-slate-700">
            As GCCs grow, hiring becomes less about recruitment and more about building a repeatable talent
            acquisition engine.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-violet-950 py-16 text-white lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_left,rgba(240,133,4,0.14),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
            The EarlyJobs Talent Acquisition Framework
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
            Human + AI Talent Acquisition Infrastructure
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {FRAMEWORK.map((step, index) => (
              <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                <div className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  Layer {index + 1}
                </div>
                <h3 className="text-base font-semibold text-white">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Talent Acquisition Capabilities</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <CheckCircle2 className="mb-3 h-5 w-5 text-[#F08504]" />
              <p className="text-sm font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                Candidate Experience Matters More Than Ever
              </p>
              <div className="mt-6 space-y-3">
                {CANDIDATE_EXPERIENCE.map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Candidate Experience Is a Competitive Advantage</h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600">
                Communication, speed, transparency, interview experience, offer journey, and joining support directly
                shape how strong candidates perceive your GCC.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
              Employer Branding as a Hiring Advantage
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Engineering talent evaluates employers differently.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Employer branding influences offer acceptance, talent quality, hiring velocity, and candidate trust.
              EarlyJobs supports employer branding through candidate communication, positioning, process quality, and
              execution discipline during hiring.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BRANDING_POINTS.map((item) => (
                <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-8">
            <div className="space-y-4">
              {["Employer Brand", "Candidate Trust", "Offer Acceptance", "Hiring Velocity"].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div className="flex-1 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <p className="font-semibold text-slate-900">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Why Talent Leaders Choose EarlyJobs</h2>
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="grid grid-cols-2 bg-slate-900 text-sm font-semibold text-white">
              <div className="px-5 py-4">Traditional Recruitment</div>
              <div className="border-l border-white/10 px-5 py-4">EarlyJobs</div>
            </div>
            {COMPARISON_ROWS.map(([left, right]) => (
              <div key={left} className="grid grid-cols-2 border-t border-slate-200 text-sm">
                <div className="bg-slate-50 px-5 py-4 text-slate-600">{left}</div>
                <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-violet-950 py-16 text-white lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_38%),radial-gradient(circle_at_top_left,rgba(240,133,4,0.12),transparent_34%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Business Outcomes</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {OUTCOMES.map((item) => (
                  <div key={item} className="rounded-2xl bg-white/10 p-4 text-sm font-semibold text-violet-50">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Talent Acquisition Maturity Model</h2>
              <div className="mt-8 space-y-3">
                {MATURITY.map((item, index) => (
                  <div
                    key={item}
                    className={`rounded-2xl border p-4 ${index === 4 ? "border-[#F08504]/40 bg-[#F08504]/15" : "border-white/10 bg-white/5"}`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">Level {index + 1}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Customer Success Story</p>
        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Talent Acquisition capability should outlast any single hiring cycle.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {SUCCESS.map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="mt-4 text-base font-semibold text-slate-900">{item}</p>
            </div>
          ))}
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

      <section className="bg-violet-700 py-16 text-white lg:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Build a Talent Acquisition Function That Scales with Your Business
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-violet-100">
            Whether you&apos;re building your first GCC or expanding globally, EarlyJobs helps enterprises create a
            predictable, data-driven, Human + AI Talent Acquisition engine.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918217527926"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Talent Strategy Consultation
            </a>
            <a
              href="mailto:info@earlyjobs.in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download Talent Acquisition Playbook
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
