import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { JobDescriptionGenerator } from "@/components/job-description-generator/generator";
import { JobDescriptionFaq } from "@/components/job-description-generator/faq";

const goodJd = [
  {
    title: "Clear job title",
    body: "Use a recognisable title that reflects the actual position.",
  },
  {
    title: "Role purpose",
    body: "Explain why the position exists and what the employee will contribute.",
  },
  {
    title: "Responsibilities",
    body: "Describe the main duties in practical language.",
  },
  {
    title: "Qualifications",
    body: "Separate mandatory qualifications from preferred skills.",
  },
  {
    title: "Workplace information",
    body: "Include job location, employment type, shift requirements and working conditions.",
  },
  {
    title: "Compensation & process",
    body: "Provide accurate salary information where approved, and explain how candidates apply.",
  },
] as const;

const steps = [
  {
    title: "Enter the job title",
    body: "Choose a role such as production trainee, warehouse associate, lab assistant or sales executive.",
  },
  {
    title: "Select the industry",
    body: "Identify the relevant sector so the draft uses suitable terminology.",
  },
  {
    title: "Add job requirements",
    body: "Enter responsibilities, qualifications, experience expectations and workplace conditions.",
  },
  {
    title: "Generate the draft",
    body: "The tool organises the supplied information into an editable format.",
  },
  {
    title: "Review and publish",
    body: "Check the draft for accuracy, clarity, lawful eligibility requirements and internal approval.",
  },
] as const;

const mistakes = [
  "Combining unrelated responsibilities into one position.",
  "Listing preferred skills as mandatory without justification.",
  "Using unexplained industry jargon.",
  "Omitting work location or shift expectations.",
  "Including unapproved compensation or benefits.",
  "Reusing outdated descriptions without review.",
] as const;

const related = [
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Structure vacancies, eligibility and approvals before sourcing begins.",
  },
  {
    href: "/ai-recruiting-automation-manufacturing",
    title: "Manufacturing Recruitment",
    body: "Plan production and plant hiring with clearer role requirements.",
  },
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "Healthcare Recruitment",
    body: "Hire support and administrative healthcare roles with defined eligibility.",
  },
] as const;

export function JobDescriptionGeneratorPage() {
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
            Job Description Generator
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-neutral-600">
            The EarlyJobs Job Description Generator is a free tool that turns your role title,
            industry, responsibilities, and qualifications into an editable job description draft —
            so Indian employers can publish clearer posts for plant, warehouse, healthcare support,
            and junior roles before sourcing begins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <SolidLink href="#generator">Create a Job Description</SolidLink>
            <GhostLink href="#how-it-works">How it works</GhostLink>
          </div>
          <p className="mt-5 text-[12px] leading-5 text-neutral-500">
            For HR managers, recruiters, founders, department heads and small-business employers.
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
              What Is a Job Description Generator?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A job description generator is a tool that organises employer-provided role information
              into a structured job description. It helps employers prepare a consistent draft
              without starting from an empty document.
            </p>
            <p>
              The final job description should always be reviewed by the hiring manager or HR team.
              A generated draft does not independently verify legal requirements, compensation
              accuracy or role-specific qualifications.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Quality checklist
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Makes a Good Job Description?
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {goodJd.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Avoid unnecessary requirements that could exclude otherwise suitable candidates.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Process
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            How the Generator Works
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
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The tool must not invent salary ranges, certifications or company benefits — and this
            implementation only uses the information you provide.
          </p>
        </div>
      </section>

      <section id="generator" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Interactive tool
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Build an editable job description
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Use the split form and live preview to organise title, industry, location, employment
            type, responsibilities, qualifications, salary and shifts into a structured draft.
          </p>
          <div className="mt-10">
            <JobDescriptionGenerator />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Entry-level focus
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Designed for Entry-Level Hiring
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Entry-level job descriptions should be especially clear about what candidates need to
              know before applying. A manufacturing trainee description should explain shift
              requirements and whether prior technical training is necessary.
            </p>
            <p>
              A warehouse associate description should clarify the work location and physical
              responsibilities. A healthcare support role should distinguish administrative duties
              from regulated clinical activities.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Pitfalls
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Common Job Description Mistakes
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {mistakes.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 text-neutral-600"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Clearer job descriptions can improve communication, although they do not guarantee hiring
            outcomes.
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
              Use Your Job Description to Start Recruitment
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Once the description is reviewed and approved, it can serve as the foundation for
              discussing a recruitment requirement.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs can assess hiring needs according to role category, eligibility, location and
              expected volume.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="job_description_generator_enquiry"
            sourceLabel="Job Description Generator"
            submitLabel="Hire Candidates for This Role"
            defaultMessage="Approved job description shared from job description generator page."
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
            <JobDescriptionFaq />
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
            manufacturing plants, healthcare staffing, and other high-volume roles — with free job
            description and planning tools plus recruiter networks when you are ready to source.
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
            Generate Your Job Description
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Organise role details into a structured draft, then review before you start hiring.
          </p>
          <div className="mt-8">
            <SolidLink href="#generator">Create a Job Description</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
