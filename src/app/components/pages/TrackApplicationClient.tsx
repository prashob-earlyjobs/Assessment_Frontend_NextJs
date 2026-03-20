"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavbarV2 from "../v2/navbar/navbar.v2";
import Footer from "../pages/footer";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, MapPin, ArrowLeft, Loader2 } from "lucide-react";

interface StatusHistoryItem {
  previousStatus: string;
  newStatus: string;
  changedByUserId: string;
  changedAt: string;
  rejectionReason?: string;
}

interface TrackedApplication {
  _id: string;
  jobId: string;
  fullName: string;
  phone: string;
  email: string;
  status: string;
  statusHistory: StatusHistoryItem[];
  createdAt: string;
  updatedAt: string;
  jobTitle: string;
  jobLocation: string;
  jobDescription?: string;
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

export default function TrackApplicationClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationId = searchParams.get("applicationId");
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || process.env.NEXT_PUBLIC_BACKEND_URL;

  const [application, setApplication] = useState<TrackedApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

  useEffect(() => {
    if (!backendUrl || !applicationId) return;

    const controller = new AbortController();
    const fetchTrack = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = new URLSearchParams({ applicationId });
        const url = `${backendUrl}/public/candidate-job-applications/track?${params.toString()}`;
        const res = await fetch(url, { method: "GET", signal: controller.signal });
        if (!res.ok) {
          console.error("Failed to load tracked application", res.status);
          setError("Could not load application details. Please try again.");
          return;
        }
        const data = (await res.json()) as {
          status: string;
          data?: TrackedApplication;
        };
        if (!data?.data) {
          setError("Application details not found.");
          return;
        }
        setApplication(data.data);
      } catch (err) {
        if ((err as any).name === "AbortError") return;
        console.error("Error fetching tracked application", err);
        setError("Something went wrong while loading the application.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();

    return () => controller.abort();
  }, [backendUrl, applicationId]);

  // Sort history oldest-first
  const sortedHistory: StatusHistoryItem[] = application?.statusHistory
    ? [...application.statusHistory].sort(
        (a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime(),
      )
    : [];

  const latestStatusRaw =
    sortedHistory.length > 0
      ? sortedHistory[sortedHistory.length - 1].newStatus
      : application?.status || "";
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Application details" showPageTitle />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-8">
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {!applicationId && (
          <Card className="p-6 text-sm text-gray-600">
            No application selected. Please go back and choose an application to view details.
          </Card>
        )}

        {applicationId && loading && (
          <div className="flex items-center justify-center py-16">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Loading application details...</span>
            </div>
          </div>
        )}

        {applicationId && !loading && error && (
          <Card className="p-6 text-sm text-red-600 bg-red-50 border-red-100">
            {error}
          </Card>
        )}

        {applicationId && !loading && !error && !application && (
          <Card className="p-6 text-sm text-gray-600">
            Application details not available. It might have been removed.
          </Card>
        )}

        {application && (
          <div className="space-y-6">
            {/* Summary card with job info and status */}
            <Card className="rounded-lg bg-card text-card-foreground border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {application.jobTitle}
                  </h1>
                  <p className="text-sm text-gray-600 truncate">
                    {application.fullName} • {application.email}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {application.jobLocation || "Location not specified"}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Applied on {formatDate(application.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClasses(application.status)}
                  >
                    {application.status.charAt(0).toUpperCase() +
                      application.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Job description inline */}
              {application.jobDescription && (
                <div className="pt-2 border-t border-dashed border-gray-100 space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowFullDescription((prev) => !prev)}
                    className="text-xs font-medium text-orange-600 hover:text-orange-700"
                  >
                    {showFullDescription ? "Show less" : "Show more"}
                  </button>
                  {showFullDescription && (
                    <div
                      className="prose prose-sm max-w-none text-gray-700 mt-1"
                      dangerouslySetInnerHTML={{
                        __html: application.jobDescription ?? "",
                      }}
                    />
                  )}
                </div>
              )}
            </Card>

            {/* Status history card with progress bar */}
            <Card className="rounded-lg bg-card text-card-foreground border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Status history</h2>
                  <p className="text-xs text-gray-500">
                    Track how your application has moved through each stage.
                  </p>
                </div>
              </div>

              <div className="pt-1 pb-2 space-y-1.5">
                <div className="relative flex items-center justify-between px-6 h-8 max-w-md mx-auto">
                  {/* Base track */}
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

              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
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
                Applied on {formatDate(application.createdAt)}
              </p>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

