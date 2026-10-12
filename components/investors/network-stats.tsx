"use client";

import { formatStat, formatSummaryStat } from "@/lib/dashboard";
import { useDashboardStats } from "@/lib/use-dashboard-stats";

export function NetworkStatsCopy() {
  const dashboard = useDashboardStats();

  return (
    <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
      Recruiters bring judgment and local context. Technology helps them move faster. The network now
      includes {formatStat(dashboard.recruiters)} recruiters and {formatStat(dashboard.companies)}{" "}
      hiring companies, with {formatSummaryStat(dashboard.interviews)} interviews and{" "}
      {formatSummaryStat(dashboard.joinings)} joinings.
    </p>
  );
}
