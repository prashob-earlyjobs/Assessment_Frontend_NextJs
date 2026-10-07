"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Layers3,
  MapPin,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const HERO_FLOW = [
  "Global HQ",
  "India Offshore Center",
  "Recruiter Network",
  "Hiring Operations Dashboard",
  "Candidate Pipeline",
  "Successful Joins",
];

const EVOLUTION = [
  "Traditional BPO",
  "Shared Services",
  "Engineering Centers",
  "Innovation Hubs",
  "AI & Product Centers",
];

const CHALLENGES = [
  "Engineering talent shortages",
  "Leadership hiring delays",
  "Multiple hiring stakeholders",
  "Vendor dependency",
  "Interview bottlenecks",
  "Offer drop-offs",
  "Hiring visibility",
  "Scaling recruiter capacity",
  "Employer branding",
  "Cross-city hiring",
];

const COMPARISON_ROWS = [
  ["One recruiter", "Multi-functional hiring teams"],
  ["Multiple agencies", "Unified hiring operations"],
  ["Resume delivery", "End-to-end execution"],
  ["Manual follow-ups", "AI-assisted coordination"],
  ["Static reporting", "Real-time hiring visibility"],
];

const FRAMEWORK = [
  ["Hiring Discovery", "Understand business goals, functions, hiring plans, and timelines."],
  ["Talent Strategy", "Identify hiring priorities, locations, recruiter allocation, and market availability."],
  ["Execution", "Dedicated recruiter pods begin sourcing, screening, and coordinating interviews."],
  ["Optimization", "Weekly hiring reviews, bottleneck analysis, recruiter performance, and pipeline improvements."],
  ["Scale", "Expand recruiter capacity, optimize hiring operations, and support new business units."],
];

const DELIVERS = [
  "Engineering Hiring",
  "Leadership Hiring",
  "Volume Hiring",
  "Campus Hiring",
  "Recruiter Pods",
  "Recruitment Operations",
  "AI Candidate Discovery",
  "Interview Coordination",
  "Employer Branding",
  "Offer Management",
  "Candidate Engagement",
  "Hiring Analytics",
];

const ROLES = [
  "Backend",
  "Frontend",
  "Cloud",
  "DevOps",
  "AI",
  "ML",
  "Cybersecurity",
  "QA",
  "Product",
  "Finance",
  "HR",
  "Operations",
  "Customer Success",
  "Leadership",
  "Graduate Hiring",
  "Shared Services",
];

const OUTCOMES = [
  "Reduce Hiring Time",
  "Increase Hiring Velocity",
  "Improve Candidate Experience",
  "Lower Vendor Complexity",
  "Improve Offer Acceptance",
  "Increase Recruiter Productivity",
  "Scalable Recruitment Operations",
  "Hiring Visibility",
];

const TRUST = [
  "Human + AI Hiring",
  "Recruiter Network Across India",
  "Dedicated Hiring Pods",
  "Operational Excellence",
  "Hiring Governance",
  "Recruitment Analytics",
  "Employer Branding Support",
  "Enterprise Delivery Model",
];

const GOVERNANCE = [
  "Weekly Hiring Reviews",
  "Hiring Dashboards",
  "Recruitment Analytics",
  "SLA Tracking",
  "Interview Metrics",
  "Offer Funnel",
  "Leadership Reporting",
  "Recruiter Performance Reviews",
];

const SUCCESS = [
  "Business Challenge",
  "Hiring Strategy",
  "Execution Model",
  "Hiring Outcomes",
  "Business Impact",
];

const FAQS = [
  ["What is offshore capability center hiring?", "It is the structured hiring execution required to build and scale offshore capability centers across engineering, product, finance, shared services, and leadership teams."],
  ["How is it different from regular recruitment?", "Offshore hiring requires operational governance, multi-stakeholder coordination, dashboards, recruiter capacity planning, and scalable execution beyond standard recruitment."],
  ["How does EarlyJobs support offshore expansion?", "EarlyJobs operationalizes hiring with recruiter pods, AI-assisted workflows, governance, and nationwide execution support."],
  ["Can you hire engineering teams?", "Yes. Engineering hiring is a core capability, including backend, frontend, cloud, DevOps, AI, ML, cybersecurity, and QA."],
  ["Can you support multiple cities?", "Yes. We support offshore hiring across multiple Indian cities through a distributed recruiter network and centralized coordination."],
  ["Do you provide hiring analytics?", "Yes. We provide hiring dashboards, recruiter performance tracking, funnel visibility, and leadership reporting."],
  ["How quickly can hiring begin?", "Hiring can begin quickly once discovery, hiring strategy, and recruiter deployment are aligned with your expansion plan."],
  ["Can you support leadership hiring?", "Yes. We support leadership and specialized hiring alongside high-volume and business-critical offshore roles."],
  ["What industries do you specialize in?", "We support offshore hiring for technology, product, finance, operations, customer success, and shared services functions across sectors."],
];

