import { Headline } from "@/components/home/primitives";
import { JourneyMotion } from "@/components/employers/motion";
import { EmployerSection } from "@/components/employers/section";

const steps = [
  "Share your hiring requirement.",
  "The requirement reaches recruiters with the right expertise.",
  "AI helps surface stronger candidate matches.",
  "Recruiters submit qualified candidates.",
  "Interview, evaluate, and hire.",
  "Successful joining.",
] as const;

const flow = ["Requirement", "Recruiters", "AI", "Shortlist", "Interview", "Joining"] as const;

export function EmployerHowItWorks() {
  return (
    <EmployerSection id="how-it-works" border={false}>
      <JourneyMotion>
      <Headline>One Hiring Requirement. A Network Ready to Deliver.</Headline>
      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <ol className="relative order-2 space-y-8 pl-8 lg:order-1">
          <span aria-hidden className="absolute top-1 bottom-1 left-[3px] w-1 rounded-full bg-[#608cbe]/25" />
          <span
            aria-hidden
            className="journey-line absolute top-1 bottom-1 left-[3px] w-1 origin-top rounded-full bg-[#608cbe] will-change-transform"
          />
          {steps.map((step, index) => (
            <li key={step}>
              <p className="step-index text-sm font-medium text-neutral-400 tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 max-w-xl text-base leading-6 text-neutral-950">{step}</p>
            </li>
          ))}
        </ol>
        <div className="order-1 lg:sticky lg:top-24 lg:order-2">
          <p className="text-sm font-medium text-neutral-500">The path</p>
          <ol className="mt-4 flex flex-col">
            {flow.map((item, index) => (
              <li key={item} className="flex flex-col">
                <span className="flex items-center gap-3 text-sm font-medium text-neutral-950">
                    <span className="flow-mark size-2 shrink-0 rounded-full bg-neutral-200" />
                  {item}
                </span>
                {index < flow.length - 1 ? (
                  <span aria-hidden className="my-1.5 ml-[3px] h-4 w-px bg-[#608cbe]/30" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
      </JourneyMotion>
    </EmployerSection>
  );
}
