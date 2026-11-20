import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { RoiFaq } from "@/components/recruiting-roi-calculator/faq";
import { RoiHeroMockup } from "@/components/recruiting-roi-calculator/hero-mockup";
import { RoiCalculator } from "@/components/recruiting-roi-calculator/roi-calculator";

const whyCalculate = [
  {
    title: "Align HR with business goals",
    body: "Show how faster hiring drives productivity. For example, each unfilled production line shift could cost hundreds in lost output.",
  },
  {
    title: "Justify technology spend",
    body: "When evaluating new recruiting software or agency fees, quantify the payback. A small reduction in time-to-hire or agency fee often covers the tool’s subscription cost.",
  },
  {
    title: "Measure process improvements",
    body: "If you improve candidate conversion rates or interview quality, see the long-term value in dollars executives already understand.",
  },
] as const;

const inputs = [
  {
    title: "Total open positions per year",
    body: "The more hires you make, the greater the potential impact of any improvement.",
  },
  {
    title: "Average days to fill a position",
    body: "Every day a role is vacant has a cost (e.g. paying overtime or lost sales). Lowering this accelerates value.",
  },
  {
    title: "Cost of unfilled position per day",
    body: "Estimate productivity loss or revenue gap each vacant day causes. An unfilled sales role might miss $500 in daily sales.",
  },
  {
    title: "Current cost per hire",
    body: "Factor all recruiting costs — job ads, agency fees, and recruiter salaries — into one baseline.",
  },
  {
    title: "Estimated improvement (%)",
    body: "Enter the expected percentage change from an initiative (e.g. 20% faster hiring with new automation).",
  },
] as const;

const outputs = [
  {
    title: "Annual days saved",
    body: "Vacancies eliminated by faster hiring across your annual volume.",
  },
  {
    title: "Cost savings",
    body: "Combined reduction in lost output and recruiting expenses.",
  },
  {
    title: "ROI percentage",
    body: "Dollars saved versus investment in the solution.",
  },
] as const;

const tips = [
  {
    title: "Be realistic",
    body: "Use conservative improvement estimates (20–30%) unless you have pilot data. Overstating gains leads to disappointment.",
  },
  {
    title: "Update inputs",
    body: "Whenever your hiring volume or costs change, recalc the ROI. This keeps your business case current.",
  },
  {
    title: "Share insights",
    body: "Embed results in presentations for leadership or the board. Explain how reducing vacancy days adds up to business value.",
  },
] as const;

const beforeAfter = [
  {
    label: "Before",
    title: "Current hiring",
    points: [
      "Time-to-fill tracked in spreadsheets",
      "Vacancy cost estimated in meetings",
      "Tool spend justified with anecdotes",
    ],
  },
  {
    label: "After",
    title: "With improvement modeled",
    points: [
      "Days saved calculated instantly",
      "Vacancy + recruiting savings combined",
      "Clear ROI narrative for stakeholders",
    ],
  },
] as const;

const related = [
  {
    href: "/salary-benchmark-tool",
    title: "Salary benchmarking tool",
    body: "Set competitive offers with industry and location pay ranges.",
  },
  {
    href: "/ai-recruiting-automation-manufacturing",
    title: "AI recruiting automation for manufacturing",
    body: "See how faster plant hiring reduces vacancy days at scale.",
  },
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "AI recruiting automation for healthcare",
    body: "Model clinical staffing improvements that recover lost output.",
  },
] as const;

const ctaHref = "#calculator";

export function RecruitingRoiCalculatorPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(37,99,235,0.07), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Recruiting ROI
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Recruiting ROI Calculator
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              The EarlyJobs Recruiting ROI Calculator is a free browser tool that converts your
              time-to-fill, daily vacancy cost, cost per hire, and hiring volume into an estimated
              return on recruiting programs — so HR and finance leaders in India can justify budgets
              with transparent math.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href={ctaHref}>Try the Recruiting ROI Calculator</SolidLink>
              <GhostLink href="#how-it-works">See how it works</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              Built for HR directors, talent acquisition leaders, CFOs, and recruitment marketing
              managers.
            </p>
          </div>
          <RoiHeroMockup />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What is recruiting ROI?
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Recruiting ROI measures whether a hiring program or tool returns more value than it costs,
            usually through fewer vacant days and lower recruiting spend. This calculator combines
            vacancy savings and recruiting efficiency gains, then compares them to your annual
            investment.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            <code className="rounded bg-white px-1.5 py-0.5 text-[14px] text-neutral-950">
              ROI % = (Total Savings − Annual Investment) ÷ Annual Investment × 100
            </code>
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Turn hiring metrics into a financial narrative executives trust.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              HR leaders often struggle to justify recruiting budgets. How do you demonstrate the
              business impact of a new recruitment platform, referral program, or sourcing campaign?
              A Recruiting ROI Calculator converts hiring metrics into financial impact, making it
              easier to convince stakeholders that your strategies are paying off.
            </p>
            <p>
              Input your current metrics — time-to-fill, vacancy costs, agency fees — and see how
              improvements affect your bottom line. Reducing average time-to-hire by a week might
              save thousands in lost productivity, while a small increase in offer acceptance can
              boost revenue.
            </p>
            <p>
              Understanding ROI is not magic — it’s math. By modeling the financial gains of better
              hiring, you gain a clear narrative: “By automating interviews, we could save $X each
              month.”
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why calculate recruiting ROI?
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Credibility comes from hard numbers — not assumptions.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Many companies operate in the dark, assuming improved recruiting will help but without
            hard numbers. A talent leader who can say “We recouped the CRM investment in 6 months by
            reducing agency hires” gains credibility and budget for innovation.
          </p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-3">
            {whyCalculate.map((item) => (
              <li key={item.title} className="bg-white p-6 sm:p-8">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {beforeAfter.map((column) => (
              <div
                key={column.label}
                className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
              >
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                  {column.label}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">{column.title}</h3>
                <ul className="mt-5 space-y-3">
                  {column.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm leading-6 text-neutral-700">
                      <span
                        aria-hidden
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How our Recruiting ROI Calculator works
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Clear inputs. Instant financial impact.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The calculator is structured into clear input sections. Here’s what you’ll need and why
            each field matters.
          </p>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inputs.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-14">
            <h3 className="text-xl font-semibold tracking-[-0.03em]">What the results show</h3>
            <ul className="mt-8 grid gap-8 sm:grid-cols-3">
              {outputs.map((item) => (
                <li key={item.title}>
                  <h4 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
              As an example, if hiring automation reduces average time-to-fill by 10 days across 100
              hires, the calculator might show substantial lost-production savings plus recruiting
              efficiency gains — often yielding well over 200% ROI on a modest annual investment.
              These numbers help you prioritize projects that move the needle most.
            </p>
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Calculate your recruiting ROI now.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Adjust the inputs below for instant feedback — annual days saved, cost savings, and ROI
            percentage update as you type.
          </p>
          <div className="mt-10">
            <RoiCalculator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Using the calculator effectively
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Transparent math. No advanced analytics required.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            You don’t need a data science team — just your basic hiring data. By playing with the
            numbers, you’ll discover which levers (time, cost, volume) have the biggest impact for
            your organization.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {tips.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <RoiFaq />
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
            calculators, recruiter support, and tools built for talent and finance teams.
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
            Calculate your recruiting ROI now.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Try our Hiring Investment Calculator — convert time-to-fill and cost-per-hire into a
            stakeholder-ready ROI story.
          </p>
          <div className="mt-8">
            <SolidLink href={ctaHref}>Try the Recruiting ROI Calculator</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
