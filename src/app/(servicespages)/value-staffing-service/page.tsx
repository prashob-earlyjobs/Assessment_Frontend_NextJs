import Header from '../../components/pages/header';
import Footer from '../../components/pages/footer';
import Navbar from '../../components/pages/navbar';
import ValueStaffingServicesPage from '../../components/pages/ourServices/ValueStaffingServicesPage';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Value Staffing Services | EarlyJobs.ai',
    description: 'Discover premier executive recruitment services. Our expert team connects top-tier executives with leading organizations for unparalleled success.',
    keywords: ['executive recruitment', 'top executive search', 'earlyjobs executive hiring', 'leadership recruitment', 'executive search firm'],
    openGraph: {
      title: 'Value Staffing Services | EarlyJobs.ai',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/value-staffing-services`,
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
      title: 'Value Staffing Services | EarlyJobs.ai',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/top-executive-recruitment`,
    },
  };
}

const TopExecutiveRecruitmentFirmPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <ValueStaffingServicesPage />
      <Footer />
    </>
  );
};

export default TopExecutiveRecruitmentFirmPage;