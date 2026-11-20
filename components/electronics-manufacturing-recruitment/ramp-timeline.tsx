const phases = [
  {
    phase: "Phase 1",
    title: "Pilot cohort",
    body: "Recruit a small group for training before production expands.",
    meta: "Train · validate",
  },
  {
    phase: "Phase 2",
    title: "Line expansion",
    body: "Scale assembly and support roles as customer programmes ramp.",
    meta: "Volume hire",
  },
  {
    phase: "Phase 3",
    title: "Steady-state + replacement",
    body: "Maintain shift coverage while preparing for the next product line.",
    meta: "Ongoing pipeline",
  },
] as const;

export function ElectronicsRampTimeline() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Production ramp-up
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
            Hire in phases — not as identical openings
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          Share plant location, role category, openings, qualifications, compensation, shift pattern
          and target joining period.
        </p>
      </div>

      <ol className="relative mt-10 grid gap-6 lg:grid-cols-3 lg:gap-0">
        {phases.map((item, index) => (
          <li key={item.phase} className="relative lg:px-5">
            {index < phases.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-[calc(50%+1.25rem)] hidden h-px w-[calc(100%-2.5rem)] bg-black/10 lg:block"
              />
            ) : null}
            <span className="inline-flex rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 uppercase">
              {item.phase}
            </span>
            <h4 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
            <p className="mt-3 text-[11px] font-medium tracking-[0.08em] text-brand uppercase">
              {item.meta}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
