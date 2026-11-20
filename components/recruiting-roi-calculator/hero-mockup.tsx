const inputs = [
  { label: "Open positions / yr", value: "100" },
  { label: "Avg days to fill", value: "45" },
  { label: "Unfilled cost / day", value: "$500" },
] as const;

export function RoiHeroMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2563EB]/10 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div className="flex items-center justify-between border-b border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-brand" />
            <span className="size-2.5 rounded-full bg-amber-400" />
            <span className="size-2.5 rounded-full bg-emerald-400" />
          </div>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
            ROI preview
          </p>
          <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
            Live model
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1.05fr_0.95fr]">
          <div className="border-b border-black/5 p-4 sm:border-r sm:border-b-0 sm:p-5">
            <h3 className="text-sm font-semibold tracking-[-0.02em]">Current hiring inputs</h3>
            <ul className="mt-4 space-y-3">
              {inputs.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-3 rounded-xl border border-black/5 bg-[#f8fafc] px-3 py-3"
                >
                  <span className="text-[12px] text-neutral-500">{row.label}</span>
                  <span className="text-sm font-semibold tabular-nums text-neutral-950">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-dashed border-[#2563EB]/30 bg-[#2563EB]/5 px-3 py-3">
              <span className="text-[12px] text-neutral-600">Estimated improvement</span>
              <span className="text-sm font-semibold text-[#2563EB]">20%</span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold tracking-[-0.02em]">Projected impact</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl border border-black/5 p-3">
                <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                  Annual savings
                </p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-[#2563EB]">
                  $607,500
                </p>
              </div>
              <div className="flex h-24 items-end gap-3 rounded-xl bg-[#f8fafc] px-4 py-3">
                <div className="flex h-full w-10 flex-col justify-end">
                  <div className="h-[78%] rounded-t-md bg-[#2563EB]" />
                </div>
                <div className="flex h-full w-10 flex-col justify-end">
                  <div className="h-[42%] rounded-t-md bg-brand" />
                </div>
                <div className="mb-1 ml-2">
                  <p className="text-[11px] font-semibold text-neutral-950">ROI 1,587%</p>
                  <p className="text-[11px] text-neutral-500">vs $36k investment</p>
                </div>
              </div>
              <div className="rounded-xl bg-neutral-950 px-3 py-3 text-[12px] leading-5 text-white/80">
                Faster hiring recovers vacancy cost and recruiting spend.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
