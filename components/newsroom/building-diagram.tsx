export function NewsroomBuildingDiagram() {
  return (
    <div
      className="overflow-hidden rounded-[6px] border border-black/10 bg-[#faf8f7] px-4 py-8 sm:px-8 sm:py-10"
      aria-label="Hiring flow from employers through EarlyJobs to talent and joinings"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 text-center">
        <Node label="Employers" />
        <Arrow />
        <Node label="Hiring Mandates" muted />
        <Arrow brand />
        <div className="rounded-[6px] border border-brand/30 bg-brand px-6 py-4 text-white shadow-[0_12px_32px_rgba(234,106,78,0.22)]">
          <p className="text-sm font-semibold tracking-[-0.03em]">EarlyJobs</p>
          <p className="mt-0.5 text-[11px] text-white/85">AI + Network</p>
        </div>
        <Arrow brand />
        <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
          <Node label="Women Recruiters" compact />
          <Node label="Agencies" compact />
          <Node label="Recruiters" compact />
        </div>
        <Arrow />
        <Node label="Talent" />
        <Arrow brand />
        <Node label="Joinings" strong />
      </div>
    </div>
  );
}

function Node({
  label,
  muted,
  compact,
  strong,
}: {
  label: string;
  muted?: boolean;
  compact?: boolean;
  strong?: boolean;
}) {
  return (
    <div
      className={`w-full rounded-[6px] border px-3 py-2.5 ${
        strong
          ? "border-brand/25 bg-white text-brand"
          : muted
            ? "border-black/8 bg-white/70 text-neutral-600"
            : "border-black/10 bg-white text-neutral-950"
      } ${compact ? "py-2" : ""}`}
    >
      <p className={`font-medium tracking-[-0.02em] ${compact ? "text-[11px]" : "text-xs sm:text-sm"}`}>
        {label}
      </p>
    </div>
  );
}

function Arrow({ brand }: { brand?: boolean }) {
  return (
    <span
      aria-hidden
      className={`block h-4 w-px ${brand ? "bg-brand/50" : "bg-black/15"}`}
    />
  );
}
