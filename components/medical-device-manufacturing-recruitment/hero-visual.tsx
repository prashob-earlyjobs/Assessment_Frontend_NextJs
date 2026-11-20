export function MedicalDeviceHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-500/12 via-transparent to-slate-500/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(160deg, #0f172a 0%, #134e4a 48%, #0f172a 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(45,212,191,0.12) 1px, transparent 1px), linear-gradient(rgba(45,212,191,0.12) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-teal-200/80 uppercase">
              Precision manufacturing floor
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-teal-100">
              Controlled environment
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Assembly", fill: 72 },
                { label: "Packaging", fill: 58 },
                { label: "Inspection", fill: 84 },
                { label: "Materials", fill: 46 },
              ].map((bay) => (
                <div
                  key={bay.label}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
                >
                  <div className="relative flex flex-1 items-end overflow-hidden rounded-md bg-teal-950/40">
                    <div
                      className="w-full rounded-sm bg-gradient-to-t from-teal-400/50 to-cyan-300/20"
                      style={{ height: `${bay.fill}%` }}
                    />
                  </div>
                  <p className="mt-2 text-center text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
                    {bay.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/50">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Assembly · Quality · Materials
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-teal-200">Medical device plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Medical device manufacturing
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic precision-assembly hiring context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            India manufacturing
          </span>
        </div>
      </div>
    </div>
  );
}
