import { Headline } from "@/components/home/primitives";
import { StoriesMotion } from "@/components/employers/motion";
import { employerCard, EmployerSection } from "@/components/employers/section";

const stories = [
  {
    role: "One role",
    quote: "Share the role, location, and timeline. Recruiters work from that hiring requirement.",
  },
  {
    role: "Candidate review",
    quote: "Candidate review follows the requirements and the process agreed for the role.",
  },
  {
    role: "More than one function",
    quote: "Hiring across more than one function can be discussed for the same engagement.",
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
            <p className="mt-3 text-base leading-7 tracking-[-0.02em] text-neutral-950">{story.quote}</p>
          </li>
        ))}
      </ul>
      </StoriesMotion>
    </EmployerSection>
  );
}
