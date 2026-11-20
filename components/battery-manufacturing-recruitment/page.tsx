import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { BatteryFaq } from "@/components/battery-manufacturing-recruitment/faq";
import { BatteryHeroVisual } from "@/components/battery-manufacturing-recruitment/hero-visual";
import { BatteryWorkforceMap } from "@/components/battery-manufacturing-recruitment/workforce-map";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Staffing humidity-controlled dry rooms without disrupting moisture protocols.",
  "Hiring electrode, coating and cell-assembly trainees for phased giga-factory ramps.",
  "Finding diploma and ITI talent near emerging battery industrial corridors.",
  "Communicating chemical, electrical and high-voltage safety expectations early.",
  "Separating cell, module and pack vacancies to avoid mismatched applicants.",
  "Coordinating joining dates with clean-area qualification timelines.",
] as const;

const roleCards = [
  {
    title: "Production and assembly",
    body: "Production trainees, assembly assistants, line support associates and relevant entry-level manufacturing positions.",
  },
  {
    title: "Quality and inspection support",
    body: "Junior inspection assistants, documentation associates and quality trainees, subject to technical eligibility.",
  },
  {
    title: "Warehouse and materials",
    body: "Inventory assistants, dispatch support workers and material-handling personnel.",
  },
  {
    title: "Plant administration",
    body: "Production data-entry operators, junior HR coordinators and administrative support staff.",
  },
] as const;

const safetyPoints = [
  {
    title: "Distinguish role types",
    body: "Separate general entry-level support roles from positions that require formal technical training or experience.",
  },
  {
    title: "State eligibility early",
    body: "Share qualification, certification and assessment expectations before candidates enter selection.",
  },
  {
    title: "Employer-led safety",
    body: "Training, authorization and supervision for hazardous substances, high-voltage systems or specialized equipment remain with the employer.",
  },
] as const;

const process = [
  {
    title: "Requirement planning",
    body: "Define vacancies, eligibility and production timelines.",
  },
  {
    title: "Candidate identification",
    body: "Explore relevant applicants according to qualifications and location.",
  },
  {
    title: "Employer evaluation",
    body: "Conduct interviews, practical tests and safety-related assessments.",
  },
  {
    title: "Selection coordination",
    body: "Communicate decisions, compensation and joining expectations.",
  },
  {
    title: "Joining follow-up",
    body: "Support candidate communication according to the agreed recruitment scope.",
  },
] as const;

const related = [
  {
    href: "/ev-automotive-manufacturing-recruitment",
    title: "EV & Automotive Manufacturing Recruitment",
    body: "Explore vehicle assembly and OEM line hiring—separate from cell manufacturing.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "See EMS precision-line hiring for allied industrial employers.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Structure phased headcount, joining dates and role categories before sourcing begins.",
  },
] as const;

export function BatteryManufacturingRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(16,185,129,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Battery manufacturing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Battery Cell & Pack Manufacturing Recruitment
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps battery cell and pack plants in India recruit electrode, assembly and
              dry-room support staff—not vehicle trim lines. Operations and HR teams use this page to
              plan phased hiring, clarify moisture-control areas and align candidates with cell
              manufacturing safety expectations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Battery Plant Hiring</SolidLink>
              <GhostLink href="#workforce-map">See workforce map</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For battery manufacturers, energy storage companies, plant HR managers and industrial
              operations leaders.
            </p>
          </div>
          <BatteryHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Battery Manufacturing Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Battery hiring centres on cell chemistry lines, electrode coating and dry-room
              discipline—not automotive final assembly. Employers must staff moisture-sensitive areas,
              communicate chemical and HV safety, and phase headcount with giga-factory commissioning.
              EarlyJobs sources against those cell-plant constraints, distinct from EV vehicle roles.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Planning challenges
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Battery Manufacturing Recruitment Requires Careful Planning
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Battery production environments can involve specialized machinery, chemical materials,
            electrical systems and tightly controlled processes. Employers must distinguish between
            general entry-level support roles and positions requiring formal technical training or
            experience.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2563EB]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A clear recruitment brief can help employers avoid attracting candidates who do not meet
            the practical requirements of the role.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Roles Across Battery Manufacturing
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            Roles involving hazardous substances, high-voltage systems or specialized equipment
            require appropriate training, qualifications and employer authorization.
          </p>
        </div>
      </section>

      <section id="workforce-map" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature workforce view
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Align sourcing with how a battery plant actually runs
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Employers should specify expected joining dates, role categories, headcount, shift
            schedules, qualifications and work locations before candidate identification begins.
          </p>
          <div className="mt-10">
            <BatteryWorkforceMap />
          </div>
        </div>
      </section>

      <section id="safety" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Technical eligibility & safety
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Safety-sensitive hiring stays with the employer
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Where technical assessments or mandatory safety training are required, those conditions
            should be communicated before candidates proceed through selection. EarlyJobs can assess
            recruitment requirements through its available candidate and institutional networks —
            eligibility decisions remain with the hiring organisation.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-3">
            {safetyPoints.map((item) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              New production lines
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Hiring for New Production Lines
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A battery manufacturer may need to recruit employees before commissioning a new line.
              Another facility may require additional production personnel to support increased
              output. These situations call for different hiring plans.
            </p>
            <p>
              ITI institutions, polytechnics and engineering colleges may provide relevant candidate
              pools for different entry-level industrial roles. Educational background alone does not
              establish readiness for specialized battery production work — employers should determine
              which roles can accommodate trainees and which require prior training, certifications or
              experience.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From brief to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Structured Recruitment Approach
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {process.map((item, index) => (
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

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why EarlyJobs?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs combines technology-enabled recruitment with recruiter and institutional
              partnership networks.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For battery manufacturers, the focus is on aligning candidate sourcing with actual
              workforce requirements. Employers can discuss requirements for a single plant, multiple
              facilities or a planned production expansion.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Battery Workforce Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="battery_manufacturing_enquiry"
              sourceLabel="Battery Manufacturing Recruitment"
              submitLabel="Discuss Battery Plant Hiring"
              defaultMessage="Battery manufacturing hiring enquiry."
              extraFields="battery"
            />
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
            <BatteryFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support battery cell and module plants hiring production and dry-room support roles." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.1), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Battery Manufacturing Hiring Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share plant location, role category and hiring volume — and align sourcing with production
            timelines.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Battery Plant Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
