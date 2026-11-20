export function SolarHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/15 via-transparent to-[#2563EB]/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background:
              "linear-gradient(165deg, #1c1917 0%, #292524 42%, #0c4a6e 100%)",
          }}
        >
          {/* Horizon glow */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 70% 20%, rgba(251,191,36,0.35), transparent 55%)",
            }}
          />

          {/* Ground plane */}
          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-[42%]"
            style={{
              background:
                "linear-gradient(180deg, rgba(68,64,60,0.2) 0%, #1c1917 100%)",
            }}
          />

          {/* Solar array rows */}
          <div className="absolute inset-x-5 bottom-[18%] top-[28%] sm:inset-x-7">
            <div className="flex h-full flex-col justify-end gap-2.5 sm:gap-3">
              {[0, 1, 2, 3].map((row) => (
                <div key={row} className="flex gap-1.5 sm:gap-2" style={{ paddingLeft: `${row * 4}%` }}>
                  {Array.from({ length: 8 - row }).map((_, i) => (
                    <div
                      key={i}
                      className="h-5 flex-1 rounded-sm border border-sky-300/25 sm:h-7"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(56,189,248,0.35) 0%, rgba(14,165,233,0.15) 55%, rgba(2,132,199,0.4) 100%)",
                        transform: "perspective(120px) rotateX(18deg)",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-200/80 uppercase">
              Utility-scale site
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-sky-100">
              Project workforce
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/50">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Installation · Ops · Logistics
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Coverage</p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-200">Multi-site India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Solar & renewable
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic project-site hiring context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            EPC & developers
          </span>
        </div>
      </div>
    </div>
  );
}
