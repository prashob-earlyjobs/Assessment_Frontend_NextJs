import { Headline } from "@/components/home/primitives";
import { CompareMotion } from "@/components/employers/motion";
import { EmployerSection } from "@/components/employers/section";

const traditional = [
  "Hundreds of applications",
  "Manual screening",
  "Long hiring cycles",
  "Low response rates",
  "High drop-offs",
];

const withEarlyJobs = [
  "Recruiter-led sourcing",
  "AI-assisted matching",
  "Qualified shortlists",
  "Faster interviews",
  "Better joining rates",
];

export function WhyHiringChanged() {
  return (
    <EmployerSection id="why-hiring">
      <CompareMotion>
      <Headline>More Applications Don&apos;t Mean Better Candidates.</Headline>
      <div aria-hidden className="attach-pair pointer-events-none absolute top-20 right-0 hidden h-[22rem] w-[24rem] lg:block">
        <div className="attach-circle absolute top-0 left-0" style={{ transform: "translate(-64px, -32px)" }}>
          <DottedCircle color="#ea6a4e" size={272} />
        </div>
        <div className="attach-circle absolute top-[6.5rem] left-[9.5rem]" style={{ transform: "translate(48px, 28px)" }}>
          <DottedCircle color="#608cbe" size={228} />
        </div>
      </div>
      <div className="mt-5 max-w-2xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>Job postings often generate hundreds of resumes, but only a handful are relevant.</p>
        <p>Internal hiring teams spend valuable time screening instead of interviewing.</p>
        <p>Recruiters search manually.</p>
        <p>Candidates wait without feedback.</p>
        <p>Everyone loses time.</p>
        <p>Hiring should be focused on quality—not quantity.</p>
      </div>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div className="compare-col">
          <h3 className="text-base font-medium text-neutral-950">Traditional Hiring</h3>
          <ul className="mt-5 space-y-3">
            {traditional.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-600">
                <span aria-hidden className="mt-1 text-neutral-400">
                  <Mark kind="no" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="compare-col">
          <h3 className="text-base font-medium text-neutral-950">Hiring Through EarlyJobs</h3>
          <ul className="mt-5 space-y-3">
            {withEarlyJobs.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-800">
                <span aria-hidden className="mt-1 text-[#608cbe]">
                  <Mark kind="yes" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </CompareMotion>
    </EmployerSection>
  );
}

function DottedCircle({ color, size }: { color: string; size: number }) {
  const c = size / 2;
  const count = Math.round((size * size) / 120);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const maxR = size * 0.46;
  const dots = Array.from({ length: count }, (_, index) => {
    const radius = maxR * Math.sqrt((index + 0.5) / count);
    const angle = index * golden;
    return {
      x: c + Math.cos(angle) * radius,
      y: c + Math.sin(angle) * radius,
      r: 1.05 + (index % 4) * 0.28,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={color}>
      <circle cx={c} cy={c} r={maxR} fill={color} fillOpacity="0.08" />
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={dot.r} />
      ))}
    </svg>
  );
}

function Mark({ kind }: { kind: "yes" | "no" }) {
  return (
    <svg viewBox="0 0 16 16" className="size-4">
      {kind === "yes" ? (
        <path
          d="M3.5 8.2 6.4 11 12.5 4.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M4.2 4.2 11.8 11.8M11.8 4.2 4.2 11.8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
