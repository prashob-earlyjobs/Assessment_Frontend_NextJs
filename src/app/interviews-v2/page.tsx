"use client";

import { useRouter } from "next/navigation";
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
  Video,
  Clock3,
} from "lucide-react";

const mockInterviews = [
  {
    id: 1,
    title: "Sales Executive",
    company: "GrowWell Fintech",
    location: "Bengaluru · Hybrid",
    date: "18 Feb 2025",
    time: "11:00 AM",
    mode: "Video · Google Meet",
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Customer Support Associate",
    company: "CareBridge Services",
    location: "Mumbai · On-site",
    date: "16 Feb 2025",
    time: "3:30 PM",
    mode: "In-person",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Business Development Executive",
    company: "UrbanReach Services",
    location: "Remote · India",
    date: "10 Feb 2025",
    time: "5:00 PM",
    mode: "Video · Zoom",
    status: "Completed",
  },
];

export default function InterviewsV2Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Interviews" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-10">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              My interviews
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              Interviews scheduled
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              Prepare well and keep track of upcoming interview dates, modes, and timings.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
              onClick={() => router.push("/dashboard")}
            >
              <ChevronLeft className="w-4 h-4" />
              Back to dashboard
            </Button>
          </div>
        </section>

        {/* List */}
        <section className="space-y-4">
          {mockInterviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">You don&apos;t have any interviews scheduled yet.</p>
            </div>
          ) : (
            mockInterviews.map((iv) => (
              <Card
                key={iv.id}
                className="border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-3 sm:gap-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-orange-50 items-center justify-center">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {iv.title}
                      </h2>
                      <p className="text-sm text-gray-600 truncate">{iv.company}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {iv.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          {iv.date} · {iv.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                    <Badge
                      variant="outline"
                      className={
                        iv.status === "Completed"
                          ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                          : "border-blue-200 text-blue-700 bg-blue-50"
                      }
                    >
                      {iv.status}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
                    >
                      View details
                    </Button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-t border-dashed border-gray-100 pt-3 sm:pt-4">
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                    <Video className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">
                        {iv.mode}
                      </p>
                      <p className="text-xs text-gray-500">
                        Join 5–10 minutes early, test your audio/video, and keep your resume handy.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50 gap-1.5"
                    >
                      <Clock3 className="w-3.5 h-3.5" />
                      Reschedule
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-xs text-white gap-1.5"
                    >
                      Add to calendar
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

