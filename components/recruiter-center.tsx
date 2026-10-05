import { CompareLanes } from "@/components/home/motion";
import { Flow, Frame, Headline, SolidLink } from "@/components/home/primitives";

const traditional = [
  "Recruiters search manually.",
  "Employers review hundreds of resumes.",
  "Candidates apply repeatedly.",
  "Hiring slows down.",
];

const recruiterFirst = [
  "Recruiters receive verified opportunities.",
  "AI accelerates sourcing.",
  "Qualified candidates reach employers faster.",
  "Better hiring outcomes.",
];

const principles = [
  {
    title: "Human Judgment",
    body: "Recruiters make hiring decisions. AI supports them.",
  },
  {
    title: "Better Matches",
    body: "Hiring becomes more accurate because recruiters understand context beyond keywords.",
  },
  {
    title: "Faster Hiring",
    body: "AI removes manual work. Recruiters focus on people.",
  },
  {
    title: "Better Careers",
    body: "Candidates receive opportunities aligned with their experience and aspirations.",
  },
] as const;

export function RecruiterCenter() {
  return (
    <Frame id="recruiter-first">
      <Headline>Great Hiring Starts with Great Recruiters.</Headline>
      <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>Recruiters understand people.</p>
        <p>They understand industries.</p>
        <p>They understand hiring.</p>
        <p>Technology should empower recruiters—not replace them.</p>
        <p className="font-medium text-neutral-800">
          That&apos;s why every opportunity inside EarlyJobs starts with recruiters.
        </p>
      </div>

      <CompareLanes>
        <div data-lane="traditional">
          <p className="text-sm font-medium text-neutral-500">Traditional Hiring</p>
          <div className="mt-5">
            <Flow steps={traditional} />
          </div>
        </div>
        <div data-lane="network" className="sm:border-l sm:border-black/10 sm:pl-10">
          <p className="text-sm font-medium text-brand">Recruiter-First Hiring</p>
          <div className="mt-5">
            <Flow steps={recruiterFirst} />
          </div>
        </div>
      </CompareLanes>

      <ul className="mt-14 grid gap-8 border-t border-black/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
        {principles.map((principle) => (
          <li key={principle.title}>
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">
              {principle.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{principle.body}</p>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <SolidLink href="/become-a-recruiter">Become a Recruiter</SolidLink>
      </div>
    </Frame>
  );
}
