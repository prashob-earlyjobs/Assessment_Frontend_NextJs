import { AboutSection, AboutTitle } from "@/components/about/section";
import { Reveal } from "@/components/ui/reveal";

const metrics = [
  { value: "350+", label: "Recruiters" },
  { value: "500+", label: "Employers" },
  { value: "3,000+", label: "Successful Placements" },
  { value: "25,000+", label: "Interviews" },
  { value: "150+", label: "College Partners" },
  { value: "20+", label: "Hiring Partners" },
] as const;

export function AboutImpact() {
  return (
    <AboutSection id="impact">
      <Reveal>
        <AboutTitle>Measured by Careers. Not Just Numbers.</AboutTitle>
      </Reveal>
      <ul className="reveal-stagger mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
        {metrics.map((metric) => (
          <Reveal as="li" key={metric.label}>
            <p className="text-[2rem] font-semibold leading-none tracking-[-0.04em] text-neutral-950 sm:text-[2.5rem]">
              {metric.value}
            </p>
            <p className="mt-2 text-sm text-neutral-500">{metric.label}</p>
          </Reveal>
        ))}
      </ul>
      <Reveal delay={80}>
        <p className="mt-12 max-w-xl text-sm leading-6 text-neutral-600">
          Every metric represents a person, a recruiter, a company, or a career transformed through
          meaningful hiring.
        </p>
      </Reveal>
    </AboutSection>
  );
}
