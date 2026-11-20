import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { PharmaFaq } from "@/components/pharmaceutical-manufacturing-recruitment/faq";
import { PharmaHeroVisual } from "@/components/pharmaceutical-manufacturing-recruitment/hero-visual";
import { PharmaProcessTimeline } from "@/components/pharmaceutical-manufacturing-recruitment/process-timeline";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Sourcing candidates comfortable with GMP discipline and rotational plant shifts.",
  "Filling packaging-line and junior QC roles without slowing batch release.",
  "Attracting diploma and science graduates for regulated shop-floor positions.",
  "Managing hiring spikes when new lines start or contract packaging ramps up.",
  "Coordinating interviews and joining dates around validation and production schedules.",
] as const;

const roleCategories = [
  {
    title: "Production and operations",
    body: "Production trainees, manufacturing assistants, packaging associates and line support workers.",
  },
  {
    title: "Quality-related support",
    body: "Junior QC and QA trainees, subject to the employer's qualification and assessment requirements.",
  },
  {
    title: "Warehouse and materials",
    body: "Inventory assistants, dispatch coordinators, material-handling staff and documentation support.",
  },
  {
    title: "Plant administration",
    body: "Data-entry operators, junior HR coordinators and operational support associates.",
  },
] as const;

const related = [
  {
    href: "/medical-device-manufacturing-recruitment",
    title: "Medical Device Manufacturing Recruitment",
    body: "Explore precision assembly and quality-documentation hiring for regulated device plants.",
  },
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan high-volume plant hiring across sourcing, interviews and joining.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Document approved pharma vacancies, shifts and joining timelines before sourcing.",
  },
] as const;

export function PharmaceuticalManufacturingRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 10% 0%, rgba(16,185,129,0.06), transparent 46%), radial-gradient(ellipse at 90% 16%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Pharmaceutical manufacturing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Pharmaceutical Manufacturing Recruitment for Regulated Plants
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps pharmaceutical manufacturers in India recruit entry-level production,
              packaging and junior QC staff for GMP-regulated plants. Plant HR and operations teams
              use this page to plan shift-based hiring, clarify role eligibility and build a pipeline
              when lines expand or vacancies need filling.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Your Pharma Hiring Requirements</SolidLink>
              <GhostLink href="#roles">View role categories</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For plant HR managers, production heads and talent acquisition teams.
            </p>
          </div>
          <PharmaHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Pharmaceutical Manufacturing Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Pharma hiring centres on GMP discipline, batch accountability and packaging-line
              reliability—not generic factory staffing. Employers need people who follow SOPs, accept
              rotational shifts and fit junior QC or materials roles without disrupting release
              timelines. EarlyJobs aligns sourcing with those regulated plant expectations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Hiring challenges
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            The Hiring Challenges Pharmaceutical Plants Face
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Pharmaceutical recruitment is different from general office hiring. Production facilities
            must consider shift schedules, educational qualifications, workplace discipline, location
            accessibility and role-specific training requirements.
          </p>
          <ul className="mt-10 space-y-3">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-[15px] leading-7 text-neutral-600">
            When several vacancies remain open, existing teams may face additional workload. A
            structured recruitment process helps employers plan workforce requirements more
            effectively.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Entry-Level Pharmaceutical Roles Employers Can Hire For
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs can discuss recruitment requirements across relevant entry-level and junior
            positions.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roleCategories.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 max-w-3xl text-sm leading-6 text-neutral-500">
            Roles involving regulated responsibilities, specialist qualifications or mandatory
            certifications require employer-led assessment and verification.
          </p>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Hiring approach
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Hiring Approach Built Around Plant Requirements
          </h2>
          <div className="mt-12">
            <PharmaProcessTimeline />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Demand patterns
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Hiring for New Plants, Expansions and Replacement Demand
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Pharmaceutical workforce requirements are not always predictable. A new production line
              may require an initial hiring drive. A packaging unit may need additional staff during
              periods of increased output. Existing facilities may need recurring replacement hiring.
            </p>
            <p>
              EarlyJobs approaches these requirements as workforce demand rather than isolated job
              advertisements. The objective is to help employers build a repeatable process for
              identifying, engaging and evaluating suitable candidates.
            </p>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Why EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Why Consider EarlyJobs?
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs combines technology-enabled hiring with a recruitment and institutional
              partnership network. For employers, this creates an opportunity to explore talent
              sourcing beyond a single job board or isolated recruitment channel.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Hiring requirements can be discussed according to role category, location, expected
              volume and operational urgency.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Plant Workforce Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="pharma_manufacturing_enquiry"
              sourceLabel="Pharmaceutical Manufacturing Recruitment"
              submitLabel="Discuss Your Pharma Hiring Requirements"
              defaultMessage="Pharmaceutical manufacturing hiring enquiry."
              extraFields="pharma"
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
            <PharmaFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support pharma plants hiring for GMP-aware production, packaging and junior QC roles." />

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
            Build Your Pharmaceutical Hiring Pipeline
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share your plant locations, role categories and joining timelines — and start building a
            repeatable entry-level hiring process.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Your Pharma Hiring Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
