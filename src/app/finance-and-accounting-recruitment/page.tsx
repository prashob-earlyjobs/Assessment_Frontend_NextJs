import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import FinanceAccountingServicePage from "../components/pages/ourServices/FinanceAccountingServicePage";
import Navbar from "../components/pages/navbar";

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