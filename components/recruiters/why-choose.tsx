import { WhyMotion } from "@/components/recruiters/motion";
import { liftCard, RecruiterSection } from "@/components/recruiters/section";

const cards = [
  {
    title: "Verified Hiring Opportunities",
    body: "Access genuine hiring requirements from trusted employers instead of spending hours searching for mandates.",
  },
  {
    title: "Flexible Recruiting",
    body: "Recruit from anywhere, work on your own schedule, and build your career without geographical limits.",
  },
  {
    title: "AI-Powered Recruiting",
    body: "Spend less time on repetitive tasks and more time building relationships with candidates and employers.",
  },
  {
    title: "Transparent Earnings",
    body: "Know exactly how your placements translate into revenue with a clear and transparent process.",
  },
  {
    title: "Continuous Growth",
    body: "Learn through recruiter resources, hiring insights, and practical playbooks designed to improve your recruiting skills.",
  },
  {
    title: "Strong Community",
    body: "Become part of a growing recruiter community that shares opportunities, knowledge, and long-term success.",
  },
] as const;

export function WhyChoose() {
  return (
    <RecruiterSection id="why-recruiters" border={false}>
      <WhyMotion>
        <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
          Everything You Need to Build a{" "}
          <span className="success-word relative inline-block px-1">
            <span aria-hidden className="success-bg absolute inset-x-0 top-[0.12em] bottom-[0.06em] bg-[#f6d5cd]" />
            <span className="relative">Successful</span>
          </span>{" "}
          Recruiting Career.
        </h2>
        <ul className="mt-12 grid gap-4 overflow-visible sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title} className={`why-card will-change-transform ${liftCard}`}>
              <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
            </li>
          ))}
        </ul>
      </WhyMotion>
    </RecruiterSection>
  );
}
