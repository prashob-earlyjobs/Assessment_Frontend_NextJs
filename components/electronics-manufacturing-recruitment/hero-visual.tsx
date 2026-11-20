export function ElectronicsHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#2563EB]/12 via-transparent to-brand/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background:
              "linear-gradient(160deg, #0f172a 0%, #1e293b 48%, #0f172a 100%)",
          }}
        >
          {/* PCB-style grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(147,197,253,0.12) 1px, transparent 1px), linear-gradient(rgba(147,197,253,0.12) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Assembly stations */}
          <div className="absolute inset-x-6 bottom-8 top-16 flex flex-col justify-between">
            <div className="flex items-center justify-between px-1">
              <p className="text-[10px] font-semibold tracking-[0.14em] text-sky-300/80 uppercase">
                EMS assembly line
              </p>
              <span className="rounded-full bg-brand/20 px-2.5 py-0.5 text-[10px] font-semibold text-orange-200">
                Precision ops
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {["SMT", "AOI", "Assembly", "Test"].map((station, i) => (
                <div
                  key={station}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm"
                >
                  <div className="flex h-12 items-end gap-0.5 sm:h-16">
                    {Array.from({ length: 5 }).map((_, bar) => (
                      <div
                        key={bar}
                        className="flex-1 rounded-sm bg-sky-400/30"
                        style={{ height: `${35 + ((i * 17 + bar * 13) % 55)}%` }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] font-medium tracking-[0.08em] text-white/70 uppercase">
                    {station}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/50">Line utilisation</p>
                  <p className="mt-0.5 text-sm font-semibold text-white">Shift A · ramping</p>
                </div>
                <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10 sm:w-36">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#2563EB] to-brand" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Electronics & EMS
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Assembly · Quality · Materials
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
