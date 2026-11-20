import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { FoodManufacturingFaq } from "@/components/food-processing-fmcg-manufacturing-recruitment/faq";
import { FoodManufacturingFlowMap } from "@/components/food-processing-fmcg-manufacturing-recruitment/flow-map";
import { FoodManufacturingHeroVisual } from "@/components/food-processing-fmcg-manufacturing-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const planningPoints = [
  "Production shift requirements.",
  "Facility location and commuting accessibility.",
  "Physical and operational job expectations.",
  "Educational qualifications.",
  "Hygiene and workplace safety requirements.",
  "Seasonal production changes.",
  "Expected joining dates.",
] as const;

const roleCards = [
  {
    title: "Production operations",
    body: "Production trainees, processing assistants and line support associates.",
  },
  {
    title: "Packaging and labelling",
    body: "Packaging operators, packing associates and labelling support workers.",
  },
  {
    title: "Quality support",
    body: "Junior quality assistants and inspection trainees, where qualifications and responsibilities permit.",
  },
  {
    title: "Warehouse and dispatch",
    body: "Inventory assistants, warehouse associates, loading support and dispatch coordinators.",
  },
  {
    title: "Plant administration",
    body: "Documentation assistants, data-entry operators and junior operational coordinators.",
  },
] as const;

const process = [
  {
    title: "Workforce assessment",
    body: "Identify production, packaging and support vacancies.",
  },
  {
    title: "Eligibility definition",
    body: "Establish qualifications, work conditions and mandatory requirements.",
  },
  {
    title: "Candidate sourcing",
    body: "Explore suitable entry-level applicants.",
  },
  {
    title: "Employer selection",
    body: "Conduct interviews and assessments according to company procedures.",
  },
  {
    title: "Joining coordination",
    body: "Communicate reporting details and expected start dates.",
  },
] as const;

const related = [
  {
    href: "/pharmaceutical-manufacturing-recruitment",
    title: "Pharmaceutical Manufacturing Recruitment",
    body: "See how regulated manufacturing employers structure production workforce pipelines.",
  },
  {
    href: "/warehouse-distribution-centre-recruitment",
    title: "Warehouse & Distribution Centre Recruitment",
    body: "Explore picking, packing, inventory and dispatch hiring for logistics facilities.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Document seasonal volumes, shifts and joining timelines before bulk sourcing begins.",
  },
] as const;

export function FoodProcessingFmcgManufacturingRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(245,158,11,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Food processing & FMCG
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Food Processing & FMCG Manufacturing Recruitment
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps food and FMCG plant employers in India recruit hygiene-aware production,
              packaging and warehouse staff. Plant HR teams use this page to plan line hiring, manage
              festival-season spikes and align candidates with FSSAI-aligned shop-floor expectations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Food Manufacturing Hiring</SolidLink>
              <GhostLink href="#flow-map">See plant flow map</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For food manufacturers, FMCG production facilities, packaging units and plant HR teams.
            </p>
          </div>
          <FoodManufacturingHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Food and FMCG Plant Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              FMCG hiring pairs hygiene discipline with packaging-line speed and predictable seasonal
              spikes—not static factory staffing. Employers need workers comfortable with hair-net
              protocols, rapid SKU changeovers and extra shifts before demand peaks. EarlyJobs matches
              sourcing to those food-plant rhythms across India.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Operating conditions
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Food Processing Recruitment Is Different
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Food manufacturing environments have specific operating conditions. Employees may work
            around production equipment, packaging machinery, temperature-controlled areas or
            food-handling processes. Employers must communicate these conditions clearly.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {planningPoints.map((item) => (
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
            Some positions may be suitable for entry-level candidates, while others require specific
            technical training or food-safety responsibilities.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Roles Across Food Manufacturing
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
            Employers remain responsible for applicable hygiene training, food-safety compliance and
            role-specific authorizations.
          </p>
        </div>
      </section>

      <section id="flow-map" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature plant flow
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hire against the line of work — not a generic job title
          </h2>
          <div className="mt-10">
            <FoodManufacturingFlowMap />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Seasonal demand
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Recruitment for Seasonal Production Demand
            </h2>
            <div className="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
              <p>
                Food processing businesses may experience changing workforce requirements based on
                product cycles, customer demand or facility expansion.
              </p>
              <p>
                A manufacturer may need additional packaging workers during a production peak.
                Another may need replacement staff across existing shifts. These requirements benefit
                from early workforce planning.
              </p>
              <p>
                Employers should define the expected duration of the requirement, employment type,
                compensation, shift arrangements and number of vacancies — so candidates understand
                the opportunity before selection.
              </p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Facility location
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Hiring Around Facility Locations
            </h2>
            <div className="mt-5 space-y-5 text-[15px] leading-7 text-neutral-600">
              <p>
                Food manufacturing facilities are often located in industrial areas where commuting
                and accommodation arrangements can influence candidate interest.
              </p>
              <p>
                A suitable recruitment brief should include the exact workplace location, shift
                timings and any employer-provided transport or accommodation arrangements. Such
                details should be communicated accurately rather than assumed.
              </p>
              <p>
                EarlyJobs can discuss recruitment based on these requirements and the availability of
                relevant candidate channels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            From vacancy to joining
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Practical Hiring Process
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
              EarlyJobs is building hiring infrastructure through technology-enabled recruitment,
              recruiters and institutional partnerships.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For food processing employers, the goal is to connect recruitment activity with
              operational workforce needs. Employers can discuss recurring requirements, plant
              expansion or planned seasonal hiring.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Production Workforce Requirement</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="food_processing_fmcg_enquiry"
              sourceLabel="Food Processing & FMCG Manufacturing Recruitment"
              submitLabel="Discuss Food Manufacturing Hiring"
              defaultMessage="Food processing / FMCG manufacturing hiring enquiry."
              extraFields="food"
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
            <FoodManufacturingFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support food and FMCG plants hiring for packaging lines and hygiene-critical roles." />

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

      <section className="relative overflow-hidden bg-[#f7f8fa]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.1), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Plan Your Food Manufacturing Recruitment
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share plant location, role category and hiring volume — including seasonal duration when
            relevant.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Food Manufacturing Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
