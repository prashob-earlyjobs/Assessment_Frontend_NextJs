import { Headline } from "@/components/home/primitives";
import { StagesMotion } from "@/components/employers/motion";
import { EmployerSection } from "@/components/employers/section";

const stages = [
  { title: "Startup Hiring", body: "Build your first team quickly." },
  { title: "Growth Companies", body: "Scale across departments." },
  { title: "Enterprise Hiring", body: "Manage large-scale recruitment with recruiter-led coordination." },
  { title: "GCC Hiring", body: "Access recruiters familiar with global capability center hiring." },
  { title: "Executive Hiring", body: "Hire leadership and specialized talent with experienced recruiters." },
  { title: "Campus Hiring", body: "Connect with emerging talent through college partnerships." },
] as const;

export function HiringSolutions() {
  return (
    <EmployerSection id="solutions" border={false}>
      <StagesMotion>
      <Headline>Built for Every Stage of Growth.</Headline>
      <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {stages.map((stage, index) => (
          <li key={stage.title} className="stage-item">
            <p className="text-xs font-medium text-[#608cbe] tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-base font-medium tracking-[-0.02em] text-neutral-950">{stage.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{stage.body}</p>
          </li>
        ))}
      </ul>
      </StagesMotion>
    </EmployerSection>
  );
}
