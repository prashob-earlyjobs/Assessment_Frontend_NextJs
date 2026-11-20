import Link from "next/link";
import { GhostLink, SolidLink } from "@/components/home/primitives";
import { EvManufacturingFaq } from "@/components/ai-recruiting-automation-ev-manufacturing/faq";
import { EvManufacturingHeroDashboard } from "@/components/ai-recruiting-automation-ev-manufacturing/hero-dashboard";
import { EvManufacturingWorkflowDiagram } from "@/components/ai-recruiting-automation-ev-manufacturing/workflow-diagram";

const challenges = [
  {
    title: "Rapid scale-up",
    body: "EV factories often open or expand on accelerated timelines. Hiring needs can spike quickly, requiring hundreds of hires at once.",
  },
  {
    title: "Technical skills and training",
    body: "Workers may need training on new equipment or safety protocols. Workflows must ensure candidates meet evolving technical criteria.",
  },
  {
    title: "Shift and location flexibility",
    body: "EV plants may operate in multiple locations. The right match can depend on relocation willingness or specific shift patterns.",
  },
  {
    title: "Integration with production planning",
    body: "Hiring delays can hold up entire lines. Recruitment must align tightly with manufacturing schedules and supply chain timelines.",
  },
] as const;

const capabilities = [
  {
    title: "Skill and certification matching",
    body: "Filter candidates on credentials like electrical associate degrees or EV-specific safety training.",
  },
  {
    title: "Location preference logic",
    body: "If a candidate cannot work the local plant, suggest remote or alternative-site roles instead of discarding them.",
  },
  {
    title: "Volume candidate outreach",
    body: "Batch communications to targeted talent pools while respecting opt-in preferences.",
  },
  {
    title: "Dynamic scheduling",
    body: "Coordinate interviews with engineering managers and production leads — including plant tours and assessments.",
  },
  {
    title: "Automated updates",
    body: "Keep candidates informed about application status and onboarding steps, such as technical exam results.",
  },
] as const;

const useCases = [
  {
    title: "EV Technician Outreach",
    body: "Reach passive talent pools with clear messaging on battery, assembly, and robotics careers.",
    tag: "Sourcing",
  },
  {
    title: "Skill Match Filters",
    body: "Automatically surface candidates who meet EV safety and technical credentials before interviews.",
    tag: "Screening",
  },
  {
    title: "Shift Scheduler",
    body: "Align 24/7 production shifts with candidate availability and hiring manager calendars.",
    tag: "Coordination",
  },
] as const;

const growthPoints = [
  {
    title: "Stay agile",
    body: "Scale hiring up or down as demand shifts without losing track of candidates.",
  },
  {
    title: "Optimize recruiter focus",
    body: "Let AI handle repetitive screening so recruiters engage deeply on mission-critical roles.",
  },
  {
    title: "Maintain consistency",
    body: "Keep communications about sustainability and company mission clear and inspiring across locations.",
  },
] as const;

const related = [
  {
    href: "/ai-recruiting-automation-manufacturing",
    title: "AI recruiting automation for manufacturing",
    body: "See plant-level hiring workflows for multi-site industrial operations.",
  },
  {
    href: "/ai-recruiting-automation-healthcare-staffing",
    title: "AI recruiting automation for healthcare staffing",
    body: "Explore agentic workflows for high-stakes, credential-heavy hiring.",
  },
  {
    href: "/clientele#huntlo",
    title: "Agentic recruiting with Huntlo",
    body: "Discover EarlyJobs’ AI recruiting agent for sourcing and outreach support.",
  },
] as const;

const ctaHref = "/contact-us";