const RELATED = [
  { href: "/gcc-hiring-solutions", label: "GCC Hiring Solutions" },
  { href: "/build-gcc-india", label: "Build GCC in India" },
  { href: "/gcc-recruitment-partner", label: "GCC Recruitment Partner" },
  { href: "/gcc-talent-acquisition", label: "GCC Talent Acquisition" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

export default function OffshoreCapabilityCenterHiringPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#0A0F10] text-white">
        <div
          className="absolute inset-0 bg-right bg-no-repeat opacity-22"
          style={{
            backgroundImage: 'url("/gcc/build-gcc-hero.png")',
            backgroundSize: "auto 120%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F10] via-[#0A0F10]/94 to-[#0A0F10]/72" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                Offshore Capability Center Hiring
              </p>
              <h1 className="text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
                Offshore Capability Center Hiring Built for Enterprise Scale
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-200 sm:text-xl">
                From engineering and product to finance, shared services, and leadership hiring, EarlyJobs helps
                Global Capability Centers build scalable hiring operations through Human + AI recruitment infrastructure.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                Whether you&apos;re setting up a new offshore capability center or expanding an existing team, we provide
                dedicated recruiter pods, AI-assisted recruitment workflows, and nationwide hiring expertise to
                accelerate growth without compromising quality.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+918217527926"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Book Offshore Hiring Consultation
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@earlyjobs.in"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Download Offshore Hiring Playbook
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Offshore Hiring Flow</p>
              <div className="mt-6 space-y-3">
                {HERO_FLOW.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F08504]/15 text-xs font-bold text-[#F08504]">
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium text-slate-100">{step}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div
            className="rounded-[2rem] border border-slate-200 bg-center bg-cover p-8"
            style={{ backgroundImage: 'url("/gcc/partner-dubai-illustration.png")' }}
          >
            <div className="rounded-[1.5rem] bg-white/80 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1e3a8a]">Evolution Timeline</p>
              <div className="mt-6 space-y-3">
                {EVOLUTION.map((stage, index) => (
                  <div key={stage} className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-sm">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-semibold text-slate-800">{stage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
              Why Offshore Hiring Has Changed
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Offshore Capability Centers Are No Longer Cost Centers. They&apos;re Innovation Centers.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              Modern offshore centers are responsible for engineering, product development, AI, data, cybersecurity,
              finance, customer success, and shared services.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Hiring has become a strategic business capability. The companies that scale fastest are the ones that
              invest in structured hiring operations, not just recruitment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Challenges Offshore Capability Centers Face</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {CHALLENGES.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Target className="mb-3 h-5 w-5 text-[#F08504]" />
                <p className="text-sm font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base font-medium text-slate-700">
            These challenges don&apos;t appear when hiring 10 people. They appear when you&apos;re hiring 100+ across
            multiple teams.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
          Why Traditional Hiring Models Break Down
        </h2>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 bg-[#0A0F10] text-sm font-semibold text-white">
            <div className="px-5 py-4">Traditional Model</div>
            <div className="border-l border-white/10 px-5 py-4">Offshore Hiring Reality</div>
          </div>
          {COMPARISON_ROWS.map(([left, right]) => (
            <div key={left} className="grid grid-cols-2 border-t border-slate-200 text-sm">
              <div className="bg-slate-50 px-5 py-4 text-slate-600">{left}</div>
              <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{right}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg font-semibold text-[#1e3a8a]">
          Recruitment alone cannot support enterprise-scale offshore growth. Operations can.
        </p>
      </section>

      <section className="relative overflow-hidden bg-white py-16 text-slate-900 lg:py-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
            The EarlyJobs Offshore Hiring Framework
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-bold sm:text-4xl">
            A Structured Hiring Operating Model for Offshore Capability Centers
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {FRAMEWORK.map(([title, desc], index) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm">
                <div className="mb-3 inline-flex rounded-full bg-[#F08504]/15 px-3 py-1 text-xs font-semibold text-[#F08504]">
                  Phase {index + 1}
                </div>
                <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What EarlyJobs Delivers</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DELIVERS.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <CheckCircle2 className="mb-3 h-5 w-5 text-[#F08504]" />
              <p className="text-sm font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Roles We Hire</h2>
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

      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-20">
        <div
          className="absolute inset-0 bg-right bg-no-repeat opacity-28"
          style={{
            backgroundImage: 'url("/gcc/build-gcc-tower.png")',
            backgroundSize: "auto 120%",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F10] via-[#0A0F10]/95 to-[#0A0F10]/78" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold">Business Outcomes</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {OUTCOMES.map((item) => (
                  <div key={item} className="rounded-2xl bg-[#F08504]/10 p-4 text-sm font-semibold text-orange-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Why Enterprises Trust EarlyJobs</h2>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {TRUST.map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-100">
                    {item}
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
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Delivery Governance</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Offshore hiring needs governance, not just recruitment activity.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              EarlyJobs brings weekly reviews, dashboards, SLA tracking, interview metrics, offer funnel visibility,
              leadership reporting, and recruiter performance reviews to enterprise offshore delivery.
            </p>
          </div>
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-[#1e3a8a]/5 p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {GOVERNANCE.map((item) => (
                <div key={item} className="rounded-xl bg-white px-4 py-3 shadow-sm">
                  <div className="flex items-start gap-3">
                    <BarChart3 className="mt-0.5 h-4 w-4 text-[#1e3a8a]" />
                    <p className="text-sm font-medium text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">Success Story</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            A Process-Led Approach to Offshore Hiring Outcomes
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-5">
            {SUCCESS.map((item, index) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <p className="mt-4 text-base font-semibold text-slate-900">{item}</p>
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
          <h2 className="text-3xl font-bold sm:text-4xl">
            Build an Offshore Hiring Engine That Can Scale with Your Business
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100">
            Whether you&apos;re hiring 25 people or building a 1,000-person capability center, EarlyJobs helps you
            execute hiring with speed, structure, and confidence.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918217527926"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book Offshore Hiring Consultation
            </a>
            <a
              href="mailto:info@earlyjobs.in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download Offshore Hiring Playbook
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
