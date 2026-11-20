import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { MedicalDeviceFaq } from "@/components/medical-device-manufacturing-recruitment/faq";
import { MedicalDeviceHeroVisual } from "@/components/medical-device-manufacturing-recruitment/hero-visual";
import { MedicalDeviceWorkflow } from "@/components/medical-device-manufacturing-recruitment/workflow";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const planning = [
  "Educational qualifications.",
  "Production shift requirements.",
  "Facility location.",
  "Technical aptitude.",
  "Role-specific training needs.",
  "Quality and documentation responsibilities.",
  "Mandatory workplace safety requirements.",
] as const;

const roleCards = [
  {
    title: "Assembly and production",
    body: "Assembly trainees, production assistants and manufacturing support associates.",
  },
  {
    title: "Packaging and labelling",
    body: "Packaging operators, labelling assistants and relevant line support personnel.",
  },
  {
    title: "Quality support",
    body: "Junior inspection assistants, documentation trainees and quality support roles where qualifications permit.",
  },
  {
    title: "Warehouse and materials",
    body: "Inventory assistants, material handlers and dispatch support workers.",
  },
  {
    title: "Plant administration",
    body: "Production data-entry staff, junior HR assistants and operational coordinators.",
  },
] as const;

const environments = [
  {
    title: "Consumables manufacturing",
    body: "Often needs larger numbers of production and packaging workers for high-volume lines.",
  },
  {
    title: "Specialized equipment",
    body: "May prioritize technically qualified assembly and testing personnel for complex products.",
  },
] as const;

const process = [
  {
    title: "Requirement planning",
    body: "Identify positions, vacancy numbers and facility locations.",
  },
  {
    title: "Eligibility definition",
    body: "Specify qualifications, experience and technical requirements.",
  },
  {
    title: "Candidate identification",
    body: "Explore relevant applicants.",
  },
  {
    title: "Employer evaluation",
    body: "Conduct interviews and practical assessments.",
  },
  {
    title: "Selection coordination",
    body: "Communicate joining dates and workplace expectations.",
  },
] as const;

const related = [
  {
    href: "/pharmaceutical-manufacturing-recruitment",
    title: "Pharmaceutical Manufacturing Recruitment",
    body: "Explore production, packaging and plant support hiring for pharma facilities.",
  },
  {
    href: "/electronics-manufacturing-recruitment",
    title: "Electronics Manufacturing Recruitment",
    body: "Explore assembly and quality hiring for electronics and EMS production ramps.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Document vacancies, eligibility and joining timelines before sourcing begins.",
  },
] as const;

export function MedicalDeviceManufacturingRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(20,184,166,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(100,116,139,0.1), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Medical device manufacturing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Medical Device Manufacturing Recruitment for Plants
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps medical device manufacturers in India recruit precision assembly,
              packaging and quality-documentation staff for regulated plants. Plant HR teams use this
              page to plan clean-area hiring, clarify batch-traceability expectations and staff line
              expansions without confusing roles with pharma API manufacturing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Medical Device Manufacturing Hiring</SolidLink>
              <GhostLink href="#workflow">See manufacturing workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For medical device manufacturers, medical equipment companies, production HR teams and
              industrial talent acquisition leaders.
            </p>
          </div>
          <MedicalDeviceHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role-specific planning
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Is Unique About Medical Device Manufacturing Hiring?
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Device hiring demands precision assembly, UDI labelling discipline and quality records—not
            high-volume commodity packaging alone. Employers separate consumables lines from validated
            equipment builds and verify that trainees can follow documented work instructions before
            batch release. EarlyJobs aligns sourcing with those regulated plant expectations.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {planning.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Clear eligibility criteria help candidates understand whether they are suitable for the
            position.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Roles Across Medical Device Manufacturing
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
            Positions involving regulated manufacturing responsibilities must meet the employer&apos;s
            applicable qualification, training and quality-system requirements.
          </p>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature module
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Recruitment for Different Manufacturing Environments
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Medical device companies may manufacture products ranging from basic consumables to
            complex equipment. The workforce requirements of these facilities can differ
            substantially. Employers should define the product environment, job responsibilities and
            eligibility requirements before sourcing begins.
          </p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2">
            {environments.map((item) => (
              <li key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
                <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MedicalDeviceWorkflow />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Trust & responsibility
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Connecting Education with Manufacturing Careers
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Relevant talent pools may include ITI graduates, diploma holders, science graduates and
              engineering candidates. The appropriate educational background depends on the
              position. A general production trainee may not need the same qualifications as a
              technical testing associate.
            </p>
            <p>
              EarlyJobs can explore recruitment through relevant candidate and institutional
              networks, subject to coverage and candidate availability. Qualification verification,
              quality-system training and regulatory compliance remain the employer&apos;s
              responsibility — EarlyJobs does not claim to issue or certify manufacturing
              credentials.
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
              EarlyJobs combines technology-enabled recruitment with recruiters and educational
              partnerships.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For medical device manufacturers, the focus is on connecting relevant entry-level
              talent with clearly defined production and support requirements. Employers can discuss
              new facility hiring, production expansion or recurring vacancies.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Manufacturing Workforce Requirement</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="medical_device_manufacturing_enquiry"
              sourceLabel="Medical Device Manufacturing Recruitment"
              submitLabel="Discuss Medical Device Manufacturing Hiring"
              defaultMessage="Medical device manufacturing facility hiring enquiry."
              extraFields="medical"
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
            <MedicalDeviceFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support medical device manufacturers hiring precision assembly and quality-support roles." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(20,184,166,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(100,116,139,0.1), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Build Your Medical Device Manufacturing Workforce
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share facility locations, role categories and joining timelines — and connect recruitment
            to production demand.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Medical Device Manufacturing Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
