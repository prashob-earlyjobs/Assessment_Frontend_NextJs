
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";
import RecruitmentProcessOutsourcingPage from "../components/pages/ourServices/RecruitmentProcessOutsourcingPage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Recruitment Process Outsourcing | EarlyJobs.ai',
    description: 'Discover premier recruitment process outsourcing services. Our expert team connects top-tier executives with leading organizations for unparalleled success.',
    keywords: ['recruitment process outsourcing', 'RPO services', 'earlyjobs executive hiring', 'leadership recruitment', 'executive search firm'],
    openGraph: {
      title: 'Recruitment Process Outsourcing | EarlyJobs.ai',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/recruitment-process-outsourcing`,
      type: 'website',
      images: [
        {
          url: `/images/og-services.jpg`,
          width: 1200,
          height: 630,
          alt: 'Top Executive Recruitment Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Recruitment Process Outsourcing | EarlyJobs.ai',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/recruitment-process-outsourcing`,
    },
  };
}
const RecruitmentProcessOutsourcing = () => {
    return (
        <>
            <Navbar />
            <Header />
            <RecruitmentProcessOutsourcingPage />
            <Footer />
        </>
    );
};

export default RecruitmentProcessOutsourcing;
