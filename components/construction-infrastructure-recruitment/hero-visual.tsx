export function ConstructionHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-500/15 via-transparent to-stone-500/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(165deg, #1c1917 0%, #292524 45%, #44403c 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 22% 18%, rgba(245,158,11,0.22), transparent 48%), radial-gradient(ellipse at 85% 75%, rgba(120,113,108,0.25), transparent 42%)",
            }}
          />

          {/* Skyline / structure silhouettes */}
          <div aria-hidden className="absolute inset-x-0 bottom-[38%] top-[18%] flex items-end justify-center gap-1.5 px-8 sm:gap-2 sm:px-10">
            {[38, 62, 48, 78, 55, 70, 42].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm border border-amber-200/15 bg-gradient-to-t from-stone-800/80 to-stone-600/40"
                style={{ height: `${h}%` }}
              >
                <div className="mt-2 grid grid-cols-2 gap-0.5 px-1 opacity-50">
                  {Array.from({ length: 4 }).map((_, w) => (
                    <div key={w} className="aspect-square rounded-[1px] bg-amber-200/25" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Ground / site plane */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[36%]"
            style={{
              background: "linear-gradient(180deg, rgba(68,64,60,0.15) 0%, #1c1917 100%)",
            }}
          />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-200/80 uppercase">
              Infrastructure site
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-100">
              Multi-site India
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/50">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Site · Trades · Materials · Admin
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-200">EPC & developers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Construction & infrastructure
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic project-site hiring context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            Project workforce
          </span>
        </div>
      </div>
    </div>
  );
}
