"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJobsNav } from "@/components/jobs/jobs-nav";
import { jobsPageHref, type JobQuery } from "@/lib/public-jobs";

function pagesToShow(page: number, totalPages: number) {
  const candidates = [1, totalPages, page - 1, page, page + 1];
  return [...new Set(candidates)].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b);
}

const control =
  "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-3 text-[12px] font-medium";
const idle = `${control} cursor-pointer bg-neutral-100 text-neutral-700 hover:bg-neutral-200`;
const currentPage = `${control} cursor-default bg-brand text-white`;
const disabled = `${control} cursor-default bg-neutral-100 text-neutral-300`;

export function JobsPagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters?: Partial<JobQuery>;
}) {
  const router = useRouter();
  const { navigate } = useJobsNav();

  if (totalPages <= 1) return null;

  const pages = pagesToShow(page, totalPages);
  const href = (value: number) => jobsPageHref(value, filters);

  function openPage(event: MouseEvent<HTMLAnchorElement>, value: number) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(() => router.push(href(value), { scroll: false }));
  }

  return (
    <nav aria-label="Job pages" className="mt-4 flex shrink-0 flex-wrap items-center justify-between gap-3">
      {page > 1 ? (
        <Link href={href(page - 1)} onClick={(event) => openPage(event, page - 1)} className={idle}>
          Previous
        </Link>
      ) : (
        <span className={disabled}>Previous</span>
      )}
      <ol className="flex items-center gap-1">
        {pages.map((value, index) => {
          const previous = pages[index - 1];
          const isCurrent = value === page;
          return (
            <li key={value} className="flex items-center gap-1">
              {previous && value - previous > 1 ? (
                <span aria-hidden className="px-1 text-[12px] text-neutral-400">
                  …
                </span>
              ) : null}
              {isCurrent ? (
                <span aria-current="page" className={currentPage}>
                  {value}
                </span>
              ) : (
                <Link href={href(value)} onClick={(event) => openPage(event, value)} className={idle}>
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      {page < totalPages ? (
        <Link href={href(page + 1)} onClick={(event) => openPage(event, page + 1)} className={idle}>
          Next
        </Link>
      ) : (
        <span className={disabled}>Next</span>
      )}
    </nav>
  );
}
