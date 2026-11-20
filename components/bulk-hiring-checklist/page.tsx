import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { BulkHiringChecklistFaq } from "@/components/bulk-hiring-checklist/faq";
import { ChecklistPreview } from "@/components/bulk-hiring-checklist/checklist-preview";

const phases = [
  {
    title: "Define the hiring requirement",
    body: "Confirm vacancies, job titles, locations, employment types, budgets, eligibility, shifts, joining dates and approval owners before sourcing begins.",
  },
  {
    title: "Prepare candidate sourcing",
    body: "Identify channels, prepare consistent job descriptions and align candidate communication for the roles and locations involved.",
  },
  {
    title: "Plan interviews and assessments",
    body: "Coordinate dates, venues, interviewer availability, assessments, documents, selection criteria and decision responsibilities.",
  },
  {
    title: "Track candidate progress",
    body: "Monitor Applications → Shortlisted → Interviewed → Selected → Offered → Joined with consistent stage definitions.",
  },
  {
    title: "Coordinate joining",
    body: "Confirm reporting date, location, documentation, compensation and working conditions — without replacing formal onboarding duties.",
  },
  {
    title: "Review the hiring drive",
    body: "Compare planned versus filled vacancies, attendance, offer-to-joining conversion, spend and remaining gaps.",
  },
] as const;

const industries = [
  {
    title: "Manufacturing plants",
    body: "Use the template for production trainees and related shop-floor roles.",
  },
  {
    title: "Hospitals",
    body: "Adapt it for administrative and support staff hiring drives.",
  },
  {
    title: "Warehouse operators",
    body: "Apply it to seasonal fulfilment and multi-shift warehouse hiring.",
  },
] as const;

const related = [
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture approved vacancies before a bulk drive starts.",
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

function fileExists(relativePublicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePublicPath));
}

export function BulkHiringChecklistPage() {
  const docxAvailable = fileExists("resources/earlyjobs-bulk-hiring-checklist.docx");
  const xlsxAvailable = fileExists("resources/earlyjobs-bulk-hiring-checklist.xlsx");

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
              Free Bulk Hiring Checklist for High-Volume Recruitment
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs provides a free bulk hiring checklist so employers in India can coordinate
              vacancies, sourcing, interviews and joining across plants or branches. HR and operations
              teams use it to plan high-volume drives without missing approvals, shift coverage or
              stage tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#checklist">Download the Bulk Hiring Checklist</SolidLink>
              <GhostLink href="#phases">See the six phases</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For plant HR teams, warehouse operators, hospital HR managers, TA leaders and
              operations managers.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
              Editorial checklist preview
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              {[
                "01 · Define vacancies & approvals",
                "02 · Prepare sourcing channels",
                "03 · Plan interviews & assessments",
                "04 · Track candidate stages",
                "05 · Coordinate joining",
                "06 · Review drive outcomes",
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
              What Is a Bulk Hiring Checklist?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A bulk hiring checklist is a structured planning document—not a live ATS—that lists what
              HR must complete before, during and after a high-volume drive. The EarlyJobs version
              walks Indian employers through six phases from vacancy definition to drive review across
              manufacturing, healthcare, logistics and infrastructure hiring.
            </p>
          </div>
        </div>
      </section>

      <section id="phases" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature visual
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Six-phase bulk hiring journey
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {phases.map((item, index) => (
              <li
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  Phase {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Incomplete requirements can create avoidable delays later in the process. An offered
            candidate should not be counted as joined until the joining milestone has actually
            occurred.
          </p>
        </div>
      </section>

      <section id="checklist" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Free download
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Preview and download the planning kit
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Download DOCX and XLSX formats when available. Inspect checklist categories
            interactively before downloading.
          </p>
          <div className="mt-10">
            <ChecklistPreview docxAvailable={docxAvailable} xlsxAvailable={xlsxAvailable} />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Industries
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Use the Checklist Across Industries
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
            The same structure can support different industries when role-specific requirements are
            added.
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
              From Planning to Execution
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can assess bulk recruitment requirements based on hiring volume, location,
              role eligibility and expected timelines.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              The completed checklist provides a useful starting point for that discussion.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="bulk_hiring_checklist_enquiry"
            sourceLabel="Bulk Hiring Checklist"
            submitLabel="Share Your Bulk Hiring Plan"
            defaultMessage="Bulk hiring plan shared from bulk hiring checklist page."
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
            <BulkHiringChecklistFaq />
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
            Download Your Bulk Hiring Planning Kit
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Organise vacancies, sourcing, interviews, selection and joining across locations.
          </p>
          <div className="mt-8">
            <SolidLink href="#checklist">Download the Bulk Hiring Checklist</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
