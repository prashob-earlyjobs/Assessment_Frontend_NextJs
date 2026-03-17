import { Suspense } from "react";
import InterviewDetailsClient from "../../components/pages/InterviewDetailsClient";

export default function InterviewDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/40 to-white scroll-smooth flex flex-col">
          <main className="flex-1 pt-32 pb-20">
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-sm text-slate-500">
              Loading interview details...
            </div>
          </main>
        </div>
      }
    >
      <InterviewDetailsClient />
    </Suspense>
  );
}

