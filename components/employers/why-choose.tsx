import { Headline } from "@/components/home/primitives";
import { OutcomesMotion } from "@/components/employers/motion";
import { employerCard, EmployerSection } from "@/components/employers/section";

const cards = [
  {
    title: "Better Candidate Quality",
    body: "Receive recruiter-reviewed candidates instead of filtering hundreds of applications.",
  },
  {
    title: "Faster Hiring",
    body: "Reduce sourcing and screening time with recruiter-led workflows.",
  },
  {
    title: "Specialized Recruiters",
    body: "Access recruiters with expertise across industries and roles.",
  },
  {
    title: "AI-Powered Matching",
    body: "Improve candidate relevance while keeping recruiters in control.",
  },
  {
    title: "Scalable Hiring",
    body: "Whether hiring one employee or building an entire team, the network scales with your needs.",
  },
  {
    title: "Transparent Process",
    body: "Track hiring progress with clarity and confidence.",
  },
] as const;

export function WhyCompaniesChoose() {
  return (
    <EmployerSection id="why-companies">
      <OutcomesMotion>
      <Headline>Recruiters Create Better Hiring Outcomes.</Headline>
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <li key={card.title} className={`outcome-card ${employerCard}`}>
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
          </li>
        ))}
      </ul>
      </OutcomesMotion>
    </EmployerSection>
  );
}
