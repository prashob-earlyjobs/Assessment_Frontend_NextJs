"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronDown,
  Handshake,
  Network,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

const HERO_FLOW = [
  "Global HQ",
  "India GCC",
  "Dedicated Recruiter Pods",
  "AI Hiring Operations",
  "Hiring Dashboard",
  "Successful Joins",
];

const IMPACT_POINTS = [
  "Speed-to-Hire",
  "Employer Brand",
  "Candidate Experience",
  "Hiring Costs",
  "Leadership Confidence",
  "Business Expansion",
];

const POOR_OUTCOMES = [
  "Slow hiring",
  "Vendor management complexity",
  "Poor visibility",
  "Candidate drop-offs",
  "Inconsistent hiring quality",
];

const GCC_NEEDS = [
  "Dedicated Hiring Teams",
  "Engineering Recruiters",
  "Leadership Hiring Specialists",
  "AI-assisted Recruitment",
  "Interview Operations",
  "Candidate Experience",
  "Offer Management",
  "Hiring Analytics",
  "Talent Intelligence",
  "Recruiter Network",
  "Employer Branding",
  "Scalable Recruitment",
];

const COMPARISON_ROWS = [
  ["Works role-by-role", "Builds long-term hiring capability"],
  ["Individual recruiters", "Dedicated recruiter pods"],
  ["Manual tracking", "Centralized hiring dashboards"],
  ["Limited specialization", "Domain-specific recruiters"],
  ["Reactive hiring", "Workforce planning"],
  ["Basic reporting", "Hiring analytics & governance"],
];

const PARTNER_CAPABILITIES = [
  "Dedicated Hiring Pods",
  "Recruitment Operations",
  "AI-powered sourcing",
  "Candidate engagement",
  "Interview coordination",
  "Offer management",
  "Hiring dashboards",
  "Recruitment governance",
  "Workforce planning",
  "Continuous hiring optimization",
];

const RECRUITMENT_SERVICES = [
  "Engineering Hiring",
  "Leadership Hiring",
  "Product Hiring",
  "Shared Services",
  "Campus Hiring",
  "Volume Hiring",
  "Confidential Hiring",
  "Multi-location Hiring",
  "Specialized Technology Hiring",
  "Recruitment Process Management",
  "Employer Branding Support",
  "Recruitment Analytics",
];

const HOW_WE_WORK = [
  "Hiring Discovery",
  "Hiring Planning",
  "Recruiter Pod Setup",
  "Talent Mapping",
  "AI Candidate Discovery",
  "Screening",
  "Interview Management",
  "Offer Rollout",
  "Joining",
  "Hiring Reporting",
];

const INDUSTRIES = [
  "Technology",
  "SaaS",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "BFSI",
  "Telecom",
  "Automotive",
  "Global Business Services",
  "Product Companies",
  "Enterprise IT",
  "Consulting",
];

const OUTCOMES = [
  "Accelerate Hiring",
  "Improve Recruiter Productivity",
  "Reduce Vendor Complexity",
  "Increase Offer Acceptance",
  "Improve Candidate Experience",
  "Scale Across India",
  "Better Hiring Visibility",
  "Lower Cost-per-Hire",
];

const DIFFERENTIATORS = [
  "Nationwide Recruiter Network",
  "Human + AI Hiring Infrastructure",
  "Dedicated Recruiter Pods",
  "Enterprise Recruitment Operations",
  "Hiring Analytics & Reporting",
  "Proven GCC Hiring Experience",
];

const ENGAGEMENT_MODELS = [
  "Project Hiring",
  "Dedicated Recruiter Pods",
  "Recruitment as a Service (RaaS)",
  "Long-term Hiring Partnership",
  "Leadership Search",
  "High-volume Recruitment",
];

const SUCCESS_FRAMEWORK = ["Discover", "Design", "Deploy", "Deliver", "Optimize", "Scale"];

