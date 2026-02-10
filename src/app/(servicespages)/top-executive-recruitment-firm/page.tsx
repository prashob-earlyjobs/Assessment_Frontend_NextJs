import Header from '../../components/pages/header';
import Footer from '../../components/pages/footer';
import Navbar from '../../components/pages/navbar';
import TopExecutiveServicePage from '../../components/pages/ourServices/TopExecutiveServicePage';
import { Metadata } from 'next';

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Top Executive Recruitment Firm | EarlyJobs Executive Search',
    description: 'Discover premier executive recruitment services. Our expert team connects top-tier executives with leading organizations for unparalleled success.',
    keywords: ['executive recruitment', 'top executive search', 'earlyjobs executive hiring', 'leadership recruitment', 'executive search firm'],
    openGraph: {
      title: 'Top Executive Recruitment Firm | EarlyJobs Executive Search',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/top-executive-recruitment`,
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
      title: 'Top Executive Recruitment Firm | EarlyJobs Executive Search',
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
      <TopExecutiveServicePage />
      <Footer />
    </>
  );
};

export default TopExecutiveRecruitmentFirmPage;