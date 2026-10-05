import { filtersPanelClass, rolesPanelClass } from "@/components/jobs/panel-classes";

const categoryWidths = ["w-28", "w-24", "w-36", "w-20", "w-32", "w-24", "w-28", "w-16"];

export function Shimmer({ className }: { className: string }) {
  return <span aria-hidden className={`shimmer block ${className}`} />;
}

export function FiltersBodyShimmer() {
  return (
    <div aria-hidden>
      <Shimmer className="mt-5 h-2.5 w-16" />
      <Shimmer className="mt-2 h-11 w-full rounded-full" />
      <Shimmer className="mt-5 h-2.5 w-20" />
      <div className="mt-3 space-y-2.5">
        {categoryWidths.map((width, index) => (
          <span key={index} className="flex items-center gap-2.5 px-1.5">
            <Shimmer className="size-4 shrink-0 rounded-[5px]" />
            <Shimmer className={`h-3 ${width}`} />
          </span>
        ))}
      </div>
      <Shimmer className="mt-5 h-2.5 w-16" />
      <span className="mt-3 flex flex-wrap gap-1.5">
        <Shimmer className="h-7 w-20 rounded-full" />
        <Shimmer className="h-7 w-16 rounded-full" />
        <Shimmer className="h-7 w-24 rounded-full" />
      </span>
      <Shimmer className="mt-5 h-2.5 w-28" />
      <span className="mt-3 flex flex-wrap gap-1.5">
        <Shimmer className="h-7 w-28 rounded-full" />
        <Shimmer className="h-7 w-16 rounded-full" />
        <Shimmer className="h-7 w-24 rounded-full" />
        <Shimmer className="h-7 w-16 rounded-full" />
      </span>
    </div>
  );
}

export function RoleRowsShimmer() {
  return (
    <ul aria-hidden className="job-list mt-4 flex min-h-0 flex-1 flex-col gap-2 lg:overflow-y-auto">
      {Array.from({ length: 6 }, (_, index) => (
        <li
          key={index}
          className="flex shrink-0 flex-col gap-3 rounded-2xl bg-neutral-50 p-4 sm:p-5 lg:h-[100px] lg:flex-row lg:items-center lg:gap-4"
        >
          <Shimmer className="size-11 shrink-0 rounded-xl" />
          <span className="min-w-0 flex-1">
            <Shimmer className="h-2.5 w-28" />
            <Shimmer className="mt-2 h-3.5 w-3/5 max-w-xs" />
            <span className="mt-3 flex gap-1.5">
              <Shimmer className="h-5 w-16 rounded-full" />
              <Shimmer className="h-5 w-14 rounded-full" />
              <Shimmer className="h-5 w-12 rounded-full" />
            </span>
          </span>
          <span className="shrink-0">
            <Shimmer className="ml-auto h-3 w-24" />
            <Shimmer className="mt-2 ml-auto h-2.5 w-10" />
          </span>
        </li>
      ))}
    </ul>
  );
}

export function JobsLoading() {
  return (
    <main className="lg:h-[calc(100dvh-4rem)]">
      <aside aria-hidden className={`${filtersPanelClass} max-lg:hidden lg:block`}>
        <Shimmer className="h-4 w-16" />
        <Shimmer className="mt-5 h-2.5 w-32" />
        <Shimmer className="mt-2 h-11 w-full rounded-full" />
        <FiltersBodyShimmer />
      </aside>
      <div aria-hidden className={rolesPanelClass}>
        <span className="flex items-center justify-between px-1.5">
          <Shimmer className="h-4 w-24" />
          <Shimmer className="h-3 w-14" />
        </span>
        <RoleRowsShimmer />
      </div>
    </main>
  );
}
