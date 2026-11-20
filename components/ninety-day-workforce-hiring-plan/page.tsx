import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { NinetyDayHiringPlanFaq } from "@/components/ninety-day-workforce-hiring-plan/faq";
import { TimelinePreview } from "@/components/ninety-day-workforce-hiring-plan/timeline-preview";

const phases = [
  {
    label: "Days 1–30",
    title: "Define and Prepare",
    body: "Collect vacancy requests, approve budgets, prepare job descriptions and establish recruitment responsibilities.",
  },
  {
    label: "Days 31–60",
    title: "Source and Evaluate",
    body: "Activate sourcing channels, coordinate interviews, conduct assessments and review recruitment progress.",
  },
  {
    label: "Days 61–90",
    title: "Convert and Review",
    body: "Confirm offers, coordinate joining dates, review open vacancies and evaluate hiring performance.",
  },
] as const;

const templateFields = [
  "Department and job title",
  "Hiring location",
  "Approved headcount",
  "Compensation range",
  "Recruitment owner",
  "Planned sourcing date",
  "Interview milestones",
  "Expected joining date",
  "Actual hiring status",
  "Risks and dependencies",
] as const;

const industries = [
  {
    title: "Manufacturing",
    body: "Prepare for production expansion across plants and shifts.",
  },
  {
    title: "Healthcare",
    body: "Plan recruitment for new branches and support functions.",
  },
  {
    title: "Logistics",
    body: "Organise warehouse workforce requirements across facilities.",
  },
] as const;

const related = [
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan high-volume hiring across sourcing, interviews and joining.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture approved vacancies before a planning cycle starts.",
  },
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
] as const;

function fileExists(relativePublicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePublicPath));
}

export function NinetyDayWorkforceHiringPlanPage() {
  const docxAvailable = fileExists("resources/earlyjobs-90-day-workforce-hiring-plan.docx");
  const xlsxAvailable = fileExists("resources/earlyjobs-90-day-workforce-hiring-plan.xlsx");

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
        <div className="page-shell relative grid items-start gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Hiring resources
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Free 90-Day Workforce Hiring Plan Template
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs offers a free 90-day workforce hiring plan so employers in India can phase
              headcount, sourcing and joinings across a quarter. HR leaders use it to align finance,
              department heads and TA on milestones—not ad hoc weekly firefighting.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#template">Download the 90-Day Hiring Plan</SolidLink>
              <GhostLink href="#phases">See the roadmap</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For HR directors, founders, plant HR teams, operations managers and talent acquisition
              leaders.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
              Roadmap preview
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              {[
                "Days 1–30 · Define & prepare",
                "Days 31–60 · Source & evaluate",
                "Days 61–90 · Convert & review",
                "Tracker · Headcount · Owners · Joinings",
              ].map((line) => (
                <div
                  key={line}
                  className="rounded-lg border border-dashed border-black/10 bg-white px-3 py-2.5 text-[13px] text-neutral-600"
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Definition
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is a 90-Day Hiring Plan?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A 90-day hiring plan is a quarter-level roadmap that links approved headcount to sourcing,
              interview milestones and joining targets. The EarlyJobs template gives Indian employers
              numbered phases—define, source, convert—so plant, healthcare and logistics teams share one
              timeline instead of disconnected spreadsheets.
            </p>
          </div>
        </div>
      </section>

      <section id="phases" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Timeline
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A practical three-month hiring framework
          </h2>
          <ol className="mt-12 grid gap-6 lg:grid-cols-3">
            {phases.map((phase, index) => (
              <li key={phase.label} className="rounded-2xl border border-black/10 bg-white p-6">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")} · {phase.label}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{phase.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{phase.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="template" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Free download
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Preview and download the template
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Inspect the interactive 30 / 60 / 90 timeline and hiring tracker before requesting any
            information. Download DOCX and XLSX when available.
          </p>
          <div className="mt-10">
            <TimelinePreview docxAvailable={docxAvailable} xlsxAvailable={xlsxAvailable} />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Template fields
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Should the Template Include?
          </h2>
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {templateFields.map((field) => (
              <li
                key={field}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-medium tracking-[-0.02em]"
              >
                {field}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            These fields create a shared reference for HR, finance and operations teams.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Industries
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Adapting the Plan Across Industries
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {industries.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The structure remains consistent while role-specific eligibility and operational details
            change.
          </p>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Next step
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Workforce Planning to Recruitment Execution
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once employers have an approved plan, they can discuss relevant recruitment
              requirements with EarlyJobs.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can assess hiring needs according to locations, roles, expected volumes and
              joining timelines.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="ninety_day_workforce_hiring_plan_enquiry"
            sourceLabel="90-Day Workforce Hiring Plan"
            submitLabel="Share Your 90-Day Hiring Plan"
            defaultMessage="90-day hiring plan shared from workforce hiring plan template page."
            extraFields="electronics"
          />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <NinetyDayHiringPlanFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            About EarlyJobs
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs is an India-focused recruitment platform at{" "}
            <a href="https://www.earlyjobs.ai" className="text-brand underline-offset-2 hover:underline">
              earlyjobs.ai
            </a>{" "}
            that helps employers hire for manufacturing plants, healthcare operations and other
            high-volume roles—combining recruiter networks, employer tools and workflow support for
            shift-based and multi-site programs.
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
            Download Your Workforce Hiring Plan
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Organise headcount, milestones, interviews and joining targets for the next three months.
          </p>
          <div className="mt-8">
            <SolidLink href="#template">Download the 90-Day Hiring Plan</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
