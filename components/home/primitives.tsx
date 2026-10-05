import type { ReactNode } from "react";
import Link from "next/link";

const pill =
  "inline-flex h-11 items-center justify-center rounded-[6px] px-4 text-[13px] font-medium transition-[border-radius,background-color] duration-500 ease-in-out hover:rounded-[22px]";

export function Frame({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`snap-section border-t border-black/10 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

export function Headline({
  children,
  kicker,
}: {
  children: ReactNode;
  kicker?: string;
}) {
  return (
    <div>
      {kicker ? <p className="text-sm font-medium text-brand">{kicker}</p> : null}
      <h2
        className={`max-w-3xl text-[2rem] font-semibold leading-[1.05] tracking-[-0.045em] text-neutral-950 sm:text-[3rem] ${kicker ? "mt-3" : ""}`}
      >
        {children}
      </h2>
    </div>
  );
}

export function SolidLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={`${pill} bg-brand text-white hover:bg-[#d85c42]`}>
      {children}
    </Link>
  );
}

export function GhostLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={`${pill} border border-black/10 bg-white text-neutral-950 hover:bg-neutral-50`}
    >
      {children}
    </Link>
  );
}

export function Flow({
  steps,
  active,
}: {
  steps: readonly string[];
  active?: ReadonlySet<string>;
}) {
  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => {
        const on = !active || active.has(step);
        return (
          <li key={step} className="flex flex-col">
            <span
              className={`text-sm font-medium leading-5 ${on ? "text-neutral-950" : "text-neutral-300"}`}
            >
              {step}
            </span>
            {index < steps.length - 1 ? (
              <span aria-hidden className={`my-2 h-4 w-px ${on ? "bg-brand" : "bg-neutral-200"}`} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
