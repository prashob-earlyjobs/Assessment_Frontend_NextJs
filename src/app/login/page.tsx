"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Briefcase, Building, ArrowRight, Loader2, RotateCcw } from "lucide-react";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK } from "../../constants/theme";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { sendOtptoMobile, verifyOtpMobile, isUserLoggedIn } from "../components/services/servicesapis";
import axiosInstance from "../components/services/apiinterseptor";
import { useUser } from "@/app/context";

export default function Login() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { userCredentials, setUserCredentials } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [formData, setFormData] = useState({
    emailOrMobile: "",
  });
  const isLoggingInRef = useRef(false);

  // Check if user is already logged in (only on initial mount, not during login flow)
  useEffect(() => {
    // Skip check if we're currently logging in
    if (isLoggingInRef.current) {
      return;
    }

    const checkUserLoggedIn = async () => {
      // Check if we already have credentials in context
      if (userCredentials) {
        return;
      }

      const response = await isUserLoggedIn();
      if (response.success && (response.user.role === 'super_admin' || response.user.role === 'franchise_admin')) {
        setUserCredentials(response.user);
        router.push('/admin');
      } else if (response.success && response.user.role === 'creator') {
        setUserCredentials(response.user);
        localStorage.removeItem("redirectAfterLogin");
        router.push('/creator');
      } else if (response.success && response.user.role !== 'super_admin' && response.user.role !== 'franchise_admin') {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
        setUserCredentials(response.user);
        localStorage.removeItem("redirectAfterLogin");
        router.push(redirectPath);
      }
    };

    if (pathname.startsWith('/login')) {
      checkUserLoggedIn();
    }
  }, [router, pathname, setUserCredentials, userCredentials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate input
    const isValidEmailOrMobile = (input: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const mobileRegex = /^[6-9]\d{9}$/;
      return emailRegex.test(input) || mobileRegex.test(input);
    };

    if (!isValidEmailOrMobile(formData.emailOrMobile)) {
      toast.error("Please enter a valid email or mobile number!");
      return;
    }

    setIsLoading(true);
    
    try {
      // Determine if input is email or mobile
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrMobile);
      const phoneNumber = isEmail ? "" : formData.emailOrMobile.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10);
      const email = isEmail ? formData.emailOrMobile : "";

      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneNumber,
        email: email,
        toLogin: true
      });

      if (!otpResponse.success) {
        // Check if the failure is due to user not found (404)
        if (otpResponse.statusCode === 404 || otpResponse.statusCode === 400 || 
            otpResponse.message?.toLowerCase().includes('not found') ||
            otpResponse.message?.toLowerCase().includes('does not exist')) {
          toast.info("User not found. Please sign up to create an account.");
          router.push('/signup');
          setIsLoading(false);
          return;
        }
        toast.error(otpResponse.message || "Failed to send OTP");
        setIsLoading(false);
        return;
      }

      setOtpSent(true);
      setResendTimer(60); // 60 seconds countdown
      setOtp(Array(6).fill(""));
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      
      toast.success("OTP sent to your mobile number and email!");
    } catch (error: any) {
      // Check if error is 404 (user not found)
      if (error?.response?.status === 404 || error?.response?.status === 400) {
        toast.info("User not found. Please sign up to create an account.");
        router.push('/signup');
        setIsLoading(false);
        return;
      }
      toast.error(error?.response?.data?.message || error.message || "Error sending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.length === 6) {
      handleOtpVerify(newOtp.join(""));
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      otpInputRefs.current[5]?.focus();
      // Auto-verify after paste
      setTimeout(() => handleOtpVerify(pastedData), 100);
    }
  };

  const handleOtpVerify = async (otpValue?: string) => {
    const otpToVerify = otpValue || otp.join("");
    if (otpToVerify.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsVerifying(true);
    isLoggingInRef.current = true; // Set flag to prevent useEffect from interfering
    
    try {
      // Determine if input is email or mobile
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrMobile);
      const phoneNumber = isEmail ? "" : formData.emailOrMobile.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10);
      const email = isEmail ? formData.emailOrMobile : "";

      const loginResponse = await verifyOtpMobile({
        phoneNumber: phoneNumber,
        email: email,
        otp: otpToVerify,
        toLogin: true
      });

      if (!loginResponse.success) {
        toast.error(loginResponse?.response?.data?.message || loginResponse?.data?.message || "Error verifying OTP");
        // Reset OTP on error
        setOtp(Array(6).fill(""));
        otpInputRefs.current[0]?.focus();
        isLoggingInRef.current = false;
        setIsVerifying(false);
        return;
      }

      // Handle successful login
      const accessToken = loginResponse.data?.accessToken || loginResponse.data?.data?.accessToken;
      const user = loginResponse.data?.user || loginResponse.data?.data?.user;
      
      if (accessToken) {
        Cookies.set("accessToken", accessToken, { expires: 7 });
        localStorage.setItem("accessToken", accessToken);
        axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      }
      
      if (user) {
        setUserCredentials(user);
      }
      
      // Reset OTP form state
      setOtpSent(false);
      setOtp(Array(6).fill(""));
      setResendTimer(0);
      
      toast.success("Login successful!");
      
      // Determine redirect path based on user role
      let redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
      
      if (user?.role === 'super_admin' || user?.role === 'franchise_admin') {
        redirectPath = '/admin';
      } else if (user?.role === 'creator') {
        redirectPath = '/creator';
      }
      
      localStorage.removeItem("redirectAfterLogin");
      
      // Use Next.js router for navigation - use replace to prevent back navigation to login
      router.replace(redirectPath);

    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Error verifying OTP");
      // Reset OTP on error
      setOtp(Array(6).fill(""));
      otpInputRefs.current[0]?.focus();
      isLoggingInRef.current = false;
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    
    setIsLoading(true);
    try {
      // Determine if input is email or mobile
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailOrMobile);
      const phoneNumber = isEmail ? "" : formData.emailOrMobile.replace(/^\+91/, '').replace(/\D/g, '').slice(0, 10);
      const email = isEmail ? formData.emailOrMobile : "";

      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneNumber,
        email: email,
        toLogin: true
      });

      if (!otpResponse.success) {
        toast.error(otpResponse.message || "Failed to resend OTP");
        setIsLoading(false);
        return;
      }
      
      setOtp(Array(6).fill(""));
      setResendTimer(60);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
      
      toast.success("OTP resent to your mobile number and email!");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message || "Error resending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setOtpSent(false);
    setOtp(Array(6).fill(""));
    setResendTimer(0);
  };

  // Focus first input when OTP section appears
  useEffect(() => {
    if (otpSent) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [otpSent]);

  const handleGoogleAuth = () => {
    toast.success("Google authentication initiated!");
    const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
    localStorage.removeItem("redirectAfterLogin");
    router.push(redirectPath);
  };

  const handleFacebookAuth = () => {
    toast.success("Facebook authentication initiated!");
    const redirectPath = localStorage.getItem("redirectAfterLogin") || '/dashboard';
    localStorage.removeItem("redirectAfterLogin");
    router.push(redirectPath);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        {!otpSent ? (
          <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: PRIMARY_COLOR }}>
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EarlyJobs</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Log in</h1>
            <p className="text-gray-600">
              Enter your email or mobile number to receive an OTP.{" "}
              <Link href="/signup" className="hover:underline font-medium" style={{ color: PRIMARY_COLOR }}>
                Don't have an account? Sign Up
              </Link>
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="emailOrMobile">Email address or Mobile number</Label>
              <Input
                id="emailOrMobile"
                type="text"
                placeholder="your@email.com or 9876543210"
                value={formData.emailOrMobile}
                onChange={(e) => setFormData({ ...formData, emailOrMobile: e.target.value })}
                  className="h-12 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={isLoading}
                className={`text-white text-base font-medium hover:opacity-90 transition-all duration-300 ${
                  isLoading 
                    ? "h-12 w-12 rounded-full" 
                    : "w-full h-12"
                }`}
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send OTP <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Divider */}
            {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
            </div> */}

          {/* Social Login Buttons */}
            {/* <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleFacebookAuth}
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
            </div> */}
          </div>
        ) : (
          /* OTP Verification Component */
          <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: PRIMARY_COLOR }}>
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">EarlyJobs</span>
            </div>
              <h1 className="text-3xl font-bold text-gray-900">Enter OTP</h1>
            <p className="text-gray-600">
                Enter the 6-digit OTP sent to{" "}
                <span className="font-medium text-gray-900">{formData.emailOrMobile}</span>
            </p>
          </div>

            {/* OTP Input Form */}
            <form onSubmit={(e) => { e.preventDefault(); handleOtpVerify(); }} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-center block">Enter 6-digit OTP</Label>
                <div className="flex justify-center gap-2 sm:gap-3 px-4">
                  {otp.map((digit, index) => (
              <Input
                      key={index}
                      ref={(el) => { otpInputRefs.current[index] = el; }}
                type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={index === 0 ? handleOtpPaste : undefined}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl md:text-2xl font-bold border-2 focus:border-opacity-100 transition-all flex-shrink-0 bg-white text-gray-900"
                      style={{
                        borderColor: digit ? PRIMARY_COLOR : "#e5e7eb",
                      }}
                      disabled={isVerifying}
                    />
                  ))}
                </div>
            </div>

              <div className="space-y-3">
              <Button
                type="submit"
                  disabled={isVerifying || otp.some((digit) => !digit)}
                  className="w-full h-12 text-white text-base font-medium hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                ) : (
                  <>
                      Verify OTP <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>

                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="text-gray-600">Didn't receive OTP?</span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || isLoading}
                    className="font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    style={{ color: PRIMARY_COLOR }}
                  >
                    {resendTimer > 0 ? (
                      <>
                        Resend in {resendTimer}s
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-4 h-4" />
                        Resend OTP
                      </>
                    )}
                  </button>
          </div>

                <button
              type="button"
                  onClick={handleBackToEmail}
                  className="w-full text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
                >
                  ← Change email/mobile number
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Right Section - Promotional Content */}
      <div className="hidden lg:flex lg:w-1/2 relative" style={{ background: `linear-gradient(to bottom right, ${PRIMARY_COLOR_DARK}, ${PRIMARY_COLOR})` }}>
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80')",
          }}
        ></div>
        
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0" style={{ backgroundColor: `${PRIMARY_COLOR_DARK}CC` }}></div> */}

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Over 1,75,324 candidates waiting for good employees.
          </h2>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">1,75,324</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Live Jobs</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Building className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">97,354</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Companies</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">7,532</div>
              <div className="text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>New Jobs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
