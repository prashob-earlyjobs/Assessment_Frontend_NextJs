import { Metadata } from "next";
import HrRecruiterInternWebinar from "../components/pages/HrRecruiterInternWebinar";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const metadata: Metadata = {
  title: "HR Recruiter Intern Webinar | Work From Home | EarlyJobs",
  description:
    "Join our free live webinar and learn how to start your career as an HR Recruiter Intern. Gain real experience, earn performance-based stipends, and work from home.",
  keywords: [
    "HR recruiter intern",
    "work from home internship",
    "HR internship remote",
    "recruiter career webinar",
    "EarlyJobs internship",
    "earn while learning",
  ],
  openGraph: {
    title: "Start Your Career as an HR Recruiter Intern (Work From Home)",
    description:
      "Free live webinar – limited seats. Learn how to gain real HR experience and start earning from home.",
    url: `${BASE_URL}/hr-recruiter-intern-webinar`,
    type: "website",
  },
};

export default function HrRecruiterInternWebinarPage() {
  return <HrRecruiterInternWebinar />;
}
