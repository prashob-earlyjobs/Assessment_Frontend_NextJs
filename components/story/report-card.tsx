export function ReportCardSvg() {
  return (
    <figure className="mt-12 max-w-md">
      <svg
        viewBox="0 0 360 220"
        className="h-auto w-full border border-[#E5E5E5] bg-white"
        role="img"
        aria-label="Stylized AI interview feedback report card"
      >
        <text x="24" y="36" fontSize="12" fill="#525252" letterSpacing="0.08em">
          CANDIDATE FEEDBACK REPORT
        </text>
        <text x="24" y="64" fontSize="14" fontWeight="600" fill="#0A0A0A">
          Candidate: ———
        </text>
        {/* @verification Placeholder candidate name — keep em dashes until a verified sample is approved */}
        <Bar y={96} label="Communication" score={78} fill={0.78} />
        <Bar y={132} label="Aptitude" score={84} fill={0.84} />
        <Bar y={168} label="Role fit" score={81} fill={0.81} />
      </svg>
      <figcaption className="mt-3 text-[13px] leading-5 text-[#525252]">
        Every interview leaves the candidate better than it found them.
      </figcaption>
    </figure>
  );
}

function Bar({
  y,
  label,
  score,
  fill,
}: {
  y: number;
  label: string;
  score: number;
  fill: number;
}) {
  const width = 180 * fill;
  return (
    <g>
      <text x="24" y={y} fontSize="12" fill="#525252">
        {label}
      </text>
      <rect x="140" y={y - 10} width="180" height="10" fill="#E5E5E5" />
      <rect x="140" y={y - 10} width={width} height="10" fill="#F97316" />
      <text x="332" y={y} fontSize="12" fontWeight="600" fill="#0A0A0A" textAnchor="end">
        {score}
      </text>
    </g>
  );
}
