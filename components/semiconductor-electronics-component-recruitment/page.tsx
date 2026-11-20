import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { SemiconductorEligibilityMatrix } from "@/components/semiconductor-electronics-component-recruitment/eligibility-matrix";
import { SemiconductorFaq } from "@/components/semiconductor-electronics-component-recruitment/faq";
import { SemiconductorHeroVisual } from "@/components/semiconductor-electronics-component-recruitment/hero-visual";
import { SemiconductorPhasedTimeline } from "@/components/semiconductor-electronics-component-recruitment/phased-timeline";

const considerations = [
  "Technical eligibility and educational background.",
  "Production shift availability.",
  "Facility location and commuting requirements.",
  "Cleanroom or controlled-environment responsibilities.",
  "Equipment-related training.",
  "Safety and operational procedures.",
  "Expected joining timelines.",
] as const;

const roleCards = [
  {
    title: "Production support",
    body: "Manufacturing trainees, production assistants and junior operational associates where appropriate.",
  },
  {
    title: "Electronics assembly",
    body: "Component assembly assistants and relevant production support roles.",
  },
  {
    title: "Quality and documentation",
    body: "Inspection trainees, documentation assistants and junior quality support personnel.",
  },
  {
    title: "Materials and warehouse",
    body: "Inventory assistants, materials coordinators and dispatch support staff.",
  },
  {
    title: "Technical operations",
    body: "Junior technicians who meet the employer's qualifications and experience requirements.",
  },
] as const;

const process = [
  {
    title: "Requirement discovery",
    body: "Define roles, locations and eligibility.",
  },
  {
    title: "Candidate identification",
    body: "Explore suitable educational and professional backgrounds.",
  },
  {
    title: "Employer assessment",
    body: "Conduct technical interviews or practical evaluations.",
  },
  {
    title: "Selection coordination",
    body: "Communicate approved offers and joining requirements.",
  },
  {
    title: "Joining follow-up",
    body: "Coordinate candidate communication according to the agreed recruitment scope.",
  },
] as const;

const related = [
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "See how EMS and electronics plants structure production and quality workforce pipelines.",
  },
  {
    href: "/battery-manufacturing-recruitment",
    title: "Battery Manufacturing Recruitment",
    body: "Explore entry-level production, assembly and plant support hiring for battery facilities.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Structure phased headcount, joining dates and role categories before sourcing begins.",
  },
] as const;

export function SemiconductorElectronicsComponentRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(8,145,178,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Semiconductor & electronics components
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Build the Workforce Behind Semiconductor and Electronics Manufacturing
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              Semiconductor and electronics component manufacturing requires a combination of
              technical expertise, disciplined production processes and reliable operational support.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps semiconductor and electronics component employers explore recruitment
              for suitable entry-level and junior industrial positions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Semiconductor Workforce Requirements</SolidLink>
              <GhostLink href="#eligibility">See eligibility matrix</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For semiconductor manufacturers, electronics component companies, industrial HR teams
              and manufacturing operations leaders.
            </p>
          </div>
          <SemiconductorHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Match qualifications to each production environment.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              As companies establish new facilities or expand manufacturing capacity, recruitment
              teams must identify candidates with qualifications suited to each production
              environment.
            </p>
            <p>
              Some positions require specialized technical education and experience. Others may
              involve entry-level manufacturing, materials or administrative support.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Precision hiring
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Semiconductor Recruitment Requires Precision
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Semiconductor manufacturing is not equivalent to general factory recruitment. Depending
            on the facility, employees may work around controlled environments, precision equipment,
            documented procedures and specialized materials. Employers must define qualifications and
            training requirements carefully.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {considerations.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-[#0891B2]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A clear hiring brief helps candidates understand the position before employer assessment.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Semiconductor and Component Manufacturing
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            Specialized fabrication, process engineering, equipment maintenance and safety-critical
            roles require appropriate expertise and cannot be treated as general entry-level
            vacancies.
          </p>
        </div>
      </section>

      <section id="eligibility" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature module
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Plan hiring by eligibility band — not one generic vacancy
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Separate trainee, support and specialist requirements so candidate sourcing matches the
            real production environment.
          </p>
          <div className="mt-10">
            <SemiconductorEligibilityMatrix />
          </div>
        </div>
      </section>

      <section id="phased-plan" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            New facilities
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring for New Facilities
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            New semiconductor and component manufacturing facilities may recruit in phases. Initial
            requirements may focus on experienced technical teams, followed by additional production
            and support positions. Employers should distinguish between these phases.
          </p>
          <div className="mt-10">
            <SemiconductorPhasedTimeline />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Education & industry
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Technical Education with Industry
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Relevant talent pools may include ITIs, polytechnics and engineering institutions.
              However, a qualification alone does not demonstrate readiness for semiconductor
              fabrication or specialized equipment operation.
            </p>
            <p>
              Employers must conduct appropriate technical assessments and verify all mandatory
              credentials. EarlyJobs can assess suitable recruitment requirements through its
              available candidate and institutional networks.
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
            A Structured Recruitment Process
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
              EarlyJobs combines technology-enabled recruitment with recruiter and educational
              institution partnerships.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For semiconductor employers, the focus is on understanding the exact hiring requirement
              before identifying relevant candidates. The objective is to support practical workforce
              planning without overstating specialized recruitment capabilities.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Semiconductor Hiring Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="semiconductor_electronics_enquiry"
              sourceLabel="Semiconductor & Electronics Component Recruitment"
              submitLabel="Discuss Semiconductor Workforce Requirements"
              defaultMessage="Semiconductor / electronics component hiring enquiry."
              extraFields="semiconductor"
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
            <SemiconductorFaq />
          </div>
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
              "radial-gradient(ellipse at 50% 0%, rgba(8,145,178,0.1), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Discuss Your Manufacturing Workforce Requirements
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share facility location, role category and phased headcount — and align sourcing with
            production timelines.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Semiconductor Workforce Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
