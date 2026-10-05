import { GhostLink, SolidLink } from "@/components/home/primitives";
import { CtaMotion } from "@/components/recruiters/motion";

const dots = [
  { x: "7%", y: "18%" },
  { x: "14%", y: "74%" },
  { x: "91%", y: "16%" },
  { x: "84%", y: "78%" },
  { x: "4%", y: "46%" },
  { x: "95%", y: "42%" },
];

export function RecruiterFinalCta() {
  return (
    <section id="join-recruiters" className="relative overflow-hidden border-t border-black/10">
      <CtaMotion>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(96,140,190,0.16), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(234,106,78,0.08), transparent 42%)",
        }}
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="cta-line text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
          Your Next Placement Starts Here.
        </h2>
        <p className="cta-line mt-5 max-w-xl text-sm leading-6 text-neutral-600">
          Whether you&apos;re building your first recruiting career or scaling an established
          practice, EarlyJobs gives you the opportunities, tools, and network to grow with
          confidence.
        </p>
        <div className="cta-line mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <SolidLink href="/become-a-recruiter">Become a Recruiter</SolidLink>
          <GhostLink href="/jobs">Explore Hiring Opportunities</GhostLink>
        </div>
        <div className="cta-line mt-10 max-w-md space-y-2 text-sm leading-6 text-neutral-600">
          <p>Recruiters are the heart of great hiring.</p>
          <p>
            Join The Recruiter-First Hiring Network and help shape the future of hiring.
          </p>
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {dots.map((dot) => (
          <span key={dot.x} className="absolute size-1.5" style={{ left: dot.x, top: dot.y }}>
            <span className="cta-drift block size-1.5 rounded-full bg-brand will-change-transform" />
          </span>
        ))}
      </div>
      </CtaMotion>
    </section>
  );
}
