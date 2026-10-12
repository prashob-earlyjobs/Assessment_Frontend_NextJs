"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { PublicCompany } from "@/lib/public-companies";

const INITIAL_COUNT = 20;

type CompanyLogosGridProps = {
  eyebrow?: string;
  title: string;
  body: string;
};

export function CompanyLogosGrid({
  eyebrow = "Hiring companies",
  title,
  body,
}: CompanyLogosGridProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [companies, setCompanies] = useState<PublicCompany[]>([]);
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded((value) => {
      const next = !value;
      if (value) {
        // Collapse shortens the page — keep the section in view.
        requestAnimationFrame(() => {
          sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
      return next;
    });
  };

  useEffect(() => {
    let cancelled = false;

    fetch("/api/companies")
      .then(async (response) => {
        if (!response.ok) throw new Error("companies failed");
        return (await response.json()) as { success?: boolean; data?: PublicCompany[] };
      })
      .then((payload) => {
        if (cancelled || !payload.success || !payload.data?.length) return;
        setCompanies(payload.data);
      })
      .catch(() => {
        /* keep empty */
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visible = expanded ? companies : companies.slice(0, INITIAL_COUNT);
  const canExpand = companies.length > INITIAL_COUNT;

  return (
    <section
      ref={sectionRef}
      id="hiring-companies"
      className="scroll-mt-24 bg-[#f7f7f7] py-16 text-neutral-950 sm:py-24"
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8">
        <p className="inline-flex items-center gap-2 text-[13px] text-neutral-500">
          <span aria-hidden className="h-2 w-2 rounded-[3px] bg-brand" />
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-2xl text-[2rem] leading-[1.1] font-medium tracking-[-0.04em] sm:text-[2.75rem]">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-7 text-neutral-600 sm:text-base">{body}</p>

        {companies.length > 0 ? (
          <>
            <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-12 md:grid-cols-5 md:gap-x-10 md:gap-y-14">
              {visible.map((company) => (
                <li key={company.id} className="flex items-center justify-center">
                  <Image
                    src={company.logo_url}
                    alt={company.name}
                    width={180}
                    height={140}
                    unoptimized
                    className="h-16 w-full max-w-[11rem] object-contain opacity-90 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20 md:h-24"
                  />
                </li>
              ))}
            </ul>
            {canExpand ? (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={toggleExpanded}
                  className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white px-5 text-[13px] font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
                >
                  {expanded ? "Show less" : `Show more (${companies.length - INITIAL_COUNT})`}
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div
            className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5"
            aria-hidden
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="mx-auto h-16 w-full max-w-[11rem] rounded-md bg-black/5 sm:h-20 md:h-24" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
