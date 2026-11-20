const steps = [
  {
    n: "01",
    title: "Document requirements",
    body: "For each EV role, list required skills and training — battery tech, assembly, quality.",
    human: true,
  },
  {
    n: "02",
    title: "Identify candidate pools",
    body: "Leverage technician databases and engineering graduates interested in EV careers.",
    human: false,
  },
  {
    n: "03",
    title: "Relevant outreach",
    body: "Explain EV roles clearly and gather interest plus location flexibility.",
    human: false,
  },
  {
    n: "04",
    title: "Response handling",
    body: "Tag replies — ready now, available later, more info — and route to the right team.",
    human: false,
  },
  {
    n: "05",
    title: "Interview coordination",
    body: "Auto-schedule plant walk-throughs with safety briefings and gear instructions.",
    human: false,
  },
  {
    n: "06",
    title: "Follow-up and training",
    body: "Remind new hires about training videos, onboarding paperwork, and day-one schedules.",
    human: true,
  },
] as const;

export function EvManufacturingWorkflowDiagram() {
  return (
    <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
