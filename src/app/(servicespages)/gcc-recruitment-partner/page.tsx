import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import GccRecruitmentPartnerPage from "../../components/gcc/GccRecruitmentPartnerPage";
import { createGccMetadata } from "../../components/gcc/GccRoutePage";
import { gccRecruitmentPartner } from "../../components/gcc/gccPagesData";

export async function generateMetadata() {
  return createGccMetadata(gccRecruitmentPartner);
}

export default function Page() {
  return (
    <>
      <NavbarV2 />
      <GccRecruitmentPartnerPage />
      <Footer />
    </>
  );
}
