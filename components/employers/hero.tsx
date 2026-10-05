import { GhostLink, SolidLink } from "@/components/home/primitives";
import { HeroMotion } from "@/components/employers/motion";

const metrics = [
  { value: "500+", label: "Hiring Companies" },
  { value: "350+", label: "Recruiters" },
  { value: "3,000+", label: "Successful Placements" },
  { value: "25,000+", label: "Interviews" },
] as const;

const path = [
  "Employer",
  "Hiring Requirement",
  "Recruiter Network",
  "AI Matching",
  "Qualified Talent",
  "Interview",
  "Joining",
] as const;

export function EmployerHero() {
  return (
    <section className="relative">
      <HeroMotion>
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:gap-12">
        <div className="hero-block">
          <h1 className="max-w-3xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
            Hire Better. Hire Faster. Hire Through Recruiters.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-neutral-800">
            Access experienced recruiters, AI-powered talent matching, and a trusted hiring network
            to reduce hiring time and improve candidate quality.
          </p>
          <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            <p>Hiring shouldn&apos;t begin with hundreds of applications.</p>
            <p>It should begin with the right recruiters.</p>
            <p>
              EarlyJobs connects your hiring team with experienced recruiters who understand your
              industry, supported by AI-powered matching that helps identify stronger candidates
              faster.
            </p>
            <p>
              Whether you&apos;re hiring one role or building an entire team, we help you spend less
              time searching and more time hiring.
            </p>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <SolidLink href="/sign-in">Start Hiring</SolidLink>
            <GhostLink href="/sign-in">Talk to Hiring Expert</GhostLink>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {metrics.map((metric) => (
              <li key={metric.label}>
                <p className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950">
                  {metric.value}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-neutral-500">{metric.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="hero-block">
          <img
            src="/employers/handshake.png"
            alt=""
            width={984}
            height={425}
            className="aspect-[984/425] h-auto w-full mix-blend-multiply"
          />
          <p className="mt-6 text-[11px] font-medium tracking-[0.16em] text-[#608cbe] uppercase">
            The hiring path
          </p>
          <ol className="mt-4 flex flex-col">
            {path.map((step, index) => (
              <li key={step} className="flex flex-col">
                <span className="flex items-center gap-3 text-sm font-medium text-neutral-950">
                  <span className="path-mark size-2 shrink-0 rounded-full bg-[#608cbe]" />
                  {step}
                </span>
                {index < path.length - 1 ? (
                  <span aria-hidden className="my-1.5 ml-[3px] h-4 w-px bg-[#608cbe]/30" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
      </HeroMotion>
    </section>
  );
}
