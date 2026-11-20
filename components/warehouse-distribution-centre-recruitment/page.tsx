import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { WarehouseFaq } from "@/components/warehouse-distribution-centre-recruitment/faq";
import { WarehouseHeroVisual } from "@/components/warehouse-distribution-centre-recruitment/hero-visual";
import { WarehouseWorkflow } from "@/components/warehouse-distribution-centre-recruitment/workflow";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Recruiting near warehouses outside major city centres.",
  "Finding candidates willing to work rotational shifts.",
  "Managing seasonal hiring demand.",
  "Coordinating interviews for multiple vacancies.",
  "Hiring across several distribution facilities.",
  "Communicating physical and operational job expectations.",
] as const;

const roleCards = [
  {
    title: "Picking and packing",
    body: "Order pickers, packers, sorting associates and fulfilment support workers.",
    tone: "Fulfilment",
  },
  {
    title: "Inventory and materials",
    body: "Inventory assistants, stock associates, goods-receiving support and material handlers.",
    tone: "Accuracy",
  },
  {
    title: "Dispatch and distribution",
    body: "Dispatch assistants, shipment coordinators and loading support workers.",
    tone: "Outbound",
  },
  {
    title: "Administrative support",
    body: "Warehouse data-entry operators, documentation assistants and junior operations coordinators.",
    tone: "Admin",
  },
  {
    title: "Equipment operations",
    body: "Roles involving powered equipment where employer-led training, authorization and supervision apply.",
    tone: "Safety-sensitive",
  },
] as const;

const models = [
  {
    title: "E-commerce fulfilment",
    body: "Workers for order processing, packing and high-volume fulfilment cycles.",
  },
  {
    title: "Manufacturing warehouse",
    body: "Materials handling and inventory accuracy supporting production schedules.",
  },
  {
    title: "Regional distribution centre",
    body: "Dispatch coordination and support for scheduled transport movements.",
  },
] as const;

const process = [
  {
    title: "Define the workforce gap",
    body: "Identify open positions and operational timelines.",
  },
  {
    title: "Establish eligibility",
    body: "Clarify education, experience, shift availability and location.",
  },
  {
    title: "Identify relevant candidates",
    body: "Explore suitable talent through available recruitment channels.",
  },
  {
    title: "Evaluate candidates",
    body: "Conduct employer-defined interviews or assessments.",
  },
  {
    title: "Coordinate joining",
    body: "Communicate reporting dates and employment expectations.",
  },
] as const;

const related = [
  {
    href: "/food-processing-fmcg-manufacturing-recruitment",
    title: "Food Processing & FMCG Recruitment",
    body: "Explore production, packaging and warehouse hiring for food and FMCG plants.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "Explore assembly and warehouse-adjacent hiring for electronics production ramps.",
  },
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Estimate average recruitment spend when replacing warehouse and DC roles.",
  },
] as const;

export function WarehouseDistributionCentreRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(245,158,11,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,88,12,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Warehouse & distribution
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Warehouse & Distribution Centre Recruitment in India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps logistics and fulfilment employers in India recruit pickers, packers,
              inventory assistants and dispatch staff for warehouses and distribution centres. Operations
              and HR teams use this page to plan shift coverage, seasonal peaks and multi-facility hiring
              near industrial and e-commerce corridors.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Warehouse Hiring Requirements</SolidLink>
              <GhostLink href="#workflow">See warehouse workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For 3PLs, distribution centres, e-commerce fulfilment operators and warehouse HR
              teams.
            </p>
          </div>
          <WarehouseHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Warehouse and DC Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Warehouse hiring is shift-led fulfilment—pick, pack, count and dispatch—not desk roles.
              Employers juggle night shifts, seasonal spikes and multi-DC coverage while keeping
              attendance reliable on the floor. EarlyJobs aligns sourcing with those distribution-centre
              realities across India&apos;s logistics hubs.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Operational reality
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            The Workforce Challenges Behind Warehouse Operations
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Warehouse recruitment often involves large numbers of similar-looking vacancies with
            important operational differences. A picker may need to work a specific shift. An
            inventory assistant may require basic computer proficiency. A forklift operator may need
            documented training and authorization.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Employers must identify candidates who understand these requirements before final
            selection.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A well-defined hiring requirement can reduce avoidable mismatches between the role and
            candidate expectations.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Warehouse Roles
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-amber-800 uppercase">
                  {item.tone}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            Equipment operation and safety-sensitive work require appropriate employer-led training,
            authorization and supervision.
          </p>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Facility models
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Recruitment for Different Warehouse Models
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Not all warehouses operate in the same way. These differences should be reflected in
            recruitment planning. Employers should share the facility location, role
            responsibilities, shift schedules, compensation, hiring volume and joining expectations.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {models.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-black/10 bg-white p-6"
              >
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <WarehouseWorkflow />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Peak & expansion
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Hiring for Seasonal and Expansion Requirements
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Warehouse workforce demand may change during sales periods, new facility launches or
              changes in distribution volume.
            </p>
            <p>
              Employers can plan recruitment around these events by defining expected staffing needs
              in advance. For recurring positions, maintaining consistent role specifications can
              also make future hiring discussions easier.
            </p>
            <p>
              EarlyJobs can assess recruitment requirements according to available candidate
              networks and the characteristics of each facility.
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
            From Hiring Requirement to Candidate Selection
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
              EarlyJobs combines technology-enabled recruitment with a recruiter network and
              candidate sourcing infrastructure.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For warehouse employers, the objective is practical: connect hiring requirements with
              candidates whose availability and expectations align with the job.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss single-facility or multi-location requirements based on their
              operational needs.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Warehouse Workforce Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="warehouse_distribution_enquiry"
              sourceLabel="Warehouse & Distribution Centre Recruitment"
              submitLabel="Discuss Warehouse Hiring Requirements"
              defaultMessage="Warehouse / distribution centre hiring enquiry."
              extraFields="warehouse"
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
            <WarehouseFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support warehouses and DCs hiring pickers, packers, inventory and dispatch teams." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,88,12,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Warehouse Hiring Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share facility locations, role types, shift patterns and hiring volumes for a
            recruitment assessment.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Warehouse Hiring Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
