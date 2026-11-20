const steps = [
  {
    n: "01",
    title: "Define job requirements",
    body: "Document each plant’s openings, required shifts, and training needs.",
    human: true,
  },
  {
    n: "02",
    title: "Candidate engagement",
    body: "Send automated role descriptions with clear location and shift details.",
    human: false,
  },
  {
    n: "03",
    title: "Response management",
    body: "Sort replies — interested with availability, needs more info, not interested.",
    human: false,
  },
  {
    n: "04",
    title: "Site-specific routing",
    body: "Route candidates or queries to another plant or local hiring manager when needed.",
    human: false,
  },
  {
    n: "05",
    title: "Interview coordination",
    body: "Schedule skills tests or plant tours across recruiters and facilities.",
    human: false,
  },
  {
    n: "06",
    title: "Follow-up",
    body: "Remind candidates about orientation — safety videos, uniforms, day-one logistics.",
    human: false,
  },
  {
    n: "07",
    title: "Reporting",
    body: "Dashboard of openings, candidate statuses, and stalled actions by plant.",
    human: true,
  },
] as const;

export function ManufacturingWorkflowDiagram() {
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
