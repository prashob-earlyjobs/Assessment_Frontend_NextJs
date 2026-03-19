"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import Footer from "../../components/pages/footer";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
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

export default function TrackApplicationPage() {
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
          setError("Could not load application details. Please try again.");
          return;
        }
        const data = await res.json();
        const raw =
          data?.data?.application ||
          data?.data ||
          data?.application ||
          data ||
          null;
        if (!raw) {
          setError("Application not found.");
          return;
        }
        setApplication(raw as TrackedApplication);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        setError("Something went wrong while fetching application details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    return () => controller.abort();
  }, [backendUrl, applicationId]);

  const history = Array.isArray(application?.statusHistory)
    ? [...application!.statusHistory].sort(
        (a, b) => new Date(a.changedAt).getTime() - new Date(b.changedAt).getTime(),
      )
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Application details" showPageTitle />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5 mb-3"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
              Application details
            </h1>
            <p className="text-sm text-gray-500">
              View the full history and current status of this application.
            </p>
          </div>
        </div>

        {!applicationId ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-500">No application selected.</p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        ) : !application ? (
          <div className="text-center py-20">
            <p className="text-sm text-gray-500">Application details not available.</p>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {application.jobTitle}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {application.fullName} • {application.email}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
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
                <div className="flex items-start gap-2">
                  <Badge
                    variant="outline"
                    className={getStatusBadgeClasses(application.status)}
                  >
                    {application.status}
                  </Badge>
                </div>
              </div>

              {application.jobDescription && (
                <div className="pt-3 border-t border-dashed border-gray-100 space-y-2">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-gray-900">Job description</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-[11px] text-gray-600 hover:text-gray-900"
                      onClick={() => setShowFullDescription((prev) => !prev)}
                    >
                      {showFullDescription ? "Show less" : "Show more"}
                    </Button>
                  </div>
                  {showFullDescription && (
                    <div
                      className="text-xs sm:text-sm text-gray-700 space-y-1 prose prose-sm max-w-none max-h-[480px] overflow-y-auto"
                      dangerouslySetInnerHTML={{ __html: application.jobDescription }}
                    />
                  )}
                </div>
              )}
            </Card>

            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Status history</h3>

              {/* High-level progress for this application */}
              <div className="space-y-2">
                {(() => {
                  const latestStatusRaw =
                    history.length > 0
                      ? history[history.length - 1].newStatus
                      : application.status;
                  const latestStatus = (latestStatusRaw || "").toLowerCase();

                  // Progress: applied → halfway to shortlisted, shortlisted → full orange, rejected → full red
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
                    <div className="space-y-1.5">
                      {/* Circles + bar (constrained width) */}
                      <div className="relative flex items-center justify-between px-6 h-8 max-w-md mx-auto">
                        {/* Track */}
                        <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-1 bg-gray-100 rounded-full" />
                        {/* Animated progress (starts at first circle, grows toward second) */}
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
                      {/* Labels aligned with circles */}
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
                  );
                })()}
              </div>

              {/* Detailed status changes timeline */}
              {history.length === 0 ? (
                <p className="text-xs text-gray-500">
                  No status changes recorded yet for this application.
                </p>
              ) : (
                <div className="space-y-3 pt-3 border-t border-dashed border-gray-100">
                  {history.map((h, idx) => (
                    <div key={h.changedAt + idx} className="flex items-start gap-2 text-xs">
                      <div className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                      <div>
                        <p className="font-medium text-gray-900">
                          {h.previousStatus || "—"} → {h.newStatus}
                        </p>
                        <p className="text-gray-500">
                          {formatDate(h.changedAt)}
                          {h.rejectionReason ? ` · Reason: ${h.rejectionReason}` : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

