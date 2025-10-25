import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import FinanceAccountingServicePage from "../../components/pages/ourServices/FinanceAccountingServicePage";
import Navbar from "../../components/pages/navbar";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.earlyjobs.ai';
  return {
    title: 'Finance & Accounting Recruitment Services | EarlyJobs',
    description: 'Discover premier finance and accounting recruitment services. Our expert team connects top-tier executives with leading organizations for unparalleled success.',
    keywords: ['finance recruitment', 'accounting recruitment', 'earlyjobs executive hiring', 'leadership recruitment', 'executive search firm'],
    openGraph: {
      title: 'Finance & Accounting Recruitment Services | EarlyJobs',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      url: `${baseUrl}/finance-and-accounting-recruitment`,
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
      title: 'Finance & Accounting Recruitment Services | EarlyJobs',
      description: 'Connect with top executives through our premier recruitment services tailored for leadership roles.',
      images: [`/images/og-services.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/finance-and-accounting-recruitment`,
    },
  };
}

const FinanceAndAccountingPage = () => {
    return (
        <>
            <Navbar />
            <Header />
            <FinanceAccountingServicePage />
            <Footer />
        </>
    );
};

export default FinanceAndAccountingPage;