import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { AutomotiveFaq } from "@/components/ev-automotive-manufacturing-recruitment/faq";
import { AutomotiveHeroVisual } from "@/components/ev-automotive-manufacturing-recruitment/hero-visual";
import { AutomotiveProductionLineMap } from "@/components/ev-automotive-manufacturing-recruitment/production-line-map";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Finding entry-level candidates near industrial locations.",
  "Hiring production trainees across multiple shifts.",
  "Coordinating recruitment for new assembly lines.",
  "Attracting ITI and diploma-qualified applicants.",
  "Managing replacement hiring alongside expansion requirements.",
  "Communicating role expectations before interviews.",
] as const;

const roleCards = [
  {
    title: "Vehicle assembly and production",
    body: "Assembly operators, production trainees, line assistants and manufacturing support associates.",
  },
  {
    title: "Quality and inspection",
    body: "Junior quality inspectors, testing assistants and quality support trainees.",
  },
  {
    title: "Materials and logistics",
    body: "Inventory assistants, material handlers, warehouse associates and dispatch support.",
  },
  {
    title: "Trim and chassis support",
    body: "Entry-level technical support on vehicle assembly and trim lines—distinct from battery cell plants—subject to qualifications, safety training and employer assessments.",
  },
] as const;

const outcomes = [
  {
    title: "Role alignment",
    body: "Source against the station brief — assembly, quality, materials or technical support.",
  },
  {
    title: "Shift suitability",
    body: "Surface candidates whose availability matches rotational and production schedules.",
  },
  {
    title: "Location fit",
    body: "Prioritise applicants who can commute to the plant or industrial corridor.",
  },
  {
    title: "Joining coordination",
    body: "Keep selected candidates informed around reporting dates and joining expectations.",
  },
] as const;

const process = [
  {
    title: "Workforce planning",
    body: "Share vacancy numbers, role requirements and production timelines.",
  },
  {
    title: "Candidate identification",
    body: "Explore suitable candidates based on qualifications, location and availability.",
  },
  {
    title: "Employer evaluation",
    body: "Conduct interviews, technical assessments or practical tests as required.",
  },
  {
    title: "Selection and joining",
    body: "Coordinate communication with selected candidates around joining expectations.",
  },
] as const;

const related = [
  {
    href: "/battery-manufacturing-recruitment",
    title: "Battery Manufacturing Recruitment",
    body: "Explore entry-level production, assembly and plant support hiring for battery facilities.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "Explore entry-level EMS and electronics plant hiring for assembly and quality roles.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Document plant vacancies, shifts and joining timelines before sourcing begins.",
  },
] as const;

export function EvAutomotiveManufacturingRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(71,85,105,0.12), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · EV & automotive manufacturing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              EV & Automotive Manufacturing Recruitment for Plant Employers
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps automotive and EV plant employers in India recruit vehicle assembly
              operators, production trainees and materials support on OEM lines. Plant HR teams use
              this page to plan shift hiring, clarify station briefs and staff ramp-ups—not cell
              manufacturing or dry-room battery roles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Automotive Hiring Requirements</SolidLink>
              <GhostLink href="#line-map">See production-line map</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For EV manufacturers, automotive OEMs, component manufacturers, plant HR teams and
              talent acquisition leaders.
            </p>
          </div>
          <AutomotiveHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About EV and Automotive Plant Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Auto plant hiring is takt-driven assembly work—body, paint, trim and final EV lines—not
              electrode or dry-room production. Employers need operators who accept rotational shifts,
              commute to industrial corridors and join before model or platform ramp dates. EarlyJobs
              matches sourcing to those vehicle-assembly constraints.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Production expansion
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            The Workforce Challenge Behind Production Expansion
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Automotive manufacturing hiring involves more than identifying applicants. A candidate
            may have the required qualification but be unavailable for rotational shifts. Another may
            be interested in manufacturing but unable to commute to the facility. These differences
            matter when employers are preparing for production ramp-ups.
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
            A clear hiring process helps employers identify candidates whose availability and
            interests match actual workforce requirements.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Roles Across Automotive and EV Manufacturing
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
            Specialized electrical, battery and high-voltage work must be restricted to appropriately
            qualified personnel. Final eligibility, technical assessment and safety training remain
            the responsibility of the hiring employer.
          </p>
        </div>
      </section>

      <section id="line-map" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Plant-aligned sourcing
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Recruitment Designed Around Plant Requirements
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A manufacturing recruitment plan should begin with operational information. EarlyJobs can
            use these requirements to assess suitable recruitment approaches through its available
            candidate and institutional networks.
          </p>
          <div className="mt-10">
            <AutomotiveProductionLineMap />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Hiring outcomes
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What a structured plant brief enables
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((item) => (
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
              Education & industry
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Technical Education with Industry Opportunities
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              ITI institutions, polytechnics and engineering colleges can provide relevant
              entry-level talent pools for different automotive roles. However, qualification
              requirements vary.
            </p>
            <p>
              A general assembly trainee may not need the same technical background as a maintenance
              technician or battery testing associate. Employers should define eligibility clearly
              and retain responsibility for technical evaluation and safety-related decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From vacancy to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Structured Hiring Journey
          </h2>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              EarlyJobs combines technology-enabled recruitment with a network of recruiters and
              educational institution relationships.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For automotive employers, the focus is on building relevant entry-level candidate
              pipelines that support real production requirements. Whether hiring for an existing
              plant or planning a new manufacturing facility, employers can begin by sharing their
              workforce needs.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Plant Hiring Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="ev_automotive_manufacturing_enquiry"
              sourceLabel="EV & Automotive Manufacturing Recruitment"
              submitLabel="Discuss Automotive Hiring Requirements"
              defaultMessage="EV / automotive manufacturing hiring enquiry."
              extraFields="automotive"
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
            <AutomotiveFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support EV and automotive plants hiring for vehicle assembly and related plant roles." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(71,85,105,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Automotive Workforce Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share plant location, role type and hiring volume — and align sourcing with production
            timelines.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Automotive Hiring Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
