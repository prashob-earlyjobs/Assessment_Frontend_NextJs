import { DrawList } from "@/components/home/motion";
import { Flow, Frame, Headline, SolidLink } from "@/components/home/primitives";

const benefits = [
  {
    title: "Verified Hiring Mandates",
    body: "Work on real hiring requirements from trusted employers.",
  },
  {
    title: "Flexible Work",
    body: "Recruit from anywhere. Build your own schedule.",
  },
  {
    title: "Transparent Earnings",
    body: "Earn based on successful placements. Track your progress clearly.",
  },
  {
    title: "AI Recruiting Assistant",
    body: "Spend less time searching. Spend more time hiring.",
  },
  {
    title: "Continuous Learning",
    body: "Access guides, resources, and recruiter communities to improve your skills.",
  },
  {
    title: "Career Growth",
    body: "Build long-term relationships with employers and expand your recruiting expertise.",
  },
] as const;

const path = ["Recruiter", "Verified Mandates", "AI", "Talent", "Placements", "Revenue"];

export function RecruiterExperience() {
  return (
    <Frame id="recruiter-experience">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_14rem]">
        <div>
          <Headline>Build a Career in Recruitment.</Headline>
          <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
            Whether you&apos;re an experienced recruiter or just getting started, EarlyJobs gives
            you access to verified opportunities, flexible work, and AI-powered tools that help you
            place better candidates.
          </p>
        </div>
        <Flow steps={path} />
      </div>

      <DrawList className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <li key={benefit.title} className="relative border-t border-black/10 pt-4">
            <span
              aria-hidden
              data-line
              className="absolute -top-px left-0 h-0.5 w-full origin-left bg-brand"
            />
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
              {benefit.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{benefit.body}</p>
          </li>
        ))}
      </DrawList>

      <div className="mt-10">
        <SolidLink href="/become-a-recruiter">Become a Recruiter</SolidLink>
      </div>
    </Frame>
  );
}
