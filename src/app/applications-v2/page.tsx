"use client";

import { useState } from "react";
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
  CheckCircle2,
  Clock3,
} from "lucide-react";

const TABS = ["All", "In progress", "Interviewing", "Offers", "Archived"] as const;

const mockApplications = [
  {
    id: 1,
    title: "Sales Executive",
    company: "GrowWell Fintech",
    location: "Bengaluru · Hybrid",
    appliedOn: "12 Feb 2025",
    status: "In progress",
    stage: "Profile reviewed",
    nextStep: "Awaiting interview scheduling",
  },
  {
    id: 2,
    title: "Customer Support Associate",
    company: "BrightDesk Solutions",
    location: "Mumbai · On-site",
    appliedOn: "09 Feb 2025",
    status: "Interviewing",
    stage: "Round 1 completed",
    nextStep: "HR will share feedback in 2–3 days",
  },
  {
    id: 3,
    title: "Business Development Executive",
    company: "UrbanReach Services",
    location: "Remote · India",
    appliedOn: "03 Feb 2025",
    status: "Offer",
    stage: "Offer received",
    nextStep: "Review compensation and confirm joining date",
  },
];

export default function ApplicationsV2Page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("In progress");

  const filtered =
    activeTab === "All"
      ? mockApplications
      : mockApplications.filter((a) =>
          activeTab === "Offers" ? a.status === "Offer" : a.status === activeTab,
        );

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
              Applications in progress
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
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-sm">No applications in this stage yet.</p>
            </div>
          ) : (
            filtered.map((app) => (
              <Card
                key={app.id}
                className="border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col gap-4 sm:gap-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="mt-0.5 hidden sm:flex w-10 h-10 rounded-lg bg-orange-50 items-center justify-center">
                      <Briefcase className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
                        {app.title}
                      </h2>
                      <p className="text-sm text-gray-600 truncate">{app.company}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {app.location}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" />
                          Applied on {app.appliedOn}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 sm:flex-col sm:items-end">
                    <Badge
                      variant="outline"
                      className={
                        app.status === "Offer"
                          ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                          : app.status === "Interviewing"
                            ? "border-blue-200 text-blue-700 bg-blue-50"
                            : "border-orange-200 text-orange-700 bg-orange-50"
                      }
                    >
                      {app.status}
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
                    {app.status === "Offer" ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                    ) : (
                      <Clock3 className="w-4 h-4 text-orange-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium text-gray-900 text-xs sm:text-sm">
                        {app.stage}
                      </p>
                      <p className="text-xs text-gray-500">{app.nextStep}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs text-gray-600 hover:bg-gray-50"
                    >
                      Withdraw
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-xs text-white gap-1.5"
                    >
                      Track status
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

