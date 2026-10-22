"use client";

import Link from "next/link";
import { useState } from "react";
import { announcements, type NewsroomAnnouncement } from "@/data/newsroom-announcements";

type Category = "All" | NewsroomAnnouncement["category"];

const filters: Category[] = ["All", "Company", "Product", "Partnerships", "People"];

export function NewsroomAnnouncements() {
  const [filter, setFilter] = useState<Category>("All");
  const visible =
    filter === "All" ? announcements : announcements.filter((item) => item.category === filter);
  const featured = visible.find((item) => item.featured) ?? visible[0];
  const rest = visible.filter((item) => item.id !== featured?.id).slice(0, 3);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Announcement categories">
        {filters.map((item) => {
          const active = item === filter;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(item)}
              className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-neutral-950 text-white"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {featured ? (
        <article className="mt-8 border-t border-black/10 pt-8 sm:pt-10">
          <p className="text-[12px] font-medium tracking-[0.08em] text-neutral-500 uppercase">
            {featured.date} · {featured.category}
          </p>
          <h3 className="mt-3 max-w-3xl text-[1.65rem] font-semibold leading-[1.12] tracking-[-0.04em] text-neutral-950 sm:text-[2.15rem]">
            {featured.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-600 sm:text-base sm:leading-7">
            {featured.excerpt}
          </p>
          <Link
            href={`#announcement-${featured.id}`}
            className="mt-6 inline-flex items-center gap-1 text-[13px] font-medium text-brand transition-colors hover:text-[#d85c42]"
          >
            Read announcement
            <span aria-hidden>→</span>
          </Link>
        </article>
      ) : null}

      <ul className="mt-10 grid gap-6 border-t border-black/10 pt-10 sm:grid-cols-3">
        {rest.map((item) => (
          <li key={item.id} id={`announcement-${item.id}`}>
            <p className="text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase">
              {item.date} · {item.category}
            </p>
            <h3 className="mt-3 text-base font-semibold tracking-[-0.03em] text-neutral-950">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{item.excerpt}</p>
            <Link
              href={`#announcement-${item.id}`}
              className="mt-4 inline-flex text-[13px] font-medium text-brand hover:text-[#d85c42]"
            >
              Read announcement →
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
