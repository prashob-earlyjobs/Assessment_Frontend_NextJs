"use client";

export function GoToTop() {
  return (
    <button
      type="button"
      aria-label="Go to top"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
      className="fixed right-5 bottom-5 z-40 flex size-11 items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_24px_rgba(234,106,78,0.28)] transition-colors hover:bg-[#d85c42]"
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
