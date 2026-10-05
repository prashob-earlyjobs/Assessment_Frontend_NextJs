import { AboutJourneyMotion } from "@/components/about/motion";
import { AboutSection, AboutTitle } from "@/components/about/section";

const marks = [
  {
    label: "2024",
    text: "EarlyJobs begins with a vision to empower recruiters and create better hiring opportunities.",
  },
  {
    label: "2025",
    text: "Expansion of recruiter partnerships, employer network, college collaborations, and successful placements across India.",
  },
  {
    label: "Today",
    text: "A growing recruiter-first hiring network connecting recruiters, employers, and professionals through AI-powered hiring infrastructure.",
  },
  {
    label: "Tomorrow",
    text: "Building one of the world's most trusted hiring networks with a global outlook while staying committed to human-first recruitment.",
  },
] as const;

export function AboutJourney() {
  return (
    <AboutSection id="journey">
      <AboutJourneyMotion>
        <AboutTitle>From One Belief to a Growing Hiring Network.</AboutTitle>
        <ol className="relative mt-12 max-w-2xl space-y-10 pl-8">
          <span aria-hidden className="absolute top-1 bottom-1 left-[3px] w-px bg-brand/25" />
          <span
            aria-hidden
            className="about-line absolute top-1 bottom-1 left-[3px] w-px origin-top bg-brand will-change-transform"
          />
          {marks.map((mark) => (
            <li key={mark.label} className="relative">
              <span
                aria-hidden
                className="about-tick absolute top-[0.4rem] left-[-25px] z-10 size-[7px] -translate-x-1/2 rounded-full ring-4 ring-white"
              />
              <p className="about-year text-sm font-medium">{mark.label}</p>
              <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-600">{mark.text}</p>
            </li>
          ))}
        </ol>
      </AboutJourneyMotion>
    </AboutSection>
  );
}
