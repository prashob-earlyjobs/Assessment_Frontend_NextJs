"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "./header";
import Footer from "./footer";
import { toast } from "sonner";
import { submitEnquiry } from "../services/servicesapis";
import {
  Check,
  ArrowRight,
  Star,
  Mail,
} from "lucide-react";

const LUMA_EVENT_PAGE = "https://luma.com/3rjmwn73";

const NAV_LINKS = [
  { label: "The Program", href: "#solution" },
  { label: "Career Path", href: "#career" },
  { label: "Stipend", href: "#stipend" },
  { label: "Stories", href: "#stories" },
  { label: "FAQs", href: "#faq" },
];

const MARQUEE_ITEMS = [
  "No registration fee",
  "Live recruitment work, from day one",
  "Performance-based stipend up to ₹10,000",
  "PPO opportunities worth ₹4–6 LPA",
  "Built for Tier 2 & Tier 3 India",
];

const PAIN_POINTS = [
  "Limited exposure to real corporate work",
  "Lack of structured guidance to get started",
  "No clarity on how hiring actually works, from the inside",
  "Especially for women — fewer accessible, flexible opportunities",
];

const JOURNEY_STEPS = [
  { title: "Fill the form", description: "Apply during the webinar or via the enquiry form below." },
  { title: "Onboarding call", description: "Your reporting manager connects with you for onboarding details." },
  { title: "Offer letter", description: "Receive your official offer letter over email." },
  { title: "Training begins", description: "Your reporting manager walks you through the process, step by step." },
  { title: "Start hiring", description: "Get portal access and start connecting candidates to live roles." },
  { title: "Grow & earn", description: "Every successful joining builds your stipend, skills, and career." },
];

const CAREER_STEPS = [
  {
    title: "HR Recruitment Intern",
    items: [
      "Learn the end-to-end recruitment process",
      "Source and connect with candidates",
      "Screen resumes, schedule interviews",
      "Work on live hiring requirements",
    ],
  },
  {
    title: "Freelance Recruiter",
    items: [
      "Lead a team of HR recruitment interns",
      "Handle end-to-end recruitment for assigned roles",
      "Coordinate directly with hiring managers",
      "Close positions by working with your team",
    ],
  },
  {
    title: "Senior Hiring Manager",
    items: [
      "Manage a team of freelance recruiters",
      "Drive hiring strategy across multiple roles",
      "Mentor leaders, monitor recruitment metrics",
      "Scale hiring operations end-to-end",
    ],
  },
];

const STIPEND_ROWS = [
  { range: "0–4", amount: "Nil" },
  { range: "5–8", amount: "₹3,000" },
  { range: "9–12", amount: "₹5,000" },
  { range: "13–15", amount: "₹7,500" },
  { range: "16+", amount: "₹10,000", highlight: true },
];

const TOP_PERKS = [
  "PPO opportunities (₹4–6 LPA)",
  "Freelance recruiter opportunities",
  "Full-time roles with EarlyJobs or partner companies",
  "Best Performer Awards & recognition",
];

const TESTIMONIALS = [
  {
    name: "Priya Sahu",
    place: "Bilaspur, Chhattisgarh",
    quote:
      "I used to freeze during interviews. After three months of talking to candidates every single day, I finally sound confident on calls — even with my own placement interviews.",
  },
  {
    name: "Rohit Meena",
    place: "Kota, Rajasthan",
    quote:
      "My college never taught us how hiring actually works. Here I learned sourcing, screening, and closing — real skills I now put on my resume with proof, not just a certificate.",
  },
  {
    name: "Ayesha Khatoon",
    place: "Muzaffarpur, Bihar",
    quote:
      "Being able to work from home mattered a lot for my family. I didn't have to move cities to get real corporate exposure, and my manager was always just a call away.",
  },
  {
    name: "Sneha Patil",
    place: "Nashik, Maharashtra",
    quote:
      "I closed my first candidate joining in week three and it honestly felt bigger than any exam result. That's the moment I stopped feeling like 'just a student.'",
  },
  {
    name: "Vikram Nair",
    place: "Kannur, Kerala",
    quote:
      "The stipend structure is exactly as explained, no confusion. I crossed 9 joinings in month two and got paid on time. It made the effort feel respected.",
  },
  {
    name: "Divya Reddy",
    place: "Warangal, Telangana",
    quote:
      "As a woman from a small town, flexible, respected remote work is rare to find. This internship gave me that, plus a LinkedIn profile that actually gets recruiter replies now.",
  },
];

