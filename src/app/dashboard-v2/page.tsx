"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import {
  Briefcase,
  Users,
  Building2,
  Search,
  PlusCircle,
  Sparkles,
  Filter,
  Brain,
} from "lucide-react";
import { useUser } from "../context";
import { createAIBuddySession } from "../components/services/staticApis";

const DashboardV2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { userCredentials } = useUser();
  const [aiBuddyRole, setAiBuddyRole] = useState<string | null>(null);
  const [aiBuddySessionId, setAiBuddySessionId] = useState<string | null>(null);
  const [showAiBuddyDialog, setShowAiBuddyDialog] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem("aiBuddyPendingInterview");
      if (!raw) return;
      localStorage.removeItem("aiBuddyPendingInterview");
      const parsed = JSON.parse(raw);
      if (parsed?.role) {
        setAiBuddyRole(parsed.role);
        (async () => {
          try {
            const fullName = userCredentials?.name || "";
            const parts = fullName.trim().split(" ").filter(Boolean);
            const firstName = parts[0] || null;
            const lastName = parts.length > 1 ? parts.slice(1).join(" ") : null;
            const sessionData = await createAIBuddySession({
              role: parsed.role,
              subCategory: parsed.subCategory || null,
              firstName,
              lastName,
              email: userCredentials?.email || null,
              phone: userCredentials?.mobile || null,
            });
            const sessionId = sessionData?.data?.sessionId || sessionData?.sessionId || sessionData?.data?._id || null;
            setAiBuddySessionId(sessionId);
          } catch (e) {
            console.error("Failed to create AI buddy session", e);
          } finally {
            setShowAiBuddyDialog(true);
          }
        })();
      }
    } catch (e) {
      console.error("Failed to read AI buddy redirect info", e);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="My Dashboard" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-12">
        {/* Top section: greeting + primary actions */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
          {/* Left: Welcome + search + stats (candidate perspective) */}
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
                Candidate Dashboard
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[2.9rem] font-semibold text-gray-900 tracking-tight mb-2">
                Welcome back, let&apos;s find your next role
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl">
                Track your applications, complete pending steps, and discover new opportunities tailored to you.
              </p>
            </div>

            {/* Search strip */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-md px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 flex-1">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <Search className="w-4 h-4 text-orange-500" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Search jobs, companies, or locations"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-9 border-0 bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  Upload resume
                </Button>
              </div>
            </div>

            {/* Key metrics */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-2">
              <Card
                className="border border-gray-100 shadow-sm p-5 sm:p-6 cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => router.push("/applications-v2")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="rounded-full bg-green-50 text-green-600 text-[11px] font-medium px-2 py-0.5">
                    +2 this week
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1.5">
                  Applications in progress
                </p>
                <p className="text-3xl font-semibold text-gray-900">8</p>
                <p className="text-xs text-gray-500 mt-2">
                  Stay on top of each application and never miss a follow-up.
                </p>
              </Card>

              <Card
                className="border border-gray-100 shadow-sm p-5 sm:p-6 cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => router.push("/saved-jobs-v2")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-500" />
                  </div>
                  <span className="rounded-full bg-blue-50 text-blue-600 text-[11px] font-medium px-2 py-0.5">
                    4 new this week
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1.5">
                  Saved jobs
                </p>
                <p className="text-3xl font-semibold text-gray-900">21</p>
                <p className="text-xs text-gray-500 mt-2">
                  Keep interesting roles in one place and apply when you&apos;re ready.
                </p>
              </Card>

              <Card
                className="border border-gray-100 shadow-sm p-5 sm:p-6 sm:col-span-2 xl:col-span-1 cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => router.push("/interviews-v2")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <span className="rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-medium px-2 py-0.5">
                    2 this week
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1.5">
                  Interviews scheduled
                </p>
                <p className="text-3xl font-semibold text-gray-900">3</p>
                <p className="text-xs text-gray-500 mt-2">
                  Prepare well and keep track of upcoming interview dates.
                </p>
              </Card>

              <Card
                className="border border-gray-100 shadow-sm p-5 sm:p-6 sm:col-span-2 xl:col-span-1 cursor-pointer transition-transform hover:-translate-y-0.5 hover:shadow-md"
                onClick={() => router.push("/interviews")}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Brain className="w-4 h-4 text-red-500" />
                  </div>
                  <span className="rounded-full bg-red-50 text-red-600 text-[11px] font-medium px-2 py-0.5">
                    2 this week
                  </span>
                </div>
                <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-1.5">
                  AI Interview Sessions
                </p>
                <p className="text-3xl font-semibold text-gray-900">3</p>
                <p className="text-xs text-gray-500 mt-2">
                  Practice with real interview scenarios and get AI-powered feedback to improve your skills.
                </p>
              </Card>
            </div>
          </div>

          {/* Right: Quick actions / tips (candidate perspective) */}
          <aside className="space-y-4">
            <Card className="border border-gray-100 shadow-md bg-slate-900 text-white overflow-hidden">
              <div className="relative p-6 sm:p-7">
                <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-orange-500/20 blur-2xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-orange-200 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    Smart suggestions
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold mb-1.5">
                    Get closer to your next offer
                  </h2>
                  <p className="text-xs text-slate-200/80 mb-4 leading-relaxed">
                    Stand out with a strong profile, tailored applications, and timely follow-ups across every role.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3"
                      onClick={() => router.push("/profile-v2")}
                    >
                      Improve my profile
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-100 text-xs bg-transparent hover:bg-slate-800 px-3"
                    >
                      View job search tips
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    Today&apos;s focus
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    A quick snapshot of what moves your search forward.
                  </p>
                </div>
                <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-medium text-orange-600">
                  5 actions
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Complete profile & resume updates
                    </p>
                    <p className="text-xs text-gray-500">
                      Add your latest role, skills, and achievements so recruiters instantly see your fit.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Finish assessments for shortlisted roles
                    </p>
                    <p className="text-xs text-gray-500">
                      Completing assessments early boosts your chances of being noticed first.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Follow up on recent applications
                    </p>
                    <p className="text-xs text-gray-500">
                      Send polite follow-ups for roles you applied to 5–7 days ago.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </aside>
        </section>

        {/* Second row: Recommended roles + Application overview */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] items-start">
          {/* Recommended roles list (UI only, no data wiring) */}
          <Card className="border border-gray-100 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Recommended for you
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Roles that closely match your skills and preferences.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50 text-xs"
              >
                See all matches
              </Button>
            </div>
            <div className="divide-y divide-gray-100 text-sm">
              {[
                {
                  title: "Senior Sales Executive",
                  location: "Bengaluru · Hybrid",
                  applicants: 42,
                  stage: "Screening",
                },
                {
                  title: "Customer Support Associate",
                  location: "Mumbai · On-site",
                  applicants: 19,
                  stage: "Interviewing",
                },
                {
                  title: "Business Development Manager",
                  location: "Remote · India",
                  applicants: 33,
                  stage: "Shortlisting",
                },
              ].map((role) => (
                <div
                  key={role.title}
                  className="py-3 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {role.title}
                    </p>
                    <p className="text-xs text-gray-500">{role.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase">
                        Applicants
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {role.applicants}
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-[11px] font-medium text-gray-700 border border-gray-200">
                      {role.stage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Simple application overview */}
          <Card className="border border-gray-100 shadow-sm p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Application overview
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Where your applications are in the journey right now.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-orange-50 px-4 py-3">
                <p className="text-xs text-orange-700 mb-1">Applied</p>
                <p className="text-xl font-semibold text-orange-900">68</p>
                <p className="text-[11px] text-orange-700/80 mt-1">
                  Applications successfully submitted and awaiting review.
                </p>
              </div>
              <div className="rounded-xl bg-blue-50 px-4 py-3">
                <p className="text-xs text-blue-700 mb-1">Interviewing</p>
                <p className="text-xl font-semibold text-blue-900">27</p>
                <p className="text-[11px] text-blue-700/80 mt-1">
                  Interviews scheduled or in progress with companies.
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-xs text-emerald-700 mb-1">Offers</p>
                <p className="text-xl font-semibold text-emerald-900">9</p>
                <p className="text-[11px] text-emerald-700/80 mt-1">
                  Track offer details, negotiations, and joining dates.
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-700 mb-1">On hold</p>
                <p className="text-xl font-semibold text-gray-900">5</p>
                <p className="text-[11px] text-gray-700/80 mt-1">
                  Applications paused or awaiting further updates.
                </p>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <Footer />

      {showAiBuddyDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
          onClick={() => setShowAiBuddyDialog(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-sm mx-4 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Continue your AI interview?
            </p>
            <p className="text-xs text-gray-500 mb-4">
              You selected <span className="font-medium text-gray-800">{aiBuddyRole}</span>. Ready to start?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAiBuddyDialog(false)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 rounded-md border border-gray-200 hover:bg-gray-50"
              >
                Not now
              </button>
              <button
                type="button"
                onClick={() => {
                  if (aiBuddyRole) {
                    const url = aiBuddySessionId
                      ? `${process.env.NEXT_PUBLIC_AI_ASSESSMENT_URL}interview?sessionId=${aiBuddySessionId}`
                      : `/interview-buddy/${encodeURIComponent(aiBuddyRole)}`;
                    router.push(url);
                  }
                  setShowAiBuddyDialog(false);
                }}
                className="px-4 py-1.5 text-xs font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600"
              >
                Proceed to interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardV2;

