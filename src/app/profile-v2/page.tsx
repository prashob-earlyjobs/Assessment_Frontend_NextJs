"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  BadgeCheck,
  Briefcase,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronLeft,
  Upload,
} from "lucide-react";

export default function ProfileV2Page() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth">
      <NavbarV2 pageTitle="My Profile" showPageTitle />

      <main className="max-w-7.5xl mx-auto px-4 sm:px-8 lg:px-20 xl:px-28 pt-32 pb-20 space-y-8 sm:space-y-10">
        {/* Header */}
        <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 font-semibold mb-2">
              Profile & preferences
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight mb-1">
              Improve my profile
            </h1>
            <p className="text-sm sm:text-base text-gray-500 max-w-2xl">
              Keep your details up to date so recruiters instantly understand your experience, skills,
              and job preferences.
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

        {/* Grid layout for profile sections */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.3fr)] items-start">
          {/* Left: core details */}
          <div className="space-y-6">
            {/* Personal info */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center">
                  <User className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Basic information</h2>
                  <p className="text-xs text-gray-500">
                    Tell us who you are and how to reach you.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Full name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Headline</label>
                  <Input placeholder="e.g. Sales Executive with 3+ years in B2C" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    Email
                  </label>
                  <Input type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    Mobile number
                  </label>
                  <Input placeholder="+91 XXXXX XXXXX" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    Current city
                  </label>
                  <Input placeholder="e.g. Bengaluru" />
                </div>
              </div>
            </Card>

            {/* Experience */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Work experience</h2>
                  <p className="text-xs text-gray-500">
                    Highlight your most recent and relevant roles.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Current / last job title</label>
                  <Input placeholder="e.g. Senior Sales Executive" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Company name</label>
                  <Input placeholder="e.g. Acme Corp" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Total experience</label>
                  <Input placeholder="e.g. 3.5 years" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Current CTC (optional)</label>
                  <Input placeholder="e.g. ₹4.5 LPA" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Key responsibilities</label>
                  <Textarea
                    rows={3}
                    placeholder="Describe what you do in your current / last role. e.g. handling inbound leads, field visits, closing monthly targets..."
                  />
                </div>
              </div>
            </Card>

            {/* Education & skills */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Education & skills</h2>
                  <p className="text-xs text-gray-500">
                    Share your highest qualification, key skills, and languages.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Highest qualification</label>
                  <Input placeholder="e.g. B.Com, BBA, BA, Diploma" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Year of passing</label>
                  <Input placeholder="e.g. 2022" />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Key skills</label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Field sales, cold calling, CRM tools, MS Excel, Hindi, English"
                  />
                </div>
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-medium text-gray-700">Languages</label>
                  <Input placeholder="e.g. English (fluent), Hindi (native), Kannada (basic)" />
                </div>
              </div>
            </Card>
          </div>

          {/* Right: resume first, then preferences */}
          <aside className="space-y-6">
            {/* Resume upload (UI only) */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center">
                  <Upload className="w-4 h-4 text-sky-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Resume</h2>
                  <p className="text-xs text-gray-500">
                    Upload your latest resume so recruiters get the full picture.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50/60 px-4 py-6 text-center space-y-3">
                <p className="text-xs text-gray-600">
                  Drag & drop your resume here, or click to browse.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-white text-xs gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  Choose file
                </Button>
                <p className="text-[11px] text-gray-400">
                  Supported formats: PDF, DOC, DOCX · Max 5MB
                </p>
              </div>
            </Card>

            {/* Job preferences */}
            <Card className="border border-gray-100 shadow-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center">
                  <BadgeCheck className="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">Job preferences</h2>
                  <p className="text-xs text-gray-500">
                    Tell us what kind of role you&apos;re looking for.
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Preferred job titles</label>
                  <Textarea
                    rows={2}
                    placeholder="e.g. Sales Executive, Business Development Executive, Customer Support"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Preferred locations</label>
                  <Input placeholder="e.g. Bengaluru, Mumbai, Remote" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Expected CTC</label>
                  <Input placeholder="e.g. ₹5.5 LPA" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-700">Notice period</label>
                  <Input placeholder="e.g. Immediate, 15 days, 30 days" />
                </div>
              </div>
            </Card>

            {/* Save CTA */}
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => router.push("/dashboard-v2")}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

