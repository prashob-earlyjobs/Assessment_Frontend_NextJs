"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  CalendarDays,
  Clock,
  Monitor,
  CheckCircle,
  AlertTriangle,
  Home,
  IndianRupee,
  Users,
  Target,
  Flame,
  GraduationCap,
  Briefcase,
  Heart,
  Zap,
} from "lucide-react";
import Header from "./header";
import Footer from "./footer";

const WEBINAR_HOUR = 16; // Every Friday at 16:00
const FRIDAY = 5;

function getNextWebinarDate(): Date {
  const now = new Date();
  const target = new Date(now);
  target.setHours(WEBINAR_HOUR, 0, 0, 0);

  const day = now.getDay();

  if (day === FRIDAY) {
    if (now < target) return target;
    target.setDate(target.getDate() + 7);
    return target;
  }

  const daysUntilFriday = (FRIDAY - day + 7) % 7;
  target.setDate(now.getDate() + daysUntilFriday);
  return target;
}

function useCountdown(targetDate: Date) {
  const calcTimeLeft = useCallback(() => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [calcTimeLeft]);

  return timeLeft;
}

function CountdownTimer() {
  const [targetDate, setTargetDate] = useState(() => getNextWebinarDate());
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate);

  useEffect(() => {
    if (expired) {
      setTargetDate(getNextWebinarDate());
    }
  }, [expired]);

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Mins", value: minutes },
    { label: "Secs", value: seconds },
  ];

  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
        {expired ? "Webinar is live now" : "Next webinar starts in"}
      </p>
      <div className="flex justify-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-3 min-w-[60px] sm:min-w-[72px]"
          >
            <span className="text-2xl sm:text-3xl font-bold tabular-nums text-gray-900">
              {String(unit.value).padStart(2, "0")}
            </span>
            <span className="text-xs text-gray-500 mt-0.5">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const painPoints = [
  "Applied to 20–30 jobs but got no response?",
  "Don't have any practical experience?",
  "Confused about how to start your career?",
];

const learnItems = [
  "How the hiring process actually works",
  "How to gain real HR experience from home",
  "How to start earning while learning",
  "Step-by-step path to become an HR Recruiter Intern",
];

const opportunityItems = [
  "Work on real hiring requirements",
  "Screen and shortlist candidates",
  "Conduct initial interviews",
  "Coordinate with hiring teams",
];

const stipendTiers = [
  { range: "0–4 Joinings", amount: "No stipend" },
  { range: "5–8 Joinings", amount: "₹3,000" },
  { range: "9–12 Joinings", amount: "₹5,000" },
];

const successStories = [
  { name: "Jyoti", amount: "₹36,000", period: "one month" },
  { name: "Tushar", amount: "₹24,000", period: "one month" },
];

const audienceItems = [
  "Students looking for internships",
  "Freshers struggling to get jobs",
  "Anyone who wants to earn while learning",
  "Individuals looking for work-from-home opportunities",
  "Women who want to restart their careers",
  "Those serious about building a career",
];

const wfhItems = [
  "Women looking to restart their careers",
  "Individuals seeking flexible work-from-home roles",
  "Anyone wanting to build a career without relocating",
];

const notForItems = [
  "Not for timepass",
  "Requires consistency and effort",
  "Performance-based growth",
];

function LumaRegistrationSection() {
  return (
    <section
      id="register"
      className="w-full overflow-hidden bg-white border-b border-gray-200"
    >
      <div className="relative w-full h-[500px] sm:h-[520px] md:h-[540px] lg:h-[560px] overflow-hidden bg-white">
        <iframe
          src="https://luma.com/embed/event/evt-hlD5xmTyFiYbLZA/simple"
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
          className="absolute top-0 left-0 w-full h-[600px] border-0 bg-white"
          allow="fullscreen; payment"
          aria-hidden={false}
          tabIndex={0}
          title="HR Recruiter Intern Webinar Registration"
        />
      </div>
    </section>
  );
}

