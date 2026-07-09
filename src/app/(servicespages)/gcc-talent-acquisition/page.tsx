import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import GccTalentAcquisitionPage from "../../components/gcc/GccTalentAcquisitionPage";
import { createGccMetadata } from "../../components/gcc/GccRoutePage";
import { gccTalentAcquisition } from "../../components/gcc/gccPagesData";

export async function generateMetadata() {
  return createGccMetadata(gccTalentAcquisition);
}

export default function Page() {
  return (
    <>
      <NavbarV2 />
      <GccTalentAcquisitionPage />
      <Footer />
    </>
  );
}
