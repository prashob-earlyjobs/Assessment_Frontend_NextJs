import { AssembleList } from "@/components/home/motion";
import { Flow, Frame, Headline, SolidLink } from "@/components/home/primitives";

const cards = [
  {
    title: "AI Career Matching",
    body: "Build a detailed profile. Receive smarter recommendations.",
  },
  {
    title: "Recruiter Guidance",
    body: "Connect with recruiters hiring for relevant roles. Receive personalized opportunities.",
  },
  {
    title: "Verified Employers",
    body: "Every opportunity comes from trusted hiring companies. No spam. No fake listings.",
  },
  {
    title: "Faster Interviews",
    body: "Skip unnecessary delays. Move from profile to interview faster.",
  },
  {
    title: "Career Growth",
    body: "Access internships. Full-time roles. Remote opportunities. Leadership positions.",
  },
] as const;

const path = ["Professional", "AI", "Recruiter", "Interview", "Joining"];

export function JobSeekers() {
  return (
    <Frame id="job-seekers">
      <div className="grid items-start gap-12 bg-white lg:grid-cols-[minmax(0,1fr)_14rem]">
        <div>
          <Headline>
            Don&apos;t Just Apply.
            <br />
            <span className="text-brand">Get Discovered.</span>
          </Headline>
          <div className="mt-5 max-w-xl space-y-3 text-sm leading-6 text-neutral-600">
            <p>Most professionals spend hours applying for jobs that never receive a response.</p>
            <p>EarlyJobs changes that.</p>
            <p>Create one profile.</p>
            <p>Get matched with recruiters.</p>
            <p>Receive opportunities that actually fit your skills.</p>
          </div>
        </div>
        <div className="lg:pt-2">
          <Flow steps={path} />
        </div>
      </div>

      <AssembleList className="mt-12 grid gap-px overflow-hidden rounded-md border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-6">
        {cards.map((card, index) => (
          <li
            key={card.title}
            className={`bg-white p-5 ${index < 2 ? "lg:col-span-3" : "lg:col-span-2"}`}
          >
            <h3 className="text-base font-medium tracking-[-0.02em] text-neutral-950">{card.title}</h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
          </li>
        ))}
      </AssembleList>

      <blockquote className="mt-14 max-w-2xl">
        <p className="text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-neutral-950 sm:text-[1.75rem]">
          “The right opportunity isn&apos;t always the one you apply for.
          <br />
          Sometimes it&apos;s the one that finds you.”
        </p>
      </blockquote>

      <div className="mt-10">
        <SolidLink href="/jobs">Find Your Next Opportunity</SolidLink>
      </div>
    </Frame>
  );
}
