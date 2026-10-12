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
      <div className="page-shell page-section">{children}</div>
    </section>
  );
}

export const employerCard = "rounded-xl border border-black/10 bg-white p-5";
