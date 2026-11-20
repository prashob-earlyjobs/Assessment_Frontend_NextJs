import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { EmployeeAttritionCostCalculator } from "@/components/employee-attrition-cost-calculator/calculator";
import { EmployeeAttritionCostFaq } from "@/components/employee-attrition-cost-calculator/faq";

const inputsNeeded = [
  {
    title: "Employee departures",
    body: "Enter the number of employees who left during the selected period.",
  },
  {
    title: "Replacement recruitment cost",
    body: "Include relevant advertising, agency fees, recruiter time and assessment expenses.",
  },
  {
    title: "Vacancy duration",
    body: "Enter the average number of days positions remained unfilled.",
  },
  {
    title: "Daily vacancy cost",
    body: "Use an organisation-specific estimate of the financial impact of an unfilled position.",
  },
  {
    title: "Training and replacement expenses",
    body: "Include relevant induction, job training and other direct replacement costs.",
  },
] as const;

const whyItMatters = [
  {
    title: "Workforce budgeting",
    body: "Estimate the financial consequences of repeated replacement hiring.",
  },
  {
    title: "Operational planning",
    body: "Understand how vacancy duration may affect workforce costs.",
  },
  {
    title: "Retention discussions",
    body: "Build a more structured financial case for reviewing retention initiatives.",
  },
  {
    title: "Recruitment channel evaluation",
    body: "Compare replacement recruitment expenses across different approaches.",
  },
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Organise internal and external recruitment costs into average cost per hire.",
  },
  {
    href: "/ai-recruiting-automation-manufacturing",
    title: "Manufacturing Recruitment",
    body: "Explore structured hiring for high-volume plant and operator roles.",
  },
  {
    href: "/warehouse-distribution-centre-recruitment",
    title: "Warehouse Recruitment",
    body: "Plan entry-level hiring for pickers, packers, inventory and dispatch teams.",
  },
] as const;

export function EmployeeAttritionCostCalculatorPage() {
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
        <div className="page-shell relative pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-24">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            EarlyJobs · Employer tools
          </p>
          <h1 className="mt-4 max-w-3xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
            Employee Attrition Cost Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Employee Attrition Cost Calculator is a free employer tool that combines
            replacement recruiting, training, and vacancy assumptions to estimate what departures may
            cost — so HR and plant leaders in India can discuss retention and hiring speed with
            finance using transparent inputs, not guesswork.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Calculate Attrition Cost</SolidLink>
            <GhostLink href="#formula">See the formula</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR leaders, plant managers, finance teams and workforce planning professionals.
          </p>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <EmployeeAttritionCostCalculator />
        </div>
      </section>

      <section id="formula" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Employee Attrition Cost?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Employee attrition cost is the estimated expense associated with employees leaving an
              organization and the process of replacing them. It may include recruitment, training,
              temporary coverage and vacancy-related costs.
            </p>
            <p>
              There is no single universal calculation that fits every organization. A useful model
              should explain what is included, how assumptions are defined and where expenses may
              overlap.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Method
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How to Calculate Employee Attrition Cost
          </h2>
          <div className="mt-8 space-y-4">
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="block rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
                Total Attrition Cost = Replacement Recruitment Costs + Training Costs + Vacancy Costs
                + Other Direct Replacement Expenses
              </code>
            </p>
            <p className="rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
              Estimated Period Cost = Average Cost per Departure × Number of Departures
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Employers should avoid double-counting costs already included in another category. For
            example, if overtime expenses are used to estimate vacancy coverage, they should not
            automatically be added again as lost productivity.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Inputs
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Information Does the Calculator Need?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inputsNeeded.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Attrition Cost Matters
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyItMatters.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The result should be treated as a planning estimate, not a guaranteed financial loss.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Illustrative example
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Example Calculation
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>Consider an illustrative organization with:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>20 employee departures.</li>
              <li>₹4,000 recruitment cost per replacement.</li>
              <li>₹3,000 training cost per replacement.</li>
              <li>₹2,000 additional vacancy-related cost per departure.</li>
            </ul>
            <p>
              The estimated cost per departure is ₹9,000. Across 20 departures, the estimated total
              is ₹1,80,000.
            </p>
            <p>
              These values are hypothetical and are not presented as Indian industry benchmarks.
              Actual costs may differ significantly by role, industry and location.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Better decisions
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Using the Calculator for Better Hiring Decisions
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Employers can run separate estimates for different departments or job categories. A
              manufacturing facility may compare production operator replacement costs with
              technical staff replacement costs. A healthcare provider may evaluate administrative
              staff separately from specialist clinical positions.
            </p>
            <p>
              This helps avoid applying one average cost to fundamentally different roles. Employers
              should also consider retention, employee experience, compensation and workplace
              conditions when investigating attrition. Recruitment is only one part of the solution.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              How EarlyJobs Fits into Workforce Planning
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              When employers understand the scale and frequency of replacement hiring, they can
              define more realistic recruitment requirements.
            </p>
            <p>
              EarlyJobs can assess relevant hiring needs based on roles, locations, expected volumes
              and timelines.
            </p>
            <div className="pt-2">
              <SolidLink href="/contact-us">Discuss Recurring Hiring Requirements</SolidLink>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <EmployeeAttritionCostFaq />
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
            manufacturing plants, healthcare staffing, and other high-volume roles — with free
            attrition and funnel tools and recruiter support when turnover spikes on the line.
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
            Calculate Your Employee Attrition Cost
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Estimate replacement, training and vacancy costs with transparent assumptions.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Calculate Attrition Cost</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
