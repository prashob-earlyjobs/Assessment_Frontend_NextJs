import Footer from "../../components/pages/footer";
import NavbarV2 from "../../components/v2/navbar/navbar.v2";
import GccHiringSolutionsPage from "../../components/gcc/GccHiringSolutionsPage";
import { gccHiringSolutions } from "../../components/gcc/gccPagesData";
import { createGccMetadata } from "../../components/gcc/GccRoutePage";

export async function generateMetadata() {
  return createGccMetadata(gccHiringSolutions);
}

export default function Page() {
  return (
    <>
      <NavbarV2 />
      <GccHiringSolutionsPage />
      <Footer />
    </>
  );
}
