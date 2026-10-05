import { Headline } from "@/components/home/primitives";
import { StoriesMotion } from "@/components/recruiters/motion";
import { liftCard, RecruiterSection } from "@/components/recruiters/section";

const stories = [
  {
    role: "Experienced Recruiter",
    quote: "EarlyJobs helped me work with employers I couldn't access before.",
  },
  {
    role: "Freelance Recruiter",
    quote: "I now spend less time searching for work and more time placing candidates.",
  },
  {
    role: "New Recruiter",
    quote:
      "I started with no recruiting experience and built my first successful placements through the platform.",
  },
] as const;

export function RecruiterStories() {
  return (
    <RecruiterSection id="recruiter-stories">
      <StoriesMotion>
        <Headline>Every Placement Starts with a Recruiter.</Headline>
        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {stories.map((story) => (
            <li key={story.role} className={`story-card ${liftCard}`}>
              <p className="text-sm font-medium text-brand">{story.role}</p>
              <blockquote className="mt-3 text-base leading-7 tracking-[-0.02em] text-neutral-950">
                “{story.quote}”
              </blockquote>
            </li>
          ))}
        </ul>
      </StoriesMotion>
    </RecruiterSection>
  );
}
