import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { ComparisonTable } from "@/components/recruitment-agency-vs-in-house/comparison-table";
import { RecruitmentAgencyVsInHouseFaq } from "@/components/recruitment-agency-vs-in-house/faq";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const decisionFactors = [
  {
    title: "Hiring volume",
    body: "Stable demand may suit an internal team; sudden spikes may need external capacity.",
  },
  {
    title: "Control",
    body: "Internal teams typically sit closest to managers, culture and long-term planning.",
  },
  {
    title: "Cost",
    body: "Compare recruiter overhead and tools with agency fees for your actual hiring mix.",
  },
  {
    title: "Sourcing capacity",
    body: "Agencies can add channels when internal reach or specialist networks fall short.",
  },
] as const;

const agencyTriggers = [
  "Sudden increases in hiring volume",
  "Multiple locations",
  "Difficult-to-source positions",
  "Limited internal recruitment capacity",
  "Short-term hiring projects",
  "Additional candidate sourcing requirements",
] as const;

const related = [
  {
    href: "/tools/cost-per-hire-calculator",
    title: "Cost-per-Hire Calculator",
    body: "Organise internal and external recruitment spend per completed hire.",
  },
  {
    href: "/tools/recruitment-funnel-calculator",
    title: "Recruitment Funnel Calculator",
    body: "Measure stage conversions from applications through to joinings.",
  },
  {
    href: "/resources/bulk-hiring-checklist",
    title: "Bulk Hiring Checklist",
    body: "Plan high-volume hiring across sourcing, interviews and joining.",
  },
] as const;

export function RecruitmentAgencyVsInHousePage() {
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
        <div className="page-shell relative grid items-start gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-2 lg:gap-16 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Employer guide
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Recruitment Agency vs In-House Hiring for Employers
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps Indian employers compare in-house TA and agency recruitment on control,
              cost, speed and sourcing reach. Use this guide to choose a model—or a hybrid—based on
              hiring volume, role complexity and internal capacity, without relying on unsupported
              cost claims.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#comparison">Compare Your Hiring Options</SolidLink>
              <GhostLink href="#decision">Decision framework</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For founders, HR directors, TA leaders, operations heads and finance managers.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.04)] sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                In-house
              </p>
              <p className="mt-3 text-base font-semibold tracking-[-0.02em]">
                Internal ownership
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Culture alignment, process control and long-term workforce planning — with capacity
                limits during sudden hiring increases.
              </p>
            </div>
            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_24px_80px_rgba(15,23,42,0.04)] sm:p-6">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#EA6A4E] uppercase">
                Agency
              </p>
              <p className="mt-3 text-base font-semibold tracking-[-0.02em]">
                External support
              </p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Added sourcing reach and flexibility — scoped by agreed services, commercial terms
                and responsibilities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Recruitment Agency vs In-House: Which Fits Better?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Agencies add reach and surge capacity, often with placement or project fees, while
              in-house teams offer control, culture alignment and steady employer-brand investment—but
              fixed overhead. Neither is universally cheaper or faster; outcomes depend on volume,
              role rarity and how much TA bandwidth you already carry in India.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              In-house
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is In-House Recruitment?
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-neutral-600">
              <p>
                In-house recruitment is managed by employees working within the organization.
                Internal recruiters typically coordinate job requirements, candidate sourcing,
                interviews, hiring manager communication and recruitment reporting.
              </p>
              <p>
                This model can provide close alignment with company culture, internal processes and
                long-term workforce planning. However, internal teams may face capacity constraints
                during sudden hiring increases.
              </p>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Agency
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Agency Recruitment?
            </h2>
            <div className="mt-5 space-y-4 text-[15px] leading-7 text-neutral-600">
              <p>
                Agency recruitment involves an external organization supporting candidate sourcing
                or other agreed recruitment activities. The scope varies by provider.
              </p>
              <p>
                Some agencies specialize in executive roles, while others focus on technical,
                entry-level or high-volume hiring. Employers should review the exact services,
                commercial terms and responsibilities before selecting a partner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="comparison" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Comparison
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Comparing the Two Models
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A balanced view of control, sourcing, cost, scalability and candidate experience — without
            unsupported superiority claims.
          </p>
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section id="decision" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Decision framework
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Choose based on volume, control, cost and capacity
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {decisionFactors.map((item) => (
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
              When in-house fits
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              When In-House Hiring Makes Sense
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              An internal model may be appropriate when recruitment demand is stable, the
              organization has sufficient recruiting capacity and positions require close
              coordination with internal stakeholders.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-neutral-600">
              It may also suit businesses that want to build long-term candidate relationships
              directly.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              When agency helps
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              When Agency Recruitment May Help
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              External recruitment support may be useful for:
            </p>
            <ul className="mt-5 space-y-2">
              {agencyTriggers.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-neutral-700"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              Employers should evaluate providers based on relevant experience, process transparency
              and commercial fit.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Hybrid
            </p>
            <h2 className="mt-3 max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              The Hybrid Recruitment Model
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Many organizations use both approaches. Internal teams retain ownership of workforce
              planning, interviews and final selection while external partners support candidate
              identification and recruitment coordination.
            </p>
            <p>
              This arrangement can provide flexibility without requiring the employer to outsource
              every hiring decision.
            </p>
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs
            </p>
            <h2 className="mt-3 max-w-xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Where EarlyJobs Fits
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs combines technology-enabled recruitment with recruiter and institutional
              partnership networks.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              Employers can discuss recruitment requirements according to hiring volume, role
              category and location. The appropriate engagement structure should be confirmed through
              a direct discussion of scope and commercial terms.
            </p>
          </div>
          <IndustryEnquiryForm
            formId="recruitment_agency_vs_in_house_enquiry"
            sourceLabel="Recruitment Agency vs In-House Hiring"
            submitLabel="Explore Recruitment Support with EarlyJobs"
            defaultMessage="Recruitment model discussion requested from agency vs in-house comparison page."
            extraFields="electronics"
          />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently Asked Questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <RecruitmentAgencyVsInHouseFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="Employers use EarlyJobs to weigh agency support against in-house TA capacity for India hiring." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Discuss Your Recruitment Requirements
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share hiring volume, role mix and locations so EarlyJobs can help you evaluate the right
            engagement approach.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Your Recruitment Requirements</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
