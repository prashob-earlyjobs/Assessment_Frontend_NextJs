export function AutomotiveHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-slate-500/15 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(155deg, #0f172a 0%, #1e293b 45%, #334155 100%)",
          }}
        >
          {/* Assembly-bay lighting */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, rgba(148,163,184,0.25), transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(234,106,78,0.12), transparent 40%)",
            }}
          />

          {/* Overhead gantry rails */}
          <div aria-hidden className="absolute inset-x-0 top-10 h-px bg-white/15" />
          <div aria-hidden className="absolute inset-x-0 top-14 h-px bg-white/8" />

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-slate-300/90 uppercase">
              Automotive assembly line
            </p>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-orange-100">
              Plant workforce
            </span>
          </div>

          {/* Station bays */}
          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-4 gap-2 sm:gap-3">
              {[
                { label: "Body", height: "68%" },
                { label: "Trim", height: "82%" },
                { label: "Chassis", height: "55%" },
                { label: "Final", height: "74%" },
              ].map((bay) => (
                <div
                  key={bay.label}
                  className="flex flex-col justify-end rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm"
                >
                  <div
                    className="mx-auto w-[70%] rounded-t-md border border-slate-400/30 bg-gradient-to-b from-slate-400/40 to-slate-600/20"
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
                    Assembly · Quality · Materials
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-white/50">Segment</p>
                  <p className="mt-0.5 text-sm font-semibold text-slate-200">EV & OEM plants</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              EV & automotive
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
