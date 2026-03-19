"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUser } from "../context";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock3,
} from "lucide-react";

// Tabs: All + the three allowed statuses
const TABS = ["All", "Applied", "Shortlisted", "Rejected"] as const;
type TabType = (typeof TABS)[number];

interface StatusHistoryItem {
  previousStatus: string;
  newStatus: string;
  changedByUserId: string;
  changedAt: string;
  rejectionReason?: string;
}

interface CandidateApplication {
  _id: string;
  jobId: string;
  fullName: string;
  phone: string;
  isSubJob: boolean;
  isExternalJob?: boolean;
  email: string;
  status: string;
  source?: string;
  statusHistory: StatusHistoryItem[];
  createdAt: string;
  updatedAt: string;
  jobTitle: string;
  jobLocation: string;
}

interface CandidateJobApplicationsResponse {
  status: string;
  data?: {
    totalResults?: number;
    totalPages?: number;
    page?: number;
    pageSize?: number;
    applications?: CandidateApplication[];
  };
}

const formatDate = (value: string) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const mapStatusToTab = (statusRaw: string): TabType => {
  const status = statusRaw.toLowerCase();
  if (status === "applied") return "Applied";
  if (status === "shortlisted") return "Shortlisted";
  if (status === "rejected") return "Rejected";
  // Unknown statuses are only visible under "All"
  return "All";
};

const mapTabToStatusFilter = (tab: TabType): string | undefined => {
  if (tab === "Applied") return "applied";
  if (tab === "Shortlisted") return "shortlisted";
  if (tab === "Rejected") return "rejected";
  // "All" requests everything
  return undefined;
};

const getStatusBadgeClasses = (statusRaw: string) => {
  const status = statusRaw.toLowerCase();
  if (status === "offer" || status === "offered" || status === "hired") {
    return "border-emerald-200 text-emerald-700 bg-emerald-50";
  }
  if (status === "shortlisted" || status === "interviewing") {
    return "border-blue-200 text-blue-700 bg-blue-50";
  }
  if (status === "rejected") {
    return "border-red-200 text-red-700 bg-red-50";
  }
  return "border-orange-200 text-orange-700 bg-orange-50";
};

const getStatusHeadline = (statusRaw: string) => {
  const status = statusRaw.toLowerCase();
  if (status === "applied") return "Application submitted";
  if (status === "shortlisted") return "Shortlisted for next step";
  if (status === "interviewing") return "Interview in progress";
  if (status === "offer" || status === "offered" || status === "hired") return "Offer stage";
  if (status === "rejected") return "Application not shortlisted";
  return "Status updated";
};

