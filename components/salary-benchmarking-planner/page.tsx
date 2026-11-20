import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { SalaryBenchmarkingCalculator } from "@/components/salary-benchmarking-planner/calculator";
import { SalaryBenchmarkingFaq } from "@/components/salary-benchmarking-planner/faq";

const whyItMatters = [
  {
    title: "Recruitment budgeting",
    body: "Estimate the salary expenditure associated with planned headcount.",
  },
  {
    title: "Location comparison",
    body: "Model different salary assumptions across facilities or cities.",
  },
  {
    title: "Hiring approvals",
    body: "Provide finance teams with transparent compensation calculations.",
  },
  {
    title: "Workforce expansion",
    body: "Estimate the salary budget required for additional positions.",
  },
  {
    title: "Scenario planning",
    body: "Compare proposed salary ranges before finalizing recruitment requirements.",
  },
] as const;

const industries = [
  {
    title: "Hospitals",
    body: "Compare administrative salary budgets across branches.",
  },
  {
    title: "Manufacturers",
    body: "Evaluate proposed compensation for production trainees at different plants.",
  },
  {
    title: "Logistics",
    body: "Plan compensation for warehouse positions across several facilities.",
  },
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Organise internal and external recruitment spend per completed hire.",
  },
  {
    href: "/tools/vacancy-cost-calculator",
    title: "Vacancy Cost Calculator",
    body: "Estimate the financial impact of unfilled positions.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture approved vacancies, salaries and joining timelines before sourcing.",
  },
] as const;

export function SalaryBenchmarkingPlannerPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(37,99,235,0.08), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            EarlyJobs · Employer tools
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
            Salary Benchmarking Planner
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Salary Benchmarking Planner is a free compensation planning tool that rolls
            up salary assumptions and headcount across roles and locations — so HR and finance teams in
            India can compare hiring budget scenarios before approving manufacturing, healthcare, or
            logistics recruitment drives.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#planner">Start Salary Planning</SolidLink>
            <GhostLink href="#how-it-works">How it works</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR leaders, compensation teams, founders, finance managers and talent acquisition
            teams.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Salary Benchmarking?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Salary benchmarking is the process of comparing compensation for similar positions
              using relevant and reliable salary information.
            </p>
            <p>
              Employers may use internal payroll records, verified market surveys or other
              appropriately sourced compensation data. A useful comparison should consider job
              responsibilities, experience requirements, location and employment type.
            </p>
            <p>
              Without reliable market data, a tool can calculate salary scenarios but cannot
              establish whether a salary is above or below the market.
            </p>
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="block rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-3 font-medium text-neutral-950">
                Hiring Salary Budget = Σ (Proposed Salary × Planned Headcount) per role or location
              </code>
            </p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the EarlyJobs Planner Works
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The initial tool focuses on employer-provided information. Enter a role, location,
            proposed salary, headcount and optional comparison figures. The planner then estimates
            monthly and annual compensation budgets and — when a comparison salary is entered —
            the percentage difference between the two amounts.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Job title",
              "Industry",
              "Hiring location",
              "Proposed monthly salary",
              "Number of positions",
              "Optional comparison salary & allowances",
            ].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium tracking-[-0.02em]"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            All figures are clearly identified as user-provided unless verified external benchmark
            data is integrated.
          </p>
        </div>
      </section>

      <section id="planner" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Build your salary scenario
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Results appear immediately from your inputs — with monthly budget, annual budget and an
            optional two-scenario comparison chart.
          </p>
          <div className="mt-10">
            <SalaryBenchmarkingCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Example
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Understanding Salary Differences
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Consider a hypothetical employer planning to recruit 20 production trainees. The
              proposed monthly salary is ₹18,000 per employee. The employer also enters a comparison
              salary of ₹20,000.
            </p>
            <p>
              The difference is ₹2,000 per employee per month. For 20 employees, that represents
              ₹40,000 in monthly base salary expenditure. The annual difference is ₹4,80,000,
              excluding additional employment costs.
            </p>
            <p className="rounded-xl border border-black/10 bg-white px-4 py-4 text-sm leading-6 text-neutral-700">
              These are illustrative calculations, not verified salary benchmarks.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Compensation Planning Matters
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyItMatters.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Compensation planning should also consider applicable minimum wages, statutory
            contributions and employment obligations.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Industries
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Salary Planning Across Industries
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {industries.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Each scenario should use role-specific and location-specific assumptions.
          </p>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Next step
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Salary Planning to Recruitment
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once compensation and headcount requirements are approved, employers can use the
              results to prepare a recruitment brief.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can assess hiring needs based on role category, location, compensation range
              and expected hiring volume.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="salary_benchmarking_planner_enquiry"
            sourceLabel="Salary Benchmarking Planner"
            submitLabel="Discuss Hiring Within Your Approved Budget"
            defaultMessage="Hiring discussion requested from salary benchmarking planner page."
            extraFields="electronics"
          />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <SalaryBenchmarkingFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            About EarlyJobs
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs is an India-focused recruitment platform that helps employers hire for
            manufacturing plants, healthcare staffing, and other high-volume roles — with free salary
            planning tools and recruiter support when budgets turn into live hiring.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            Related hiring resources
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            {related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group block border-t border-black/10 pt-4 transition-colors hover:border-brand"
                >
                  <h3 className="text-base font-semibold tracking-[-0.02em] group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Hiring Salary Plan
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Compare employer-provided salary inputs and estimate monthly and annual hiring budgets.
          </p>
          <div className="mt-8">
            <SolidLink href="#planner">Start Salary Planning</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
