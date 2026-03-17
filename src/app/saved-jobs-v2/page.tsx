"use client";

import { useRouter } from "next/navigation";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Briefcase, MapPin, CalendarDays, ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

const mockSavedJobs = [
  {
    id: 1,
    title: "Inside Sales Executive",
    company: "BrightDesk Solutions",
    location: "Bengaluru · Hybrid",
    savedOn: "14 Feb 2025",
    tag: "Sales · Early-stage SaaS",
  },
  {
    id: 2,
    title: "Customer Support Associate",
    company: "CareBridge Services",
    location: "Mumbai · On-site",
    savedOn: "11 Feb 2025",
    tag: "Customer Success · BFSI",
  },
  {
    id: 3,
    title: "Business Development Executive",
    company: "UrbanReach Services",
    location: "Remote · India",
    savedOn: "08 Feb 2025",
    tag: "BD · Field + Inside",
  },
];

export default function SavedJobsV2Page() {
  const router = useRouter();

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
          {mockSavedJobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">You haven&apos;t saved any jobs yet.</p>
            </div>
          ) : (
            mockSavedJobs.map((job) => (
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
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          Saved on {job.savedOn}
                        </span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline" className="border-gray-200 text-gray-700 bg-gray-50">
                          {job.tag}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
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
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      Remove save
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-xs text-white gap-1.5"
                    >
                      Apply now
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

