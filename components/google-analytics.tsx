"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const GA_MEASUREMENT_ID = "G-WJSYDMB1J3";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsRouteChange() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstView = useRef(true);

  useEffect(() => {
    if (isFirstView.current) {
      isFirstView.current = false;
      return;
    }
    if (typeof window.gtag !== "function") return;

    const query = searchParams.toString();
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: query ? `${pathname}?${query}` : pathname,
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsRouteChange />
    </Suspense>
  );
}
