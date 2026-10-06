"use client";

import { useEffect } from "react";

/**
 * Disables mandatory page scroll-snap near the footer so the last
 * snap section cannot pull the user back. Uses hysteresis so snap
 * does not flicker on/off at the boundary.
 */
export function SnapFooterRelease() {
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!(footer instanceof HTMLElement)) return;

    const root = document.documentElement;
    let released = false;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = footer.getBoundingClientRect();
      const vh = window.innerHeight;

      // Arm while the footer is approaching or visible.
      if (!released && rect.top < vh * 0.92) {
        released = true;
        root.classList.add("snap-release");
        return;
      }

      // Only re-enable snap once the footer is clearly below the fold again.
      if (released && rect.top > vh * 1.25) {
        released = false;
        root.classList.remove("snap-release");
      }
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
      root.classList.remove("snap-release");
    };
  }, []);

  return null;
}