const FAQS = [
  {
    q: "Is this internship work from home?",
    a: "Yes. This is a fully remote, work-from-home internship. You can work from anywhere in India as long as you have a laptop, stable internet, and a working mobile SIM.",
  },
  {
    q: "What are the working timings?",
    a: "You're expected to be available and responsive between 9 AM and 6 PM, with daily reporting to your manager. Exact task hours are flexible within that window.",
  },
  {
    q: "Is there any registration fee or payment required?",
    a: "No. There is zero registration fee and no hidden charges at any stage of the internship. If anyone asks you to pay to join EarlyJobs, please report it to us directly.",
  },
  {
    q: "What do I need to start?",
    a: "A working laptop, a stable internet connection, a mobile SIM for calls, and a LinkedIn profile (we'll help you optimize this as part of onboarding).",
  },
  {
    q: "Will the company provide a SIM card or laptop?",
    a: "No, you'll need to bring your own working mobile SIM and laptop. This keeps the program remote-friendly and lets you start immediately without waiting for equipment.",
  },
  {
    q: "Which job roles will I be hiring for?",
    a: "You'll work on live recruitment requirements across various roles that EarlyJobs and its partner companies are hiring for at the time — your reporting manager assigns these during onboarding.",
  },
  {
    q: "How does the stipend work?",
    a: "Your stipend is performance-based, tied to the number of successful candidate joinings you achieve each month — from Nil at 0–4 joinings up to ₹10,000 plus a Best Performer Award at 16 or more.",
  },
  {
    q: "Is English mandatory?",
    a: "Clear, comfortable communication in English or Hindi is helpful since you'll be speaking with candidates daily, but you don't need to be fluent — we help you build confidence as you go.",
  },
  {
    q: "What are my responsibilities?",
    a: "You'll source and screen candidates, schedule interviews, follow up with them through the hiring process, and report your progress daily to your reporting manager.",
  },
  {
    q: "Can students apply?",
    a: "Yes — this program is designed for current students as well as recent freshers. You don't need prior HR or recruitment experience to apply.",
  },
];

function useReveal() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function RevealSection({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useReveal();
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={`ij-reveal ${className}`}
    >
      {children}
    </section>
  );
}

