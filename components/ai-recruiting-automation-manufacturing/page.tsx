import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { ManufacturingFaq } from "@/components/ai-recruiting-automation-manufacturing/faq";
import { ManufacturingHeroDashboard } from "@/components/ai-recruiting-automation-manufacturing/hero-dashboard";
import { ManufacturingWorkflowDiagram } from "@/components/ai-recruiting-automation-manufacturing/workflow-diagram";

const challenges = [
  {
    title: "Multiple facilities",
    body: "Different plants or lines may hire simultaneously but have unique needs (e.g. certification requirements or union rules). It’s easy for candidates or recruiters to mix them up.",
  },
  {
    title: "Variable schedules",
    body: "Shift-based roles mean a candidate’s availability is as important as their skills. A strong night-shift fit can get lost if recruiters assume a day-shift opening.",
  },
  {
    title: "High volume, tight timelines",
    body: "Manufacturing often needs many hires on a deadline — ramping production or seasonal peaks. Human teams struggle to track every candidate status.",
  },
  {
    title: "Compliance and safety",
    body: "Roles may need forklift certification, safety training, or background checks. These must be verified before hire and delay filling if not tracked carefully.",
  },
] as const;

const capabilities = [
  {
    title: "Centralized candidate intake",
    body: "Automatically collect applications in one system — even when candidates apply to multiple plants.",
  },
  {
    title: "Shift availability surveys",
    body: "Send quick automated polls about shift preference, then sort candidates accordingly.",
  },
  {
    title: "Skill and certification routing",
    body: "Match skills (CNC, welding, logistics) to roles and flag missing certifications for recruiter review.",
  },
  {
    title: "Interview scheduling",
    body: "Coordinate interviews or plant tours by cross-checking candidate, recruiter, and hiring manager calendars.",
  },
  {
    title: "Status updates",
    body: "Send clear notifications (interview confirmed, onboarding details) and route queries to the right person.",
  },
] as const;

const controlPoints = [
  {
    title: "Consistency",
    body: "Use common messaging for safety compliance, benefits, and work culture so candidates get reliable information regardless of plant.",
  },
  {
    title: "Flexibility",
    body: "Let local managers override options such as plant-specific start dates or equipment needs — automation should respect these rules.",
  },
] as const;

const useCases = [
  {
    title: "Shift Availability Polls",
    body: "Capture night, day, and rotating preferences before interviews so recruiters stop chasing mismatched candidates.",
    tag: "Scheduling",
  },
  {
    title: "Certification Verification",
    body: "Flag missing forklift, welding, or safety credentials before plant tours advance.",
    tag: "Compliance",
  },
  {
    title: "Multi-plant Coordination",
    body: "Route applicants across facilities without duplicate outreach or mixed-up location details.",
    tag: "Operations",
  },
] as const;

const outcomes = [
  {
    title: "Reduced downtime",
    body: "Filling roles faster keeps lines running and helps avoid costly shutdowns.",
  },
  {
    title: "Better candidate match",
    body: "Automated filters ensure candidates meet location and certification criteria before anyone’s time is wasted.",
  },
  {
    title: "Operational visibility",
    body: "Hiring managers instantly see which roles still need candidates and where to focus — without waiting on meeting updates.",
  },
] as const;

const related = [
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "AI recruiting automation for healthcare staffing",
    body: "See how similar agentic workflows coordinate clinical hiring and credential checks.",
  },
  {
    href: "/ai-recruiting-automation-ev-manufacturing",
    title: "AI recruiting automation for EV manufacturing",
    body: "Explore hiring workflows tailored to electric vehicle and battery plant scale-ups.",
  },
  {
    href: "/recruitment-process-outsourcing",
    title: "Recruitment process outsourcing",
    body: "Scale high-volume industrial staffing programs with structured recruitment operations.",
  },
] as const;

const ctaHref = "/contact-us";

