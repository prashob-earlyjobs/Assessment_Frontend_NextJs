const bays = [
  {
    label: "Granulation",
    tone: "bg-emerald-500",
    toneSoft: "bg-emerald-500/15 text-emerald-700",
    bar: "bg-emerald-500",
    open: "18 open",
    shift: "A / B / C",
    roles: [
      { name: "Production trainees", count: "12" },
      { name: "Line assistants", count: "6" },
    ],
    fill: 72,
    status: "Hiring",
  },
  {
    label: "Packaging",
    tone: "bg-brand",
    toneSoft: "bg-brand/15 text-[#c45a40]",
    bar: "bg-brand",
    open: "24 open",
    shift: "Rotational",
    roles: [
      { name: "Packaging associates", count: "16" },
      { name: "Dispatch support", count: "8" },
    ],
    fill: 58,
    status: "Ramp-up",
  },
  {
    label: "QC hold",
    tone: "bg-[#2563EB]",
    toneSoft: "bg-[#2563EB]/15 text-[#2563EB]",
    bar: "bg-[#2563EB]",
    open: "9 open",
    shift: "Day shift",
    roles: [
      { name: "QC trainees", count: "5" },
      { name: "Documentation", count: "4" },
    ],
    fill: 41,
    status: "Screening",
  },
] as const;

export function PharmaHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background:
              "linear-gradient(165deg, #e8eef2 0%, #f4f7f9 42%, #eef2f5 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          <div aria-hidden className="absolute inset-x-6 top-8 h-px bg-neutral-300/80" />
          <div aria-hidden className="absolute inset-x-10 top-8 h-16 border-x border-neutral-300/60" />

          <div className="absolute inset-x-5 bottom-8 top-20 grid grid-cols-3 gap-2.5 sm:inset-x-6 sm:gap-3">
            {bays.map((bay) => (
              <div
                key={bay.label}
                className="flex min-h-0 flex-col rounded-xl border border-black/8 bg-white/95 p-2.5 shadow-sm backdrop-blur-sm sm:p-3"
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="flex min-w-0 items-center gap-1.5">
                    <span className={`size-1.5 shrink-0 rounded-full ${bay.tone}`} />
                    <p className="truncate text-[10px] font-semibold tracking-[0.08em] text-neutral-600 uppercase">
                      {bay.label}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold tracking-[0.04em] uppercase ${bay.toneSoft}`}
                  >
                    {bay.status}
                  </span>
                </div>

                <p className="mt-2.5 text-lg font-semibold tracking-[-0.03em] text-neutral-950 sm:text-xl">
                  {bay.open}
                </p>
                <p className="mt-0.5 text-[10px] text-neutral-500">Shift · {bay.shift}</p>

                <ul className="mt-3 space-y-1.5">
                  {bay.roles.map((role) => (
                    <li
                      key={role.name}
                      className="flex items-center justify-between gap-1 rounded-md bg-[#f7f8fa] px-2 py-1.5"
                    >
                      <span className="truncate text-[10px] leading-4 text-neutral-600">
                        {role.name}
                      </span>
                      <span className="shrink-0 text-[10px] font-semibold tabular-nums text-neutral-950">
                        {role.count}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-3">
                  <div className="flex items-center justify-between text-[9px] font-medium text-neutral-500">
                    <span>Pipeline filled</span>
                    <span className="tabular-nums text-neutral-700">{bay.fill}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className={`h-full rounded-full ${bay.bar}`}
                      style={{ width: `${bay.fill}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-4 left-4 rounded-full border border-black/10 bg-white/95 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-neutral-600 uppercase shadow-sm">
            Plant floor · India
          </div>
          <div className="absolute top-4 right-4 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold tracking-[0.1em] text-emerald-700 uppercase">
            GMP-aware hiring
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Pharmaceutical manufacturing
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Production · Packaging · Plant support
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            Entry-level pipeline
          </span>
        </div>
      </div>
    </div>
  );
}
