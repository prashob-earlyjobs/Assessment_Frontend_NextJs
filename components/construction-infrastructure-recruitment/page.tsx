import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { ConstructionFaq } from "@/components/construction-infrastructure-recruitment/faq";
import { ConstructionHeroVisual } from "@/components/construction-infrastructure-recruitment/hero-visual";
import { ConstructionHiringFlow } from "@/components/construction-infrastructure-recruitment/hiring-flow";
import { ConstructionWorkforceMap } from "@/components/construction-infrastructure-recruitment/workforce-map";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Recruiting near remote project locations.",
  "Coordinating hiring across multiple sites.",
  "Identifying candidates with relevant trade qualifications.",
  "Managing project-based workforce demand.",
  "Communicating accommodation and transport arrangements.",
  "Aligning joining dates with construction schedules.",
] as const;

const roleCards = [
  {
    title: "Site operations",
    body: "Site assistants, general construction support workers and project coordination associates.",
    tone: "On-site",
  },
  {
    title: "Skilled trades",
    body: "Electricians, welders, plumbers, masons and other tradespeople who meet experience and qualification requirements.",
    tone: "Trade-qualified",
  },
  {
    title: "Equipment and materials",
    body: "Material-handling staff, store assistants, equipment support personnel and authorized machine operators.",
    tone: "Materials",
  },
  {
    title: "Project administration",
    body: "Documentation assistants, junior coordinators, data-entry staff and site administration associates.",
    tone: "Admin",
  },
] as const;

const process = [
  {
    title: "Define project requirements",
    body: "Establish vacancies, locations and timelines.",
  },
  {
    title: "Confirm eligibility",
    body: "Document skills, experience and mandatory certifications.",
  },
  {
    title: "Identify candidates",
    body: "Explore suitable recruitment channels.",
  },
  {
    title: "Conduct employer assessments",
    body: "Evaluate candidates against project requirements.",
  },
  {
    title: "Coordinate joining",
    body: "Communicate reporting locations and employment conditions.",
  },
] as const;

const related = [
  {
    href: "/solar-renewable-energy-recruitment",
    title: "Solar & Renewable Energy Recruitment",
    body: "Explore project-location hiring for solar installation, ops and technical support roles.",
  },
  {
    href: "/warehouse-distribution-centre-recruitment",
    title: "Warehouse Recruitment",
    body: "Explore materials-handling and distribution centre hiring across India.",
  },
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Organise multi-site vacancy planning before sourcing begins.",
  },
] as const;

export function ConstructionInfrastructureRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(245,158,11,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(120,113,108,0.1), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Construction & infrastructure
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Construction & Infrastructure Workforce Recruitment
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps EPC contractors and infrastructure developers in India recruit site
              support, trades and project administration staff across moving project locations. HR and
              site leaders use this page to plan temporary peaks, share mobilisation dates and align
              candidates with on-site safety—not fixed plant roles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Infrastructure Hiring Requirements</SolidLink>
              <GhostLink href="#workforce-map">See project workforce map</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For EPC contractors, construction companies, infrastructure developers, project HR
              teams and site operations managers.
            </p>
          </div>
          <ConstructionHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Location-based planning
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What Is Unique About Construction and Infrastructure Hiring?
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Construction recruitment is closely connected to project geography. A candidate who is
            suitable for one site may be unable or unwilling to work at another. Employers must
            therefore communicate project locations, expected employment duration, reporting
            arrangements and working conditions before recruitment begins.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            These requirements make workforce planning an important part of project execution.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Construction and Infrastructure
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
            Safety-critical work and equipment operation must be assigned only to appropriately
            trained and authorized personnel.
          </p>
        </div>
      </section>

      <section id="workforce-map" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Signature module
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring for Multiple Project Locations
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Infrastructure businesses may operate several projects simultaneously. Each site can
            have different workforce requirements, budgets and joining timelines. A central
            recruitment team should maintain separate hiring briefs for each location — vacancies,
            responsibilities, qualifications, compensation, employment type and site conditions.
          </p>
          <div className="mt-10">
            <ConstructionWorkforceMap />
          </div>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs can assess recruitment requirements based on the available candidate network
            and the characteristics of each project.
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
              Supporting Entry-Level Technical Careers
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Construction and infrastructure employers may recruit candidates from ITIs,
              polytechnics and relevant engineering institutions. However, eligibility must be
              determined by the responsibilities of each role.
            </p>
            <p>
              A junior documentation assistant may have different requirements from an electrical
              technician or equipment operator. Employers should conduct the necessary technical
              evaluations and verify mandatory credentials.
            </p>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Structured process
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            A Structured Recruitment Process
          </h2>
          <div className="mt-10">
            <ConstructionHiringFlow />
          </div>
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
              EarlyJobs combines technology-enabled recruitment with recruiter and institutional
              partnership networks.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For infrastructure employers, this provides a starting point for discussing workforce
              requirements across relevant locations and role categories. The objective is to
              connect recruitment activity with practical project hiring needs.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Share Your Project Workforce Plan</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="construction_infrastructure_enquiry"
              sourceLabel="Construction & Infrastructure Recruitment"
              submitLabel="Discuss Infrastructure Hiring Requirements"
              defaultMessage="Construction / infrastructure multi-site hiring enquiry."
              extraFields="construction"
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
            <ConstructionFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support construction and infrastructure employers hiring site workforce and trade roles." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(120,113,108,0.1), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Plan Your Infrastructure Workforce Hiring
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share project locations, role categories and joining windows — and align recruitment
            with site execution.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Infrastructure Hiring Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
