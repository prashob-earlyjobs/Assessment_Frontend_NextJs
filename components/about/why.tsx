import { AboutPath } from "@/components/about/path";
import { AboutSection, AboutTitle } from "@/components/about/section";

const steps = ["Recruiters", "AI", "Employers", "Professionals", "Successful Careers"] as const;

export function AboutWhy() {
  return (
    <AboutSection id="why">
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div>
          <AboutTitle>Hiring Has Become Fragmented.</AboutTitle>
          <div className="mt-8 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            <p>Recruiters search for opportunities.</p>
            <p>Employers search for talent.</p>
            <p>Professionals search for careers.</p>
            <p>Each group works in separate systems, often without meaningful connection.</p>
            <p>We believe hiring should feel connected—not fragmented.</p>
            <p>Instead of building another platform, we built a network.</p>
          </div>
          <div className="mt-8 max-w-xl space-y-2 text-sm leading-6 text-neutral-950">
            <p>Every successful placement strengthens the network.</p>
            <p>Every new recruiter expands opportunities.</p>
            <p>Every employer creates careers.</p>
          </div>
        </div>
        <AboutPath steps={steps} />
      </div>
    </AboutSection>
  );
}
