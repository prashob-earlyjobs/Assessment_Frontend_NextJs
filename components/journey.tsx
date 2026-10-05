import Link from "next/link";
import { JourneyMotion } from "@/components/home/motion";

const journeys = [
  {
    title: "I'm Looking for a Job",
    description: [
      "Don't just apply.",
      "Get discovered.",
      "Build a profile that recruiters actually use.",
      "Receive opportunities that match your skills.",
    ],
    features: [
      "AI-powered matching",
      "Recruiter guidance",
      "Verified employers",
      "Faster interviews",
    ],
    cta: "Find Jobs",
    href: "/jobs",
    mark: "job",
  },
  {
    title: "I'm a Recruiter",
    description: [
      "Turn recruiting into a scalable career.",
      "Access verified hiring mandates.",
      "Earn from successful placements.",
      "Use AI to work smarter—not harder.",
    ],
    features: [
      "Verified hiring requirements",
      "Flexible work",
      "Transparent payouts",
      "AI-assisted recruiting",
    ],
    cta: "Become a Recruiter",
    href: "/recruiters",
    mark: "recruiter",
  },
  {
    title: "I'm Hiring",
    description: [
      "Find better talent through recruiters who understand your hiring needs.",
      "Skip irrelevant applications.",
      "Receive qualified candidates faster.",
    ],
    features: ["Recruiter-led hiring", "AI matching", "Faster hiring", "Better candidate quality"],
    cta: "Start Hiring",
    href: "/employers",
    mark: "hiring",
  },
] as const;

function JourneyMark({ kind }: { kind: (typeof journeys)[number]["mark"] }) {
  if (kind === "job") {
    return (
      <img
        src="/journey/job-search.jpg"
        alt=""
        width={1024}
        height={1024}
        className="mx-auto aspect-square h-auto w-full mix-blend-multiply"
      />
    );
  }

  if (kind === "recruiter") {
    return (
      <img
        src="/journey/recruiter.jpg"
        alt=""
        width={1024}
        height={1024}
        className="mx-auto aspect-square h-auto w-full mix-blend-multiply"
      />
    );
  }

  return (
    <img
      src="/journey/hiring.jpg"
      alt=""
      width={1024}
      height={1024}
      className="mx-auto aspect-square h-auto w-full mix-blend-multiply"
    />
  );
}

export function Journey() {
  return (
    <JourneyMotion>
      <div className="mx-auto flex w-full max-w-6xl flex-col px-5 py-12 sm:px-8 sm:py-16">
        <h2 className="max-w-2xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.04em] text-neutral-950 sm:text-[2.75rem]">
          One Network.
          <br />
          <span className="text-brand">Three Ways to Grow.</span>
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
          Whether you&apos;re looking for opportunities, helping others find them, or building a
          team, EarlyJobs gives you the right path.
        </p>

        <div className="relative mt-10">
          <div className="relative z-[1] grid grid-cols-1 gap-4 lg:grid-cols-3">
          {journeys.map((journey) => (
            <article
              key={journey.href}
              className="relative z-[1] flex flex-col rounded-md border border-black/10 bg-white p-5 shadow-[0_12px_32px_rgba(23,23,23,0.05)]"
            >
              <JourneyMark kind={journey.mark} />
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.03em] text-neutral-950">
                {journey.title}
              </h3>
              <div className="mt-3 space-y-2 text-sm leading-6 text-neutral-600">
                {journey.description.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <ul className="mt-4 space-y-2">
                {journey.features.map((feature) => (
                  <li key={feature} data-check className="relative text-sm text-neutral-800">
                    <span
                      aria-hidden
                      data-mark
                      className="absolute top-0 left-0 mt-0.5 origin-center text-brand"
                      style={{ transform: "scale(0)" }}
                    >
                      ✓
                    </span>
                    <span data-copy className="inline-block">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Link
                href={journey.href}
                className="mt-6 flex h-11 w-full items-center justify-center rounded-[6px] bg-brand px-3 text-[13px] font-medium text-white transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px] hover:bg-[#d85c42]"
              >
                {journey.cta}
              </Link>
            </article>
          ))}
          </div>
        </div>
      </div>
    </JourneyMotion>
  );
}
