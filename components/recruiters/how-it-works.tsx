import { Headline } from "@/components/home/primitives";
import { JourneyMotion } from "@/components/recruiters/motion";
import { RecruiterSection } from "@/components/recruiters/section";

const steps = [
  "Create your recruiter profile.",
  "Get verified.",
  "Access hiring opportunities.",
  "Use AI-assisted matching to discover qualified candidates faster.",
  "Submit candidates and coordinate interviews.",
  "Celebrate successful placements and continue growing your recruiter reputation.",
] as const;

const flow = [
  "Join",
  "Verification",
  "Hiring Opportunities",
  "AI Matching",
  "Submit Candidates",
  "Interviews",
  "Placements",
  "Grow",
] as const;

export function RecruiterHowItWorks() {
  return (
    <RecruiterSection id="how-it-works" border={false}>
      <JourneyMotion>
        <Headline>A Better Way to Recruit.</Headline>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <ol className="relative order-2 space-y-8 pl-8 lg:order-1">
            <span aria-hidden className="absolute top-1 bottom-1 left-[5px] w-px bg-neutral-200" />
            <span
              aria-hidden
              className="journey-line absolute top-1 bottom-1 left-[5px] w-px origin-top bg-brand will-change-transform"
            />
            {steps.map((step, index) => (
              <li key={step}>
                <p className="step-index text-sm font-medium text-neutral-400">
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
                    <span aria-hidden className="my-1.5 ml-[3px] h-4 w-px bg-neutral-200" />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </JourneyMotion>
    </RecruiterSection>
  );
}
