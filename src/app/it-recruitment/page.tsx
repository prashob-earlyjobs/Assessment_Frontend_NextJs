import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";
import ITRecruitmentServicePage from "../components/pages/ourServices/ITRecruitmentServicePage"

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