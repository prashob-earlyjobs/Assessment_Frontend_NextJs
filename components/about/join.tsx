import { GhostLink, SolidLink } from "@/components/home/primitives";

const dots = [
  { x: "8%", y: "18%", delay: "0s" },
  { x: "18%", y: "72%", delay: "1.2s" },
  { x: "78%", y: "16%", delay: "0.6s" },
  { x: "88%", y: "68%", delay: "1.8s" },
  { x: "46%", y: "12%", delay: "0.4s" },
  { x: "62%", y: "82%", delay: "1s" },
] as const;

export function AboutJoin() {
  return (
    <section id="join" className="relative scroll-mt-24 overflow-hidden border-t border-black/10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(234,106,78,0.14), transparent 55%)",
        }}
      />
      <svg aria-hidden viewBox="0 0 800 420" className="pointer-events-none absolute inset-0 h-full w-full">
        <g stroke="#ea6a4e" strokeOpacity="0.28" fill="none">
          <path d="M80 90 C180 40, 260 160, 400 120 S620 40, 740 130" />
          <path d="M60 280 C200 220, 300 340, 460 260 S640 180, 760 300" />
        </g>
      </svg>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {dots.map((dot) => (
          <span key={dot.x} className="absolute size-1.5" style={{ left: dot.x, top: dot.y }}>
            <span className="about-drift block size-1.5 rounded-full bg-brand" style={{ animationDelay: dot.delay }} />
          </span>
        ))}
      </div>
      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3.25rem]">
          The Future of Hiring Will Be Built Together.
        </h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-neutral-600">
          Whether you&apos;re discovering your first opportunity, building your recruiting career, or
          growing a world-class team, you&apos;re part of something bigger than a hiring platform.
        </p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
          You&apos;re part of a network built on trust, expertise, and opportunity.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <SolidLink href="/jobs">Find Jobs</SolidLink>
          <GhostLink href="/become-a-recruiter">Become a Recruiter</GhostLink>
          <GhostLink href="/sign-in">Start Hiring</GhostLink>
        </div>
      </div>
    </section>
  );
}
