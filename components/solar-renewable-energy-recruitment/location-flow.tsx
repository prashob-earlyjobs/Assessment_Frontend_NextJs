const steps = [
  {
    step: "01",
    title: "Define the site",
    body: "Capture district, reporting point, duration and travel or stay arrangements.",
  },
  {
    step: "02",
    title: "Match local readiness",
    body: "Prioritise candidates near the project or willing to relocate for the execution window.",
  },
  {
    step: "03",
    title: "Coordinate joining",
    body: "Align selection, safety prerequisites and reporting dates with the project timeline.",
  },
] as const;

export function SolarLocationFlow() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-[#2563EB] uppercase">
            Project-location hiring
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
            Hire around the site — not in the abstract
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          Location, duration and readiness determine whether a solar vacancy is practical for
          candidates.
        </p>
      </div>

      <ol className="relative mt-10 grid gap-6 lg:grid-cols-3 lg:gap-0">
        {steps.map((item, index) => (
          <li key={item.step} className="relative lg:px-5">
            {index < steps.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-4 left-[calc(50%+1.25rem)] hidden h-px w-[calc(100%-2.5rem)] bg-black/10 lg:block"
              />
            ) : null}
            <span className="inline-flex rounded-full border border-black/10 bg-[#f7f8fa] px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 tabular-nums">
              {item.step}
            </span>
            <h4 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h4>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
