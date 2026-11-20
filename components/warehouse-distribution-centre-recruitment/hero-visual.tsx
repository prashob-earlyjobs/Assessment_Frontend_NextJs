export function WarehouseHeroVisual() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-400/15 via-transparent to-orange-500/10 blur-2xl"
      />
      <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:rounded-[1.5rem]">
        <div
          className="relative aspect-[4/3] overflow-hidden sm:aspect-[5/4]"
          style={{
            background: "linear-gradient(160deg, #fff7ed 0%, #ffedd5 38%, #f8fafc 100%)",
          }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 18% 12%, rgba(245,158,11,0.2), transparent 45%), radial-gradient(ellipse at 88% 78%, rgba(234,88,12,0.12), transparent 40%)",
            }}
          />

          {/* Aisle perspective lines */}
          <div aria-hidden className="absolute inset-x-0 top-[22%] bottom-[28%]">
            <div className="absolute top-0 left-[12%] h-full w-px bg-amber-900/10" />
            <div className="absolute top-0 right-[12%] h-full w-px bg-amber-900/10" />
            <div className="absolute inset-x-[12%] top-0 h-px bg-amber-900/10" />
            <div className="absolute inset-x-[8%] bottom-0 h-px bg-amber-900/15" />
          </div>

          <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-7 sm:top-6">
            <p className="text-[10px] font-semibold tracking-[0.14em] text-amber-800/80 uppercase">
              Distribution centre
            </p>
            <span className="rounded-full bg-amber-600/10 px-2.5 py-0.5 text-[10px] font-semibold text-amber-900">
              Live operations
            </span>
          </div>

          <div className="absolute inset-x-5 bottom-[22%] top-[26%] sm:inset-x-7">
            <div className="grid h-full grid-cols-4 gap-1.5 sm:gap-2">
              {[
                { title: "Receiving", fill: 55 },
                { title: "Storage", fill: 78 },
                { title: "Picking", fill: 92 },
                { title: "Dispatch", fill: 68 },
              ].map((bay) => (
                <div
                  key={bay.title}
                  className="flex flex-col rounded-xl border border-amber-200/80 bg-white/85 p-2 shadow-sm backdrop-blur-sm sm:p-2.5"
                >
                  <div className="relative flex flex-1 items-end overflow-hidden rounded-md bg-amber-50/80">
                    <div
                      className="w-full rounded-sm bg-gradient-to-t from-amber-600/55 to-orange-300/35"
                      style={{ height: `${bay.fill}%` }}
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-1 top-2 grid grid-rows-3 gap-1 opacity-40"
                    >
                      <div className="h-1 rounded-sm bg-amber-800/30" />
                      <div className="h-1 rounded-sm bg-amber-800/30" />
                      <div className="h-1 rounded-sm bg-amber-800/30" />
                    </div>
                  </div>
                  <p className="mt-2 text-[9px] font-medium tracking-[0.08em] text-amber-950/70 uppercase sm:text-[10px]">
                    {bay.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-6">
            <div className="rounded-xl border border-amber-200/70 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] text-neutral-500">Hiring focus</p>
                  <p className="mt-0.5 text-sm font-semibold text-neutral-950">
                    Pick · Pack · Inventory · Dispatch
                  </p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-[11px] text-neutral-500">Facilities</p>
                  <p className="mt-0.5 text-sm font-semibold text-amber-900">India DCs & 3PLs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-black/5 bg-[#f8fafc] px-4 py-3 sm:px-5">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.12em] text-neutral-500 uppercase">
              Warehouse & distribution
            </p>
            <p className="mt-0.5 text-sm font-medium text-neutral-950">
              Authentic Indian fulfilment context
            </p>
          </div>
          <span className="shrink-0 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-neutral-600">
            Logistics ops
          </span>
        </div>
      </div>
    </div>
  );
}
