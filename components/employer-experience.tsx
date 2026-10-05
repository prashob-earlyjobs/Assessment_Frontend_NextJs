import { Frame, Headline, SolidLink } from "@/components/home/primitives";

const values = [
  {
    title: "Specialized Recruiters",
    body: "Access recruiters with industry expertise.",
  },
  {
    title: "AI-powered Matching",
    body: "Reduce manual screening. Identify stronger candidates.",
  },
  {
    title: "Faster Hiring",
    body: "Move from requirement to shortlist quickly.",
  },
  {
    title: "Better Hiring Outcomes",
    body: "Focus on quality instead of quantity.",
  },
] as const;

export function EmployerExperience() {
  return (
    <Frame id="employer-experience" className="bg-[#fafafa]">
      <Headline>Hire Through a Network That Understands Hiring.</Headline>
      <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>Hiring isn&apos;t about receiving more applications.</p>
        <p>It&apos;s about meeting the right candidates.</p>
        <p>
          EarlyJobs combines recruiter expertise with AI-powered hiring infrastructure to help
          employers hire faster and better.
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => (
          <li key={value.title}>
            <p className="text-xs tabular-nums text-brand">0{index + 1}</p>
            <h3 className="mt-2 text-base font-medium tracking-[-0.02em] text-neutral-950">
              {value.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{value.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <SolidLink href="/employers">Start Hiring</SolidLink>
      </div>
    </Frame>
  );
}
