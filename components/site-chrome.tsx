"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { GoToTop } from "@/components/go-to-top";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { SnapFooterRelease } from "@/components/snap-footer-release";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const focused = pathname.startsWith("/become-a-recruiter/apply");

  if (focused) {
    return (
      <>
        <header className="border-b border-black/10 bg-white">
          <div className="mx-auto flex h-16 w-full max-w-3xl items-center px-5">
            <Link href="/" className="inline-flex items-center" aria-label="EarlyJobs home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/earlyjobs-logo.png" alt="EarlyJobs" className="h-8 w-auto" />
            </Link>
          </div>
        </header>
        <div className="flex min-w-0 w-full flex-1 flex-col">{children}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex min-w-0 w-full flex-1 flex-col">{children}</div>
      <SiteFooter />
      <SnapFooterRelease />
      <GoToTop />
    </>
  );
}
