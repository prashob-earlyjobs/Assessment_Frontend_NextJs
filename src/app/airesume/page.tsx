import AiResumeDashboard from "../components/pages/AiResumeDashboard";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.earlyjobs.ai";
  return {
    title: "EarlyJobs - AI Resume Builder Tool",
    description:
      "Build a professional resume easily with AI, tailored for Indian students & freshers to stand out in job applications.",
    keywords: [
      "AI resume builder",
      "professional resume",
      "EarlyJobs",
      "resume for freshers",
      "job applications",
      "Indian students"
    ],
    openGraph: {
      title: "EarlyJobs - AI Resume Builder Tool",
      description:
        "Build a professional resume easily with AI, tailored for Indian students & freshers to stand out in job applications.",
      url: baseUrl,
      siteName: "EarlyJobs",
      images: [
        {
          url: `/images/og-resume.jpg`,
          width: 1200,
          height: 630,
          alt: "EarlyJobs - AI Resume Builder Tool",
        },
      ],
    },
  };
}

const AiResumePage = () => {
  return (
      <>
      <Navbar />
      <AiResumeDashboard />
      <Footer/>
      </>

  );
};

export default AiResumePage;
