import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import OffshoreCapabilityCenterHiringPage from "../../components/gcc/OffshoreCapabilityCenterHiringPage";
import { createGccMetadata } from "../../components/gcc/GccRoutePage";
import { offshoreCapabilityCenterHiring } from "../../components/gcc/gccPagesData";

export async function generateMetadata() {
  return createGccMetadata(offshoreCapabilityCenterHiring);
}

export default function Page() {
  return (
    <>
      <NavbarV2 />
      <OffshoreCapabilityCenterHiringPage />
      <Footer />
    </>
  );
}