export default function HrRecruiterInternWebinar() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="relative bg-white border-b border-gray-200 overflow-hidden">
        <div className="relative container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto space-y-6 text-center">
            <Badge className="bg-gray-100 text-gray-700 border-gray-200 text-sm px-4 py-1.5">
              🎯 Free Live Webinar – Limited Seats
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
              Start Your Career as an{" "}
              <span className="block mt-1">HR Recruiter Intern</span>
              <span className="block text-gray-600 text-xl sm:text-2xl lg:text-3xl mt-3 font-semibold">
                (Work From Home)
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn how to break into HR, gain real experience, and start earning — all from home.
            </p>

            <div className="pt-2">
              <CountdownTimer />
            </div>

            <p className="text-sm text-gray-500">
              👉 After registration, you will receive the meeting link on Email.
            </p>
          </div>
        </div>
      </section>

      {/* Registration */}
      <LumaRegistrationSection />

      {/* Pain Points */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              ❓ Are You Facing This?
            </h2>
          </div>
          <div className="space-y-4">
            {painPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3 p-4 rounded-xl bg-orange-50 border border-orange-100"
              >
                <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800 text-lg">{point}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-8 text-lg">
            👉 You&apos;re not alone — and this webinar will help you fix it.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <Flame className="w-5 h-5" />
              What You&apos;ll Learn
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              In This Webinar
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {learnItems.map((item) => (
              <div key={item} className="flex items-start gap-3 p-5 bg-white rounded-xl shadow-sm border border-gray-100">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Opportunity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <Briefcase className="w-5 h-5" />
              About the Opportunity
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              HR Recruiter Internship (Remote)
            </h2>
            <p className="text-gray-600 mt-3 text-lg">You will:</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {opportunityItems.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
                <Target className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-lg font-medium text-gray-800">
            👉 This is not just learning — this is <span className="text-orange-600">real corporate experience</span>.
          </p>
        </div>
      </section>

      {/* Earning Opportunity */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <IndianRupee className="w-5 h-5" />
              Earning Opportunity
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Performance-Based Stipend
            </h2>
          </div>
          <div className="space-y-3">
            {stipendTiers.map((tier, index) => (
              <Card
                key={tier.range}
                className={`border-2 ${index === 2 ? "border-orange-400 bg-orange-50" : "border-gray-100"}`}
              >
                <CardContent className="flex items-center justify-between p-5">
                  <span className="text-gray-700 font-medium">{tier.range}</span>
                  <span className={`text-xl font-bold ${index === 2 ? "text-orange-600" : "text-gray-900"}`}>
                    {tier.amount}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-lg font-semibold text-gray-800 mt-8">
            👉 Your effort = Your earnings
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <Flame className="w-5 h-5" />
              Real Success Stories
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            {successStories.map((story) => (
              <Card key={story.name} className="border-orange-200 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-7 h-7 text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{story.amount}</p>
                  <p className="text-gray-600 mt-1">
                    {story.name} earned in {story.period}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-gray-600">
            Many interns are consistently earning. 👉 You can be the next success story.
          </p>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <GraduationCap className="w-5 h-5" />
              Who Should Attend?
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {audienceItems.map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-100">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-gray-800 text-sm sm:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WFH Opportunity */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-3">
              <Home className="w-5 h-5" />
              Special Opportunity – Work From Home
            </div>
          </div>
          <div className="space-y-3 mb-6">
            {wfhItems.map((item) => (
              <div key={item} className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <Heart className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <p className="text-gray-800">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-700">
            👉 Learn, work, and earn — all from the comfort of your home.
          </p>
          <p className="text-center text-gray-500 mt-2 text-sm">
            No prior experience required — just willingness to learn and grow.
          </p>
        </div>
      </section>

      {/* Important Note */}
      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-amber-700 font-semibold mb-3">
              <AlertTriangle className="w-5 h-5" />
              Important Note
            </div>
            <h2 className="text-2xl font-bold text-gray-900">This is not for everyone</h2>
          </div>
          <div className="space-y-3">
            {notForItems.map((item) => (
              <div key={item} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-200">
                <Zap className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center font-medium text-gray-800 mt-6">
            👉 Only apply if you are serious about your future.
          </p>
        </div>
      </section>

      {/* Webinar Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">📅 Webinar Details</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-5 text-center">
                <Monitor className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Mode</p>
                <p className="text-gray-600 text-sm mt-1">Online (Google Meet / Zoom)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Duration</p>
                <p className="text-gray-600 text-sm mt-1">30–45 Minutes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5 text-center">
                <CalendarDays className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <p className="font-semibold text-gray-900">Date & Time</p>
                <p className="text-gray-600 text-sm mt-1">Every Friday · 4:00 PM</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Line */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <p className="text-xl sm:text-2xl font-medium leading-relaxed text-gray-300">
            This webinar won&apos;t change your life —
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">
            But taking action after it will.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
