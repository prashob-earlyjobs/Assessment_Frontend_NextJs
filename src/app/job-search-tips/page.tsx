"use client";

import { useRouter } from "next/navigation";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Sparkles, CheckCircle2, ArrowLeft } from "lucide-react";

const JobSearchTipsPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="Job search tips" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-10">
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              Playbook for candidates
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              Job search tips that actually work
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl">
              A short checklist to help you improve your profile, apply smarter, and move faster towards your next offer.
            </p>
          </div>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 text-gray-700 hover:bg-gray-50 gap-1.5"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to dashboard
            </Button>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.4fr)] items-start">
          <Card className="border border-gray-100 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-orange-500" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-900">Before you apply</h2>
                <p className="text-sm text-gray-500">
                  Quick profile fixes that move the needle the most.
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Sharpen your headline</p>
                  <p className="text-sm text-gray-500">
                    Use a clear, role-focused line like “Inside Sales Executive | 3+ years in B2C | BFSI &amp; Ed-tech” instead of a generic title.
                    Your headline is often the only text recruiters scan before deciding whether to open your profile, so make sure it reflects your role,
                    years of experience, domain and key strengths in one focused sentence.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Show outcomes, not just duties</p>
                  <p className="text-sm text-gray-500">
                    In your experience, add 2–4 bullet points that talk about targets, revenue, leads closed, or process improvements.
                    Instead of writing “Responsible for sales and customer calls”, write “Handled 40–50 outbound calls per day and consistently achieved
                    110% of monthly revenue targets for three consecutive quarters”.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Align skills with the roles you want</p>
                  <p className="text-sm text-gray-500">
                    Prioritise 6–10 skills that regularly show up in the JDs you like (e.g. field sales, CRM tools, objection handling, English / Hindi).
                    Remove skills that are not relevant to your target role so that hiring managers instantly understand the match between your profile and
                    their open position.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Keep your resume and profile in sync</p>
                  <p className="text-sm text-gray-500">
                    Dates, companies, job titles and education should match everywhere to avoid confusion for recruiters.
                    If a recruiter sees different job titles or overlapping dates between your resume, LinkedIn and assessment profile, it can create doubt
                    and slow down shortlisting even if your experience is strong.
                  </p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="border border-gray-100 shadow-sm p-6 sm:p-7 space-y-5">
            <div className="space-y-1.5">
              <h2 className="text-base font-semibold text-gray-900">When you apply</h2>
              <p className="text-sm text-gray-500">
                Simple habits that improve your response rate.
              </p>
            </div>

            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Apply to fewer, better-matched roles</p>
                  <p className="text-sm text-gray-500">
                    Focus on jobs where you meet at least 70% of the requirements instead of mass-applying everywhere.
                    This gives you enough overlap in skills and experience to tell a compelling story, and saves your energy for roles where you actually
                    have a realistic chance of getting interviews.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Add a short note when possible</p>
                  <p className="text-sm text-gray-500">
                    One or two lines on why you fit this specific role can make you stand out in a long list of applicants.
                    Mention 1–2 matching skills, your years of experience, and any relevant industry knowledge so the recruiter can immediately see why your
                    application is worth opening.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Track applications &amp; follow up</p>
                  <p className="text-sm text-gray-500">
                    After 5–7 days, send a polite follow-up for roles you&apos;re serious about. Use your dashboard to avoid double-follow ups.
                    A simple message that mentions the role, application date and your continued interest is enough — the goal is to remind the recruiter you
                    exist, not to pressure them.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Prepare for each interview, not in general</p>
                  <p className="text-sm text-gray-500">
                    Review the JD, company website, and your own resume before every call so your answers feel specific and confident.
                    Have 2–3 stories ready that show how you solved problems, handled tough customers, or hit targets that are similar to what the company
                    is hiring you for.
                  </p>
                </div>
              </li>
            </ul>
          </Card>
        </section>

        {/* Extra guidance: routines and common mistakes */}
        <section className="grid gap-6 lg:grid-cols-3 items-start text-sm">
          <Card className="border border-gray-100 shadow-sm p-6 sm:p-7 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Daily routine (20–30 min)</h2>
              <p className="text-sm text-gray-500">
                A light-weight schedule you can actually follow on busy days.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-orange-500" />
                <p className="text-sm text-gray-600">
                  Scan 3–5 new roles that match your preferred title, location, and CTC range.
                  Save only the ones that genuinely fit your experience so that you don&apos;t overwhelm yourself with noisy, low-quality options.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500" />
                <p className="text-sm text-gray-600">
                  Send 1–2 high-quality applications with a tailored resume / summary instead of mass applying.
                  Treat each application like a mini sales pitch, where you&apos;re briefly explaining why you are a strong solution to that company&apos;s problem.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <p className="text-sm text-gray-600">
                  Spend 5–10 minutes practicing answers to common questions for your role (pitch, achievements, failures).
                  Saying the answers out loud — even if it&apos;s just into your phone&apos;s recorder — massively improves how confident and clear you sound on real calls.
                </p>
              </li>
            </ul>
          </Card>

          <Card className="border border-gray-100 shadow_sm p-6 sm:p-7 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Weekly actions (60–90 min)</h2>
              <p className="text-sm text-gray-500">
                Deeper work that compounds over a few weeks.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-violet-500" />
                <p className="text-sm text-gray-600">
                  Review your profile and resume once a week and update at least one section (skills, summary, recent results).
                  This keeps your profile feeling fresh and shows activity to platforms and recruiters who filter by &quot;recently updated&quot; candidates.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-500" />
                <p className="text-sm text-gray-600">
                  Shortlist 5–10 target companies and follow their openings instead of relying only on job boards.
                  Understanding their products, customers and tone of communication will make your outreach and interview answers much sharper.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                <p className="text-sm text-gray-600">
                  Rehearse 1–2 mock interviews with a friend or record yourself answering role-specific questions.
                  Focus on tightening your introduction, explaining gaps or switches, and showing how you learn from mistakes.
                </p>
              </li>
            </ul>
          </Card>

          <Card className="border border-gray-100 shadow-sm p-6 sm:p-7 space-y-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Common mistakes to avoid</h2>
              <p className="text-sm text-gray-500">
                Small fixes here can save weeks of effort.
              </p>
            </div>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                <p className="text-sm text-gray-600">
                  Using one generic resume for every role, even when the JD clearly asks for different skills or experience.
                  Recruiters can instantly see when your resume hasn&apos;t been written with their role in mind, and they&apos;re more likely to prioritise
                  candidates who took the time to align their profile.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500" />
                <p className="text-sm text-gray-600">
                  Ignoring profile basics: no headline, no location, no contact details, or mismatched dates between roles.
                  These look like small issues but they raise questions about attention to detail — which is exactly what hiring managers are trying to assess.
                </p>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-500" />
                <p className="text-sm text-gray-600">
                  Not preparing for simple questions like “Why this role?” or “Walk me through your experience” before interviews.
                  Most candidates stumble on these because they sound obvious, but strong, prepared answers here set the tone for the rest of the conversation.
                </p>
              </li>
            </ul>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JobSearchTipsPage;

