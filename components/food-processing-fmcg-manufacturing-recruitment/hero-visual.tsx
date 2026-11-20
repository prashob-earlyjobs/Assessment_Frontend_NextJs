export function FoodManufacturingHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-500/12 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(155deg, #1c1917 0%, #292524 48%, #44403c 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 24% 16%, rgba(251,191,36,0.16), transparent 48%), radial-gradient(ellipse at 85% 70%, rgba(234,106,78,0.1), transparent 40%)",
            }}
          />

          {/* Conveyor lanes */}
          <div aria-hidden className="absolute inset-x-0 top-[38%] h-px bg-white/10" />
          <div aria-hidden className="absolute inset-x-0 top-[52%] h-px bg-white/8" />
          <div aria-hidden className="absolute inset-x-0 top-[66%] h-px bg-white/6" />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-100/80 uppercase">
              Food production & packaging
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange-100">
              FMCG plant floor
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Process", height: "62%" },
                { label: "Fill", height: "78%" },
                { label: "Pack", height: "70%" },
                { label: "Dispatch", height: "55%" },
              ].map((bay) => (
                <div
                  key={bay.label}
                  className="flex flex-col justify-end rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
                >
                  <div
                    className="mx-auto w-[72%] rounded-t-md border border-amber-200/25 bg-gradient-to-b from-amber-300/35 to-stone-700/30"
                    style={{ height: bay.height }}
                  />
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
                    Production · Packaging · Warehouse
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-100">Food & FMCG plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Food processing & FMCG
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
