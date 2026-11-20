const stages = [
  {
    step: "01",
    title: "Understand the requirement",
    body: "Vacancies, location, shift pattern, education, compensation and joining timeline.",
  },
  {
    step: "02",
    title: "Identify relevant candidates",
    body: "Focus on qualifications, location preferences and career interest alignment.",
  },
  {
    step: "03",
    title: "Coordinate evaluation",
    body: "Employer-defined interviews, practical assessments or other selection steps.",
  },
  {
    step: "04",
    title: "Support joining",
    body: "Candidate communication and joining follow-up within the agreed engagement scope.",
  },
] as const;

export function PharmaProcessTimeline() {
  return (
    <ol className="relative grid gap-6 lg:grid-cols-4 lg:gap-0">
      {stages.map((stage, index) => (
        <li key={stage.step} className="relative lg:px-4">
          {index < stages.length - 1 ? (
            <span
              aria-hidden
              className="pointer-events-none absolute top-5 left-[calc(50%+1.5rem)] hidden h-px w-[calc(100%-3rem)] bg-black/10 lg:block"
            />
          ) : null}
          <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-[12px] font-semibold tabular-nums text-brand shadow-sm">
              {stage.step}
            </span>
            <div>
              <h3 className="text-base font-semibold tracking-[-0.02em] text-neutral-950">
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{stage.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
