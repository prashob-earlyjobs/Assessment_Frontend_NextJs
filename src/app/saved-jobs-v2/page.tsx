"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Briefcase, MapPin, CalendarDays, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";
import { useUser } from "../context";
import { toast } from "sonner";

type SavedJob = {
  id: string;
  jobId?: string;
  title: string;
  company: string;
  location: string;
  savedOn?: string;
  tag?: string;
};

export default function SavedJobsV2Page() {
  const router = useRouter();
  const { userCredentials } = useUser();

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL_2_0 || process.env.NEXT_PUBLIC_BACKEND_URL;

  // Derived pagination info
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(totalResults / pageSize || 1)),
    [totalResults, pageSize]
  );

  useEffect(() => {
    // Require login for saved jobs
    if (!userCredentials) {
      setSavedJobs([]);
      setLoading(false);
      return;
    }

    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        const email = userCredentials.email;
        if (!backendUrl || !email) {
          setSavedJobs([]);
          return;
        }

        const params = new URLSearchParams();
        params.append("userEmail", email);
        params.append("page", String(page));
        params.append("pageSize", String(pageSize));

        const url = `${backendUrl}/public/savedJobs?${params.toString()}`;
        const res = await fetch(url, { method: "GET" });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || "Failed to load saved jobs");
        }

        const data = await res.json();

        // New backend shape:
        // { status: "success", data: { data: [...], totalResults: number } }
        // Also keep support for previous shapes as a fallback.
        const raw =
          data?.data?.data ;
        const list: any[] = Array.isArray(raw) ? raw : [];

        const normalized: SavedJob[] = list.map((item) => ({
          id: String(item._id || item.id || item.jobId),
          jobId: item.jobId || item.id || item._id,
          title:
            item?.job?.title ||
            item.title ||
            item.jobTitle ||
            item.jobId ||
            "Job title",
          company:
            item.company?.name ||
            item.companyName ||
            item.company_name ||
            "",
          location:
            item?.company?.registeredAddress ||
            item?.company?.operationalAddress ||
            item.location ||
            "Location not specified",
          savedOn: item.createdAt || item.savedOn || item.saved_at,
        }));

        setSavedJobs(normalized);

        // Let API drive pagination whenever it provides metadata
        const apiPage =
          data?.data?.page ??
          data?.page ??
          page;
        const apiPageSize =
          data?.data?.pageSize ??
          data?.pageSize ??
          pageSize;
        const total =
          data?.data?.totalResults ?? // new shape
          data?.data?.total ??
          data?.totalResults ??
          data?.total ??
          normalized.length;

        setPage(Number(apiPage) || 1);
        setPageSize(Number(apiPageSize) || 10);
        setTotalResults(Number(total) || normalized.length);
      } catch (err) {
        console.error(err);
        setSavedJobs([]);
        toast.error(err instanceof Error ? err.message : "Failed to load saved jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, [backendUrl, userCredentials, page]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveSave = async (job: SavedJob) => {
    if (!job.jobId) {
      toast.error("Job ID is missing.");
      return;
    }
    if (!userCredentials?.email) {
      toast.error("Please log in to manage saved jobs.");
      return;
    }
    if (!backendUrl) {
      toast.error("Backend URL not configured.");
      return;
    }
    try {
      setRemovingId(job.id);
      const baseUrl = `${backendUrl}/public/saveJobs`;
      const url = `${baseUrl}?jobId=${encodeURIComponent(
        job.jobId
      )}&userEmail=${encodeURIComponent(userCredentials.email)}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to remove saved job");
      }
      // If this was the only job on the page and we're not on the first page,
      // go back to the previous page so the user still sees results.
      if (savedJobs.length === 1 && page > 1) {
        setPage(page - 1);
      } else {
        setSavedJobs((prev) => prev.filter((j) => j.id !== job.id));
        setTotalResults((prev) => Math.max(0, prev - 1));
      }
      toast.success("Job removed from saved.");
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to remove saved job."
      );
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Saved Jobs" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-10">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              My saved jobs
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              Saved jobs
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              Keep interesting roles in one place and come back to apply when you&apos;re ready.
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

        {/* List */}
        <section className="space-y-4">
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Card
                  key={idx}
                  className="border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4 animate-pulse"
                >
                  <div className="flex items-start gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-gray-100" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/2 bg-gray-100 rounded" />
                      <div className="h-3 w-1/3 bg-gray-100 rounded" />
                      <div className="flex gap-2 mt-2">
                        <div className="h-3 w-24 bg-gray-100 rounded" />
                        <div className="h-3 w-28 bg-gray-100 rounded" />
                      </div>
                    </div>
                  </div>
                  <div className="h-3 w-3/4 bg-gray-100 rounded" />
                </Card>
              ))}
            </div>
          ) : !userCredentials ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm mb-4">
                Please log in to view your saved jobs.
              </p>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-5"
                onClick={() => router.push("/login")}
              >
                Go to login
              </Button>
            </div>
          ) : savedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">You haven&apos;t saved any jobs yet.</p>
            </div>
          ) : (
            <>
              {savedJobs.map((job) => (
                <Card
                  key={job.id}
                  className="border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-3 sm:gap-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="hidden sm:flex w-10 h-10 rounded-lg bg-orange-50 items-center justify-center">
                        <Briefcase className="w-5 h-5 text-orange-500" />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                          {job.title}
                        </h2>
                        <p className="text-sm text-gray-600 truncate">{job.company}</p>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                          {job.savedOn && (
                            <span className="inline-flex items-center gap-1">
                              <CalendarDays className="w-3.5 h-3.5" />
                              Saved on {new Date(job.savedOn).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                        {!!job.tag && (
                          <div className="mt-2">
                            <Badge variant="outline" className="border-gray-200 text-gray-700 bg-gray-50">
                              {job.tag}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
                        onClick={() => {
                          if (job.jobId) {
                            router.push(`/jobs/job/${job.jobId}`);
                          }
                        }}
                      >
                        View role
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-dashed border-gray-100 pt-3 sm:pt-4">
                    <p className="text-xs sm:text-sm text-gray-500">
                      Reviewing this role? Apply when you&apos;re confident, or keep it saved for later.
                    </p>
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50 gap-1.5"
                      onClick={() => handleRemoveSave(job)}
                      disabled={removingId === job.id}
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                        Remove save
                      </Button>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-xs text-white gap-1.5"
                        onClick={() => {
                          if (job.jobId) {
                            router.push(`/jobs/job/${job.jobId}`);
                          }
                        }}
                      >
                        Apply now
                        <ChevronRight className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </section>

        {/* Pagination */}
        {userCredentials && savedJobs.length > 0 && (
          <section className="mt-8 flex items-center justify-between flex-wrap gap-3 text-xs sm:text-sm text-gray-600">
            <div>
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {(page - 1) * pageSize + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(page * pageSize, totalResults || savedJobs.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {totalResults || savedJobs.length}
              </span>{" "}
              saved jobs
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <span className="text-xs sm:text-sm">
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-3 border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

