import { Headline } from "@/components/home/primitives";
import { AiMotion } from "@/components/recruiters/motion";
import { RecruiterSection } from "@/components/recruiters/section";

const capabilities = [
  "Intelligent Talent Matching",
  "Resume Intelligence",
  "Candidate Recommendations",
  "Interview Scheduling",
  "Communication Assistance",
] as const;

const dots = [
  { x: "8%", y: "22%" },
  { x: "18%", y: "74%" },
  { x: "88%", y: "18%" },
  { x: "78%", y: "78%" },
  { x: "46%", y: "12%" },
];

export function AiSupport() {
  return (
    <RecruiterSection id="ai-recruiting" className="relative overflow-hidden">
      <AiMotion>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {dots.map((dot) => (
            <span key={dot.x} className="absolute size-1.5" style={{ left: dot.x, top: dot.y }}>
              <span className="ai-drift block size-1.5 rounded-full bg-brand will-change-transform" />
            </span>
          ))}
        </div>
        <div className="relative">
          <Headline>AI Handles the Repetitive Work. Recruiters Create the Value.</Headline>
          <div className="ai-row relative mt-12">
            <ul className="relative grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
              {capabilities.map((item, index) => (
                <li key={item} className="ai-card flex min-h-[6.5rem] flex-col justify-between rounded-xl px-3.5 py-3.5">
                  <p className="text-[11px] font-medium tracking-[0.16em] text-brand tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-[13px] font-medium leading-[1.3] tracking-[-0.03em] text-neutral-950">{item}</p>
                </li>
              ))}
            </ul>
            <svg className="ai-links pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible" aria-hidden>
              <defs>
                <filter id="ai-raise" x="-8%" y="-20%" width="116%" height="160%">
                  <feDropShadow dx="0" dy="1" stdDeviation="0.7" floodColor="#8a4032" floodOpacity="0.35" />
                </filter>
              </defs>
              <path className="ai-link" fill="none" stroke="#ea6a4e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#ai-raise)" />
            </svg>
          </div>
          <div className="mt-10 max-w-xl space-y-2 text-sm leading-6 text-neutral-600">
            <p>AI helps recruiters work faster.</p>
            <p>Recruiters help employers hire better.</p>
            <p>That balance creates exceptional hiring outcomes.</p>
          </div>
        </div>
      </AiMotion>
    </RecruiterSection>
  );
}
