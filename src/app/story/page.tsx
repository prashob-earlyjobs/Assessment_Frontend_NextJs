import Story from "../components/pages/ourStroy";
import Navbar from "../components/pages/navbar";
import Footer from "../components/pages/footer";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Our Story | EarlyJobs - Revolutionizing Recruitment',
    description: 'Discover the story behind EarlyJobs, founded by Mr. Ravi Prakash Kumar, to empower recruiters and bridge talent with opportunities through innovative recruitment solutions.',
    keywords: [
      'EarlyJobs story',
      'recruitment platform history',
      'Mr. Ravi Prakash Kumar',
      'freelance recruitment India',
      'remote work platform',
      'recruitment agency story',
      'talent acquisition innovation',
      'EarlyJobs founder',
      'recruitment internships India',
    ],
    openGraph: {
      title: 'Our Story | EarlyJobs - Revolutionizing Recruitment',
      description: 'Learn how EarlyJobs, founded by Mr. Ravi Prakash Kumar, is transforming recruitment with flexible remote work and internship opportunities.',
      url: `${baseUrl}/our-story`,
      type: 'website',
      images: [
        {
          url: `/images/logo.png`,
          width: 1200,
          height: 630,
          alt: 'EarlyJobs Founder Story - Mr. Ravi Prakash Kumar',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Story | EarlyJobs - Revolutionizing Recruitment',
      description: 'Learn how EarlyJobs, founded by Mr. Ravi Prakash Kumar, is transforming recruitment with flexible remote work and internship opportunities.',
      images: [`/images/logo.png`],
    },
    alternates: {
      canonical: `${baseUrl}/our-story`,
    },
  };
}

export default function Page() {

  return(
    <>
    <Navbar/>
     <Story />
     <Footer/>
     </>
    )
     ;
}