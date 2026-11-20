import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { ElectronicsFaq } from "@/components/electronics-manufacturing-recruitment/faq";
import { ElectronicsHeroVisual } from "@/components/electronics-manufacturing-recruitment/hero-visual";
import { ElectronicsRampTimeline } from "@/components/electronics-manufacturing-recruitment/ramp-timeline";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const considerations = [
  "ESD awareness and discipline on high-volume assembly lines.",
  "Hand skills for repetitive inspection and PCBA tasks.",
  "Shift availability near industrial corridors and EMS parks.",
  "Diploma and ITI qualifications matched to station briefs.",
  "Ramp-up timelines when new customer programs start.",
  "Joining reliability during production scale-up windows.",
] as const;

const roleCards = [
  {
    title: "Assembly and production",
    body: "Assembly operators, production trainees, line assistants and junior manufacturing associates.",
  },
  {
    title: "Quality and testing support",
    body: "Inspection trainees, testing assistants and entry-level quality support staff.",
  },
  {
    title: "Materials and warehouse",
    body: "Inventory assistants, material handlers, warehouse associates and dispatch support.",
  },
  {
    title: "Plant operations",
    body: "Documentation assistants, production data-entry staff and junior coordination roles.",
  },
] as const;

const process = [
  {
    title: "Requirement planning",
    body: "Define roles, eligibility and operational expectations.",
  },
  {
    title: "Candidate identification",
    body: "Explore relevant candidates through suitable recruitment channels.",
  },
  {
    title: "Employer evaluation",
    body: "Coordinate shortlisted candidates for interviews or practical assessments.",
  },
  {
    title: "Joining follow-up",
    body: "Maintain communication around selection and expected joining dates.",
  },
] as const;

const related = [
  {
    href: "/semiconductor-electronics-component-recruitment",
    title: "Semiconductor & Electronics Component Recruitment",
    body: "Explore eligibility-led hiring for semiconductor and component manufacturing facilities.",
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

export function ElectronicsManufacturingRecruitmentPage() {
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
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Electronics & EMS
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Electronics & EMS Manufacturing Recruitment in India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps electronics and EMS manufacturers recruit assembly operators, inspection
              trainees and line support staff for high-volume plants in India. Operations and TA teams
              use this page to plan ramp hiring, clarify ESD and shift expectations, and build
              pipelines when customer programs or lines expand.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Electronics Manufacturing Hiring</SolidLink>
              <GhostLink href="#ramp">See ramp-up hiring</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For electronics manufacturers, EMS companies and industrial talent acquisition leaders.
            </p>
          </div>
          <ElectronicsHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Electronics and EMS Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              EMS hiring is about throughput on precision lines—not generic factory staffing. Employers
              need operators who follow ESD rules, tolerate repetitive inspection work and join
              quickly when SMT or final-assembly output scales. EarlyJobs aligns sourcing with those
              high-volume line realities across India&apos;s electronics clusters.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            A different approach
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Electronics Manufacturing Hiring Needs a Different Approach
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Electronics plants operate across multiple production processes, each with different
            workforce requirements. A printed circuit board assembly line may need operators
            comfortable with repetitive precision tasks. Final assembly operations may require
            workers who can follow documented instructions and quality procedures.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {considerations.map((item) => (
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
            A generic job advertisement may attract applicants, but employers still need to determine
            who is suitable and available for the actual production environment.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Electronics and EMS Operations
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
            Final eligibility, technical assessment and safety training remain the responsibility of
            the hiring employer.
          </p>
        </div>
      </section>

      <section id="ramp" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Ramp-up hiring
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Supporting Production Ramp-Up Requirements
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Manufacturing hiring frequently happens in phases. EarlyJobs can discuss recruitment
            plans around these different requirements rather than treating every vacancy as an
            identical opening.
          </p>
          <div className="mt-10">
            <ElectronicsRampTimeline />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Education & industry
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Education and Industry Hiring
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Entry-level electronics manufacturing presents opportunities for candidates from ITIs,
              diploma institutions, engineering colleges and other relevant educational backgrounds.
              The appropriate talent pool depends on the role.
            </p>
            <p>
              A production trainee may require different qualifications from a maintenance technician
              or junior testing associate. EarlyJobs&apos; college partnership and recruitment
              network provides a foundation for exploring institution-linked hiring opportunities
              where relevant candidates and partner coverage are available.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From vacancy to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A clearer structure for entry-level recruitment
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

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why EarlyJobs?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs is building hiring infrastructure that combines technology, recruiters and
              institutional partnerships. For electronics employers, the focus is practical: connect
              recruitment activity to production workforce needs.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Whether the requirement involves an assembly line, a warehouse or a new manufacturing
              facility, the first step is understanding the actual hiring demand.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Production Hiring Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="electronics_manufacturing_enquiry"
              sourceLabel="Electronics Manufacturing Recruitment"
              submitLabel="Discuss Electronics Manufacturing Hiring"
              defaultMessage="Electronics / EMS manufacturing hiring enquiry."
              extraFields="electronics"
            />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <ElectronicsFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support EMS and electronics plants hiring for high-volume assembly and inspection roles." />

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
            Build Your Electronics Workforce Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share hiring volumes, plant locations and joining timelines — and connect recruitment to
            production demand.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Electronics Manufacturing Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
