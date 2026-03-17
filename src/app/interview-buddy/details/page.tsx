"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Share2 } from "lucide-react";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import Footer from "../../components/pages/footer";
import { getAIBuddyInterviews, createAIBuddySession } from "../../components/services/staticApis";
import { useUser } from "@/app/context";
import { toast } from "sonner";

type Interview = {
  _id?: string;
  assessmentRole?: string;
  category?: string;
  subCategory?: string;
  duration?: number;
  jobDescription?: string;
  skills?: { name?: string; difficulty?: string }[];
};

export default function InterviewDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { userCredentials } = useUser();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [starting, setStarting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const idFromQuery = searchParams.get("id");
      const subFromQuery = searchParams.get("sub");

      // 1) Try to restore from sessionStorage (same browser/tab flow)
      try {
        if (typeof window !== "undefined") {
          const stored = window.sessionStorage.getItem("aiBuddySelectedInterview");
          if (stored) {
            const parsed: Interview = JSON.parse(stored);
            if (!idFromQuery || parsed._id === idFromQuery) {
              setInterview(parsed);
              return;
            }
          }
        }
      } catch {
        // ignore parse errors / storage errors
      }

      // 2) If we have id + subCategory in URL, fetch from API so shared links work
      if (idFromQuery && subFromQuery) {
        try {
          const response = await getAIBuddyInterviews(subFromQuery);
          const data = response?.data;
          const list: any[] = Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data)
            ? data
            : [];
          const found = list.find(
            (item) => String(item._id) === String(idFromQuery)
          );
          if (found) {
            setInterview(found);
          }
        } catch (e) {
          console.error("Failed to load interview for details page", e);
        }
      }

      setLoading(false);
    };

    void init();
  }, [searchParams]);

  const handleShare = () => {
    if (!interview) return;
    try {
      const url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(
          () => toast.success("Interview copied to clipboard"),
          () => toast.error("Failed to copy link")
        );
      } else {
        toast.message("Share", {
          description: url,
        });
      }
    } catch {
      toast.error("Unable to share link right now");
    }
  };

  const handleStart = async () => {
    if (!interview) return;
    const assessmentRole = interview.assessmentRole || "";
    if (!assessmentRole) {
      toast.error("Missing interview role");
      return;
    }

    const subCategory = interview.subCategory || null;

    // Match behaviour of main list start button:
    // if not logged in, remember pending interview and send to login
    if (!userCredentials) {
      const redirectPath = `/interview-buddy/${encodeURIComponent(
        assessmentRole
      )}`;
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "aiBuddyPendingInterview",
            JSON.stringify({
              from: "ai-interview-buddy",
              role: assessmentRole,
              subCategory,
              redirectPath,
            })
          );
        }
      } catch {
        // ignore storage errors
      }
      router.push(
        `/login?source=ai-interview-buddy&redirect=${encodeURIComponent(
          redirectPath
        )}`
      );
      return;
    }

    setStarting(true);
    try {
      const fullName = userCredentials?.name || "";
      const parts = fullName.trim().split(" ").filter(Boolean);
      const firstName = parts[0] || null;
      const lastName = parts.length > 1 ? parts.slice(1).join(" ") : null;

      const sessionData = await createAIBuddySession({
        role: assessmentRole,
        subCategory,
        firstName,
        lastName,
        email: userCredentials?.email || null,
        phone: userCredentials?.mobile || null,
      });
      const sessionId =
        sessionData?.data?.sessionId ||
        sessionData?.sessionId ||
        sessionData?.data?._id ||
        null;
      if (sessionId) {
        window.location.href = `${process.env.NEXT_PUBLIC_AI_ASSESSMENT_URL}interview?sessionId=${sessionId}`;
      } else {
        router.push(`/interview-buddy/${encodeURIComponent(assessmentRole)}`);
      }
    } catch (e) {
      console.error("Failed to start interview session", e);
      toast.error("Failed to start interview session");
    } finally {
      setStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth flex flex-col">
      <NavbarV2 pageTitle="Interview Details" showPageTitle />

      <main className="flex-1 pt-32 pb-20">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-10">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center text-slate-500 text-sm">
              <Loader2 className="h-5 w-5 animate-spin mb-3" />
              Loading interview details...
            </div>
          ) : !interview ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-sm text-slate-600">
                No interview selected. Go back and choose an interview to view details.
              </p>
              <button
                type="button"
                onClick={() => router.push("/interview-buddy")}
                className="mt-4 inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                Back to Interview Buddy
              </button>
            </div>
          ) : (
            <div className="space-y-10">
              {/* interview info */}
              <section className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900">
                      {interview.assessmentRole}
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                      {interview.category} {interview.subCategory ? `• ${interview.subCategory}` : ""}
                    </p>
                  </div>
                  {interview.duration != null && (
                    <div className="inline-flex items-center rounded-full bg-orange-50 px-4 py-1.5 text-xs font-semibold text-orange-700 border border-orange-100">
                      {interview.duration} min
                    </div>
                  )}
                </div>

                {interview.jobDescription && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800">Overview</p>
                    <p className="text-sm leading-relaxed text-slate-700">
                      In this role you&apos;ll be expected to apply your knowledge in practical situations,
                      reason through real-world problems, communicate your thinking clearly, and make sound
                      decisions even when the questions are open-ended or slightly ambiguous.
                    </p>
                    <p className="text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                      {interview.jobDescription}
                    </p>
                    <p className="text-xs text-slate-500">
                      This interview is designed to closely mirror a real‑world interview so you can practise
                      how you talk about your work, respond to different types of questions, and stay clear
                      and confident under time pressure.
                    </p>
                  </div>
                )}

                {Array.isArray(interview.skills) && interview.skills.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-sm font-semibold text-slate-800">Key skills covered</p>
                    <div className="flex flex-wrap gap-2.5">
                      {interview.skills.map((s, idx) => (
                        <span
                          key={`${s.name || "skill"}-${idx}`}
                          className="inline-flex items-center rounded-full bg-slate-50 px-3.5 py-1.5 text-xs text-slate-800 border border-slate-200"
                        >
                          {s.name}
                          {s.difficulty && (
                            <span className="ml-1 text-[11px] text-slate-500">· {s.difficulty}</span>
                          )}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      Expect questions that test both your practical experience and how you would
                      respond in real-world scenarios around these skills.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-800">What to expect</p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600">
                    <li>Timed questions, similar to a live recruiter or hiring manager round.</li>
                    <li>Mix of open-ended, situational, and follow-up questions.</li>
                    <li>Focused around your experience level and the skills listed above.</li>
                  </ul>
                </div>
                <div className="pt-6 flex flex-col sm:flex-row gap-3 sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/interview-buddy")}
                    className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="inline-flex items-center justify-center border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50 hover:border-slate-400 gap-2"
                    title="Share this interview"
                  >
                    <Share2 className="h-5 w-5" />
                    <span>Share</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleStart}
                    disabled={starting || !interview}
                    className="inline-flex sm:min-w-[180px] items-center justify-center bg-orange-500 px-7 py-3 text-base font-semibold text-white shadow-md hover:bg-orange-600 hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed gap-2 transition"
                  >
                    {starting && <Loader2 className="h-5 w-5 animate-spin" />}
                    <span>Start Interview</span>
                  </button>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

