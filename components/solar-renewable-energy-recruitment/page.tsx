import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { SolarFaq } from "@/components/solar-renewable-energy-recruitment/faq";
import { SolarHeroVisual } from "@/components/solar-renewable-energy-recruitment/hero-visual";
import { SolarLocationFlow } from "@/components/solar-renewable-energy-recruitment/location-flow";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const considerations = [
  "Candidate willingness to work at project locations.",
  "Relevant technical qualifications.",
  "Availability during project execution.",
  "Local workforce availability.",
  "Safety and training requirements.",
  "Hiring coordination across multiple sites.",
] as const;

const roleCards = [
  {
    title: "Installation support",
    body: "Solar installation helpers, junior technicians and site support associates.",
  },
  {
    title: "Electrical and technical support",
    body: "Electrical trainees, maintenance assistants and relevant diploma-level technical roles.",
  },
  {
    title: "Project operations",
    body: "Site coordinators, documentation assistants and inventory support workers.",
  },
  {
    title: "Warehouse and logistics",
    body: "Material handlers, dispatch assistants and equipment inventory associates.",
  },
] as const;

const process = [
  {
    title: "Define the project requirement",
    body: "Identify job roles, headcount, site location and target joining period.",
  },
  {
    title: "Establish eligibility",
    body: "Specify qualifications, experience and safety prerequisites.",
  },
  {
    title: "Identify suitable talent",
    body: "Explore relevant candidates through available recruitment and institutional channels.",
  },
  {
    title: "Coordinate selection",
    body: "Arrange employer-led evaluation and clarify work conditions.",
  },
  {
    title: "Support joining communication",
    body: "Keep selected candidates informed about reporting dates and next steps.",
  },
] as const;

const related = [
  {
    href: "/construction-infrastructure-recruitment",
    title: "Construction Workforce Recruitment",
    body: "Explore multi-site project hiring for infrastructure and EPC employers.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "See EMS and assembly hiring for industrial employers expanding capacity.",
  },
  {
    href: "/resources/90-day-workforce-hiring-plan",
    title: "90-Day Workforce Hiring Plan",
    body: "Phase project manpower, joining dates and locations before sourcing.",
  },
] as const;

export function SolarRenewableEnergyRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 14% 0%, rgba(251,191,36,0.12), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(14,165,233,0.1), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Solar & renewable
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Solar & Renewable Energy Recruitment Across India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps solar EPCs, developers and O&M teams in India recruit technicians,
              installation helpers and multi-site project staff. HR and project leaders use this page
              to plan location-based hiring, share mobilisation timelines and align candidates with
              field execution—not plant-only manufacturing roles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Your Solar Workforce Requirements</SolidLink>
              <GhostLink href="#locations">See location hiring flow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For solar EPC companies, renewable energy developers, operations teams and project HR
              managers.
            </p>
          </div>
          <SolarHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Solar and Renewable Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Solar hiring follows project geography, not a single plant gate. Employers staff multiple
              sites, chase commissioning dates and need technicians comfortable with travel, height work
              and site safety. EarlyJobs aligns sourcing with those multi-location, deadline-driven
              project realities across India&apos;s renewable belts.
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
            Why Renewable Energy Hiring Is Different
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Unlike conventional office hiring, solar recruitment often involves geographically
            distributed work. A company may need candidates near an upcoming solar installation
            project while simultaneously recruiting for another site in a different district.
            Project timelines can also change according to construction readiness, equipment
            availability and operational schedules.
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
            These factors make location and readiness important parts of recruitment planning.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Roles Across Solar Operations
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
            Not every role is suitable for an inexperienced candidate. Electrical work, working at
            heights and other safety-critical activities require appropriate qualifications, training
            and supervision.
          </p>
        </div>
      </section>

      <section id="locations" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Multi-site hiring
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring Around Project Locations
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A solar EPC company may have projects across multiple districts, each with different
            workforce requirements. One site might need local installation helpers. Another may need
            diploma-qualified candidates willing to relocate temporarily.
          </p>
          <div className="mt-10">
            <SolarLocationFlow />
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs can discuss sourcing requirements using this information and identify suitable
            recruitment approaches.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Talent pipeline
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Building a Renewable Energy Talent Pipeline
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Renewable energy hiring is not limited to immediate vacancies. Employers may benefit
              from maintaining relationships with technical institutions, training organizations and
              candidates interested in entering the sector.
            </p>
            <p>
              Relevant educational pathways can include ITIs, polytechnics and engineering
              institutions. However, candidate readiness must be evaluated against the actual role.
              An academic qualification alone does not establish competence for hazardous or
              regulated work. The employer should retain responsibility for technical evaluation,
              site safety and mandatory certifications.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From brief to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Practical Recruitment Process
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
              EarlyJobs combines technology-enabled recruitment with a network-based hiring approach.
              For renewable energy employers, this creates an opportunity to explore candidate
              sourcing across relevant locations and educational backgrounds.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              The objective is to connect project workforce requirements with candidates who
              understand the role and its practical conditions.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Plan Your Renewable Energy Hiring</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="solar_renewable_enquiry"
              sourceLabel="Solar & Renewable Energy Recruitment"
              submitLabel="Discuss Your Solar Workforce Requirements"
              defaultMessage="Solar / renewable energy project workforce enquiry."
              extraFields="solar"
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
            <SolarFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support solar and renewable employers hiring technicians and project-site workforce." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(14,165,233,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Discuss Your Renewable Energy Workforce Plan
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share project locations, role categories and joining windows — and align recruitment with
            site execution.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Your Solar Workforce Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
