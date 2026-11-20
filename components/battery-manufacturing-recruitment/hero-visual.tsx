export function BatteryHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-600/12 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(155deg, #0c1a14 0%, #13261d 48%, #1a3328 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 28% 18%, rgba(52,211,153,0.18), transparent 48%), radial-gradient(ellipse at 82% 72%, rgba(234,106,78,0.1), transparent 40%)",
            }}
          />

          {/* Cleanroom / line grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(167,243,208,0.1) 1px, transparent 1px), linear-gradient(rgba(167,243,208,0.1) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-emerald-200/80 uppercase">
              Battery production floor
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange-100">
              Cell · Module · Pack
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Electrode", cells: 6 },
                { label: "Cell assembly", cells: 8 },
                { label: "Module / pack", cells: 5 },
              ].map((bay) => (
                <div
                  key={bay.label}
                  className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
                >
                  <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                    {Array.from({ length: bay.cells }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[3/4] rounded-sm border border-emerald-300/25 bg-gradient-to-b from-emerald-400/35 to-emerald-900/20"
                      />
                    ))}
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
                    Production · Quality · Materials
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-emerald-200">Energy storage plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Battery manufacturing
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic plant-floor hiring context
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
