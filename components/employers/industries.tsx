import { Headline } from "@/components/home/primitives";
import { IndustriesMotion } from "@/components/employers/motion";
import { EmployerSection } from "@/components/employers/section";

const industries = [
  "Technology",
  "Manufacturing",
  "Healthcare",
  "Retail",
  "BFSI",
  "Sales",
  "Finance",
  "HR",
  "Engineering",
  "GCC",
  "Construction",
  "Consumer Brands",
] as const;

export function Industries() {
  return (
    <EmployerSection id="industries">
      <IndustriesMotion>
      <Headline>Hiring Across Every Industry.</Headline>
      <ul className="mt-12 grid grid-cols-2 border-t border-l border-black/10 sm:grid-cols-3 lg:grid-cols-4">
        {industries.map((industry) => (
          <li
            key={industry}
            className="industry-cell border-r border-b border-black/10 px-4 py-5 text-sm font-medium tracking-[-0.02em] text-neutral-950"
          >
            {industry}
          </li>
        ))}
      </ul>
      </IndustriesMotion>
    </EmployerSection>
  );
}
