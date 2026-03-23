"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Briefcase, Building, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import Cookies from "js-cookie";
import {
  isUserLoggedIn,
  sendOtptoMobile,
  userSignup,
  verifyOtpMobile,
} from "../components/services/servicesapis";
import { useUser } from "@/app/context";
import { PRIMARY_COLOR, PRIMARY_COLOR_DARK } from "../../constants/theme";

const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
];

function SignupV2Content() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setUserCredentials } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    password: "",
    confirmPassword: "",
    referrerId: "",
    role: "candidate",
  });
  const [otp, setOtp] = useState("");
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const ref = searchParams?.get?.("ref") || "";
    if (ref) setSignupData((prev) => ({ ...prev, referrerId: ref }));
  }, [searchParams]);

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const response = await isUserLoggedIn();
      if (response.success && (response.user.role === "super_admin" || response.user.role === "franchise_admin")) {
        router.push("/admin");
        setUserCredentials(response.user);
      } else if (response.success && response.user.role !== "super_admin" && response.user.role !== "franchise_admin") {
        router.push("/dashboard");
      }
    };
    if (pathname.startsWith("/signup")) checkUserLoggedIn();
  }, [router, pathname, setUserCredentials]);

  const getMobileMaxLen = () => (signupData.countryCode === "+91" ? 10 : 15);

  const isValidMobile = () => {
    const digits = signupData.mobile.replace(/\D/g, "");
    if (signupData.countryCode === "+91") return /^[6-9]\d{9}$/.test(digits);
    return digits.length >= 7 && digits.length <= 15;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    if (!isValidMobile()) {
      toast.error("Please enter a valid mobile number!");
      return;
    }
    if (signupData.password.length < 6) {
      toast.error("Password should be at least 6 characters long!");
      return;
    }
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{6,}$/;
    if (!passwordRegex.test(signupData.password)) {
      toast.error("Password must contain at least one uppercase letter, one number, and one special character!");
      return;
    }

    setIsLoading(true);
    try {
      const phoneDigits = signupData.mobile.replace(/\D/g, "").slice(0, getMobileMaxLen());
      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneDigits,
        email: signupData.email,
      });
      if (!otpResponse.success) throw new Error(otpResponse.message || "Failed to send OTP");
      setIsOtpDialogOpen(true);
      setOtp("");
      toast.success("OTP sent to your mobile number and email!");
    } catch (err: unknown) {
      const message = err && typeof err === "object" && "response" in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : err instanceof Error ? err.message : "Error sending OTP";
      toast.error(String(message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const phoneDigits = signupData.mobile.replace(/\D/g, "").slice(0, getMobileMaxLen());
      const otpResponse = await sendOtptoMobile({
        phoneNumber: phoneDigits,
        email: signupData.email,
      });
      if (!otpResponse.success) throw new Error(otpResponse.message || "Failed to resend OTP");
      setOtp("");
      toast.success("OTP resent to your mobile number and email!");
    } catch {
      toast.error("Error resending OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    setIsVerifying(true);
    try {
      const phoneDigits = signupData.mobile.replace(/\D/g, "").slice(0, getMobileMaxLen());
      const verifyResponse = await verifyOtpMobile({
        phoneNumber: phoneDigits,
        email: signupData.email,
        otp,
      });
      if (!verifyResponse.success) {
        toast.error((verifyResponse as { data?: { message?: string } }).data?.message || "Verification failed");
        return;
      }
      const signupResponse = await userSignup({
        name: signupData.name,
        email: signupData.email,
        mobile: phoneDigits,
        countryCode: signupData.countryCode,
        password: signupData.password,
        referrerId: signupData.referrerId,
        role: signupData.role || "candidate",
      });
      if (!signupResponse.success) {
        toast.error((signupResponse as { data?: { message?: string } }).data?.message || "Signup failed");
        return;
      }
      Cookies.set("accessToken", signupResponse.data.accessToken);
      setUserCredentials(signupResponse.data.user);
      setIsOtpDialogOpen(false);
      toast.success("Account created successfully!");
      router.push("/onboarding");
    } catch {
      toast.error("Error verifying OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Signup Form (same as login) */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-6">
              <Image
                src="/v2/logo/logo (1).png"
                alt="EarlyJobs"
                width={300}
                height={100}
                className="object-contain h-20 w-auto"
                priority
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-600">
              Join thousands of candidates advancing their careers.
            </p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={signupData.name}
                onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                className="h-12 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-v2-email">Email</Label>
              <Input
                id="signup-v2-email"
                type="email"
                placeholder="your@email.com"
                value={signupData.email}
                onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                className="h-12 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-v2-mobile">Mobile Number</Label>
              <div className="flex gap-2">
                <Select
                  value={signupData.countryCode}
                  onValueChange={(v) => setSignupData((prev) => ({ ...prev, countryCode: v }))}
                >
                  <SelectTrigger className="h-12 w-[7.5rem] bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shrink-0">
                    <SelectValue>
                      {COUNTRY_CODES.find((c) => c.code === signupData.countryCode)?.flag}{" "}
                      {signupData.countryCode}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRY_CODES.map((country) => (
                      <SelectItem key={country.code} value={country.code} className="cursor-pointer">
                        <span className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.code}</span>
                          <span className="text-gray-500 text-xs">({country.country})</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="signup-v2-mobile"
                  type="tel"
                  inputMode="numeric"
                  placeholder={signupData.countryCode === "+91" ? "9876543210" : "Enter mobile number"}
                  value={signupData.mobile}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      mobile: e.target.value.replace(/\D/g, "").slice(0, getMobileMaxLen()),
                    })
                  }
                  className="h-12 flex-1 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-v2-password">Password</Label>
              <div className="relative">
                <Input
                  id="signup-v2-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  className="h-12 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-v2-confirm-password">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="signup-v2-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={signupData.confirmPassword}
                  onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                  className="h-12 bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className={`text-white text-base font-medium hover:opacity-90 transition-all duration-300 w-full h-12`}
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium hover:underline" style={{ color: PRIMARY_COLOR }}>
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Promotional Content (same as login) */}
      <div className="hidden lg:flex lg:w-1/2 relative" style={{ background: `linear-gradient(to bottom right, ${PRIMARY_COLOR_DARK}, ${PRIMARY_COLOR})` }}>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80')",
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-start p-12 text-white">
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Over 175,000+ employers waiting for good employees.
          </h2>
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">175,324</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Live Jobs</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Building className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">9,734</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Companies</div>
            </div>
            <div className="flex flex-col items-start">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold">7,532</div>
              <div className="text-sm mt-1" style={{ color: "rgba(255, 255, 255, 0.8)" }}>New Jobs</div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Enter the 6-digit OTP sent to {signupData.countryCode} {signupData.mobile} and {signupData.email}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleOtpVerification} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="signup-v2-otp">OTP</Label>
              <Input
                id="signup-v2-otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                maxLength={6}
                inputMode="numeric"
                className="h-12 bg-white text-gray-900 border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="submit"
                disabled={otp.length !== 6 || isVerifying}
                className="flex-1 h-12 text-white text-base font-medium hover:opacity-90"
                style={{ backgroundColor: PRIMARY_COLOR }}
              >
                {isVerifying ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify OTP"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="flex-1 h-12"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Resend OTP"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SignupV2Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="h-8 w-8 animate-spin" style={{ color: PRIMARY_COLOR }} /></div>}>
      <SignupV2Content />
    </Suspense>
  );
}
