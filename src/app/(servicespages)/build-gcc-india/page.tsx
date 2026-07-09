import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import BuildGccIndiaPage from "../../components/gcc/BuildGccIndiaPage";
import { createGccMetadata } from "../../components/gcc/GccRoutePage";
import { buildGccIndia } from "../../components/gcc/gccPagesData";

export async function generateMetadata() {
  return createGccMetadata(buildGccIndia);
}

export default function Page() {
  return (
    <>
      <NavbarV2 />
      <BuildGccIndiaPage />
      <Footer />
    </>
  );
}
