"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type NavbarLink = {
  label: string;
  href: string;
};

export const defaultNavbarLinks: NavbarLink[] = [
  { label: "Find Jobs", href: "/jobs" },
  { label: "For Recruiters", href: "/recruiters" },
  { label: "For Employers", href: "/employers" },
  { label: "About", href: "/about" },
];

type NavbarProps = {
  links?: NavbarLink[];
  ctaHref?: string;
  ctaLabel?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

type Pill = {
  x: number;
  width: number;
};

function useSpringPill(target: Pill | null) {
  const [pill, setPill] = useState<Pill | null>(null);
  const pillRef = useRef<Pill | null>(null);
  const velocityRef = useRef({ x: 0, width: 0 });
  const targetRef = useRef(target);
  const frameRef = useRef(0);

  useEffect(() => {
    targetRef.current = target;

    if (!target) {
      pillRef.current = null;
      velocityRef.current = { x: 0, width: 0 };
      setPill(null);
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !pillRef.current) {
      pillRef.current = target;
      velocityRef.current = { x: 0, width: 0 };
      setPill(target);
      return;
    }

    let last = performance.now();
    const tick = (now: number) => {
      const dest = targetRef.current;
      const current = pillRef.current;
      if (!dest || !current) return;

      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const tension = 220;
      const friction = 22;
      const vx =
        velocityRef.current.x +
        (-tension * (current.x - dest.x) - friction * velocityRef.current.x) * dt;
      const vw =
        velocityRef.current.width +
        (-tension * (current.width - dest.width) - friction * velocityRef.current.width) * dt;
      velocityRef.current = { x: vx, width: vw };

      const next = { x: current.x + vx * dt, width: Math.max(0, current.width + vw * dt) };
      const settled =
        Math.hypot(next.x - dest.x, next.width - dest.width) < 0.4 &&
        Math.hypot(vx, vw) < 0.4;

      if (settled) {
        pillRef.current = dest;
        velocityRef.current = { x: 0, width: 0 };
        setPill(dest);
        return;
      }

      pillRef.current = next;
      setPill(next);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return pill;
}

export function Navbar({
  links = defaultNavbarLinks,
  ctaHref = "/become-a-recruiter",
  ctaLabel = "Become a Recruiter",
}: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuHoldsHeader, setMenuHoldsHeader] = useState(false);
  const isHome = pathname === "/";
  const solid = scrolled || menuHoldsHeader;
  const overHero = isHome && !solid;

  useEffect(() => {
    const headerOffset = () => (window.matchMedia("(min-width: 640px)").matches ? 64 : 56);

    const onScroll = () => {
      if (pathname === "/") {
        const hero = document.getElementById("section-1");
        if (hero) {
          setScrolled(hero.getBoundingClientRect().bottom <= headerOffset());
          return;
        }
      }
      setScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      setMenuHoldsHeader(true);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setMenuHoldsHeader(false), reduced ? 0 : 200);
    return () => window.clearTimeout(timeout);
  }, [open]);

  return (
    <>
    <header
      data-solid={solid ? "true" : "false"}
      className={cx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        solid
          ? "border-b border-black/[0.08] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 items-center justify-between gap-3 px-6 sm:h-16 sm:px-10 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-12">
        <Logo inverted={overHero} />

        <DesktopNav links={links} pathname={pathname} inverted={overHero} />

        <div className="flex items-center justify-end gap-1 sm:gap-2">
          <a
            href="https://www.huntlo.ai/"
            target="_blank"
            rel="noreferrer"
            className="huntlo-btn hidden lg:inline-flex"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="huntlo-btn-badge"
              src="/icons/huntlo-favicon.png"
              alt=""
              width={20}
              height={20}
            />
            <span className="huntlo-btn-wrapper">
              <span className="huntlo-btn-label">
                <AiSparkIcon />
                Try Huntlo
              </span>
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} className={`huntlo-circle huntlo-circle-${i + 1}`} aria-hidden />
              ))}
            </span>
          </a>
          <Link
            href={ctaHref}
            className="inline-flex h-9 items-center rounded-full bg-brand px-3.5 text-[13px] font-medium text-white transition-colors hover:bg-[#d85c42] sm:px-4"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            className={cx(
              "inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors lg:hidden",
              overHero
                ? "text-white hover:bg-white/10"
                : "text-neutral-950 hover:bg-black/[0.04]",
            )}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        data-open={open ? "true" : "false"}
        className={cx(
          "mobile-nav absolute inset-x-0 top-full z-50 border-t border-black/[0.06] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.08)] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
          <nav aria-label="Mobile" className="mx-auto flex max-w-[1200px] flex-col px-6 py-3 sm:px-10 lg:px-12">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <NavAnchor link={link} pathname={pathname} mobile />
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-1 border-t border-black/[0.06] pt-2">
              <a
                href="https://www.huntlo.ai/"
                target="_blank"
                rel="noreferrer"
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700"
              >
                Try Huntlo
              </a>
            </div>
          </nav>
        </div>
    </header>
    {/* Home hero paints under the fixed nav; other pages need the reserved offset. */}
    {!isHome ? <div className="h-14 shrink-0 sm:h-16" aria-hidden /> : null}
    </>
  );
}

function DesktopNav({
  links,
  pathname,
  inverted = false,
}: {
  links: NavbarLink[];
  pathname: string;
  inverted?: boolean;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const anchors = useRef(new Map<string, HTMLAnchorElement>());
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [target, setTarget] = useState<Pill | null>(null);
  const pill = useSpringPill(target);
  const selectedHref =
    pendingHref ?? links.find((link) => isActive(pathname, link.href))?.href ?? null;

  useEffect(() => {
    if (pendingHref && isActive(pathname, pendingHref)) setPendingHref(null);
  }, [pathname, pendingHref]);

  const measure = () => {
    const list = listRef.current;
    const node = selectedHref ? anchors.current.get(selectedHref) : undefined;
    if (!list || !node) {
      setTarget((current) => (current === null ? current : null));
      return;
    }
    const listRect = list.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    if (nodeRect.width === 0) return;
    const next = {
      x: nodeRect.left - listRect.left,
      width: nodeRect.width,
    };
    setTarget((current) =>
      current && current.x === next.x && current.width === next.width ? current : next,
    );
  };

  useLayoutEffect(() => {
    measure();
  }, [selectedHref, links]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [selectedHref, links]);

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul ref={listRef} className="relative flex items-center">
        {pill ? (
          <span
            aria-hidden
            data-selection-pill=""
            className={cx(
              "pointer-events-none absolute inset-y-0 rounded-full",
              inverted ? "bg-white/15" : "bg-neutral-950/[0.06]",
            )}
            style={{ width: pill.width, transform: `translate3d(${pill.x}px, 0, 0)` }}
          />
        ) : null}
        {links.map((link) => (
          <li key={link.href} className="relative z-[1]">
            <NavAnchor
              link={link}
              pathname={pathname}
              inverted={inverted}
              active={selectedHref === link.href}
              onSelect={() => setPendingHref(link.href)}
              linkRef={(node) => {
                if (node) anchors.current.set(link.href, node);
                else anchors.current.delete(link.href);
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NavAnchor({
  link,
  pathname,
  mobile = false,
  inverted = false,
  linkRef,
  onSelect,
  active,
}: {
  link: NavbarLink;
  pathname: string;
  mobile?: boolean;
  inverted?: boolean;
  linkRef?: (node: HTMLAnchorElement | null) => void;
  onSelect?: () => void;
  active?: boolean;
}) {
  const isCurrent = active ?? isActive(pathname, link.href);

  return (
    <Link
      ref={linkRef}
      href={link.href}
      aria-current={isCurrent ? "page" : undefined}
      onClick={onSelect}
      className={cx(
        "font-medium transition-colors duration-300",
        mobile
          ? "block rounded-lg px-3 py-2.5 text-[15px]"
          : "relative rounded-full px-2.5 py-2 text-[13px]",
        inverted && !mobile
          ? isCurrent
            ? "text-white"
            : "text-white/70 hover:text-white"
          : isCurrent
            ? "text-neutral-950"
            : "text-neutral-500 hover:text-neutral-950",
        mobile && isCurrent && "bg-black/[0.04]",
      )}
    >
      {link.label}
    </Link>
  );
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex w-fit shrink-0 items-center" aria-label="EarlyJobs home">
      <Image
        src="/earlyjobs-logo.png"
        alt="EarlyJobs"
        width={234}
        height={106}
        priority
        className={cx("h-8 w-auto sm:h-10", inverted && "brightness-0 invert")}
      />
    </Link>
  );
}

function AiSparkIcon() {
  return (
    <svg
      className="huntlo-btn-ai"
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1.2l1.05 3.55L12.6 5.8 9.05 7.25 8 10.8 6.95 7.25 3.4 5.8l3.55-1.05L8 1.2z"
        fill="currentColor"
      />
      <path
        d="M12.6 9.2l.55 1.85 1.85.55-1.85.55-.55 1.85-.55-1.85-1.85-.55 1.85-.55.55-1.85z"
        fill="currentColor"
        opacity="0.85"
      />
      <path
        d="M3.2 9.8l.42 1.4 1.4.42-1.4.42-.42 1.4-.42-1.4-1.4-.42 1.4-.42.42-1.4z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 4.5h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
