import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { SalaryFaq } from "@/components/salary-benchmark-tool/faq";
import { SalaryHeroMockup } from "@/components/salary-benchmark-tool/hero-mockup";
import { SalaryBenchmarkTool } from "@/components/salary-benchmark-tool/salary-tool";

const whyMatters = [
  {
    title: "Attract qualified candidates",
    body: "If your offer is 10% below market, top candidates may reject it or drop out late in the process.",
  },
  {
    title: "Retain employees",
    body: "Existing staff talk to peers. A new hire paid well above them can cause dissatisfaction.",
  },
  {
    title: "Control costs",
    body: "Know the typical salary band before budgeting. This prevents overpaying in competitive markets.",
  },
  {
    title: "Support business cases",
    body: "Use objective data when negotiating budget or explaining raises to leadership.",
  },
] as const;

const howInputs = [
  {
    title: "Role and level",
    body: "Select the job title (e.g. “Mechanical Engineer”) and level (entry, mid, senior).",
  },
  {
    title: "Industry / sector",
    body: "Choose manufacturing, healthcare, EV, or technology so data reflects similar employers.",
  },
  {
    title: "Location",
    body: "Select region or metro — salaries can differ greatly between markets.",
  },
  {
    title: "Experience range",
    body: "Optionally adjust for years of experience or specialized skills to refine the pay range.",
  },
] as const;

const usage = [
  {
    title: "Set salary ranges",
    body: "Use the median and percentile values to define low and high ends of an offer. Consider location adjustment for big cities.",
  },
  {
    title: "Plan budgets",
    body: "Multiply expected hires by average salary to forecast hiring costs for the year.",
  },
  {
    title: "Negotiate offers",
    body: "If a candidate requests a higher salary, show the market average to support your offer or counteroffer.",
  },
  {
    title: "Review equity",
    body: "Check that roles at similar levels align with external benchmarks and help identify pay gaps.",
  },
] as const;

const pitfalls = [
  {
    title: "Underpaying",
    body: "Offers below the benchmark line slow hiring and raise late-stage drop-off.",
    tone: "text-amber-700 bg-amber-50",
  },
  {
    title: "Market midpoint",
    body: "Competitive offers cluster near the median for role, industry, and location.",
    tone: "text-[#1d4ed8] bg-[#eff6ff]",
  },
  {
    title: "Overpaying",
    body: "Paying far above market wastes budget and can create internal equity issues.",
    tone: "text-rose-700 bg-rose-50",
  },
] as const;

const related = [
  {
    href: "/recruiting-roi-calculator",
    title: "Recruiting ROI calculator",
    body: "Translate hiring improvements into cost savings and stakeholder-ready ROI.",
  },
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "AI recruiting automation for healthcare",
    body: "Pair competitive clinical pay bands with faster staffing workflows.",
  },
  {
    href: "/employers",
    title: "For employers",
    body: "See how EarlyJobs supports enterprise talent acquisition teams.",
  },
] as const;

const ctaHref = "#tool";

export function SalaryBenchmarkToolPage() {
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
              EarlyJobs · Compensation
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Salary Benchmarking Tool
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              The EarlyJobs Salary Benchmarking Tool is a free browser tool that shows illustrative
              pay ranges by role, industry, and location — so HR and recruiting teams in India can
              set competitive offers for manufacturing, healthcare, EV, and technology hiring without
              guessing compensation bands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href={ctaHref}>Explore the Salary Benchmarking Tool</SolidLink>
              <GhostLink href="#how-it-works">See how it works</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For talent acquisition managers, HR directors, compensation analysts, and recruiters
              in healthcare, manufacturing, EV, and more.
            </p>
          </div>
          <SalaryHeroMockup />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What is salary benchmarking?
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Salary benchmarking compares pay for similar roles using role, level, industry, and
            location inputs. This tool surfaces low, median, and high illustrative bands for
            planning — you should still validate offers against your budget and trusted compensation
            sources before extending them to candidates.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Offer what candidates won’t refuse — without guessing.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Offering the right salary is key to attracting and keeping talent. Market rates vary
              widely by industry, location, and role level. Our Salary Benchmarking Tool helps
              employers quickly find data-driven pay ranges for specific positions in high-growth
              sectors.
            </p>
            <p>
              A manufacturing firm can compare the going rate for an entry-level production
              technician in their region, or a hospital can check the average salary for a junior
              nurse at area hospitals. Data is modeled from compensation surveys and labor stats so
              you’re not undershooting (which makes hiring slow) or overshooting (which wastes
              budget).
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why benchmarking salaries matters
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Faster offers. Stronger retention. Clearer budgets.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Manual salary surveys — calling competitors or emailing surveyors — are slow. A
            self-serve tool gives you answers instantly, so offer decisions move faster with more
            confidence.
          </p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
            {whyMatters.map((item) => (
              <li key={item.title} className="bg-white p-6 sm:p-8">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <h3 className="text-xl font-semibold tracking-[-0.03em]">
              Underpay, overpay, or hit the benchmark
            </h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {pitfalls.map((item) => (
                <li key={item.title} className={`rounded-2xl px-5 py-5 ${item.tone}`}>
                  <p className="text-sm font-semibold tracking-[-0.02em]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 opacity-90">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How the Salary Benchmarking Tool works
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Industry-specific benchmarks in four inputs.
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {howInputs.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The tool then displays a salary range (10th–90th percentile) and a median for that role
            in your selected sector. For example, it might show that the median salary for an
            entry-level maintenance technician in the Midwest manufacturing sector is $45,000. Use
            the report preview to share a concise summary with leadership.
          </p>
        </div>
      </section>

      <section id="tool" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Explore salary ranges by role, industry, and location.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Select your inputs for an instant market band, median marker, and shareable report
            preview.
          </p>
          <div className="mt-10">
            <SalaryBenchmarkTool />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Using benchmark data in hiring
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            From offer bands to annual hiring budgets.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Always combine benchmark insights with your organization’s pay policy. If your budget is
            below market, you may compensate with other perks; if above market, articulate the value
            proposition clearly.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {usage.map((item) => (
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
            <SalaryFaq />
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
            and ROI tools plus recruiter support when you need to move faster.
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
            Make data-driven offers.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Explore the Salary Benchmarking Tool now — set competitive ranges by industry,
            location, and level.
          </p>
          <div className="mt-8">
            <SolidLink href={ctaHref}>Try the Salary Benchmarking Tool</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
