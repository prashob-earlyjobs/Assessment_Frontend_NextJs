import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { RecruitmentFunnelCalculator } from "@/components/recruitment-funnel-calculator/calculator";
import { RecruitmentFunnelFaq } from "@/components/recruitment-funnel-calculator/faq";

const metrics = [
  {
    title: "Application-to-shortlist rate",
    body: "Measures the proportion of applicants who meet the initial selection criteria.",
  },
  {
    title: "Shortlist-to-interview rate",
    body: "Shows how many shortlisted candidates progress to completed interviews.",
  },
  {
    title: "Interview-to-offer rate",
    body: "Measures the percentage of interviewed candidates who receive offers.",
  },
  {
    title: "Offer-to-joining rate",
    body: "Shows the percentage of offered candidates who ultimately join.",
  },
  {
    title: "Overall application-to-joining rate",
    body: "Measures completed joinings relative to the initial applicant pool.",
  },
] as const;

const learnings = [
  {
    title: "Low shortlist rate",
    body: "May indicate a mismatch between the job description and applicant pool.",
  },
  {
    title: "Low interview attendance",
    body: "May warrant reviewing scheduling, communication or candidate interest.",
  },
  {
    title: "Low offer-to-joining rate",
    body: "May require closer examination of compensation, joining timelines, competing offers or candidate expectations.",
  },
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Organise recruitment spend and calculate average cost per completed hire.",
  },
  {
    href: "/tools/employee-attrition-cost-calculator",
    title: "Employee Attrition Cost Calculator",
    body: "Estimate the financial impact of departures and replacement hiring.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture role, volume and joining requirements before sourcing begins.",
  },
] as const;

export function RecruitmentFunnelCalculatorPage() {
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
            Recruitment Funnel Calculator
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Recruitment Funnel Calculator is a free tool that measures conversion between
            applications, shortlists, interviews, offers, and joinings — so talent teams in India can
            see where bulk or plant hiring loses candidates and fix scheduling, offers, or sourcing
            before the next hiring wave.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#calculator">Analyze Your Hiring Funnel</SolidLink>
            <GhostLink href="#formula">See the formula</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For talent acquisition leaders, recruitment managers, HR operations teams and hiring
            managers.
          </p>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <RecruitmentFunnelCalculator />
        </div>
      </section>

      <section id="formula" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is a Recruitment Funnel?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A recruitment funnel represents the stages candidates move through between applying
              for a job and joining an organization.
            </p>
            <p className="text-[15px] leading-7 text-neutral-600">
              <code className="block rounded-xl border border-black/10 bg-[#f8fafc] px-4 py-4 font-medium text-neutral-950">
                Stage Conversion % = (Candidates at Next Stage ÷ Candidates at Current Stage) × 100
              </code>
            </p>
            <p>
              Each stage represents a different recruitment milestone. By comparing candidate counts
              between stages, employers can calculate conversion rates and identify where candidate
              drop-offs occur.
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
            How to Calculate Recruitment Conversion Rates
          </h2>
          <p className="mt-8 rounded-xl border border-black/10 bg-white px-4 py-4 font-medium text-neutral-950">
            Stage Conversion Rate = Candidates Reaching the Next Stage ÷ Candidates in the Previous
            Stage × 100
          </p>
          <p className="mt-6 max-w-3xl text-[15px] leading-7 text-neutral-600">
            For example, if 200 candidates attend interviews and 50 receive offers: interview-to-offer
            conversion = 50 ÷ 200 × 100 = 25%. This example is illustrative, not an industry
            benchmark.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Employers should use consistent definitions for each stage. An interview invitation, for
            example, is not the same as an attended interview.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Metrics
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Which Recruitment Metrics Matter?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Together, these metrics help employers understand recruitment outcomes more clearly.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              How it works
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              How the Calculator Works
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Enter the number of candidates at each stage. The calculator automatically computes
              conversion percentages and drop-off counts.
            </p>
            <p>
              It also flags inconsistent entries, such as a later-stage count exceeding an
              earlier-stage count in a simple single-cohort funnel.
            </p>
            <p>
              Where employers use more complex hiring processes, they should define whether
              candidates can skip stages or enter from different channels.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Illustrative example
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Example Recruitment Funnel
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>Consider a hypothetical hiring campaign:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>1,000 applications.</li>
              <li>400 shortlisted candidates.</li>
              <li>250 completed interviews.</li>
              <li>100 offers.</li>
              <li>70 joinings.</li>
            </ul>
            <p>The resulting conversion rates are:</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>Application to shortlist: 40%.</li>
              <li>Shortlist to interview: 62.5%.</li>
              <li>Interview to offer: 40%.</li>
              <li>Offer to joining: 70%.</li>
              <li>Application to joining: 7%.</li>
            </ul>
            <p>
              These figures are examples for demonstrating the calculation. They do not indicate
              what an employer should expect in a particular industry.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interpretation
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Can Employers Learn?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {learnings.map((item) => (
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
            Conversion metrics identify where to investigate. They do not establish the cause of a
            problem on their own.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Compare carefully
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Compare Hiring Performance Across Roles
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Different roles may produce very different recruitment funnels. An employer hiring
              warehouse associates should not automatically compare conversion rates with specialist
              technical recruitment.
            </p>
            <p>
              Instead, compare similar roles, locations and hiring periods. This provides a more
              meaningful basis for improving recruitment planning.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Turn Hiring Data into Action
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              EarlyJobs helps employers discuss hiring requirements in terms of actual workforce
              needs. Understanding the recruitment funnel can make those discussions more specific.
            </p>
            <p>
              Instead of focusing only on application counts, employers can identify how many
              suitable candidates, interviews, offers and joinings are required.
            </p>
            <div className="pt-2">
              <SolidLink href="/contact-us">Discuss Your Hiring Conversion Challenges</SolidLink>
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
            <RecruitmentFunnelFaq />
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
            manufacturing plants, healthcare staffing, and other high-volume roles — with free funnel
            and cost calculators plus recruiters when conversion drops on critical roles.
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
            Calculate Your Recruitment Conversion Rates
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Measure stage conversions and drop-offs from applications through to joinings.
          </p>
          <div className="mt-8">
            <SolidLink href="#calculator">Analyze Your Hiring Funnel</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
