import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { IndustryEnquiryForm } from "@/components/industry-hiring/enquiry-form";
import { DiagnosticCentreJourney } from "@/components/diagnostic-centre-lab-recruitment/centre-journey";
import { DiagnosticFaq } from "@/components/diagnostic-centre-lab-recruitment/faq";
import { DiagnosticHeroVisual } from "@/components/diagnostic-centre-lab-recruitment/hero-visual";
import { AboutEarlyJobs } from "@/components/seo/about-earlyjobs";

const challenges = [
  "Finding appropriately qualified laboratory personnel.",
  "Hiring administrative teams for new centres.",
  "Coordinating staffing across branches.",
  "Managing replacement requirements.",
  "Identifying candidates available for early or rotational shifts.",
  "Maintaining clear qualification requirements for patient-facing work.",
] as const;

const roleCards = [
  {
    title: "Laboratory support",
    body: "Laboratory assistants, junior lab technicians and specimen-processing support, where candidates meet the applicable qualification requirements.",
    tone: "Technical",
  },
  {
    title: "Sample collection",
    body: "Phlebotomists and sample collection personnel with appropriate training and employer-approved credentials.",
    tone: "Patient-facing",
  },
  {
    title: "Patient services",
    body: "Reception executives, patient registration associates and customer coordination staff.",
    tone: "Patient-facing",
  },
  {
    title: "Administration and operations",
    body: "Billing assistants, documentation associates, inventory support and branch administration staff.",
    tone: "Administrative",
  },
] as const;

const process = [
  {
    title: "Requirement discovery",
    body: "Define branch locations, vacancies and eligibility.",
  },
  {
    title: "Candidate identification",
    body: "Explore applicants whose qualifications and availability align with the role.",
  },
  {
    title: "Employer assessment",
    body: "Conduct interviews, technical evaluations and credential checks as necessary.",
  },
  {
    title: "Joining coordination",
    body: "Communicate selection decisions and reporting expectations.",
  },
] as const;

const related = [
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "Healthcare Recruitment",
    body: "Explore coordinated healthcare staffing workflows for multi-site clinical operations.",
  },
  {
    href: "/pharmaceutical-manufacturing-recruitment",
    title: "Pharmaceutical Manufacturing Recruitment",
    body: "See how regulated healthcare manufacturing employers structure entry-level hiring.",
  },
  {
    href: "/resources/manpower-requisition-template",
    title: "Manpower Requisition Template",
    body: "Capture branch-wise vacancies, qualifications and joining timelines before sourcing.",
  },
] as const;

export function DiagnosticCentreLabRecruitmentPage() {
  return (
    <main className="bg-white text-neutral-950">
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(14,165,233,0.1), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(45,212,191,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Diagnostic & medical lab
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              Diagnostic Centre & Lab Recruitment Across India
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs helps diagnostic chains and medical labs in India recruit phlebotomists, lab
              assistants, registration staff and shift-lab support. Healthcare HR teams use this page to
              plan branch-wise hiring, clarify credential expectations and staff early-morning
              collection without confusing roles with pharma plant manufacturing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href="#enquiry">Discuss Diagnostic Centre Hiring</SolidLink>
              <GhostLink href="#journey">See centre journey</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              For diagnostic chains, pathology laboratories, hospital laboratory departments and
              healthcare HR managers.
            </p>
          </div>
          <DiagnosticHeroVisual />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              What Is Unique About Diagnostic and Laboratory Hiring?
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Lab hiring blends patient-facing collection, round-the-clock processing and branch
              coordination—not typical office staffing. Employers need phlebotomy-ready talent, shift-lab
              coverage and registration staff who keep TAT intact when volumes spike. EarlyJobs aligns
              sourcing with those clinical operations constraints across Indian metros and tier cities.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role matching
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Why Diagnostic Hiring Requires Careful Role Matching
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Diagnostic centres have distinct workforce requirements. A sample collection role may
            require specific clinical training, while a front-desk position may prioritize
            communication, accuracy and patient interaction.
          </p>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {challenges.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-black/10 bg-white px-4 py-3.5 text-sm leading-6 text-neutral-700"
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-500" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-[15px] leading-7 text-neutral-600">
            A structured recruitment brief helps employers communicate these expectations before
            candidate evaluation begins.
          </p>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Role categories
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Roles Across Diagnostic Operations
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {roleCards.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <p className="text-[11px] font-semibold tracking-[0.12em] text-sky-700 uppercase">
                  {item.tone}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-6 text-neutral-500">
            Clinical and diagnostic responsibilities must be assigned only to personnel who satisfy
            applicable professional and legal requirements. Employers remain responsible for
            credential verification.
          </p>
        </div>
      </section>

      <section id="journey" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Multi-location networks
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Hiring for Multi-Location Diagnostic Networks
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A central laboratory may need technical support and materials personnel, while a
            collection centre may prioritize qualified sample collection staff and patient service
            associates. Employers can define requirements by location, job function, qualification,
            working hours and expected joining period.
          </p>
          <div className="mt-10">
            <DiagnosticCentreJourney />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Education pathways
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Supporting Entry-Level Healthcare Careers
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              Healthcare recruitment includes opportunities for candidates from relevant diploma,
              degree and vocational education pathways.
            </p>
            <p>
              Employers should distinguish between clinical roles requiring formal credentials and
              non-clinical positions suitable for broader educational backgrounds. EarlyJobs can
              explore recruitment through relevant candidate and institutional channels, subject to
              availability and role requirements.
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
            A Practical Recruitment Process
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
              EarlyJobs approaches recruitment around employer requirements rather than generic job
              visibility. Its combination of technology-enabled hiring, recruiters and educational
              partnerships creates a foundation for discussing entry-level workforce needs.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600">
              For diagnostic providers, the goal is to connect relevant candidates with clearly
              defined opportunities. Qualification review remains human-led and employer-owned —
              EarlyJobs does not certify laboratory technicians.
            </p>
            <div className="mt-8">
              <SolidLink href="#enquiry-form">Plan Hiring for Multiple Diagnostic Centres</SolidLink>
            </div>
          </div>
          <div id="enquiry-form">
            <IndustryEnquiryForm
              formId="diagnostic_centre_lab_enquiry"
              sourceLabel="Diagnostic Centre & Medical Lab Recruitment"
              submitLabel="Discuss Diagnostic Centre Hiring"
              defaultMessage="Diagnostic centre / medical lab hiring enquiry."
              extraFields="diagnostic"
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
            <DiagnosticFaq />
          </div>
        </div>
      </section>

      <AboutEarlyJobs focus="We support diagnostic centres and labs hiring phlebotomy, technician and shift-based lab staff." />

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
              "radial-gradient(ellipse at 50% 0%, rgba(14,165,233,0.12), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(45,212,191,0.08), transparent 42%)",
          }}
        />
        <div className="page-shell relative flex flex-col items-center py-20 text-center sm:py-28">
          <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[2.75rem]">
            Discuss Your Healthcare Workforce Requirements
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Share branch locations, role types and hiring volumes for a recruitment assessment.
          </p>
          <div className="mt-8">
            <SolidLink href="#enquiry">Discuss Diagnostic Centre Hiring</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
