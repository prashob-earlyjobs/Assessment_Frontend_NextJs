"use client";

import type { ReactNode } from "react";
import { useJobsNav } from "@/components/jobs/jobs-nav";
import { rolesPanelClass } from "@/components/jobs/panel-classes";
import { RoleRowsShimmer, Shimmer } from "@/components/jobs/shimmer";

export function OpenRoles({ total, children }: { total: number | null; children: ReactNode }) {
  const { isPending } = useJobsNav();

  return (
    <div role="region" aria-busy={isPending} aria-label="Open roles" className={rolesPanelClass}>
      <div className="flex items-center justify-between px-1.5">
        <p className="text-[15px] font-semibold tracking-[-0.03em] text-neutral-950">Open roles</p>
        {isPending ? (
          <Shimmer className="h-3 w-16 rounded-full" />
        ) : total !== null ? (
          <p className="text-[12px] font-medium text-neutral-400 tabular-nums">
            {total.toLocaleString("en-IN")} roles
          </p>
        ) : null}
      </div>
      {isPending ? <RoleRowsShimmer /> : children}
    </div>
  );
}
