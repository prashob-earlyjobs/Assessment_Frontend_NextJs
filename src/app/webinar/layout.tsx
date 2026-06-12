import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";

  return {
    title: "Start Your Career as an HR Recruiter Intern (Work From Home) | EarlyJobs",
    description:
      "Join our free live webinar and learn how to start your HR Recruiter Internship from home. Gain real corporate experience, earn performance-based stipends, and build your career.",
    keywords: [
      "HR recruiter intern",
      "work from home internship",
      "HR internship",
      "recruitment career",
      "EarlyJobs webinar",
    ],
    openGraph: {
      title: "Start Your Career as an HR Recruiter Intern (Work From Home) | EarlyJobs",
      description:
        "Free live webinar — limited seats. Learn how to gain real HR experience from home and start earning while you learn.",
      url: `${baseUrl}/webinar`,
      type: "website",
      images: [
        {
          url: "/images/company_logo.jpg",
          width: 1200,
          height: 630,
          alt: "HR Recruiter Intern Webinar | EarlyJobs",
        },
      ],
    },
    alternates: {
      canonical: `${baseUrl}/webinar`,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
