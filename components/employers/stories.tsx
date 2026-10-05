import { Headline } from "@/components/home/primitives";
import { StoriesMotion } from "@/components/employers/motion";
import { employerCard, EmployerSection } from "@/components/employers/section";

const stories = [
  {
    role: "Startup Founder",
    quote: "Reduced hiring time by connecting with specialized recruiters.",
  },
  {
    role: "HR Manager",
    quote: "Improved candidate quality without increasing hiring costs.",
  },
  {
    role: "Enterprise TA Lead",
    quote: "Scaled hiring across multiple functions with recruiter-led coordination.",
  },
] as const;

export function EmployerStories() {
  return (
    <EmployerSection id="stories" border={false}>
      <StoriesMotion>
      <Headline>Every Great Team Starts with the Right Hire.</Headline>
      <ul className="mt-12 grid gap-4 lg:grid-cols-3">
        {stories.map((story) => (
          <li key={story.role} className={`story-card ${employerCard}`}>
            <p className="text-sm font-medium text-[#608cbe]">{story.role}</p>
            <blockquote className="mt-3 text-base leading-7 tracking-[-0.02em] text-neutral-950">
              “{story.quote}”
            </blockquote>
          </li>
        ))}
      </ul>
      </StoriesMotion>
    </EmployerSection>
  );
}