export function ManufacturingAutomationPage() {
  return (
    <main className="bg-white text-neutral-950">
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
              EarlyJobs · Manufacturing hiring
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              AI-Driven Recruitment for Manufacturing Plants
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs AI recruiting automation helps plant HR and operations teams run high-volume
              hiring — shift-aware outreach, skill and certification routing, and interview scheduling
              across multiple factories — so production lines staff up without recruiters drowning in
              spreadsheets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href={ctaHref}>Explore Manufacturing Recruiting Automation</SolidLink>
              <GhostLink href="#workflow">See the workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              Built for plant HR managers, manufacturing staffing agencies, and operations leaders.
            </p>
          </div>
          <ManufacturingHeroDashboard />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What is AI recruiting automation for manufacturing?
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            AI recruiting automation for manufacturing is software that coordinates high-volume plant
            hiring — collecting applications, matching shift preferences, flagging missing safety or
            trade certifications, and scheduling interviews — while recruiters own final selection and
            compliance. It helps Indian factories and staffing partners fill operator, technician, and
            assembly roles on aggressive production timelines.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From spreadsheets and email threads to coordinated plant hiring.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              A factory operations manager needs dozens of machine operators, assemblers, and
              technicians for multiple shifts. Each position has different skill requirements and
              shift schedules. One plant might need night-shift operators, another needs maintenance
              technicians with specialized certifications, and a third wants seasonal temp help.
            </p>
            <p>
              The recruiting team receives many applications and questions. One candidate might be
              skilled but cannot work the specific shift; another might apply to multiple plants and
              get confused by duplicate contacts. Coordinating all these details across spreadsheets
              and emails creates bottlenecks.
            </p>
            <p>
              By automating candidate engagement and routing responses intelligently, manufacturers
              design efficient hiring workflows that coordinate communication and handoffs across
              facilities — filling roles more consistently and protecting production uptime.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why manufacturing hiring is complex
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Plants, shifts, volume, and safety collide.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Without automation, communication gaps appear — repeated interview invites, missed status
            updates, or hiring managers learning too late that a candidate took another job. A shared
            recruiting workflow keeps every stakeholder on the same page.
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

      <section id="automation" className="scroll-mt-24 border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Capabilities
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What workflows can manufacturing hiring teams automate?
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
                Timing-aware and question-aware replies
              </h3>
            </div>
            <p className="text-[15px] leading-7 text-neutral-600">
              If a candidate replies “Can only start after July,” the system can hold off scheduling
              until then. If they ask about overtime pay, the workflow routes that question to a
              recruiter for a personalized response — rather than sending a canned reply. Leaders see
              pending approvals, open questions, and delays in one dashboard.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
              Build consistency, keep local control
            </p>
            <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              Standardization with plant-level flexibility.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-neutral-600">
              A central team might set a baseline process — resume screen → phone screen → plant
              interview. A facility manager might shorten it for urgent roles. AI workflows adapt
              from predefined rules: high-priority openings get fast-tracked; others follow standard
              steps.
            </p>
            <ul className="mt-8 space-y-6">
              {controlPoints.map((item) => (
                <li key={item.title}>
                  <h3 className="text-base font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-black/10 bg-neutral-950 p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-white/50 uppercase">
                Supervisor view
              </p>
              <span className="rounded-full bg-[#2563EB]/20 px-3 py-1 text-[11px] font-medium text-[#93c5fd]">
                Multi-plant
              </span>
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">
              Shared rules. Local overrides.
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Baseline messaging stays consistent; plant managers still control start dates, equipment
              needs, and urgency flags.
            </p>
            <div className="mt-8 space-y-3">
              <div className="rounded-xl bg-white/5 px-4 py-3 text-sm leading-6 text-white/90">
                Standard path: screen → phone → plant interview
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-dashed border-white/20 px-4 py-3 text-sm text-white/70">
                <span className="size-2 rounded-full bg-brand" />
                Urgent role at Plant B — fast-track enabled
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Example manufacturing hiring workflow
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Intake → screening → plant interview → hire — orchestrated across sites.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            This isn’t multiple independent processes. It’s one system that ties plants together —
            from requirement definition through reporting.
          </p>
          <ManufacturingWorkflowDiagram />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Use cases
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Where automation helps plant hiring most.
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

          <div className="mt-14 grid items-center gap-8 rounded-2xl border border-black/10 bg-[#f7f8fa] p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-brand uppercase">
                Problem patterns
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Confused candidates. Manual scheduling piles.
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Duplicate contacts across plants and spreadsheet-based interview chains create noise.
                Automated routing and status updates keep candidates clear and recruiters aligned.
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs space-y-3">
              {[
                { from: "EarlyJobs", text: "Plant B night-shift CNC opening — confirm availability?" },
                { from: "You", text: "Interested, but only after July 15." },
                { from: "EarlyJobs", text: "Got it — holding scheduling until mid-July. Cert checklist sent." },
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

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            The value of AI in manufacturing hiring
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Smoother operations when workflows interpret events — not just store resumes.
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            An ATS can store resumes; AI-enhanced workflows trigger actions. If a plant’s shift
            requirement changes — say from three shifts to four — the system can update postings and
            adjust scheduling availability automatically.
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

      <section id="faq" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">FAQ</p>
          <h2 className="mt-3 text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Frequently asked questions
          </h2>
          <div className="mt-10 max-w-3xl">
            <ManufacturingFaq />
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
            recruiter networks, employer tools, and workflow support for shift-based and multi-site
            hiring programs.
          </p>
        </div>
      </section>

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
            Make plant-level hiring more coordinated.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Explore Manufacturing Hiring Workflows with EarlyJobs — align engagement, shift matching,
            and multi-site handoffs before production feels the gap.
          </p>
          <div className="mt-8">
            <SolidLink href={ctaHref}>Explore Manufacturing Recruiting Automation</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
