import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from "../../components/pages/navbar";
import ITRecruitmentServicePage from "../../components/pages/ourServices/ITRecruitmentServicePage"
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'IT Recruitment Services | EarlyJobs.ai',
    description: 'Discover top IT recruitment services. Our expert team connects leading tech companies with top IT talent for unparalleled success.',
    keywords: ['IT recruitment', 'technology hiring', 'earlyjobs IT staffing', 'software developer recruitment', 'IT talent acquisition'],
    openGraph: {
      title: 'IT Recruitment Services | EarlyJobs.ai ',
      description: 'Connect with top IT professionals through our premier recruitment services tailored for technology roles.',
      url: `${baseUrl}/it-recruitment`,
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
      title: 'IT Recruitment Services | EarlyJobs.ai',
      description: 'Connect with top IT professionals through our premier recruitment services tailored for technology roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/it-recruitment`,
    },
  };
}

const ItRecruitmentPage = () => {
  return (
    <>
      <Navbar />
      <Header/>
      <ITRecruitmentServicePage />
      <Footer/>
    </>
  );
};

export default ItRecruitmentPage;