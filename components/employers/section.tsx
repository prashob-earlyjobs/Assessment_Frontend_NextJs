import type { ReactNode } from "react";

export function EmployerSection({
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
    <section
      id={id}
      className={`scroll-mt-24 ${border ? "border-t border-black/10" : ""} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">{children}</div>
    </section>
  );
}

export const employerCard = "rounded-xl border border-black/10 bg-white p-5";
