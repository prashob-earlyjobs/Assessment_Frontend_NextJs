import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";
import SalesMarketingServicePage from "../components/pages/ourServices/SalesMarketingServicePage";

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