export function EvManufacturingAutomationPage() {
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
              EarlyJobs · EV manufacturing
            </p>
            <h1 className="mt-4 max-w-xl text-[2.35rem] leading-[1.05] font-semibold tracking-[-0.045em] text-neutral-950 sm:text-[3.15rem]">
              AI Recruitment Automation for EV Manufacturing
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-600">
              EarlyJobs AI recruiting automation connects EV and battery plant hiring — skill
              matching for pack lines and power electronics, shift scheduling, and high-volume
              candidate follow-ups — so greenfield factories ramp production teams without recruiters
              losing track of technical assessments.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SolidLink href={ctaHref}>Explore EV Manufacturing Automation</SolidLink>
              <GhostLink href="#workflow">See the workflow</GhostLink>
            </div>
            <p className="mt-5 text-[12px] leading-5 text-neutral-500">
              Built for EV plant HR managers, automotive staffing firms, and talent acquisition leaders
              in clean energy manufacturing.
            </p>
          </div>
          <EvManufacturingHeroDashboard />
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <h2 className="max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            What is AI recruiting automation for EV manufacturing?
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            AI recruiting automation for EV manufacturing coordinates hiring for battery, module, and
            vehicle assembly plants — filtering for EV-relevant skills, managing shift availability,
            and scheduling technical interviews — while recruiters approve safety and equipment
            qualifications. It supports India's growing EV supply chain without treating hiring like
            generic automotive dealership recruitment.
          </p>
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-md text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
              From chaotic spreadsheets to production-aligned hiring.
            </h2>
          </div>
          <div className="space-y-5 text-[15px] leading-7 text-neutral-600">
            <p>
              The electric vehicle sector is booming. New factories are opening to produce batteries,
              electric cars, and components. Each plant needs skilled workers — from assembly line
              technicians to quality inspectors — often on tight timelines as demand surges.
            </p>
            <p>
              An EV manufacturer might hire hundreds of people in a short period. Roles may require
              battery assembly certification or robotics operation, and must match shift patterns in a
              24/7 production schedule. Coordinating that volume across departments overwhelms
              traditional recruitment.
            </p>
            <p>
              By automating routine tasks, EV recruiters focus on best-fit candidates — ensuring new
              plants ramp smoothly without staffing delays holding back production.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Why EV manufacturing hiring is unique
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Scale, skills, shifts, and production timelines collide.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            A single late quality-control hire can halt an entire shift. AI tools can identify that
            critical path and expedite hiring steps for that role — rather than treating it as one more
            opening in the queue.
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
            What workflows can EV manufacturing teams automate?
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
                Plant go-live and schedule shifts
              </h3>
            </div>
            <p className="text-[15px] leading-7 text-neutral-600">
              When a new plant comes online, the system can update job postings and re-trigger
              candidate searches for required roles. If a pilot line is delayed, workflows can pause or
              reschedule interviews automatically — keeping hiring aligned with production reality.
            </p>
          </div>
        </div>
      </section>

      <section id="workflow" className="scroll-mt-24 border-b border-black/10 bg-[#f7f8fa]">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Building an efficient EV hiring workflow
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Source → match skills → schedule interviews → onboard.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-600">
            Every candidate event becomes part of a visible workflow: who accepted an offer, who needs
            follow-up training, and which jobs still need candidates.
          </p>
          <EvManufacturingWorkflowDiagram />
        </div>
      </section>

      <section className="border-b border-black/10">
        <div className="page-shell page-section">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-brand uppercase">
            Use cases
          </p>
          <h2 className="mt-3 max-w-2xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Where automation helps EV hiring most.
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
                Candidate dashboard
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em]">
                Track application status in a clear mobile view.
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-600">
                Applicants see timely updates on technical exams, plant tours, and onboarding steps —
                including relocation packages or shift differentials when relevant.
              </p>
            </div>
            <div className="mx-auto w-full max-w-xs space-y-3">
              {[
                { from: "EarlyJobs", text: "Battery tech application received. Technical exam link sent." },
                { from: "You", text: "Exam submitted — available for Plant B nights." },
                { from: "EarlyJobs", text: "Results in. Plant tour Fri 9:00 — safety gear instructions attached." },
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
            Future-proof hiring for EV growth
          </p>
          <h2 className="mt-3 max-w-3xl text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.04em] sm:text-[2.35rem]">
            Turn hiring from a bottleneck into part of the growth strategy.
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-7 text-neutral-600">
            The EV industry is expected to keep growing strongly. AI-driven hiring workflows place
            talented candidates where they fit best — helping the clean-energy transition happen faster.
          </p>
          <ul className="mt-12 grid gap-8 sm:grid-cols-3">
            {growthPoints.map((item) => (
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
            <EvManufacturingFaq />
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
            manufacturing plants, healthcare staffing, and other high-volume roles — including EV and
            battery manufacturing ramp-ups — with recruiter networks, tools, and workflow support.
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
            Accelerate your electric vehicle workforce.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Explore EV Hiring Automation with EarlyJobs — coordinate skill matching, shift scheduling,
            and high-volume follow-ups as plants come online.
          </p>
          <div className="mt-8">
            <SolidLink href={ctaHref}>Explore EV Manufacturing Automation</SolidLink>
          </div>
        </div>
      </section>
    </main>
  );
}
