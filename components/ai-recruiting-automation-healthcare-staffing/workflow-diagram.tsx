const steps = [
  {
    n: "01",
    title: "Requirement Intake",
    body: "HR defines department, shift needs, and certifications required (e.g. RN license, BLS).",
    human: false,
  },
  {
    n: "02",
    title: "Candidate Search",
    body: "Identify potential candidates from a resume database or existing applicant pool.",
    human: false,
  },
  {
    n: "03",
    title: "Initial Outreach",
    body: "Send a brief automated call or text explaining the role and asking if they’re interested.",
    human: false,
  },
  {
    n: "04",
    title: "Response Routing",
    body: "Interested replies flag recruiter follow-up; declines stop outreach and respect preference.",
    human: true,
  },
  {
    n: "05",
    title: "Interview Coordination",
    body: "Auto-collect time slots and schedule interviews with clinicians and the hiring manager.",
    human: false,
  },
  {
    n: "06",
    title: "Credential Verification",
    body: "If a license or certification is missing, notify the recruiter before proceeding.",
    human: true,
  },
  {
    n: "07",
    title: "Candidate Reminders",
    body: "Send interview reminders and follow-ups when there’s no response.",
    human: false,
  },
  {
    n: "08",
    title: "Offer & Onboarding Prep",
    body: "Send offer details and guide paperwork — background checks and health screenings.",
    human: true,
  },
] as const;

export function WorkflowDiagram() {
  return (
    <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li
          key={step.n}
          className="relative flex flex-col rounded-2xl border border-black/10 bg-white p-5"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium tracking-[0.14em] text-brand tabular-nums">
              {step.n}
            </span>
            {step.human ? (
              <span className="rounded-full bg-[#2563EB]/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-[#2563EB] uppercase">
                Human check
              </span>
            ) : (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold tracking-[0.06em] text-neutral-500 uppercase">
                Automated
              </span>
            )}
          </div>
          <h3 className="mt-4 text-base font-semibold tracking-[-0.02em]">{step.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-6 text-neutral-600">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
