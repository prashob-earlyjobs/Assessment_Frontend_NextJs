const shifts = [
  { role: "ICU RN", shift: "Night · 7p–7a", status: "3 shortlisted", tone: "bg-emerald-500" },
  { role: "Radiology Tech", shift: "Day · 8a–4p", status: "Interview Thu", tone: "bg-[#2563EB]" },
  { role: "ER RN", shift: "Weekend · flex", status: "License check", tone: "bg-amber-500" },
] as const;

const alerts = [
  { title: "Verify License", detail: "Priya M. — RN license pending upload", action: "Review" },
  { title: "Available soon", detail: "James K. — finishes contract in 4 weeks", action: "Schedule" },
] as const;

export function HealthcareHeroDashboard() {
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
            Staffing board
          </p>
          <span className="rounded-full bg-[#2563EB]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
            Live
          </span>
        </div>

        <div className="grid gap-0 sm:grid-cols-[1.15fr_0.85fr]">
          <div className="border-b border-black/5 p-4 sm:border-b-0 sm:border-r sm:p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold tracking-[-0.02em]">Open clinical roles</h3>
              <span className="text-[11px] text-neutral-500">This week</span>
            </div>
            <ul className="mt-4 space-y-3">
              {shifts.map((row) => (
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
                    <p className="mt-0.5 text-[12px] text-neutral-500">{row.shift}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 sm:p-5">
            <h3 className="text-sm font-semibold tracking-[-0.02em]">Notification panel</h3>
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
              Human checkpoint: credential review before interview confirmation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
