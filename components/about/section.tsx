import type { ReactNode } from "react";

export function AboutSection({
  id,
  children,
  className = "",
  border = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  border?: boolean;
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${border ? "border-t border-black/10" : ""} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

export function AboutTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem]">
      {children}
    </h2>
  );
}
