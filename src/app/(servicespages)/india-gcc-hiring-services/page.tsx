import { createGccMetadata, GccRoutePage } from "../../components/gcc/GccRoutePage";
import { indiaGccHiringServices } from "../../components/gcc/gccPagesData";

export async function generateMetadata() {
  return createGccMetadata(indiaGccHiringServices);
}

export default function Page() {
  return <GccRoutePage content={indiaGccHiringServices} />;
}
