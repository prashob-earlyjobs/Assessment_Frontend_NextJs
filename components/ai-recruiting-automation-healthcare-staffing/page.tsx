import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { HealthcareFaq } from "@/components/ai-recruiting-automation-healthcare-staffing/faq";
import { HealthcareHeroDashboard } from "@/components/ai-recruiting-automation-healthcare-staffing/hero-dashboard";
import { WorkflowDiagram } from "@/components/ai-recruiting-automation-healthcare-staffing/workflow-diagram";

const challenges = [
  {
    title: "High volume, high stakes",
    body: "Healthcare employers often need many candidates at once — for a new unit or surge demand — and patient care depends on staffing.",
  },
  {
    title: "Credential complexity",
    body: "Each candidate must have valid licenses or certifications (nursing license, EMT certification, and more). Missing paperwork delays hiring.",
  },
  {
    title: "Shift and schedule factors",
    body: "Roles may require night-shift, weekend, or on-call availability. A matched candidate might not be free for the schedule you need.",
  },
  {
    title: "Regulatory compliance",
    body: "Communications must handle sensitive information securely. Candidates’ health and employment data must stay protected throughout outreach.",
  },
] as const;

const capabilities = [
  {
    title: "Candidate outreach and communication",
    body: "Automated email and SMS to introduce opportunities and gather interest.",
  },
  {
    title: "Response management",
    body: "Intelligent parsing of replies (for example, “I’m interested” vs. “Need more info”) to trigger the right next steps.",
  },
  {
    title: "Scheduling coordination",
    body: "Automatic interview scheduling with approved calendars across candidates, recruiters, and busy medical staff.",
  },
  {
    title: "Credential checks routing",
    body: "Notify recruiters of missing license or certification issues before interviews.",
  },
  {
    title: "Follow-up reminders",
    body: "Timely reminders for candidates to complete paperwork or attend interviews.",
  },
] as const;

const humanFocus = [
  "Verifying critical qualifications and talking through candidate expectations with a human touch.",
  "Communicating patient care needs and department context that only people can judge.",
  "Ensuring candidates feel cared for and informed — improving offer acceptance and retention.",
] as const;

const useCases = [
  {
    title: "Nurse Staffing Coordination",
    body: "Coordinate ICU, ER, and floor nursing pipelines with shift-aware outreach and status tracking.",
    tag: "Clinical roles",
  },
  {
    title: "Credential Verification",
    body: "Route missing license and certification gaps to recruiters before interviews advance.",
    tag: "Compliance",
  },
  {
    title: "Interview Scheduling",
    body: "Align candidates with clinician and hiring-manager calendars without endless email chains.",
    tag: "Coordination",
  },
] as const;

const outcomes = [
  {
    title: "Faster responses",
    body: "AI tools enable first applicant responses in minutes instead of days — critical when candidates accept the first clear answer they receive.",
  },
  {
    title: "Reduced drop-off",
    body: "Candidates are less likely to disappear mid-process when every step is handled promptly and transparently.",
  },
  {
    title: "Focused recruiter effort",
    body: "Automating routine tasks gives recruiters hours back each week for relationship-building with nurses and clinicians.",
  },
] as const;

const related = [
  {
    href: "/ai-recruiting-automation-manufacturing",
    title: "AI recruiting automation for manufacturing",
    body: "See plant-level hiring workflows for multi-site industrial operations.",
  },
  {
    href: "/ai-recruiting-automation-ev-manufacturing",
    title: "AI recruiting automation for EV manufacturing",
    body: "Explore hiring workflows tailored to electric vehicle and battery plant scale-ups.",
  },
  {
    href: "/recruitment-process-outsourcing",
    title: "Recruitment process outsourcing",
    body: "Scale high-volume staffing programs with structured recruitment operations.",
  },
] as const;

const ctaHref = "/contact-us";