const FAQS = [
  ["What makes a good GCC recruitment partner?", "A strong GCC recruitment partner delivers dedicated hiring teams, process visibility, domain expertise, and scalable execution instead of just sending resumes."],
  ["How is EarlyJobs different from recruitment agencies?", "EarlyJobs builds hiring infrastructure through recruiter pods, operations, AI workflows, dashboards, and governance. Traditional agencies typically focus only on vacancy filling."],
  ["Do you provide dedicated recruiters?", "Yes. We deploy dedicated recruiter pods aligned to your functions, business units, and hiring priorities."],
  ["Can you support engineering hiring?", "Yes. Engineering hiring is one of our core strengths, from software teams to specialized technology roles."],
  ["Can you hire leadership roles?", "Yes. We support leadership hiring alongside high-volume and specialist hiring requirements."],
  ["How do recruiter pods work?", "Recruiter pods are structured teams that operate as an extension of your talent acquisition function with clear ownership, coordination, and reporting."],
  ["Can you hire across multiple cities?", "Yes. Our nationwide recruiter network supports multi-city GCC hiring across India."],
  ["How quickly can hiring begin?", "Hiring can begin quickly after discovery, planning, and recruiter pod deployment are aligned to your priorities."],
  ["How do you measure hiring performance?", "We use hiring dashboards, funnel reporting, recruiter productivity metrics, and offer-to-join performance to measure outcomes."],
  ["Do you support confidential hiring?", "Yes. We support confidential, leadership, and strategic hiring with the required discretion and governance."],
];

const RELATED = [
  { href: "/gcc-hiring-solutions", label: "GCC Hiring Solutions" },
  { href: "/build-gcc-india", label: "Build GCC in India" },
  { href: "/offshore-capability-center-hiring", label: "Offshore Capability Center Hiring" },
  { href: "/gcc-talent-acquisition", label: "GCC Talent Acquisition" },
  { href: "/india-gcc-hiring-services", label: "India GCC Hiring Services" },
];

export default function GccRecruitmentPartnerPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-[#0A0F10] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(30,58,138,0.45),transparent_50%),radial-gradient(circle_at_bottom_right,rgba(240,133,4,0.18),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-28 sm:px-6 lg:px-8 lg:pt-32">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                GCC Recruitment Partner
              </p>
              <h1 className="text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
                Your GCC Needs More Than a Recruitment Agency. It Needs a Hiring Partner.
              </h1>
              <p className="mt-5 text-lg font-medium leading-relaxed text-slate-200 sm:text-xl">
                Scale your Global Capability Center with a dedicated recruitment partner that combines nationwide
                recruiter networks, Human + AI hiring operations, and enterprise-grade recruitment execution.
              </p>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
                Whether you&apos;re hiring your first engineering team or expanding across multiple business functions,
                EarlyJobs helps Global Capability Centers accelerate hiring through structured recruitment operations,
                dedicated recruiter pods, and deep expertise in India&apos;s talent market.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:+918217527926"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Book a Recruitment Strategy Call
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="mailto:info@earlyjobs.in"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Our GCC Hiring Framework
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Partner Ecosystem</p>
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
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
              Why Choosing the Right Recruitment Partner Matters
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              The Success of Your GCC Depends on the Quality of Your Hiring Partner.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600">
              A recruitment partner doesn&apos;t simply fill vacancies. They influence speed-to-hire, employer brand,
              candidate experience, hiring costs, leadership confidence, and business expansion.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {IMPACT_POINTS.map((item) => (
                <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5">
              <p className="text-sm font-semibold text-red-700">Poor recruitment partnerships create:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {POOR_OUTCOMES.map((item) => (
                  <span key={item} className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-red-700 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 p-8">
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: 'url("/gcc/partner-dubai-illustration.png")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/70 to-[#1e3a8a]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/15" />
            <div className="relative space-y-4">
              {["Business Growth", "Hiring Partner", "Recruitment Operations", "Business Outcomes"].map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1e3a8a] text-sm font-bold text-white">
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
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">What Enterprise GCCs Actually Need</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {GCC_NEEDS.map((item) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <Handshake className="mb-3 h-5 w-5 text-[#1e3a8a]" />
                <p className="text-sm font-semibold text-slate-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-base font-medium text-slate-700">
            Most recruitment agencies deliver resumes. Enterprise organizations need predictable hiring outcomes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="max-w-3xl text-3xl font-bold text-slate-900 sm:text-4xl">
          Why Traditional Recruitment Agencies Fall Short
        </h2>
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="grid grid-cols-2 bg-[#1e3a8a] text-sm font-semibold text-white">
            <div className="px-5 py-4">Traditional Agency</div>
            <div className="border-l border-white/10 px-5 py-4">Enterprise GCC Requirements</div>
          </div>
          {COMPARISON_ROWS.map(([left, right]) => (
            <div key={left} className="grid grid-cols-2 border-t border-slate-200 text-sm">
              <div className="bg-slate-50 px-5 py-4 text-slate-600">{left}</div>
              <div className="border-l border-slate-200 px-5 py-4 font-medium text-slate-900">{right}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg font-semibold text-[#1e3a8a]">
          Recruitment agencies focus on vacancies. EarlyJobs focuses on hiring infrastructure.
        </p>
      </section>

      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(30,58,138,0.45),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(240,133,4,0.14),transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
                Meet Your GCC Recruitment Partner
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Built to Become an Extension of Your Talent Acquisition Team.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-400">
                Instead of assigning one recruiter, EarlyJobs builds a structured hiring engine with pods, operations,
                sourcing, candidate engagement, governance, dashboards, workforce planning, and ongoing optimization.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {PARTNER_CAPABILITIES.map((item) => (
                  <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="space-y-3">
                {["Client", "Recruitment Lead", "Recruiter Pod", "AI Layer", "Candidate Pipeline", "Hiring Dashboard"].map(
                  (item, index) => (
                    <div key={item} className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F08504]/15 text-xs font-bold text-[#F08504]">
                        {index + 1}
                      </div>
                      <div className="flex-1 rounded-xl border border-white/10 bg-[#0A0F10]/50 px-4 py-3 text-sm font-medium text-white">
                        {item}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Recruitment Services for GCCs</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RECRUITMENT_SERVICES.map((item) => (
            <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <Target className="mb-3 h-5 w-5 text-[#F08504]" />
              <p className="text-sm font-semibold text-slate-800">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How We Work</h2>
          <div className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
            A structured recruitment operating model designed to improve coordination, visibility, and hiring quality
            as your GCC scales.
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {HOW_WE_WORK.map((step, index) => (
              <div
                key={step}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-sm"
              >
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#F08504] to-[#1e3a8a]" />
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Step {index + 1}</p>
                    <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900">{step}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Industries We Support</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          {INDUSTRIES.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
            >
              {industry}
            </span>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0A0F10] py-16 text-white lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(30,58,138,0.42),transparent_40%),radial-gradient(circle_at_top_left,rgba(240,133,4,0.12),transparent_38%)]" />
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
              <h2 className="text-3xl font-bold">Why EarlyJobs</h2>
              <div className="mt-8 space-y-3">
                {DIFFERENTIATORS.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-[#F08504]" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Enterprise Engagement Models</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ENGAGEMENT_MODELS.map((item) => (
            <div key={item} className="rounded-2xl border border-[#1e3a8a]/20 bg-[#1e3a8a]/5 p-6 shadow-sm">
              <ShieldCheck className="mb-3 h-5 w-5 text-[#1e3a8a]" />
              <p className="text-base font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F08504]">
            Customer Success Framework
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            A Repeatable Framework for Enterprise Recruitment Delivery
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
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
          <h2 className="text-3xl font-bold sm:text-4xl">
            Looking for a Recruitment Partner That Can Scale with Your GCC?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100">
            Build a hiring engine designed for enterprise growth, not just vacancy filling.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+918217527926"
              className="inline-flex items-center gap-2 rounded-xl bg-[#F08504] px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
            >
              Book a Recruitment Strategy Call
            </a>
            <a
              href="mailto:info@earlyjobs.in"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Download GCC Hiring Framework
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Related Pages</h3>
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
