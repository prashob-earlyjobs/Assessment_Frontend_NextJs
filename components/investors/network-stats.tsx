import { formatStat, formatSummaryStat, getDashboard } from "@/lib/dashboard";

export async function NetworkStatsCopy() {
  let dashboard: Awaited<ReturnType<typeof getDashboard>> | null = null;
  try {
    dashboard = await getDashboard();
  } catch {
    dashboard = null;
  }

  if (!dashboard) return null;

  return (
    <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#3a3a3a] sm:text-base">
      Recruiters bring judgment and local context. Technology helps them move faster. The network now
      includes {formatStat(dashboard.recruiters)} recruiters and {formatStat(dashboard.companies)}{" "}
      hiring companies, with {formatSummaryStat(dashboard.interviews)} interviews and{" "}
      {formatSummaryStat(dashboard.joinings)} joinings.
    </p>
  );
}
