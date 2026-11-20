const roles = [
  { role: "Battery assembly tech", plant: "Cell Plant · Line 2", status: "48 in pipeline", tone: "bg-emerald-500" },
  { role: "Quality inspector", plant: "Pack Plant · QC", status: "Critical path", tone: "bg-amber-500" },
  { role: "Robotics operator", plant: "Vehicle Plant · Body", status: "Interview Fri", tone: "bg-[#2563EB]" },
] as const;

const alerts = [
  { title: "Skill match", detail: "Ananya R. — EV safety training verified, ready for plant tour", action: "Schedule" },
  { title: "Relocate option", detail: "Omar H. — unavailable for Plant A; suggest Plant B pack line", action: "Reroute" },
] as const;

export function EvManufacturingHeroDashboard() {
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
            EV factory hiring
          </p>
          <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
            Live
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-black/5 p-4 sm:border-b-0 sm:border-r sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-[-0.02em]">Ramp-up roles</h3>
              <span className="text-[11px] text-neutral-500">24/7 plants</span>
            </div>
            <ul className="mt-4 space-y-3">
              {roles.map((row) => (
                <li
                  key={row.role}
                  className="flex items-start gap-3 rounded-xl border border-black/5 bg-[#f8fafc] px-3 py-3"
                >
                  <span className={`mt-1.5 size-2 shrink-0 rounded-full ${row.tone}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-neutral-950">{row.role}</p>
                      <p className="shrink-0 text-[11px] font-medium text-neutral-500">{row.status}</p>
                    </div>
                    <p className="mt-0.5 text-[12px] text-neutral-500">{row.plant}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-neutral-500">
              <span className="rounded-md border border-black/10 bg-white px-2 py-1">Source</span>
              <span aria-hidden>→</span>
              <span className="rounded-md border border-black/10 bg-white px-2 py-1">Match</span>
              <span aria-hidden>→</span>
              <span className="rounded-md border border-black/10 bg-white px-2 py-1">Interview</span>
              <span aria-hidden>→</span>
              <span className="rounded-md border border-black/10 bg-white px-2 py-1">Onboard</span>
            </div>
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold tracking-[-0.02em]">Workflow alerts</h3>
            <ul className="mt-4 space-y-3">
              {alerts.map((item) => (
                <li key={item.title} className="rounded-xl border border-black/5 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[12px] font-semibold text-[#2563EB]">{item.title}</p>
                    <span className="text-[10px] font-medium tracking-[0.06em] text-neutral-400 uppercase">
                      {item.action}
                    </span>
                  </div>
                  <p className="mt-1 text-[12px] leading-5 text-neutral-600">{item.detail}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-neutral-950 px-3 py-3 text-[12px] leading-5 text-white/80">
              Critical-path roles expedite automatically when a single vacancy risks a production halt.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
