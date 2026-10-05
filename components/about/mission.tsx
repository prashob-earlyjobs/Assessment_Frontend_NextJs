import { AboutSection } from "@/components/about/section";

const values = [
  {
    title: "Recruiter First",
    lines: ["We believe recruiters create exceptional hiring experiences."],
  },
  {
    title: "Human + AI",
    lines: ["Technology supports people.", "People make the important decisions."],
  },
  {
    title: "Trust",
    lines: ["Every opportunity should be genuine, transparent, and valuable."],
  },
  {
    title: "Opportunity",
    lines: ["Better hiring creates better careers, stronger businesses, and healthier communities."],
  },
  {
    title: "Long-term Relationships",
    lines: ["Success is measured by lasting partnerships—not transactions."],
  },
] as const;

const sketches: Partial<Record<(typeof values)[number]["title"], string>> = {
  "Recruiter First": "/about/recruiter.jpg",
  "Human + AI": "/about/human-ai.jpg",
  Trust: "/about/trust.jpg",
  Opportunity: "/about/opportunity.jpg",
  "Long-term Relationships": "/about/relationships.jpg",
};

export function AboutMission() {
  return (
    <AboutSection id="mission">
      <h2 className="max-w-5xl text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.045em] text-neutral-950 sm:text-[4.5rem]">
        Mission, Vision, and Values
      </h2>
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <article>
          <h3 className="text-sm font-medium tracking-[0.14em] text-brand uppercase">Mission</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Empower recruiters, employers, and professionals through a connected hiring network that
            creates better opportunities for everyone.
          </p>
        </article>
        <article>
          <h3 className="text-sm font-medium tracking-[0.14em] text-brand uppercase">Vision</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            To become the world&apos;s most trusted recruiter-first hiring network, enabling meaningful
            careers and better hiring outcomes through people and AI.
          </p>
        </article>
      </div>
      <h3 className="mt-14 text-sm font-medium tracking-[0.14em] text-brand uppercase">Core Values</h3>
      <ul className="mt-6 grid items-start gap-4 sm:grid-cols-2">
        {values.map((value) =>
          sketches[value.title] ? (
            <li key={value.title} className="relative flex min-h-48 items-center overflow-hidden rounded-xl border border-black/10 sm:min-h-52">
              <div className="relative z-10 w-[56%] py-5 pr-2 pl-5 sm:py-6 sm:pl-6">
                <p className="text-lg font-semibold leading-snug tracking-[-0.03em] text-neutral-950">
                  {value.title}
                </p>
                <div className="mt-2 space-y-1 text-[15px] leading-6 text-neutral-600">
                  {value.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <img
                src={sketches[value.title]}
                alt=""
                width={1024}
                height={1024}
                className="pointer-events-none absolute top-1/2 right-0 aspect-square w-[58%] max-w-none -translate-y-1/2 mix-blend-multiply [mask-image:linear-gradient(to_left,#000_42%,transparent_76%)]"
              />
            </li>
          ) : (
            <li key={value.title} className="rounded-xl border border-black/10 p-5">
              <p className="text-base font-medium tracking-[-0.03em] text-neutral-950">{value.title}</p>
              <div className="mt-2 space-y-1 text-sm leading-6 text-neutral-600">
                {value.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </li>
          ),
        )}
      </ul>
    </AboutSection>
  );
}
