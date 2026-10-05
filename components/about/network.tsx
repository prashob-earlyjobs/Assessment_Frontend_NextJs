import { AboutPath } from "@/components/about/path";
import { AboutSection, AboutTitle } from "@/components/about/section";

const principles = [
  {
    title: "Human Expertise",
    lines: ["Recruiters bring experience and judgment."],
  },
  {
    title: "AI-powered Infrastructure",
    lines: ["Technology removes repetitive work and improves matching."],
  },
  {
    title: "Better Outcomes",
    lines: ["Employers hire faster.", "Professionals build stronger careers.", "Recruiters grow meaningful businesses."],
  },
] as const;

const outcomes = ["Recruiters", "AI Infrastructure", "Employers", "Job Seekers", "Better Outcomes"] as const;

export function AboutNetwork() {
  return (
    <AboutSection id="network">
      <AboutTitle>Why Recruiters Are at the Center.</AboutTitle>
      <div className="mt-8 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
        <p>Recruiters understand hiring better than algorithms alone.</p>
        <p>They understand industries.</p>
        <p>They understand people.</p>
        <p>They understand opportunity.</p>
        <p>EarlyJobs empowers recruiters with technology while keeping people at the center of hiring.</p>
      </div>
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {principles.map((principle) => (
          <li key={principle.title} className="rounded-xl border border-black/10 bg-white p-5">
            <h3 className="text-base font-medium tracking-[-0.03em] text-neutral-950">{principle.title}</h3>
            <div className="mt-3 space-y-1 text-sm leading-6 text-neutral-600">
              {principle.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-12 lg:max-w-xs">
        <AboutPath steps={outcomes} />
      </div>
    </AboutSection>
  );
}
