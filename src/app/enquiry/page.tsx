import { Suspense } from "react";
import EnquiryForm from "../components/pages/EnquiryForm";
import Footer from "../components/pages/footer";
import { Loader2 } from "lucide-react";

const LoadingFallback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Loading enquiry form...</p>
        </div>
      </div>
    </div>
  );
};

const EnquiryPage = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <EnquiryForm />
      </Suspense>
      <Footer />
    </>
  );
};

export default EnquiryPage;

