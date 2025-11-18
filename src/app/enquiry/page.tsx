import { Suspense } from "react";
import EnquiryForm from "../components/pages/EnquiryForm";
import Footer from "../components/pages/footer";

const EnquiryPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <EnquiryForm />
      </Suspense>
      <Footer />
    </>
  );
};

export default EnquiryPage;

