"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProfileUpdateSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const sessionId = searchParams.get("sessionId");
  
  useEffect(() => {
    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Auto-redirect after 10 seconds
    const redirectTimeout = setTimeout(() => {
      router.push("/");
    }, 10000);

    // Cleanup
    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [router]);

  const handleStartAssessment = () => {
    console.log("Starting assessment");
   
    router.push(`${process.env.NEXT_PUBLIC_AI_ASSESSMENT_URL}/interview?sessionId=${sessionId}`);
  };

  const handleMaybeLater = () => {
    router.push("/dashboard");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-50"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Radial gradient background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full mx-4 text-center">
        {/* Success icon */}
        <div className="mb-8 relative flex justify-center">
          <div className="relative">
            {/* Outer white circle with glow */}
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10">
              {/* Inner orange circle */}
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center">
                {/* Checkmark */}
                <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute inset-0 w-24 h-24 bg-orange-200 rounded-full opacity-50 blur-xl -z-10"></div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          Profile Updated
          <br />
          Successfully!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-base mb-4 leading-relaxed px-4">
          A free AI assessment has been generated based on your inputs. Please try that to make your journey better.
        </p>

        {/* Auto-redirect countdown */}
        <p className="text-sm text-gray-500 mb-8">
          Redirecting to home in <span className="font-semibold text-orange-500">{countdown}</span> seconds...
        </p>

        {/* Call to action buttons */}
        <div className="space-y-4">
          {/* Primary button */}
          <Button
            onClick={handleStartAssessment}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            Start AI Assessment
            <ArrowRight className="h-5 w-5" />
          </Button>

          {/* Secondary link */}
          <button
            onClick={handleMaybeLater}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}



