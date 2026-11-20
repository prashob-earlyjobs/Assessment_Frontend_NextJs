const stages = [
  {
    step: "01",
    title: "Project requirement",
    body: "Establish vacancies, locations, timelines and site conditions.",
  },
  {
    step: "02",
    title: "Candidate identification",
    body: "Explore suitable talent through available recruitment channels.",
  },
  {
    step: "03",
    title: "Assessment",
    body: "Evaluate candidates against project eligibility and employer criteria.",
  },
  {
    step: "04",
    title: "Joining",
    body: "Communicate reporting locations, employment conditions and start dates.",
  },
] as const;

export function ConstructionHiringFlow() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-amber-800 uppercase">
            Visual hiring flow
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
            Project requirement → Identification → Assessment → Joining
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          Align recruitment steps with construction schedules so joining dates match site readiness.
        </p>
      </div>

      <ol className="relative mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {stages.map((item, index) => (
          <li key={item.step} className="relative lg:px-4">
            {index < stages.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-[calc(50%+1rem)] hidden h-px w-[calc(100%-2rem)] bg-black/10 lg:block"
              />
            ) : null}
            <span className="inline-flex rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 tabular-nums">
              {item.step}
            </span>
            <h4 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
            {index < stages.length - 1 ? (
              <p className="mt-3 text-[11px] font-medium tracking-[0.08em] text-amber-800 uppercase lg:hidden">
                Next → {stages[index + 1].title}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