export default function ApplicationsV2Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { userCredentials } = useUser();
  const [activeTab, setActiveTab] = useState<TabType>("All");
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [expandedApplicationId, setExpandedApplicationId] = useState<string | null>(null);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || process.env.NEXT_PUBLIC_BACKEND_URL;

  const tabSlugFromTab = (tab: TabType): string => tab.toLowerCase();
  const tabFromSlug = (slug: string | null): TabType => {
    const normalized = (slug || "").toLowerCase();
    if (normalized === "applied") return "Applied";
    if (normalized === "shortlisted") return "Shortlisted";
    if (normalized === "rejected") return "Rejected";
    return "All";
  };

  const updateUrl = (nextTab: TabType, nextPage: number) => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const tabSlug = tabSlugFromTab(nextTab);
    if (tabSlug === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tabSlug);
    }
    if (nextPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", String(nextPage));
    }
    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname || "/applications-v2";
    router.replace(url);
  };

  // Decide how many cards to load per "page" based on screen size
  useEffect(() => {
    if (typeof window === "undefined") return;

    const computePageSize = () => {
      const width = window.innerWidth;
      if (width < 640) return 4; // mobile
      if (width < 1024) return 6; // tablet
      return 8; // desktop
    };

    const initial = computePageSize();
    setPageSize(initial);

    let resizeTimeout: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        setPageSize(computePageSize());
      }, 200);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeout) {
        window.clearTimeout(resizeTimeout);
      }
    };
  }, []);

  // Initialise tab + page from URL on first render
  useEffect(() => {
    const initialTab = tabFromSlug(searchParams.get("tab"));
    const initialPageRaw = searchParams.get("page");
    const initialPageNum = initialPageRaw ? Number(initialPageRaw) : 1;
    const safePage = Number.isFinite(initialPageNum) && initialPageNum > 0 ? initialPageNum : 1;
    setActiveTab(initialTab);
    setPage(safePage);
  }, [searchParams]);

  // Reset list + pagination when email or backendUrl changes
  useEffect(() => {
    setApplications([]);
    setPage(1);
    setTotalPages(1);
    setTotalResults(0);
  }, [backendUrl, userCredentials?.email]);

  // Fetch one page at a time from the API (API-level pagination)
  useEffect(() => {
    const email = userCredentials?.email;
    if (!backendUrl || !email) return;

    const controller = new AbortController();

    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);
        const statusFilter = mapTabToStatusFilter(activeTab);
        const params = new URLSearchParams({
          email,
          page: String(page),
          pageSize: String(pageSize),
        });
        if (statusFilter) {
          params.set("status", statusFilter);
        }
        const url = `${backendUrl}/public/candidate-job-applications?${params.toString()}`;
        const res = await fetch(url, { method: "GET", signal: controller.signal });
        if (!res.ok) {
          console.error("Failed to load candidate applications", res.status);
          setError("Could not load your applications. Please try again.");
          return;
        }
        const data = (await res.json()) as CandidateJobApplicationsResponse;
        const list = Array.isArray(data?.data?.applications) ? data.data!.applications! : [];

        // API-level pagination: show only current page results
        setApplications(list);

        const tp = Math.max(1, Number(data?.data?.totalPages ?? 1));
        const tr = Math.max(0, Number(data?.data?.totalResults ?? 0));
        setTotalPages(tp);
        setTotalResults(tr);

        const serverPage = Number(data?.data?.page ?? page);
        if (Number.isFinite(serverPage) && serverPage > 0 && serverPage !== page) {
          setPage(serverPage);
        }
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error("Error fetching candidate applications", err);
        setError("Something went wrong while fetching applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();

    return () => controller.abort();
  }, [backendUrl, userCredentials?.email, page, pageSize, activeTab]);

  // Keep pagination sane when pageSize changes
  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  // If user changes tab, restart at page 1 (since API paging is global)
  useEffect(() => {
    setPage(1);
    updateUrl(activeTab, 1);
  }, [activeTab]);

  const filtered =
    activeTab === "All"
      ? applications
      : applications.filter((a) => mapStatusToTab(a.status) === activeTab);

  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const getPageButtons = () => {
    const maxButtons = 5;
    const safeTotal = Math.max(1, totalPages);
    const safePage = Math.min(Math.max(1, page), safeTotal);

    if (safeTotal <= maxButtons) {
      return Array.from({ length: safeTotal }, (_, i) => i + 1);
    }

    const half = Math.floor(maxButtons / 2);
    let start = safePage - half;
    let end = safePage + half;

    if (start < 1) {
      start = 1;
      end = maxButtons;
    }
    if (end > safeTotal) {
      end = safeTotal;
      start = safeTotal - maxButtons + 1;
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Applications" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-10">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              My applications
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              My applications
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              A single place to track every role you&apos;ve applied to — from first application
              to final offer.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
              onClick={() => router.push("/dashboard-v2")}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to dashboard
            </Button>
          </div>
        </section>

        {/* Tabs */}
        <section className="flex flex-wrap gap-2 border-b border-gray-100 pb-2">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-700 border border-orange-200"
                    : "text-gray-600 hover:bg-gray-50 border border-transparent",
                ].join(" ")}
              >
                {tab}
              </button>
            );
          })}
        </section>

        {/* List */}
        <section className="space-y-4">
          {loading && applications.length === 0 && (
            <div className="space-y-3">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-24 sm:h-28 w-full animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          )}

          {!loading && error && applications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">{error}</p>
            </div>
          )}

          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No applications in this stage yet.</p>
            </div>
          )}

          {filtered.map((app) => {
            const statusHeadline = getStatusHeadline(app.status);
            const history = Array.isArray(app.statusHistory) ? app.statusHistory : [];
            const latestHistory =
              history.length > 0 ? history[history.length - 1] : null;
            const isOfferLike = ["offer", "offered", "hired"].includes(
              app.status.toLowerCase(),
            );
            const isExpanded = expandedApplicationId === app._id;
            // Sort history oldest-first to build a clear progression
            const sortedHistory = [...history].sort(
              (a, b) =>
                new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime(),
            );

            const latestStatusRaw =
              sortedHistory.length > 0
                ? sortedHistory[sortedHistory.length - 1].newStatus
                : app.status;
            const latestStatus = (latestStatusRaw || "").toLowerCase();

            let progress = 0.0;
            let barColor = "bg-orange-400";
            if (latestStatus === "applied") {
              progress = 0.5;
              barColor = "bg-orange-400";
            } else if (latestStatus === "shortlisted") {
              progress = 1.0;
              barColor = "bg-orange-400";
            } else if (latestStatus === "rejected") {
              progress = 1.0;
              barColor = "bg-red-400";
            }

            const steps = [
              { key: "applied", label: "Applied" },
              {
                key: latestStatus === "rejected" ? "rejected" : "shortlisted",
                label: latestStatus === "rejected" ? "Rejected" : "Shortlisted",
              },
            ];

            // Build a dynamic sequence of statuses:
            // Always start with "applied", then add each newStatus from history
            const stepsToRender = [
              { key: "applied", label: "Applied" } as const,
              ...sortedHistory.map((h) => {
                const key = (h.newStatus || "").toLowerCase();
                const pretty =
                  key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
                return { key, label: pretty };
              }),
            ];
            return (
              <Card
                key={app._id}
                className="border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4 sm:gap-3 relative"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 hidden sm:flex w-10 h-10 rounded-lg bg-orange-50 items-center justify-center">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {app.jobTitle}
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 truncate">
                        {app.isExternalJob ? "External job" : "EarlyJobs job"}
                        {app.source ? ` · ${app.source}` : ""}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {app.jobLocation || "Location not specified"}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          Applied on {formatDate(app.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                    <Badge
                      variant="outline"
                      className={getStatusBadgeClasses(app.status)}
                    >
                      {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
                      onClick={() => router.push(`/applications-v2/track?applicationId=${encodeURIComponent(app._id)}`)}
                    >
                      View details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-dashed border-gray-100 pt-3 sm:pt-4">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                    {isOfferLike ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                    ) : (
                      <Clock3 className="w-4 h-4 text-orange-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">
                        {statusHeadline}
                      </p>
                      <p className="text-xs text-gray-500">
                        {latestHistory
                          ? `Updated on ${formatDate(
                              latestHistory.changedAt,
                            )}${
                              latestHistory.rejectionReason
                                ? ` · Reason: ${latestHistory.rejectionReason}`
                                : ""
                            }`
                          : `Last updated on ${formatDate(app.updatedAt)}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-xs text-white gap-1.5"
                      onClick={() =>
                        setExpandedApplicationId((prev) => (prev === app._id ? null : app._id))
                      }
                    >
                      Track status
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="absolute right-4 bottom-12 z-20 w-full max-w-sm rounded-xl border border-gray-200 bg-white/95 backdrop-blur shadow-xl p-4 text-xs sm:text-sm text-gray-700 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-wide text-gray-400">
                          Current status
                        </p>
                        <p className="text-sm font-semibold text-gray-900">
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </p>
                        <p className="mt-1 text-[11px] text-gray-500">{statusHeadline}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedApplicationId(null)}
                        className="text-[11px] font-medium text-gray-400 hover:text-gray-600"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-2" />
                    {/* Visual progress bar for key statuses (same logic as track page) */}
                    <div className="pt-1 pb-2 space-y-1.5">
                      <div className="relative flex items-center justify-between px-6 h-8 max-w-md mx-auto">
                        {/* Track */}
                        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-1 bg-gray-100 rounded-full" />
                        {/* Animated progress */}
                        <div
                          className={`absolute left-6 top-1/2 -translate-y-1/2 h-1 rounded-full ${barColor} transition-all duration-700`}
                          style={{
                            width: `${progress * 100}%`,
                            maxWidth: "calc(100% - 3rem)",
                          }}
                        />

                        {steps.map((step, idx) => {
                          const isFirst = idx === 0;
                          const isSecond = idx === 1;
                          const isEnabledSecond =
                            isSecond &&
                            (latestStatus === "shortlisted" || latestStatus === "rejected");
                          const isActive = isFirst || isEnabledSecond;

                          const activeBg =
                            barColor === "bg-red-400" ? "bg-red-500" : "bg-orange-500";
                          const activeBorder =
                            barColor === "bg-red-400" ? "border-red-500" : "border-orange-500";

                          const circleClasses = [
                            "flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold border",
                            isActive
                              ? `${activeBg} text-white ${activeBorder}`
                              : "bg-white text-gray-400 border-gray-300",
                          ].join(" ");

                          return (
                            <div key={step.key} className="relative z-10">
                              <div className={circleClasses}>{idx + 1}</div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-between px-6 max-w-md mx-auto">
                        {steps.map((step) => (
                          <div key={step.key}>
                            <span
                              className={[
                                "text-[11px]",
                                latestStatus === step.key
                                  ? "font-semibold text-gray-900"
                                  : "text-gray-600",
                              ].join(" ")}
                            >
                              {step.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-2" />
                    <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                      {sortedHistory.length === 0 ? (
                        <p className="text-[11px] text-gray-500">
                          No status changes recorded yet.
                        </p>
                      ) : (
                        sortedHistory.map((entry, idx) => (
                          <div key={entry.changedAt + idx} className="flex items-start gap-2">
                            <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-orange-400" />
                            <div>
                              <p className="text-[11px] font-medium text-gray-800">
                                {entry.previousStatus || "—"} → {entry.newStatus}
                              </p>
                              <p className="text-[11px] text-gray-500">
                                {formatDate(entry.changedAt)}
                                {entry.rejectionReason
                                  ? ` · Reason: ${entry.rejectionReason}`
                                  : ""}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="border-t border-dashed border-gray-200 my-2" />
                    <p className="text-[11px] text-gray-500">
                      Applied on {formatDate(app.createdAt)}
                    </p>
                  </div>
                )}
              </Card>
            );
          })}

          {/* Pagination controls */}
          {(totalPages > 1 || page > 1) && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t border-gray-100 mt-2">
              <div className="flex justify-center sm:justify-start">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading || !hasPrev}
                  onClick={() => {
                    const nextPage = Math.max(1, page - 1);
                    setPage(nextPage);
                    updateUrl(activeTab, nextPage);
                  }}
                >
                  Previous
                </Button>
              </div>

              <div className="flex items-center justify-center gap-1">
                {totalPages > 1 && (
                  <>
                    {page > 3 && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setPage(1);
                            updateUrl(activeTab, 1);
                          }}
                          className="min-w-8 h-8 px-2 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          1
                        </button>
                        <span className="text-xs text-gray-400 px-1">…</span>
                      </>
                    )}

                    {getPageButtons().map((pageNumber) => {
                      const isActive = pageNumber === page;
                      return (
                        <button
                          key={pageNumber}
                          type="button"
                          disabled={loading && isActive}
                          onClick={() => {
                            setPage(pageNumber);
                            updateUrl(activeTab, pageNumber);
                          }}
                          className={[
                            "min-w-8 h-8 px-2 rounded-full text-xs font-medium border transition-colors",
                            isActive
                              ? "bg-orange-500 text-white border-orange-500"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
                          ].join(" ")}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    {page < totalPages - 2 && (
                      <>
                        <span className="text-xs text-gray-400 px-1">…</span>
                        <button
                          type="button"
                          onClick={() => {
                            setPage(totalPages);
                            updateUrl(activeTab, totalPages);
                          }}
                          className="min-w-8 h-8 px-2 rounded-full text-xs font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              <div className="flex justify-center sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={loading || !hasNext}
                  onClick={() => {
                    const nextPage = Math.min(totalPages, page + 1);
                    setPage(nextPage);
                    updateUrl(activeTab, nextPage);
                  }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {totalResults > 0 && (
            <p className="text-center text-[11px] text-gray-400 pt-2">
              Showing page {page} of {totalPages} · {totalResults} total applications
            </p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

