import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import HrRecruitmentServicePage from "../../components/pages/ourServices/HrExecutiveServicePage";
import Navbar from "../../components/pages/navbar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'HR Executive Recruitment Services | EarlyJobs',
    description: 'Discover premier HR executive recruitment services. Our expert team connects top-tier HR executives with leading organizations for unparalleled success.',
    keywords: ['HR recruitment', 'top HR search', 'earlyjobs HR hiring', 'leadership recruitment', 'HR search firm'],
    openGraph: {
      title: 'HR Executive Recruitment Services | EarlyJobs',
      description: 'Connect with top HR executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/hr-executive-recruitment-services`,
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
      title: 'HR Executive Recruitment Services | EarlyJobs',
      description: 'Connect with top HR executives through our premier recruitment services tailored for leadership roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/hr-executive-recruitment-services`,
    },
  };
}
const HrExecutiveRecruitmentServicesPage = () => {
    return (
        <>
            <Navbar />
            <Header />
            <HrRecruitmentServicePage />
            <Footer />
        </>
    );
};

export default HrExecutiveRecruitmentServicesPage;