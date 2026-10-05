import { AboutSection, AboutTitle } from "@/components/about/section";

const team = [
  {
    name: "Saurav Kumar",
    role: "Founder & CEO",
    purpose: "Leads EarlyJobs as the hiring network grows.",
    initials: "SK",
  },
  {
    name: "Surbhi Rani",
    role: "Co-Founder & Director",
    purpose: "Grows the recruiter community at the center of the network.",
    initials: "SR",
  },
] as const;

export function AboutLeadership() {
  return (
    <AboutSection id="leadership">
      <AboutTitle>
        Built by People Who Believe Hiring Can Be <span className="text-brand">Better.</span>
      </AboutTitle>
      <article className="mt-12 grid gap-6 rounded-2xl border border-black/10 p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:p-8">
        <span
          aria-hidden
          className="flex size-16 items-center justify-center rounded-2xl bg-[#fff4f1] text-sm font-semibold tracking-[-0.03em] text-brand"
        >
          RK
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-[-0.03em] text-neutral-950">Ravi Prakash Kumar</h3>
          <p className="mt-1 text-sm font-medium text-brand">Founder</p>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600">
            Ravi founded EarlyJobs with the belief that recruiters deserve better opportunities,
            employers deserve stronger hiring outcomes, and professionals deserve more meaningful
            career journeys. His vision is to create a recruiter-first hiring network that combines
            human expertise with AI to redefine hiring.
          </p>
        </div>
      </article>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {team.map((person) => (
          <li key={person.name} className="rounded-2xl border border-black/10 p-6">
            <span
              aria-hidden
              className="flex size-12 items-center justify-center rounded-xl bg-neutral-100 text-[13px] font-semibold tracking-[-0.03em] text-neutral-700"
            >
              {person.initials}
            </span>
            <h3 className="mt-4 text-base font-medium tracking-[-0.03em] text-neutral-950">{person.name}</h3>
            <p className="mt-1 text-sm font-medium text-brand">{person.role}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{person.purpose}</p>
          </li>
        ))}
      </ul>
    </AboutSection>
  );
}
