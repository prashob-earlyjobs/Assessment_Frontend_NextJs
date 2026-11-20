const markers = [
  { city: "Midwest", value: "$45k", left: "28%" },
  { city: "Northeast", value: "$52k", left: "58%" },
  { city: "West", value: "$58k", left: "78%" },
] as const;

export function SalaryHeroMockup() {
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
            Salary map
          </p>
          <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
            Benchmark
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-[-0.02em]">
                Entry production technician
              </h3>
              <p className="mt-0.5 text-[12px] text-neutral-500">Manufacturing · by region</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-neutral-400 uppercase tracking-[0.08em]">Median</p>
              <p className="text-lg font-semibold tabular-nums text-[#2563EB]">$45,000</p>
            </div>
          </div>

          <div className="relative mt-5 h-36 overflow-hidden rounded-xl border border-black/5 bg-gradient-to-br from-[#e8eefc] via-[#f8fafc] to-[#f3f4f6]">
            <div
              aria-hidden
              className="absolute inset-6 rounded-[40%] border border-[#2563EB]/20 bg-[#2563EB]/5"
            />
            {markers.map((marker) => (
              <div
                key={marker.city}
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: marker.left }}
              >
                <div className="rounded-lg border border-black/10 bg-white px-2.5 py-1.5 shadow-sm">
                  <p className="text-[10px] font-medium text-neutral-500">{marker.city}</p>
                  <p className="text-[12px] font-semibold tabular-nums text-neutral-950">
                    {marker.value}
                  </p>
                </div>
                <div className="mx-auto mt-1 size-2 rounded-full bg-[#2563EB]" />
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: "10th", value: "$38k" },
              { label: "Median", value: "$45k" },
              { label: "90th", value: "$54k" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-[#f8fafc] px-3 py-3 text-center">
                <p className="text-[10px] font-medium tracking-[0.08em] text-neutral-400 uppercase">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-semibold tabular-nums">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
