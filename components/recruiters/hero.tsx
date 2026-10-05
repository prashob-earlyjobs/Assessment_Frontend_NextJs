import { SolidLink } from "@/components/home/primitives";
import { LightSweep } from "@/components/light-sweep";
import { DottedGlobe } from "@/components/recruiters/dotted-globe";
import { HashLink } from "@/components/recruiters/hash-link";

const metrics = [
  { value: 350, label: "Recruiters" },
  { value: 500, label: "Employers" },
  { value: 3000, label: "Successful Placements" },
  { value: 25000, label: "Interviews Facilitated" },
] as const;

function formatCount(value: number) {
  return `${Math.round(value).toLocaleString("en-US")}+`;
}

export function RecruiterHero() {
  return (
    <section className="relative">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-5 pt-10 pb-16 sm:px-8 sm:pt-14 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,26rem)] lg:gap-2">
        <div>
          <h1 className="max-w-xl text-[2.25rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[3.25rem]">
            Build a <LightSweep text="Recruiting" /> Career Without Limits.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Join The Recruiter-First Hiring Network and access verified hiring opportunities,
            AI-powered recruiting tools, transparent payouts, and a growing community of recruiters
            helping companies hire better.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <SolidLink href="/become-a-recruiter">Become a Recruiter</SolidLink>
            <HashLink
              href="#how-it-works"
              className="inline-flex h-11 items-center justify-center rounded-[6px] border border-black/10 bg-white px-4 text-[13px] font-medium text-neutral-950 transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-neutral-50"
            >
              See How It Works
            </HashLink>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {metrics.map((metric) => (
              <li key={metric.label}>
                <p className="text-[1.65rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950">
                  {formatCount(metric.value)}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-neutral-500">{metric.label}</p>
              </li>
            ))}
          </ul>
        </div>
        <DottedGlobe className="mx-auto aspect-square w-[min(100%,280px)] lg:mx-0 lg:w-full lg:max-w-[440px]" />
      </div>
    </section>
  );
}
