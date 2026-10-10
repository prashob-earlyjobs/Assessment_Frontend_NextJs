import type { ReactNode } from "react";

export function Chapter({
  id,
  number,
  eyebrow,
  title,
  children,
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-[#E5E5E5]">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-20 sm:px-8 sm:py-[140px]">
        <div className="relative">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-6 left-0 select-none text-[5rem] font-semibold leading-none tracking-[-0.04em] text-[#E5E5E5] sm:-top-10 sm:text-[7.5rem]"
            style={{ WebkitTextStroke: "1px #E5E5E5", color: "transparent" }}
          >
            {number}
          </span>
          <p className="relative text-[12px] font-semibold tracking-[0.12em] text-[#F97316] uppercase">
            {eyebrow}
          </p>
          <h2 className="relative mt-4 max-w-3xl text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.02em] text-[#0A0A0A] sm:text-[2.75rem] lg:text-[3rem]">
            {title}
          </h2>
        </div>
        <div className="relative mt-8">{children}</div>
      </div>
    </section>
  );
}

export function StoryBody({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-2xl space-y-5 text-[18px] leading-[1.7] text-[#525252]">{children}</div>
  );
}