export function HealthcareStaffingAutomationPage() {
  return (
    <main className="bg-white text-neutral-950">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-black/10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 12% 0%, rgba(37,99,235,0.07), transparent 48%), radial-gradient(ellipse at 88% 18%, rgba(234,106,78,0.08), transparent 42%), linear-gradient(180deg, #f8fafc 0%, #ffffff 58%)",
          }}
        />
        <div className="page-shell relative grid items-center gap-10 pt-14 pb-16 sm:pt-20 sm:pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:pt-24 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              EarlyJobs · Healthcare staffing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              AI Staffing Automation for Healthcare Teams
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs AI recruiting automation helps hospital HR and staffing agencies source
              nursing and allied health talent, route credential gaps, and schedule interviews —
              with secure handling of candidate data and human oversight on clinical hiring
              decisions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href={ctaHref}>Explore Healthcare Staffing Automation</SolidLink>
              <GhostLink href="#workflow">See the workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              Built for hospital HR leaders, healthcare staffing agencies, and medical recruitment
              managers.
            </p>
          </div>
          <HealthcareHeroDashboard />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What is AI recruiting automation for healthcare staffing?
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            AI recruiting automation for healthcare staffing is software that runs repeatable hiring
            steps — outreach, shift-aware screening, credential routing, and interview scheduling —
            while recruiters approve offers and license decisions. It helps Indian hospitals and
            staffing firms fill nurses, technicians, and allied roles faster without losing control
            of sensitive candidate data.
          </p>
        </div>
      </section>

      {/* Narrative */}
      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From voicemails and checklists to coordinated clinical hiring.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A hospital or healthcare provider has multiple open positions — nurses for the ICU,
              allied health technicians for radiology, and support staff across departments. Each
              role has strict qualification and credential requirements. Coordinating candidate
              outreach, verifying licenses, scheduling interviews, and managing follow-ups across
              busy clinical teams is a full-time effort.
            </p>
            <p>
              Traditional methods rely on checklists and manual messages. An HR coordinator might
              spend hours leaving voicemails, tracking email threads, and chasing credential
              documents. That delays placements — risking understaffed units and burnout among
              existing staff.
            </p>
            <p>
              Doctors and nurses should not have to wait weeks to learn whether a job offer is real.
              Automated workflows can speed up every hiring step — from immediate candidate
              engagement to interview coordination and credential verification — so facilities fill
              critical roles faster and with less stress on recruiters.
            </p>
          </div>
        </div>
      </section>

      {/* Challenges */}
      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why healthcare hiring is challenging
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Volume, credentials, shifts, and compliance collide.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            When these factors combine, recruiting becomes inconsistent. Candidates may receive
            repeated messages or unclear instructions — or fall through the cracks. Automation helps
            ensure nothing is missed.
          </p>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
            {challenges.map((item) => (
              <li key={item.title} className="bg-white p-6 sm:p-8">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What is */}
      <section id="automation" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What workflows can healthcare staffing teams automate?
          </h2>
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item, index) => (
              <li key={item.title} className="border-t border-black/10 pt-5">
                <p className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14 grid gap-8 rounded-2xl border border-black/10 bg-[#f7f8fa] p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
                Agentic example
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Timing-aware candidate status
              </h3>
            </div>
            <p className="text-[15px] leading-7 text-neutral-600">
              A candidate expresses interest in a nursing role but will finish their current contract
              in four weeks. The workflow recognizes this timing issue and marks the candidate as
              “available soon,” rather than currently available. The recruiter is notified to
              re-engage at the proper time instead of continuing immediate outreach.
            </p>
          </div>
        </div>
      </section>

      {/* Human oversight */}
      <section className="border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Build automation around patient care
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Support human judgment. Never replace it.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              Automation in healthcare hiring should support — not replace — human judgment. The
              system should not independently decide if a candidate’s medical qualifications are
              sufficient. That review remains with the recruiter or credentialing team.
            </p>
            <ul className="mt-8 space-y-4">
              {humanFocus.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-neutral-700">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-brand"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-neutral-950 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                Trust layer
              </p>
              <span className="rounded-full bg-[#2563EB]/20 px-3 py-1 text-[11px] font-medium text-[#93c5fd]">
                Verify License
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
              Candidate-friendly updates. Human checkpoints.
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Automated messages must avoid sounding like impersonal marketing. Use workflows to
              send concise, professional updates and route questions to human experts when needed.
            </p>
            <div className="mt-8 space-y-3">
              <div className="rounded-xl bg-white/5 px-4 py-3 text-sm leading-6 text-white/90">
                “Your application for Emergency RN has been received. Our team will review your
                license shortly.”
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/70">
                <span className="size-2 rounded-full bg-brand" />
                Human review required before offer
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Healthcare staffing workflow
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            From requirement intake to onboarding prep — with human checkpoints.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Each step can be supported by AI-driven workflows, turning multi-party coordination into
            a smoother sequence — so qualified healthcare workers get to patients sooner.
          </p>
          <WorkflowDiagram />
        </div>
      </section>

      {/* Use cases */}
      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Use cases
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Where automation helps clinical hiring most.
          </h2>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {useCases.map((item) => (
              <li
                key={item.title}
                className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)]"
              >
                <span className="text-[11px] font-semibold tracking-[0.12em] text-[#2563EB] uppercase">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>

          {/* Candidate view */}
          <div className="mt-14 grid items-center gap-8 rounded-2xl border border-black/10 bg-[#f7f8fa] p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                Candidate view
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Clear next steps — no jargon.
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Candidates see concise mobile-friendly updates: application received, license review
                in progress, interview confirmed, and paperwork reminders — so the experience feels
                compassionate and clear.
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs space-y-3">
              {[
                { from: "EarlyJobs", text: "Application for Emergency RN received. License review starts today." },
                { from: "You", text: "Thanks — BLS cert is uploaded." },
                { from: "EarlyJobs", text: "Interview confirmed Thu 10:30 with Nurse Manager, ICU." },
              ].map((msg) => (
                <div
                  key={msg.text}
                  className={`rounded-2xl px-4 py-3 text-sm leading-5 ${
                    msg.from === "You"
                      ? "ml-8 bg-[#2563EB] text-white"
                      : "mr-8 border border-black/10 bg-white text-neutral-800"
                  }`}
                >
                  <p className="text-[10px] font-semibold tracking-[0.08em] uppercase opacity-70">
                    {msg.from}
                  </p>
                  <p className="mt-1">{msg.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why AI healthcare recruitment matters
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Fill vacancies faster. Keep communication consistent.
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            Hospitals and diagnostic chains across India face persistent demand for nurses, lab staff,
            and allied health roles — often on tight shift timelines. When outreach and scheduling run
            on manual checklists, vacancies stretch and existing clinical teams carry extra load.
            Coordinated automation helps staffing teams respond faster while keeping communication
            professional and respectful for candidates.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {outcomes.map((item) => (
              <li key={item.title}>
                <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <HealthcareFaq />
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] sm:text-[1.75rem]">
            About EarlyJobs
          </h2>
          <p className="mt-4 max-w-3xl text-[15px] leading-7 text-neutral-600">
            EarlyJobs is an India-focused recruitment platform that helps employers hire for
            manufacturing plants, healthcare staffing, and other high-volume roles — combining
            recruiter networks, employer tools, and workflow support for teams that need to fill
            shifts and credentials-heavy positions reliably.
          </p>
        </div>
      </section>

      {/* Related */}
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

      {/* Final CTA */}
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
            Make healthcare staffing easier with AI-driven workflows.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Explore Healthcare Staffing Automation with EarlyJobs — coordinate outreach, credentials,
            and interviews while recruiters stay focused on patient-care standards.
          </p>
          <div className="mt-8">
            <SolidLink href={ctaHref}>Explore Healthcare Staffing Automation</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
