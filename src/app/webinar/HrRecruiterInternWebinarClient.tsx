"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { toast } from "sonner";
import {
  registerHrRecruiterWebinar,
  type HrRecruiterWebinarData,
} from "../components/services/hrRecruiterWebinarApi";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  CheckCircle2,
  Play,
  Star,
  CalendarDays,
  Clock,
  Monitor,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Users,
  Loader2,
  Briefcase,
  TrendingUp,
  Award,
  Linkedin,
  Youtube,
  Instagram,
  Target,
  HelpCircle,
  Flame,
  IndianRupee,
  GraduationCap,
  Lightbulb,
  Rocket,
  X,
  CircleAlert,
  type LucideIcon,
} from "lucide-react";

const EJ_ORANGE = "var(--earlyjobs-orange)";
const EJ_ORANGE_DARK = "#c95a42";
const EJ_LIGHT = "var(--earlyjobs-light-orange)";
const EJ_ORANGE_SOFT = "rgba(234, 106, 78, 0.12)";
const EJ_ORANGE_MUTED = "rgba(234, 106, 78, 0.2)";
const PAGE = "mx-auto w-full max-w-[640px] px-4 lg:max-w-[1152px] lg:px-8";

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return seconds;
}

function formatCountdown(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) {
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function SectionHeading({
  children,
  icon: Icon,
}: {
  children: React.ReactNode;
  icon?: LucideIcon;
}) {
  return (
    <h2 className="mb-6 flex items-center justify-center gap-2.5 text-center text-xl font-bold text-gray-900 lg:mb-10 lg:text-3xl">
      {Icon && (
        <Icon className="h-6 w-6 shrink-0 lg:h-7 lg:w-7" style={{ color: EJ_ORANGE_DARK }} />
      )}
      <span>{children}</span>
    </h2>
  );
}

function HighlightNote({
  children,
  variant = "brand",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "brand" | "amber" | "neutral";
  className?: string;
}) {
  const styles = {
    brand: "text-[#9a3412]",
    amber: "text-amber-800",
    neutral: "text-gray-800",
  };

  return (
    <p
      className={`flex items-start justify-center gap-2 text-center text-sm font-medium lg:text-base ${styles[variant]} ${className}`}
    >
      <ArrowRight
        className="mt-0.5 h-4 w-4 shrink-0"
        style={{ color: variant === "brand" ? EJ_ORANGE_DARK : undefined }}
      />
      <span>{children}</span>
    </p>
  );
}

function CheckGrid({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-4">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: EJ_ORANGE }} />
          <span className="text-sm leading-snug text-gray-700 lg:text-[15px]">{item}</span>
        </div>
      ))}
    </div>
  );
}

function PrimaryBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl py-4 text-base font-bold text-white shadow-md transition-opacity hover:opacity-90 lg:mx-auto lg:max-w-md lg:py-4 lg:text-lg ${className}`}
      style={{ backgroundColor: EJ_ORANGE }}
    >
      {children}
    </button>
  );
}

const AVATAR_IDS = Array.from({ length: 32 }, (_, i) => i + 1);

interface HrRecruiterInternWebinarClientProps {
  data: HrRecruiterWebinarData;
}

export default function HrRecruiterInternWebinarClient({
  data,
}: HrRecruiterInternWebinarClientProps) {
  const formRef = useRef<HTMLElement>(null);
  const countdown = useCountdown(data.countdownSeconds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });

  const scrollToForm = useCallback(() => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (field === "mobile") {
      setFormData((prev) => ({
        ...prev,
        [field]: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (formData.mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerHrRecruiterWebinar({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile,
        city: formData.city.trim() || undefined,
        webinarId: data.id,
      });

      if (!result.success) {
        toast.error(result.message || "Registration failed. Please try again.");
        return;
      }

      toast.success("Registration Successful!", {
        description:
          result.message ||
          "You will receive the meeting link on WhatsApp/Email shortly.",
      });
      setFormData({ name: "", email: "", mobile: "", city: "" });
    } catch {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <main>
        {/* ── Hero (centered, stacked) ── */}
        <section className={`${PAGE} pt-8 pb-10 text-center lg:pt-12 lg:pb-14`}>
          <img
            src="/images/logo.png"
            alt="EarlyJobs"
            className="mx-auto mb-8 h-9 w-auto lg:mb-10 lg:h-11"
          />

          <span
            className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold lg:text-sm"
            style={{ backgroundColor: EJ_ORANGE_SOFT, color: EJ_ORANGE_DARK }}
          >
            <Target className="h-4 w-4 shrink-0" />
            {data.badgeText}
          </span>

          <h1 className="mx-auto mb-4 max-w-4xl text-[26px] font-extrabold leading-tight tracking-tight text-gray-900 lg:text-5xl lg:leading-tight">
            {data.title}{" "}
            <span style={{ color: EJ_ORANGE_DARK }}>{data.titleHighlight}</span>
          </h1>

          <p className="mx-auto mb-6 max-w-2xl text-[15px] leading-relaxed text-gray-600 lg:text-lg">
            {data.heroDescription}
          </p>

          {/* Date / time / mode pills */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: CalendarDays, text: data.webinarDateDisplay },
              { icon: Clock, text: data.webinarTime },
              { icon: Monitor, text: data.mode },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm"
              >
                <Icon className="h-4 w-4" style={{ color: EJ_ORANGE_DARK }} />
                {text}
              </div>
            ))}
          </div>

          {/* Video */}
          <div className="relative mx-auto mb-8 max-w-3xl overflow-hidden rounded-2xl bg-gray-900 shadow-lg">
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <button
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform hover:scale-105 lg:h-20 lg:w-20"
                aria-label="Play webinar preview"
              >
                <Play className="h-8 w-8 fill-white text-white lg:h-10 lg:w-10" />
              </button>
            </div>
          </div>

          <PrimaryBtn onClick={scrollToForm} className="mb-6">
            Register Now — It&apos;s Free
          </PrimaryBtn>

          {/* Dual trust badges */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-[#f9fafb] px-5 py-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-800">{data.rating} Rating</span>
            </div>
            <div className="rounded-xl border border-gray-100 bg-[#f9fafb] px-5 py-3">
              <span className="text-sm font-semibold text-gray-800">{data.trainedCount}</span>
            </div>
          </div>
        </section>

        {/* ── Social proof avatars ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={`${PAGE} text-center`}>
            <h2 className="mb-2 text-xl font-bold text-gray-900 lg:text-3xl">
              {data.socialProofTitle}
            </h2>
            <p className="mb-8 text-sm text-gray-600 lg:text-base">
              {data.socialProofSubtitle}
            </p>

            <div className="mb-8 grid grid-cols-6 gap-2 sm:grid-cols-8 lg:gap-3">
              {AVATAR_IDS.map((id) => (
                <img
                  key={id}
                  src={`https://i.pravatar.cc/80?img=${id}`}
                  alt=""
                  className="aspect-square w-full rounded-full border-2 border-white object-cover shadow-sm"
                />
              ))}
            </div>

            <p className="mb-5 text-sm font-medium text-gray-700 lg:text-base">
              Take your first step towards a career in HR recruitment
            </p>
            <PrimaryBtn onClick={scrollToForm}>Join Now — Free Webinar</PrimaryBtn>
          </div>
        </section>

        {/* ── Featured in ── */}
        <section className={`${PAGE} py-10 lg:py-14`}>
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-gray-500 lg:text-base">
            Featured In
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6">
            {data.featuredIn.map((name) => (
              <div
                key={name}
                className="flex h-12 items-center justify-center rounded-lg border border-gray-100 bg-[#f9fafb] px-3 text-center text-xs font-bold uppercase tracking-wide text-gray-500 lg:h-14 lg:text-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </section>

        {/* ── Company logos ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={PAGE}>
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wide text-gray-500 lg:text-base">
            Our Interns Have Placed Candidates At
          </p>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 lg:gap-6">
            {data.companyLogos.map((name) => (
              <div
                key={name}
                className="flex h-14 items-center justify-center rounded-lg border border-gray-100 bg-white px-2 text-center text-xs font-bold text-gray-400 lg:h-16 lg:text-sm"
              >
                {name}
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ── Are you facing this? ── */}
        <section className={`${PAGE} py-10 lg:py-14`}>
          <SectionHeading icon={HelpCircle}>Are You Facing This?</SectionHeading>
          <CheckGrid items={data.problemPoints} />
          <div className="mt-6 rounded-xl px-5 py-4" style={{ backgroundColor: EJ_LIGHT }}>
            <HighlightNote variant="brand">{data.problemNote}</HighlightNote>
          </div>
        </section>

        {/* ── What you'll learn ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={PAGE}>
            <SectionHeading icon={Flame}>What You&apos;ll Learn in This Webinar</SectionHeading>
            <CheckGrid items={data.learnPoints} />
          </div>
        </section>

        {/* ── About the opportunity ── */}
        <section className={`${PAGE} py-10 lg:py-14`}>
          <SectionHeading icon={Briefcase}>About the Opportunity</SectionHeading>
          <p className="mb-6 text-center text-sm text-gray-600 lg:text-base">
            {data.aboutDescription}
          </p>
          <CheckGrid items={data.aboutPoints} />
          <div className="mt-6">
            <HighlightNote variant="neutral" className="font-semibold">
              {data.aboutNote}
            </HighlightNote>
          </div>
        </section>

        {/* ── Earning opportunity ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={PAGE}>
            <SectionHeading icon={IndianRupee}>Earning Opportunity</SectionHeading>
            <p className="mb-6 text-center text-sm text-gray-600 lg:text-base">
              Performance-based stipend — your effort = your earnings
            </p>
            <div className="mx-auto grid max-w-2xl gap-3 lg:max-w-3xl lg:grid-cols-3 lg:gap-4">
              {data.stipendTiers.map((tier) => (
                <div
                  key={tier.range}
                  className={`rounded-xl px-5 py-4 text-center ${
                    tier.highlight
                      ? "border-2 border-[#f5c4b8] bg-[var(--earlyjobs-light-orange)]"
                      : "border border-gray-200 bg-white"
                  }`}
                >
                  <p className="mb-1 text-sm font-medium text-gray-600">{tier.range}</p>
                  <p
                    className={`text-xl font-bold ${tier.highlight ? "text-[var(--earlyjobs-orange)]" : "text-gray-400"}`}
                  >
                    {tier.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Success stories carousel ── */}
        <section className={`${PAGE} py-10 lg:py-14`}>
          <SectionHeading icon={Flame}>Real Success Stories</SectionHeading>
          <p className="-mt-4 mb-8 text-center text-sm text-gray-600 lg:text-base">
            See what our interns have to say
          </p>

          <div className="relative px-2 md:px-12">
            <Carousel
              plugins={[
                Autoplay({ delay: 4500, stopOnInteraction: true, stopOnMouseEnter: true }),
              ]}
              opts={{ align: "start", loop: true }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {data.testimonials.map((story) => (
                  <CarouselItem
                    key={story.name}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-6">
                      <div className="mb-3 flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <p className="mb-4 flex-grow text-sm leading-relaxed text-gray-600">
                        &ldquo;{story.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                        <img
                          src={
                            typeof story.img === "string"
                              ? story.img
                              : `https://i.pravatar.cc/60?img=${story.img ?? 1}`
                          }
                          alt={story.name}
                          className="h-11 w-11 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-gray-900">{story.name}</p>
                          <p className="text-xs text-gray-500">{story.role}</p>
                          <p className="text-xs font-semibold" style={{ color: EJ_ORANGE_DARK }}>
                            Earned {story.earning}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                className="-left-2 hidden border-gray-200 bg-white md:flex lg:-left-12"
                style={{ color: EJ_ORANGE_DARK }}
              />
              <CarouselNext
                className="-right-2 hidden border-gray-200 bg-white md:flex lg:-right-12"
                style={{ color: EJ_ORANGE_DARK }}
              />
            </Carousel>
          </div>

          {/* Mobile carousel dots hint */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            <ChevronLeft className="h-4 w-4 text-gray-400" />
            <span className="text-xs text-gray-500">Swipe to see more stories</span>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>

          <div className="mt-6">
            <HighlightNote variant="neutral" className="font-semibold text-gray-700">
              {data.successStoriesNote}
            </HighlightNote>
          </div>
        </section>

        {/* ── Who should attend ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={PAGE}>
            <SectionHeading icon={GraduationCap}>Who Should Attend?</SectionHeading>
            <CheckGrid items={data.whoShouldAttend} />
          </div>
        </section>

        {/* ── Meet the Mentor ── */}
        <section className="py-10 lg:py-16" style={{ backgroundColor: EJ_LIGHT }}>
          <div className={PAGE}>
            <SectionHeading>Meet the Mentor</SectionHeading>
            <p className="-mt-4 mb-10 text-center text-sm text-gray-600 lg:text-base">
              Learn directly from someone who has trained 2,500+ HR interns
            </p>

            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
              <div
                className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl shadow-lg lg:max-w-none"
                style={{ backgroundColor: EJ_ORANGE_MUTED }}
              >
                <img
                  src={data.mentor.imageUrl}
                  alt={`${data.mentor.name} - HR Mentor`}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div className="text-center lg:text-left">
                <h3 className="mb-1 text-2xl font-bold text-gray-900 lg:text-3xl">
                  {data.mentor.name}
                </h3>
                <p className="mb-1 text-base font-semibold" style={{ color: EJ_ORANGE_DARK }}>
                  {data.mentor.title}
                </p>
                {data.mentor.subtitle && (
                  <p className="mb-5 text-sm text-gray-500">{data.mentor.subtitle}</p>
                )}

                <p className="mb-4 text-sm leading-relaxed text-gray-600 lg:text-base">
                  {data.mentor.bio}
                </p>
                {data.mentor.extendedBio && (
                  <p className="mb-6 text-sm leading-relaxed text-gray-600 lg:text-base">
                    {data.mentor.extendedBio}
                  </p>
                )}

                <div className="flex items-center justify-center gap-4 lg:justify-start">
                  {[
                    { icon: Linkedin, label: "LinkedIn", href: data.mentor.linkedinUrl },
                    { icon: Youtube, label: "YouTube", href: data.mentor.youtubeUrl },
                    { icon: Instagram, label: "Instagram", href: data.mentor.instagramUrl },
                  ]
                    .filter((item) => item.href)
                    .map(({ icon: Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#f5c4b8] hover:text-[var(--earlyjobs-orange)]"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WFH + Important note (stacked cards, full width within container) ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={`${PAGE} space-y-6`}>
            <div
              className="rounded-2xl border border-[#f5c4b8] p-6 lg:p-8"
              style={{ backgroundColor: EJ_LIGHT }}
            >
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-gray-900 lg:justify-start">
                <Lightbulb className="h-5 w-5 shrink-0" style={{ color: EJ_ORANGE_DARK }} />
                Special Opportunity – Work From Home
              </h3>
              <CheckGrid items={data.wfhPoints} />
              <div className="mt-4 lg:text-left">
                <HighlightNote variant="neutral" className="font-semibold lg:justify-start">
                  {data.wfhNote}
                </HighlightNote>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 lg:p-8">
              <h3 className="mb-4 flex items-center justify-center gap-2 text-lg font-bold text-gray-900 lg:justify-start">
                <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
                Important Note
              </h3>
              <div className="grid gap-2 sm:grid-cols-3">
                {data.importantNotes.map((item) => (
                    <div key={item} className="flex items-center justify-center gap-2 text-sm text-gray-700 sm:justify-start">
                      <X className="h-4 w-4 shrink-0 text-amber-500" />
                      {item}
                    </div>
                  )
                )}
              </div>
              <div className="mt-4 lg:text-left">
                <HighlightNote variant="amber" className="font-semibold lg:justify-start">
                  {data.importantNote}
                </HighlightNote>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats row ── */}
        <section className={`${PAGE} py-10 lg:py-14`}>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {data.stats.map((stat, index) => {
              const StatIcon = [Users, Star, Briefcase, TrendingUp][index] ?? Users;
              return (
                <div
                  key={`${stat.label}-${index}`}
                  className="rounded-xl border border-gray-100 bg-[#f9fafb] p-4 text-center lg:p-6"
                >
                  <StatIcon
                    className="mx-auto mb-2 h-6 w-6 lg:h-8 lg:w-8"
                    style={{ color: EJ_ORANGE }}
                  />
                  <p className="text-xl font-bold text-gray-900 lg:text-2xl">{stat.value}</p>
                  <p className="text-xs text-gray-500 lg:text-sm">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Webinar details ── */}
        <section className="bg-[#f9fafb] py-10 lg:py-14">
          <div className={PAGE}>
            <SectionHeading icon={CalendarDays}>Webinar Details</SectionHeading>
            <div className="mx-auto grid max-w-3xl gap-4 lg:grid-cols-3">
              {[
                { icon: Monitor, label: "Mode", value: data.mode },
                { icon: Clock, label: "Duration", value: data.duration },
                {
                  icon: CalendarDays,
                  label: "Date & Time",
                  value: `${data.webinarDateDisplay} · ${data.webinarTime}`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-gray-100 bg-white p-5 text-center"
                >
                  <div
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: EJ_ORANGE_MUTED }}
                  >
                    <Icon className="h-5 w-5" style={{ color: EJ_ORANGE_DARK }} />
                  </div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-500">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Registration form ── */}
        <section id="register" className={`${PAGE} py-10 lg:py-14`} ref={formRef}>
          <SectionHeading icon={Rocket}>Register Now</SectionHeading>
          <p className="mb-4 text-center text-sm text-gray-600 lg:text-base">
            Fill the form below to secure your spot for{" "}
            <span className="font-semibold text-gray-800">{data.webinarDateDisplay}</span> at{" "}
            <span className="font-semibold text-gray-800">{data.webinarTime}</span>.
          </p>
          <div className="mb-8">
            <HighlightNote variant="neutral" className="text-gray-600">
              After registration, you will receive the meeting link on WhatsApp/Email.
            </HighlightNote>
          </div>

          <div
            className="mx-auto max-w-xl rounded-2xl border border-[#f5c4b8] bg-gradient-to-b from-[var(--earlyjobs-light-orange)] to-white p-6 shadow-sm lg:max-w-2xl lg:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="name" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter your full name"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <Label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-gray-700">
                    WhatsApp Number *
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange("mobile", e.target.value)}
                    placeholder="10-digit mobile number"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="mb-1.5 block text-sm font-medium text-gray-700">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Your city"
                    className="h-12 rounded-xl border-gray-200 bg-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-13 w-full rounded-xl py-6 text-base font-bold text-white hover:opacity-90 lg:text-lg"
                style={{ backgroundColor: EJ_ORANGE }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Registering...
                  </>
                ) : (
                  "Secure My Free Seat"
                )}
              </Button>
            </form>
          </div>

          <div className="mx-auto mt-8 max-w-xl rounded-2xl border-2 border-red-100 bg-red-50 px-5 py-5 text-center lg:max-w-2xl">
            <p className="mb-1 flex items-center justify-center gap-2 text-lg font-bold text-red-700">
              <CircleAlert className="h-5 w-5 shrink-0" />
              Limited Seats Available
            </p>
            <p className="text-sm text-gray-700">
              We are onboarding a limited number of candidates. Don&apos;t miss this opportunity.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-[#f3f4f6] py-10 lg:py-14">
          <div className={PAGE}>
            <SectionHeading>FAQ</SectionHeading>
            <Accordion
              type="single"
              collapsible
              className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white px-4 lg:px-6"
            >
              {data.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-gray-800 hover:bg-[var(--earlyjobs-light-orange)] hover:text-[var(--earlyjobs-orange)] data-[state=open]:bg-[var(--earlyjobs-light-orange)]">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section
          className="py-12 text-center text-white lg:py-16"
          style={{ background: "linear-gradient(135deg, var(--earlyjobs-orange) 0%, #c95a42 100%)" }}
        >
          <div className={PAGE}>
            <Award className="mx-auto mb-4 h-10 w-10 text-white opacity-90" />
            <p className="mb-2 text-lg font-bold leading-snug lg:text-2xl">
              {data.finalCtaLine1}
            </p>
            <p className="mb-8 text-lg font-bold leading-snug opacity-90 lg:text-2xl">
              {data.finalCtaLine2}
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex w-full max-w-md items-center justify-center gap-2 rounded-xl bg-white py-4 text-base font-bold transition-opacity hover:opacity-90 lg:text-lg"
              style={{ color: EJ_ORANGE_DARK }}
            >
              Register Now
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className={`${PAGE} border-t border-gray-100 py-8 text-center lg:py-12`}>
          <img src="/images/logo.png" alt="EarlyJobs" className="mx-auto mb-4 h-8 w-auto opacity-70" />
          <div className="mb-3 flex justify-center gap-4 text-xs text-gray-500">
            <a href="/privacy-policy" className="hover:text-gray-700">
              Privacy Policy
            </a>
            <span>·</span>
            <a href="/terms-and-conditions" className="hover:text-gray-700">
              Terms & Conditions
            </a>
          </div>
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} EarlyJobs. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Sticky bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className={`${PAGE} flex items-center justify-between gap-4 py-3 lg:py-4`}>
          <div>
            <p className="hidden text-xs font-medium text-gray-500 sm:block">
              {data.webinarDateDisplay} · {data.webinarTime}
            </p>
            <p className="text-[10px] font-medium uppercase tracking-wide text-gray-500 lg:text-xs">
              Offer ends in{" "}
              <span
                className="font-mono text-base font-bold tracking-wider lg:text-xl"
                style={{ color: EJ_ORANGE_DARK }}
              >
                {formatCountdown(countdown)}
              </span>
            </p>
          </div>
          <button
            onClick={scrollToForm}
            className="rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90 lg:px-12 lg:py-4 lg:text-base"
            style={{ backgroundColor: EJ_ORANGE }}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}
