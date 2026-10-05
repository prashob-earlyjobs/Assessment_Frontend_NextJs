import { Headline } from "@/components/home/primitives";
import { ExperienceMotion } from "@/components/recruiters/motion";
import { liftCard, RecruiterSection } from "@/components/recruiters/section";

const cards = [
  {
    title: "Find Better Opportunities",
    body: "Stop spending time chasing inconsistent mandates.",
  },
  {
    title: "Build Employer Relationships",
    body: "Work with companies that value recruiter expertise.",
  },
  {
    title: "Discover Better Talent",
    body: "Use intelligent matching to reduce manual sourcing.",
  },
  {
    title: "Manage Your Recruiting Journey",
    body: "Track hiring activity and placement progress from one place.",
  },
  {
    title: "Build Your Reputation",
    body: "Every successful placement strengthens your recruiter profile and credibility.",
  },
  {
    title: "Grow Your Earnings",
    body: "More successful placements mean more opportunities to expand your recruiting career.",
  },
] as const;

export function DesignedExperience() {
  return (
    <RecruiterSection id="recruiter-experience">
      <ExperienceMotion>
        <Headline>Designed Around the Way Recruiters Actually Work.</Headline>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className={`experience-card relative overflow-hidden ${liftCard}`}>
              <div>
                <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
              </div>
              <div aria-hidden className="experience-fill pointer-events-none absolute inset-0 bg-brand p-5 text-white">
                <h3 className="text-base font-medium tracking-[-0.02em]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6">{card.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </ExperienceMotion>
    </RecruiterSection>
  );
}
