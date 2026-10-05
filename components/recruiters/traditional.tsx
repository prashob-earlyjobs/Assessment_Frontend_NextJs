import { Headline } from "@/components/home/primitives";
import { CompareMotion } from "@/components/recruiters/motion";
import { RecruiterSection } from "@/components/recruiters/section";

const traditional = [
  "Searching endlessly for clients",
  "Manual sourcing",
  "Inconsistent hiring requirements",
  "Low placement visibility",
  "Limited earning opportunities",
];

const withEarlyJobs = [
  "Verified hiring opportunities",
  "AI-assisted matching",
  "Employer network",
  "Transparent workflows",
  "Better placement opportunities",
];

export function TraditionalRecruiting() {
  return (
    <RecruiterSection id="traditional-recruiting">
      <CompareMotion>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:gap-14">
          <img
            src="/recruiters/rocket.jpg"
            alt=""
            width={1024}
            height={682}
            className="aspect-[1024/682] h-auto w-full mix-blend-multiply"
          />
          <div>
            <Headline>Recruiting Shouldn&apos;t Feel Like Starting From Scratch Every Day.</Headline>
            <div className="mt-12 grid gap-10 lg:grid-cols-2">
              <div className="compare-col">
                <h3 className="text-base font-medium text-neutral-950">Traditional Recruiting</h3>
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
                <h3 className="text-base font-medium text-neutral-950">Recruiting with EarlyJobs</h3>
                <ul className="mt-5 space-y-3">
                  {withEarlyJobs.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-neutral-800">
                      <span aria-hidden className="mt-1 text-brand">
                        <Mark kind="yes" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-10 max-w-2xl text-sm leading-6 text-neutral-600">
              Recruiters create the best hiring outcomes when they spend more time with people and less
              time managing repetitive work.
            </p>
          </div>
        </div>
      </CompareMotion>
    </RecruiterSection>
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
