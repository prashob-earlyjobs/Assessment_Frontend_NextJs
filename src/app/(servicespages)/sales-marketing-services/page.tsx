import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from "../../components/pages/navbar";
import SalesMarketingServicePage from "../../components/pages/ourServices/SalesMarketingServicePage";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Sales & Marketing Recruitment Services | EarlyJobs',
    description: 'Discover premier sales and marketing recruitment services. Our expert team connects top-tier executives with leading organizations for unparalleled success.',
    keywords: ['sales recruitment', 'marketing recruitment', 'earlyjobs executive hiring', 'leadership recruitment', 'executive search firm'],
    openGraph: {
      title: 'Sales & Marketing Recruitment Services | EarlyJobs',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/sales-marketing-services`,
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
      title: 'Sales & Marketing Recruitment Services | EarlyJobs',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/sales-marketing-services`,
    },
  };
}
const SalesMarketingPage = () => {
    return (
        <>
            <Navbar />
            <Header />
            <SalesMarketingServicePage />
            <Footer />
        </>
    );
};

export default SalesMarketingPage;