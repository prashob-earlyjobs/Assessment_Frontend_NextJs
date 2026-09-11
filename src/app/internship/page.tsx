import { Metadata } from "next";
import InternshipLanding from "../components/pages/InternshipLanding";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

export const metadata: Metadata = {
  title: "HR Recruitment Internship (Remote) for Students & Freshers | EarlyJobs.ai",
  description:
    "A 3-month remote HR recruitment internship for students and freshers from Tier 2 & Tier 3 India. Work on real hiring tasks, earn a performance-based stipend up to ₹10,000, and unlock PPO opportunities. No registration fee.",
  keywords: [
    "remote HR internship for students",
    "recruitment internship for students",
    "work from home internship India",
    "HR internship with stipend",
    "EarlyJobs internship",
    "HR recruiter internship remote",
    "internship for tier 2 tier 3 students",
    "freelance recruiter opportunity India",
  ],
  openGraph: {
    title: "HR Recruitment Internship (Remote) for Students & Freshers | EarlyJobs.ai",
    description:
      "A 3-month remote HR recruitment internship for students and freshers from Tier 2 & Tier 3 India. Real hiring tasks, stipend up to ₹10,000, PPO opportunities. No registration fee.",
    url: `${BASE_URL}/internship`,
    type: "website",
    images: [
      {
        url: `/images/og-recruiter.jpg`,
        width: 1200,
        height: 630,
        alt: "EarlyJobs HR Recruitment Internship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Recruitment Internship (Remote) | EarlyJobs.ai",
    description:
      "3-month remote HR internship for Tier 2 & Tier 3 students. Real hiring work, stipend up to ₹10,000, no registration fee.",
    images: [`/images/og-recruiter.jpg`],
  },
  alternates: {
    canonical: `${BASE_URL}/internship`,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is this internship work from home?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. This is a fully remote, work-from-home internship. You can work from anywhere in India as long as you have a laptop, stable internet, and a working mobile SIM.",
      },
    },
    {
      "@type": "Question",
      name: "What are the working timings?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You're expected to be available and responsive between 9 AM and 6 PM, with daily reporting to your manager. Exact task hours are flexible within that window.",
      },
    },
    {
      "@type": "Question",
      name: "Is there any registration fee or payment required?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. There is zero registration fee and no hidden charges at any stage of the internship. If anyone asks you to pay to join EarlyJobs, please report it to us directly.",
      },
    },
    {
      "@type": "Question",
      name: "What do I need to start?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A working laptop, a stable internet connection, a mobile SIM for calls, and a LinkedIn profile (we'll help you optimize this as part of onboarding).",
      },
    },
    {
      "@type": "Question",
      name: "Will the company provide a SIM card or laptop?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No, you'll need to bring your own working mobile SIM and laptop. This keeps the program remote-friendly and lets you start immediately without waiting for equipment.",
      },
    },
    {
      "@type": "Question",
      name: "Which job roles will I be hiring for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll work on live recruitment requirements across various roles that EarlyJobs and its partner companies are hiring for at the time — your reporting manager assigns these during onboarding.",
      },
    },
    {
      "@type": "Question",
      name: "How does the stipend work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your stipend is performance-based, tied to the number of successful candidate joinings you achieve each month — from Nil at 0–4 joinings up to ₹10,000 plus a Best Performer Award at 16 or more.",
      },
    },
    {
      "@type": "Question",
      name: "Is English mandatory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Clear, comfortable communication in English or Hindi is helpful since you'll be speaking with candidates daily, but you don't need to be fluent — we help you build confidence as you go.",
      },
    },
    {
      "@type": "Question",
      name: "What are my responsibilities?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You'll source and screen candidates, schedule interviews, follow up with them through the hiring process, and report your progress daily to your reporting manager.",
      },
    },
    {
      "@type": "Question",
      name: "Can students apply?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — this program is designed for current students as well as recent freshers. You don't need prior HR or recruitment experience to apply.",
      },
    },
  ],
};

export default function InternshipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <InternshipLanding />
    </>
  );
}