export default function InternshipLanding() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    status: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastMailtoUrl, setLastMailtoUrl] = useState("");
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 480);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim() || !formData.city.trim() || !formData.status) {
      toast.error("Please fill in all required fields");
      return;
    }
    const phone = formData.phone.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const recipient = "info@earlyjobs.in";
      const subject = `HR Recruitment Internship Application - ${formData.name.trim()}`;
      const bodyLines = [
        "Hello EarlyJobs Team,",
        "",
        "I would like to apply for the HR Recruitment Internship Program. Here are my application details:",
        "",
        `• Full Name: ${formData.name.trim()}`,
        `• Phone Number: ${phone}`,
        `• Email Address: ${formData.email.trim()}`,
        `• City: ${formData.city.trim()}`,
        `• Current Status: ${formData.status}`,
        formData.message.trim() ? `• Message: ${formData.message.trim()}` : "",
        "",
        "Submitted via EarlyJobs Internship Portal (https://www.earlyjobs.ai/internship)",
      ].filter(Boolean);

      const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      setLastMailtoUrl(mailtoUrl);

      // Non-blocking background sync to backend enquiries
      submitEnquiry({
        name: formData.name.trim(),
        mobile: phone,
        email: formData.email.trim().toLowerCase(),
        expectations: [
          "HR Recruitment Internship",
          formData.status,
          `City: ${formData.city.trim()}`,
        ],
        remarks: formData.message.trim() || undefined,
        source: "internship-landing",
      }).catch(() => {
        // Background sync catch
      });

      // Trigger mail client to send directly to info@earlyjobs.in
      window.location.href = mailtoUrl;

      setSubmitted(true);
      toast.success("Application ready!", {
        description: "Directing to info@earlyjobs.in via your email client.",
      });
    } catch {
      toast.error("Could not process application. Please email info@earlyjobs.in directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="internship-landing">
      <Header />

      {/* Page nav */}
      <nav className="ij-page-nav sticky top-0 z-40 border-b border-[var(--ij-line)] bg-[rgba(251,245,236,0.88)] backdrop-blur-md">
        <div className="ij-container flex items-center justify-between gap-4 py-3">
          <p className="hidden sm:block font-[family-name:var(--ij-display)] text-sm font-semibold text-[var(--ij-navy)]">
            HR Recruitment Internship
          </p>
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-[var(--ij-ink-soft)] hover:text-[var(--ij-orange)] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
          <button type="button" onClick={() => scrollTo("#apply")} className="ij-btn ij-btn-primary text-sm">
            Apply Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <RevealSection className="ij-section bg-[var(--ij-cream)]">
        <div className="ij-container">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-center">
            <div className="order-2 lg:order-1 space-y-6">
              <span className="ij-eyebrow">100% Remote · No Registration Fee</span>
              <h1 className="ij-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-[var(--ij-navy)]">
                Talent is everywhere.{" "}
                <em className="text-[var(--ij-orange)] italic font-[family-name:var(--ij-display)]">
                  Opportunity is not.
                </em>
              </h1>
              <p className="text-base sm:text-lg text-[var(--ij-ink-soft)] max-w-xl leading-relaxed">
                A 3-month remote HR Recruitment Internship for students & freshers from Tier 2 and Tier 3 India — where you don&apos;t just learn recruitment, you actually do it.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => scrollTo("#apply")} className="ij-btn ij-btn-primary">
                  Apply for the Internship
                </button>
                <button type="button" onClick={() => scrollTo("#webinar")} className="ij-btn ij-btn-ghost">
                  Join Free Webinar
                </button>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
                {["Work from home", "Zero fees, ever", "Certificate on completion"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 text-sm text-[var(--ij-ink)]">
                    <span className="w-5 h-5 rounded-full bg-[var(--ij-orange-soft)] text-[var(--ij-orange)] inline-flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="ij-stat-card relative z-10">
                <div className="grid grid-cols-2 gap-5">
                  {[
                    { label: "Duration", value: "3 Months" },
                    { label: "Top Performer Stipend", value: "₹10,000" },
                    { label: "PPO Potential", value: "4–6 LPA" },
                    { label: "Mode", value: "Remote" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-xs uppercase tracking-wider text-white/60 mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ij-badge absolute -bottom-4 -left-2 sm:left-4 z-20 rotate-[-3deg]">
                Real hiring tasks. Real candidates. Real growth.
              </div>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Marquee */}
      <div className="bg-[var(--ij-navy)] overflow-hidden py-3.5 border-y border-white/5">
        <div className="ij-marquee flex gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={`${item}-${i}`} className="text-sm text-white/85 inline-flex items-center gap-10">
              {item}
              <span className="text-[var(--ij-orange-glow)]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* Problem */}
      <RevealSection id="problem" className="ij-section bg-[var(--ij-cream-deep)]">
        <div className="ij-container grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <span className="ij-eyebrow">The Reality</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3 mb-8 leading-tight">
              Thousands of capable students graduate every year in Tier 2 & Tier 3 cities.
            </h2>
            <ol className="space-y-5">
              {PAIN_POINTS.map((point, i) => (
                <li key={point} className="flex gap-4 items-start">
                  <span className="text-[var(--ij-orange)] font-bold tabular-nums text-sm pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[var(--ij-ink)] text-base leading-relaxed">{point}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="ij-dark-card lg:mt-10">
            <p className="ij-display text-2xl sm:text-3xl leading-snug text-white">
              Many students are <strong className="text-[var(--ij-orange-glow)]">capable.</strong> They just don&apos;t get the{" "}
              <strong className="text-[var(--ij-orange-glow)]">right platform.</strong>
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Solution */}
      <RevealSection id="solution" className="ij-section bg-[var(--ij-cream)]">
        <div className="ij-container">
          <div className="max-w-3xl mb-10">
            <span className="ij-eyebrow">What This Is</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3 mb-4">
              Not just an internship. A real working experience.
            </h2>
            <p className="text-[var(--ij-ink-soft)] text-base sm:text-lg leading-relaxed">
              This is a 3-month remote internship where you work on real hiring tasks — sourcing candidates, screening resumes, and closing positions — under the guidance of a reporting manager. This is where learning meets execution. A remote HR internship for students who want real exposure, not just a certificate.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "You will",
                items: [
                  "Work on live recruitment processes",
                  "Interact with real candidates every day",
                  "Learn exactly how hiring works inside companies",
                ],
              },
              {
                title: "What you gain",
                items: [
                  "Practical experience, not just theory",
                  "Communication and confidence",
                  "Industry exposure with structured weekly learning",
                ],
              },
              {
                title: "Industry-grade training",
                items: [
                  "Hands-on training on recruitment & communication",
                  "Real exposure to hiring systems and tools",
                  "Certificate on successful completion",
                ],
              },
            ].map((card) => (
              <div key={card.title} className="ij-card">
                <h3 className="text-lg font-semibold text-[var(--ij-navy)] mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-[var(--ij-ink-soft)] leading-relaxed">
                      <Check className="w-4 h-4 text-[var(--ij-orange)] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Journey */}
      <RevealSection id="journey" className="ij-section bg-[var(--ij-cream-deep)]">
        <div className="ij-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="ij-eyebrow">How It Works</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3">
              From form to success — you grow, we support.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 relative">
            {JOURNEY_STEPS.map((step, i) => (
              <div key={step.title} className="text-center sm:text-left">
                <div
                  className={`w-11 h-11 rounded-full inline-flex items-center justify-center font-bold text-sm mb-3 ${
                    i % 2 === 0
                      ? "bg-[var(--ij-orange)] text-white"
                      : "bg-[var(--ij-navy)] text-white"
                  }`}
                >
                  {i + 1}
                </div>
                <h3 className="font-semibold text-[var(--ij-navy)] mb-1.5">{step.title}</h3>
                <p className="text-sm text-[var(--ij-ink-soft)] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Career path */}
      <RevealSection id="career" className="ij-section bg-[var(--ij-navy)]">
        <div className="ij-container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="ij-eyebrow ij-eyebrow-light">Learn · Grow · Lead</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-white mt-3">Growth that actually matters.</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-5 lg:gap-4 items-stretch">
            {CAREER_STEPS.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="ij-card ij-card-dark">
                  <p className="text-xs uppercase tracking-wider text-[var(--ij-orange-glow)] mb-2 font-semibold">
                    Step {i + 1}
                  </p>
                  <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                  <ul className="space-y-2.5">
                    {step.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-white/85 leading-relaxed">
                        <Check className="w-4 h-4 text-[var(--ij-orange-glow)] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {i < CAREER_STEPS.length - 1 && (
                  <div className="hidden xl:flex absolute" aria-hidden />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Stipend */}
      <RevealSection id="stipend" className="ij-section bg-[var(--ij-cream)]">
        <div className="ij-container">
          <div className="max-w-3xl mb-10">
            <span className="ij-eyebrow">Transparent, Always</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3 mb-3">
              Stipend & rewards, no surprises.
            </h2>
            <p className="text-[var(--ij-ink-soft)] text-base sm:text-lg">
              Your stipend is entirely performance-based and tied to successful candidate joinings — fully transparent from day one.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="ij-card overflow-hidden p-0">
              <div className="px-5 py-4 border-b border-[var(--ij-line)]">
                <h3 className="font-semibold text-[var(--ij-navy)]">Stipend by successful joinings</h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[var(--ij-ink-soft)] border-b border-[var(--ij-line)]">
                    <th className="px-5 py-3 font-medium">Successful joinings</th>
                    <th className="px-5 py-3 font-medium">Stipend</th>
                  </tr>
                </thead>
                <tbody>
                  {STIPEND_ROWS.map((row) => (
                    <tr
                      key={row.range}
                      className={row.highlight ? "bg-[var(--ij-orange-soft)]" : "border-b border-[var(--ij-line)]"}
                    >
                      <td className={`px-5 py-3.5 ${row.highlight ? "font-bold text-[var(--ij-navy)]" : "text-[var(--ij-ink)]"}`}>
                        {row.range}
                      </td>
                      <td className={`px-5 py-3.5 ${row.highlight ? "font-bold text-[var(--ij-orange-deep)]" : "text-[var(--ij-ink)]"}`}>
                        {row.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ij-card">
              <h3 className="font-semibold text-[var(--ij-navy)] mb-4">Top performers also get</h3>
              <ul className="space-y-3">
                {TOP_PERKS.map((perk) => (
                  <li key={perk} className="flex gap-2.5 text-[var(--ij-ink-soft)]">
                    <Check className="w-4 h-4 text-[var(--ij-orange)] flex-shrink-0 mt-1" />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* Expectations */}
      <RevealSection id="expect" className="ij-section bg-[var(--ij-cream-deep)]">
        <div className="ij-container">
          <div className="max-w-3xl mb-10">
            <span className="ij-eyebrow">Keeping It Honest</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3 mb-3">
              Simple expectations. Strong outcomes.
            </h2>
            <p className="text-[var(--ij-ink-soft)]">This is a real work environment, and we treat you like professionals.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
            {[
              {
                title: "We're looking for students who are",
                items: ["Consistent in their work", "Available & responsive, 9 AM – 6 PM", "Willing to learn and improve"],
              },
              {
                title: "Basic expectations",
                items: ["Daily reporting to your manager", "Regular task completion", "Active communication & professional behavior"],
              },
              {
                title: "What you'll need",
                items: [
                  "A working mobile SIM (for calls)",
                  "A LinkedIn profile (we help you optimize it)",
                  "A laptop & stable internet for daily work",
                ],
              },
            ].map((card) => (
              <div key={card.title} className="ij-card">
                <h3 className="font-semibold text-[var(--ij-navy)] mb-4">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm text-[var(--ij-ink-soft)]">
                      <Check className="w-4 h-4 text-[var(--ij-orange)] flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="ij-dark-card text-center py-5">
            <p className="text-lg sm:text-xl font-semibold text-white">
              No registration fee. No hidden charges. Ever.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* Stories */}
      <RevealSection id="stories" className="ij-section bg-[var(--ij-cream)]">
        <div className="ij-container">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="ij-eyebrow">In Their Words</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3">
              Real interns. Real confidence. Real growth.
            </h2>
          </div>
          <p className="text-center text-xs text-[var(--ij-ink-soft)] mb-10 max-w-xl mx-auto">
            Illustrative stories reflecting common intern experiences. Verified quotes will replace these as they are collected with consent.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="ij-card flex flex-col">
                <div className="flex gap-0.5 mb-3 text-[var(--ij-orange)]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[var(--ij-ink)] leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[var(--ij-orange-soft)] text-[var(--ij-orange-deep)] font-bold inline-flex items-center justify-center">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-[var(--ij-navy)]">{t.name}</p>
                    <p className="text-xs text-[var(--ij-ink-soft)]">{t.place}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Webinar */}
      <RevealSection id="webinar" className="ij-section bg-[var(--ij-cream-deep)]">
        <div className="ij-container">
          <div className="ij-dark-card grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <span className="ij-eyebrow ij-eyebrow-light">Free Live Session</span>
              <h2 className="ij-display text-3xl sm:text-4xl text-white mt-3 mb-4 leading-tight">
                Not sure yet? Join our free webinar and get every question answered live.
              </h2>
              <p className="text-white/75 mb-6 leading-relaxed">
                Every week, our team walks students through the internship, the stipend structure, and exactly what a day in the role looks like — live, with time for your questions.
              </p>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/80">
                {["New sessions every week", "30 minutes, live Q&A", "100% free to attend"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <Check className="w-4 h-4 text-[var(--ij-orange-glow)]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-[22px] p-6 sm:p-8 text-center">
              <p className="text-white font-semibold text-lg mb-1">Reserve your seat</p>
              <p className="text-white/60 text-sm mb-5">Hosted on Luma · Limited seats each week</p>
              <a
                href={LUMA_EVENT_PAGE}
                target="_blank"
                rel="noopener noreferrer"
                className="ij-btn ij-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                Join Free Webinar <ArrowRight className="w-4 h-4" />
              </a>
              <p className="text-xs text-white/40 mt-4">
                Prefer the on-site page?{" "}
                <a href="/hr-recruiter-intern-webinar" className="underline hover:text-white/70">
                  Open webinar page
                </a>
              </p>
            </div>
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection id="faq" className="ij-section bg-[var(--ij-cream)]">
        <div className="ij-container max-w-[760px]">
          <div className="text-center mb-10">
            <span className="ij-eyebrow">FAQs</span>
            <h2 className="ij-display text-3xl sm:text-4xl text-[var(--ij-navy)] mt-3">
              Questions, answered clearly.
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={faq.q}
                open={i === 0}
                className="ij-card group py-0 overflow-hidden"
              >
                <summary className="cursor-pointer list-none px-5 py-4 font-semibold text-[var(--ij-navy)] flex items-center justify-between gap-3">
                  {faq.q}
                  <span className="text-[var(--ij-orange)] text-xl leading-none group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[var(--ij-ink-soft)] leading-relaxed border-t border-[var(--ij-line)] pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Apply */}
      <RevealSection id="apply" className="ij-section ij-apply-band pb-28 sm:pb-[var(--ij-section-y)]">
        <div className="ij-container grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div className="text-white">
            <span className="ij-eyebrow ij-eyebrow-light">Your Journey Starts Here</span>
            <h2 className="ij-display text-3xl sm:text-4xl mt-3 mb-4 leading-tight">
              This is your chance to move from learning to actually doing.
            </h2>
            <p className="text-white/80 mb-6 leading-relaxed">
              Fill in a few details below and our team will reach out with onboarding instructions and your offer letter process.
            </p>
            <ul className="space-y-3">
              {[
                "No registration fee, ever",
                "100% remote, work from anywhere",
                "Real hiring experience from week one",
              ].map((item) => (
                <li key={item} className="flex gap-2.5 text-white/90">
                  <Check className="w-5 h-5 text-white flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[var(--ij-paper)] rounded-[22px] p-6 sm:p-8 shadow-xl border border-white/40">
            {submitted ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-[var(--ij-orange-soft)] text-[var(--ij-orange)] inline-flex items-center justify-center mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--ij-navy)] mb-2">Application Ready!</h3>
                <p className="text-[var(--ij-ink-soft)] text-sm mb-4">
                  Your application details have been prepared for <strong className="text-[var(--ij-navy)]">info@earlyjobs.in</strong>. If your email app did not open automatically, click below to send:
                </p>
                {lastMailtoUrl && (
                  <a
                    href={lastMailtoUrl}
                    className="ij-btn ij-btn-primary inline-flex items-center justify-center gap-2 mb-3 w-full sm:w-auto"
                  >
                    <Mail className="w-4 h-4" /> Send Email to info@earlyjobs.in
                  </a>
                )}
                <div>
                  <button
                    type="button"
                    className="ij-btn ij-btn-ghost mt-2 text-xs"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", phone: "", email: "", city: "", status: "", message: "" });
                    }}
                  >
                    Submit another application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="ij-label" htmlFor="ij-name">Full Name *</label>
                  <input
                    id="ij-name"
                    className="ij-input"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="ij-label" htmlFor="ij-phone">Phone Number *</label>
                  <input
                    id="ij-phone"
                    type="tel"
                    className="ij-input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, phone: e.target.value.replace(/\D/g, "").slice(0, 10) }))
                    }
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
                <div>
                  <label className="ij-label" htmlFor="ij-email">Email Address *</label>
                  <input
                    id="ij-email"
                    type="email"
                    className="ij-input"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="you@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="ij-label" htmlFor="ij-city">City *</label>
                  <input
                    id="ij-city"
                    className="ij-input"
                    value={formData.city}
                    onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                    placeholder="Your city"
                    required
                  />
                </div>
                <div>
                  <label className="ij-label" htmlFor="ij-status">Current Status *</label>
                  <select
                    id="ij-status"
                    className="ij-input"
                    value={formData.status}
                    onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value }))}
                    required
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="Student">Student</option>
                    <option value="Fresher">Fresher</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>
                <div>
                  <label className="ij-label" htmlFor="ij-message">Message</label>
                  <textarea
                    id="ij-message"
                    className="ij-input min-h-[96px] resize-y"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    placeholder="Anything you'd like us to know (optional)"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ij-btn ij-btn-primary w-full inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Preparing Email..." : "Submit Application"}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </button>
                <p className="text-xs text-center text-[var(--ij-ink-soft)] mt-2">
                  Applications are delivered directly to{" "}
                  <a href="mailto:info@earlyjobs.in" className="underline font-semibold text-[var(--ij-navy)]">
                    info@earlyjobs.in
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </RevealSection>

      <Footer />

      {/* Mobile sticky CTA */}
      {showStickyCta && (
        <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden border-t border-[var(--ij-line)] bg-[var(--ij-paper)]/95 backdrop-blur-md p-3 safe-area-pb">
          <button type="button" onClick={() => scrollTo("#apply")} className="ij-btn ij-btn-primary w-full">
            Apply Now — It&apos;s Free
          </button>
        </div>
      )}

      <style jsx global>{`
        .internship-landing {
          --ij-orange: #e85c25;
          --ij-orange-deep: #c2431a;
          --ij-orange-soft: #fdece1;
          --ij-orange-glow: #ff8a4c;
          --ij-navy: #1c2431;
          --ij-navy-soft: #2c3547;
          --ij-cream: #fbf5ec;
          --ij-cream-deep: #f4ead9;
          --ij-paper: #fffdf9;
          --ij-ink: #26221d;
          --ij-ink-soft: #5c564c;
          --ij-line: #e7dcc9;
          --ij-display: var(--font-fraunces), "Fraunces", Georgia, serif;
          --ij-sans: var(--font-sora), "Sora", system-ui, sans-serif;
          --ij-section-y: 104px;
          font-family: var(--ij-sans);
          color: var(--ij-ink);
          background: var(--ij-cream);
        }
        @media (max-width: 640px) {
          .internship-landing {
            --ij-section-y: 70px;
          }
        }
        .internship-landing .ij-container {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          padding-left: 28px;
          padding-right: 28px;
        }
        .internship-landing .ij-section {
          padding-top: var(--ij-section-y);
          padding-bottom: var(--ij-section-y);
          scroll-margin-top: 88px;
        }
        .internship-landing .ij-display {
          font-family: var(--ij-display);
          font-weight: 700;
        }
        .internship-landing .ij-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ij-orange);
          background: var(--ij-orange-soft);
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
        }
        .internship-landing .ij-eyebrow-light {
          background: rgba(255, 138, 76, 0.18);
          color: var(--ij-orange-glow);
        }
        .internship-landing .ij-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          padding: 16px 30px;
          font-weight: 600;
          font-size: 0.95rem;
          transition: background 0.2s, color 0.2s, transform 0.15s;
        }
        .internship-landing .ij-btn:active {
          transform: scale(0.98);
        }
        .internship-landing .ij-btn-primary {
          background: var(--ij-orange);
          color: white;
        }
        .internship-landing .ij-btn-primary:hover {
          background: var(--ij-orange-deep);
        }
        .internship-landing .ij-btn-ghost {
          background: transparent;
          color: var(--ij-navy);
          border: 1.5px solid var(--ij-line);
        }
        .internship-landing .ij-btn-ghost:hover {
          border-color: var(--ij-orange);
          color: var(--ij-orange);
        }
        .internship-landing .ij-card {
          background: var(--ij-paper);
          border: 1px solid var(--ij-line);
          border-radius: 22px;
          padding: 1.5rem;
        }
        .internship-landing .ij-card.ij-card-dark,
        .internship-landing .ij-card-dark {
          background: var(--ij-navy-soft) !important;
          border: 1px solid rgba(255, 255, 255, 0.12) !important;
          color: #ffffff;
        }
        .internship-landing .ij-stat-card {
          background: linear-gradient(145deg, var(--ij-navy) 0%, #121820 100%);
          border-radius: 22px;
          padding: 2rem;
          box-shadow: 0 24px 50px rgba(28, 36, 49, 0.25);
        }
        .internship-landing .ij-badge {
          background: var(--ij-orange);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.65rem 1rem;
          border-radius: 12px;
          max-width: 260px;
          box-shadow: 0 10px 24px rgba(232, 92, 37, 0.35);
        }
        .internship-landing .ij-dark-card {
          background: var(--ij-navy);
          border-radius: 22px;
          padding: 2rem;
        }
        .internship-landing .ij-apply-band {
          background: linear-gradient(135deg, var(--ij-orange) 0%, var(--ij-orange-deep) 55%, #9e3414 100%);
        }
        .internship-landing .ij-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--ij-navy);
          margin-bottom: 0.35rem;
        }
        .internship-landing .ij-input {
          width: 100%;
          border: 1px solid var(--ij-line);
          border-radius: 12px;
          padding: 0.75rem 0.9rem;
          background: white;
          font-size: 0.95rem;
          color: var(--ij-ink);
          outline: none;
          transition: border-color 0.15s;
        }
        .internship-landing .ij-input:focus {
          border-color: var(--ij-orange);
        }
        .internship-landing .ij-reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .internship-landing .ij-reveal.is-visible {
          opacity: 1;
          transform: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .internship-landing .ij-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .internship-landing .ij-marquee {
            animation: none !important;
          }
        }
        .internship-landing .ij-marquee {
          animation: ij-marquee 32s linear infinite;
          width: max-content;
        }
        @keyframes ij-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .internship-landing details summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </div>
  );
}
