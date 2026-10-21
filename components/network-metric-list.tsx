export function NetworkMetricList({
  metrics,
}: {
  metrics: { value: string; label: string }[] | null;
}) {
  if (!metrics?.length) return null;

  return (
    <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
      {metrics.map((metric) => (
        <li key={metric.label}>
          <p className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950 tabular-nums">
            {metric.value}
          </p>
          <p className="mt-2 text-[13px] leading-5 text-neutral-500">{metric.label}</p>
        </li>
      ))}
    </ul>
  );
}
