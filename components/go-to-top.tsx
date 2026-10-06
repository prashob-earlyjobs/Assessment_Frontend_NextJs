"use client";

import { useEffect, useState } from "react";

export function GoToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    let raf = 0;

    const update = () => {
      raf = 0;
      const scrolled = window.scrollY > 320;
      let overFooter = false;

      if (footer instanceof HTMLElement) {
        const rect = footer.getBoundingClientRect();
        // Hide once the footer reaches the button’s bottom band.
        overFooter = rect.top < window.innerHeight - 24;
      }

      setVisible(scrolled && !overFooter);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="fixed right-5 bottom-5 z-30 flex size-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(234,106,78,0.28)] transition-colors hover:bg-[#d85c42]"
    >
      <svg aria-hidden viewBox="0 0 16 16" className="size-4">
        <path
          d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
