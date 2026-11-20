import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { CostPerHireCalculator } from "@/components/cost-per-hire-calculator/calculator";
import { CostPerHireFaq } from "@/components/cost-per-hire-calculator/faq";

const costBuckets = [
  {
    title: "Internal recruitment costs",
    body: "Recruiter compensation allocated to hiring, internal interview time, recruiting administration and relevant software expenses.",
  },
  {
    title: "External recruitment costs",
    body: "Job advertising, agency fees, assessments, candidate travel reimbursements and other third-party recruitment expenses.",
  },
] as const;

const whyItMatters = [
  {
    title: "Budget planning",
    body: "Understand how recruitment spending changes when hiring volumes increase.",
  },
  {
    title: "Channel evaluation",
    body: "Compare recruitment channels using consistent cost definitions.",
  },
  {
    title: "Workforce planning",
    body: "Estimate the recruitment budget associated with an upcoming hiring requirement.",
  },
  {
    title: "Management reporting",
    body: "Communicate hiring costs in a clear, repeatable format.",
  },
] as const;

const related = [
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
  {
    href: "/warehouse-distribution-centre-recruitment",
    title: "Warehouse Recruitment",
    body: "Plan entry-level hiring for pickers, packers, inventory and dispatch teams.",
  },
] as const;

export function CostPerHireCalculatorPage() {
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
            Cost Per Hire Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Cost Per Hire Calculator is a free employer tool that adds internal and
            external recruitment spending, then divides by completed hires — so HR and finance teams
            in India can see average cost per hire in INR for budgeting, agency reviews, and
            leadership reporting.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Calculate Cost Per Hire</SolidLink>
            <GhostLink href="#formula">See the formula</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR managers, founders, finance teams and talent acquisition leaders.
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
              What Is Cost Per Hire?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Cost per hire is a recruitment efficiency metric that measures the average amount spent
              to make one hire. A commonly used formula is:
            </p>
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-3 font-medium text-neutral-950">
                Cost per Hire = (Internal Recruiting Costs + External Recruiting Costs) ÷ Number of
                Hires
              </code>
            </p>
            <p>
              For example, if an organization spends ₹3,00,000 on recruitment during a defined period
              and completes 30 hires, its average cost per hire is ₹10,000. This is an illustrative
              calculation, not an industry benchmark.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Cost categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Costs Should Employers Include?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {costBuckets.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Organizations should establish clear accounting rules to avoid counting the same expense
            twice.
          </p>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the Calculator Works
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Enter recruitment costs for a selected period, then enter the number of completed hires.
            The calculator adds internal and external costs and divides by hires, showing the result
            in Indian rupees — with no mandatory lead form before results.
          </p>
          <div className="mt-10">
            <CostPerHireCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Business use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Cost Per Hire Matters
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
            Cost per hire should not be treated as the only measure of recruitment performance. A
            low-cost hire may still be unsuitable for the role.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Efficiency
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Reduce Unnecessary Recruitment Spending
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Improving cost per hire starts with understanding where expenses arise. Employers can
              review duplicated advertising, repeated interview rounds, poor candidate communication
              and hiring channels that produce few suitable applicants.
            </p>
            <p>
              A structured hiring brief can also help recruiters focus on relevant candidates from
              the beginning. EarlyJobs helps employers explore recruitment approaches aligned with
              their hiring requirements, locations and workforce needs.
            </p>
            <div className="pt-2">
              <SolidLink href="/contact-us">Discuss a More Efficient Hiring Approach</SolidLink>
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
            <CostPerHireFaq />
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
            hiring calculators and recruiter support when you need backup on high-volume drives.
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
            Calculate Your Hiring Costs
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Organise internal and external spend, then measure cost per hire with a consistent
            formula.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Calculate Cost Per Hire</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
