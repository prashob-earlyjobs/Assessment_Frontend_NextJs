import { Frame, Headline } from "@/components/home/primitives";

const metrics = [
  { label: "Recruiters", value: "350+", detail: "Helping companies discover exceptional talent." },
  { label: "Employers", value: "500+", detail: "Hiring through trusted recruiter partnerships." },
  {
    label: "Successful Placements",
    value: "3,000+",
    detail: "Professionals connected with meaningful careers.",
  },
  {
    label: "Interviews Facilitated",
    value: "25,000+",
    detail: "Conversations that created opportunities.",
  },
  { label: "College Partners", value: "150+", detail: "Preparing students for the workforce." },
  { label: "Hiring Partners", value: "20+", detail: "Building local hiring ecosystems." },
] as const;

export function Impact() {
  return (
    <Frame id="impact">
      <Headline>Every Connection Creates an Opportunity.</Headline>
      <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>
          Behind every successful hire is a recruiter who opened a door, an employer who believed
          in potential, and a professional who took the next step.
        </p>
        <p>Every interaction strengthens The Recruiter-First Hiring Network.</p>
      </div>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <li key={metric.label}>
              <p className="text-sm font-medium text-brand">{metric.label}</p>
              <p className="mt-1 text-[1.75rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950">
                {metric.value}
              </p>
              <p className="mt-2 text-[13px] leading-5 text-neutral-500">{metric.detail}</p>
            </li>
          ))}
        </ul>

        <img
          src="/impact/handshake.jpg"
          alt=""
          width={1024}
          height={1024}
          className="mx-auto aspect-square h-auto w-full max-w-[18rem] mix-blend-multiply"
        />
      </div>
    </Frame>
  );
}
