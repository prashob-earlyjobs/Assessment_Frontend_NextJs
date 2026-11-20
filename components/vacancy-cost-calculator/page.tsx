import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { VacancyCostCalculator } from "@/components/vacancy-cost-calculator/calculator";
import { VacancyCostFaq } from "@/components/vacancy-cost-calculator/faq";

const inputsGuide = [
  {
    title: "Number of vacant positions",
    body: "Enter the number of positions being evaluated.",
  },
  {
    title: "Average vacancy duration",
    body: "Enter the number of days each position is expected to remain unfilled.",
  },
  {
    title: "Estimated daily impact",
    body: "Use an organisation-specific estimate of the financial effect of each vacant position.",
  },
  {
    title: "Temporary coverage expenses",
    body: "Include relevant overtime or temporary staffing expenses not already counted elsewhere.",
  },
  {
    title: "Role category",
    body: "Optionally classify vacancies by department, facility or job function.",
  },
] as const;

const whyItMatters = [
  {
    title: "Workforce planning",
    body: "Understand the potential financial implications of prolonged vacancies.",
  },
  {
    title: "Recruitment prioritisation",
    body: "Identify roles where delays may have greater operational consequences.",
  },
  {
    title: "Budget discussions",
    body: "Compare recruitment spending with estimated vacancy-related expenses.",
  },
  {
    title: "Management reporting",
    body: "Present a transparent explanation of assumptions rather than general statements about hiring urgency.",
  },
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Organise internal and external recruitment spend per completed hire.",
  },
  {
    href: "/tools/employee-attrition-cost-calculator",
    title: "Employee Attrition Cost Calculator",
    body: "Estimate replacement, training and vacancy costs when employees leave.",
  },
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
] as const;

export function VacancyCostCalculatorPage() {
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
            Vacancy Cost Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Vacancy Cost Calculator is a free tool that estimates what open roles may
            cost your business — vacancy days, daily operational impact, and temporary coverage — using
            assumptions you control. Built for HR, plant, and finance teams prioritising manufacturing
            and high-volume hiring in India.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Calculate Vacancy Cost</SolidLink>
            <GhostLink href="#formula">See the formula</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR leaders, finance managers, plant heads, operations managers and business owners.
          </p>
        </div>
      </section>

      <section id="formula" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Cost of Vacancy?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Cost of vacancy is an estimate of the financial impact associated with leaving a
              position unfilled for a defined period. It may include additional labour expenses,
              temporary coverage costs and measurable operational losses.
            </p>
            <p>
              There is no universal cost-per-day figure that applies to every role. Employers should
              calculate vacancy costs using the circumstances of their organisation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Formula
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              How to Calculate Vacancy Cost
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="block rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
                Estimated Vacancy Cost = Vacancy Days × Daily Vacancy Impact + Additional Direct
                Coverage Costs
              </code>
            </p>
            <p>
              For multiple positions: Total Vacancy Cost = Sum of Estimated Costs Across Vacant
              Positions. If overtime is already included in the daily vacancy impact, it should not
              be added again as a separate coverage expense.
            </p>
            <p>
              Example: 5 vacant positions × 12 days × ₹800 daily impact + ₹10,000 coverage = ₹58,000.
              This is an illustrative estimate, not an industry benchmark or a guaranteed loss.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Inputs
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Information Should Employers Enter?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inputsGuide.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-[#f8fafc] p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Estimate vacancy cost with your assumptions
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Enter vacancies, duration, daily impact and coverage costs. Compare two duration
            scenarios, then copy a summary — with no mandatory contact form before results.
          </p>
          <div className="mt-10">
            <VacancyCostCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Vacancy Cost Matters
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
            Vacancy cost should not be used to justify compromising candidate evaluation, workplace
            safety or legal requirements.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Planning
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Workforce Cost to Recruitment Planning
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Once employers understand their vacancy exposure, they can prioritise hiring
              requirements more clearly. Compare scenarios such as filling a role in 15 days versus
              30 days to illustrate the potential value of reducing vacancy duration.
            </p>
            <p>
              EarlyJobs can assess recruitment needs based on role categories, locations, hiring
              volumes and expected timelines.
            </p>
            <div className="pt-2">
              <SolidLink href="/contact-us">Discuss Your Priority Vacancies</SolidLink>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <VacancyCostFaq />
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
            manufacturing plants, healthcare staffing, and other high-volume roles — with free vacancy
            and ROI calculators plus recruiter support when roles cannot stay open long.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
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
            Calculate Your Vacancy Cost
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Model duration, daily impact and coverage expenses for the roles that matter most.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Calculate Vacancy Cost</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
