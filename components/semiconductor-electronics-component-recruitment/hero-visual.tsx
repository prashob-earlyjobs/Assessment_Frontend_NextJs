export function SemiconductorHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-cyan-500/12 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(158deg, #0a1628 0%, #0f2138 46%, #12263f 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 16%, rgba(34,211,238,0.16), transparent 46%), radial-gradient(ellipse at 78% 74%, rgba(234,106,78,0.09), transparent 40%)",
            }}
          />

          {/* Cleanroom grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(103,232,249,0.1) 1px, transparent 1px), linear-gradient(rgba(103,232,249,0.1) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-cyan-200/80 uppercase">
              Precision electronics facility
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange-100">
              Controlled environment
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-3 gap-2 sm:gap-3">
              {[
                { label: "Wafer prep", rings: 3 },
                { label: "Assembly", rings: 4 },
                { label: "Test / QC", rings: 3 },
              ].map((bay) => (
                <div
                  key={bay.label}
                  className="flex flex-col items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
                >
                  <div className="relative mt-2 flex size-16 items-center justify-center sm:size-20">
                    {Array.from({ length: bay.rings }).map((_, i) => (
                      <span
                        key={i}
                        aria-hidden
                        className="absolute rounded-full border border-cyan-300/30"
                        style={{
                          inset: `${i * 14}%`,
                          background:
                            i === bay.rings - 1
                              ? "radial-gradient(circle, rgba(34,211,238,0.35), transparent 70%)"
                              : "transparent",
                        }}
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
                    Production · Assembly · Technical
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-cyan-200">
                    Semiconductor & components
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Semiconductor manufacturing
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic facility hiring context
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
