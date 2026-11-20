const segments = [
  {
    id: "01",
    title: "Site operations",
    body: "Site assistants, general construction support workers and project coordination associates.",
  },
  {
    id: "02",
    title: "Skilled trades",
    body: "Electricians, welders, plumbers, masons and other tradespeople meeting employer qualification criteria.",
  },
  {
    id: "03",
    title: "Equipment & materials",
    body: "Material-handling staff, store assistants, equipment support personnel and authorized machine operators.",
  },
  {
    id: "04",
    title: "Project administration",
    body: "Documentation assistants, junior coordinators, data-entry staff and site administration associates.",
  },
] as const;

export function ConstructionWorkforceMap() {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.14em] text-amber-800 uppercase">
            Project workforce map
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-neutral-950">
            Four workforce segments behind every infrastructure project
          </h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-neutral-600">
          Source by function and site — not a single generic construction vacancy — so location and
          eligibility stay clear.
        </p>
      </div>

      <ol className="relative mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {segments.map((item, index) => (
          <li key={item.id} className="relative lg:px-4">
            {index < segments.length - 1 ? (
              <span
                aria-hidden
                className="pointer-events-none absolute top-5 left-[calc(50%+1rem)] hidden h-px w-[calc(100%-2rem)] bg-black/10 lg:block"
              />
            ) : null}
            <div className="rounded-xl border border-black/10 bg-[#f7f8fa] p-4 lg:border-0 lg:bg-transparent lg:p-0">
              <span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-semibold tracking-[0.1em] text-neutral-600 tabular-nums">
                {item.id}
              </span>
              <h4 className="mt-4 text-base font-semibold tracking-[-0.02em]">{item.title}</h4>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
