/**
 * Published figures stay as written. A counting animation was replacing
 * the approved number with intermediate values while the page loaded.
 */
export function AnimatedStat({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  return <span className={className}>{value}</span>;
}
