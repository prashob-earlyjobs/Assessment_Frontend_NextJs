import { Metadata } from "next";
import FreeJobPostingPage from "./freeJobPostingPage";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: "Free Job Posting | Post Jobs for Free | EarlyJobs",
    description:
      "Post jobs for free on EarlyJobs and reach thousands of verified candidates instantly. Simplify your hiring with AI-powered matching and fast applicant screening.",
    keywords:
      "free job posting, EarlyJobs, hire talent, job listings, recruitment platform, employer hiring, AI job matching, post jobs free, verified candidates",
    openGraph: {
      title: "Free Job Posting | EarlyJobs",
      description:
        "Post jobs for free on EarlyJobs and hire smarter with AI-powered matching and verified candidates. Start hiring today.",
      type: "website",
      url: `${baseUrl}/freejobposting`,
      images: [
        {
          url: `/images/og-free-job.png`,
          width: 1200,
          height: 627,
          alt: "Free Job Posting - EarlyJobs",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Free Job Posting | EarlyJobs",
      description:
        "Hire faster with EarlyJobs. Post jobs for free and connect with verified candidates instantly.",
      images: ["/images/og-free-job.png"],
    },
    alternates: {
      canonical: `${baseUrl}/freejobposting`,
    },
  };
}

export default function Page() {
  return <FreeJobPostingPage />;
}
