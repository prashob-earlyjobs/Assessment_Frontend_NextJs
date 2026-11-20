import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { ManpowerRequisitionFaq } from "@/components/manpower-requisition-template/faq";
import { TemplatePreview } from "@/components/manpower-requisition-template/template-preview";

const includeFields = [
  {
    title: "Position details",
    body: "Job title, department, reporting manager and workplace location.",
  },
  {
    title: "Workforce requirement",
    body: "Number of vacancies, employment type, shift pattern and expected joining date.",
  },
  {
    title: "Candidate eligibility",
    body: "Educational qualifications, experience, skills and any mandatory certifications.",
  },
  {
    title: "Compensation information",
    body: "Proposed salary range, approved budget and relevant allowances.",
  },
  {
    title: "Business justification",
    body: "Whether the requirement is due to expansion, replacement, increased workload or a new project.",
  },
  {
    title: "Approval details",
    body: "Requesting manager, HR reviewer, budget approver and approval status.",
  },
] as const;

const steps = [
  {
    title: "Identify the workforce gap",
    body: "Determine which roles are needed and why. Distinguish between additional headcount and replacement vacancies.",
  },
  {
    title: "Define the position",
    body: "Document responsibilities, qualifications, working conditions and location.",
  },
  {
    title: "Confirm the budget",
    body: "Ensure the proposed compensation and recruitment expenses align with approved plans.",
  },
  {
    title: "Obtain internal approval",
    body: "Route the request through the organization's required approval process.",
  },
  {
    title: "Share the approved requirement",
    body: "Provide the completed document to the recruitment team or external hiring partner.",
  },
  {
    title: "Track recruitment progress",
    body: "Use the requisition reference to monitor vacancies and eventual hiring outcomes.",
  },
] as const;

const related = [
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan high-volume hiring after requisitions are approved.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Phase approved headcount and joining targets across a quarter.",
  },
  {
    href: "/pharmaceutical-manufacturing-recruitment",
    title: "Pharmaceutical Manufacturing Recruitment",
    body: "Explore regulated plant hiring once requisitions are documented.",
  },
] as const;

function fileExists(relativePublicPath: string) {
  return fs.existsSync(path.join(process.cwd(), "public", relativePublicPath));
}

export function ManpowerRequisitionTemplatePage() {
  const docxAvailable = fileExists("resources/earlyjobs-manpower-requisition-template.docx");
  const xlsxAvailable = fileExists("resources/earlyjobs-manpower-requisition-template.xlsx");

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
              Free Manpower Requisition Template for Employers
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs offers a free manpower requisition template so HR teams in India can document
              vacancies, shifts, budgets and approvals before sourcing starts. Use it to align
              department heads, finance and TA on one approved hiring record—not scattered emails.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#template">Download the Free Requisition Template</SolidLink>
              <GhostLink href="#how-to-use">How to use it</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For factory HR teams, hospital administrators, department heads, operations managers
              and HR generalists.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-6">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
              Clean document preview
            </p>
            <div className="mt-4 space-y-3 rounded-xl border border-black/10 bg-[#f8fafc] p-4">
              {[
                "Req ID · Department · Location",
                "Vacancies · Shift · Joining date",
                "Qualifications · Salary range",
                "Justification · Approvals",
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
              What Is a Manpower Requisition Form?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A manpower requisition form is an internal approval document—not a job description—that
              records department, headcount, qualifications, compensation budget and justification. The
              EarlyJobs template standardises those fields so recruiters in India start sourcing with a
              complete brief for replacement, expansion or project hiring.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Template fields
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Should a Hiring Requisition Include?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {includeFields.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The exact fields should reflect the organization&apos;s internal policies.
          </p>
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
            Download DOCX and XLSX formats when available. The preview below shows every field group
            included in the resource.
          </p>
          <div className="mt-10">
            <TemplatePreview docxAvailable={docxAvailable} xlsxAvailable={xlsxAvailable} />
          </div>
        </div>
      </section>

      <section id="how-to-use" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            How to use
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How to Use the Template
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Multi-location
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Built for High-Volume and Multi-Location Hiring
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              The same format can be adapted to different industries. A hospital may use it to
              request support staff for additional shifts. A manufacturing plant may document
              production trainee requirements before expanding a line. A logistics company may plan
              warehouse headcount for a new distribution facility.
            </p>
            <p>
              For multi-location organizations, consistent requisition formats help central HR teams
              understand hiring requirements across sites. They also make it easier to identify
              missing information before sourcing begins.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Coordination
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Better Requisitions Improve Recruitment Coordination
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Incomplete job requirements often create avoidable clarification cycles. A structured
              requisition helps employers communicate expectations more clearly, including the number
              of hires, required skills and joining timelines.
            </p>
            <p>
              The template does not replace internal budgeting, employment-law review or
              organizational approval procedures. It is a planning resource designed to support
              better hiring communication.
            </p>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Next step
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From Workforce Planning to Recruitment
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once the requirement is approved, employers can use the completed template as the
              starting point for discussing recruitment needs with EarlyJobs.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can assess the role categories, hiring locations, candidate requirements and
              expected volume.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="manpower_requisition_enquiry"
            sourceLabel="Manpower Requisition Template"
            submitLabel="Share Your Approved Hiring Requirement"
            defaultMessage="Approved hiring requirement shared from manpower requisition template page."
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
            <ManpowerRequisitionFaq />
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
            Download Your Manpower Requisition Template
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Capture vacancies, eligibility, compensation and approvals before sourcing begins.
          </p>
          <div className="mt-8">
            <SolidLink href="#template">Download the Free Requisition Template</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
