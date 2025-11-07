"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { sendOtptoMobile, verifyOtpMobile, userSignup, createCreatorCoupons, isUserLoggedIn } from "../components/services/servicesapis";
import { useUser } from "../context";
import Cookies from "js-cookie";
import { toast } from "sonner";
import {
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  Award,
  Target,
  Zap,
  CheckCircle2,
  ArrowRight,
  Gift,
  BarChart3,
  UserPlus,
  CreditCard,
  Link as LinkIcon,
  Loader2,
} from "lucide-react";

export default function JoinCreatorProgrammePage() {
  const router = useRouter();
  const { setUserCredentials } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formStep, setFormStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isOtpTimerActive, setIsOtpTimerActive] = useState(false);

  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Commissions",
      description: "Get paid for every student who purchases assessments through your referral links",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Share2,
      title: "Easy Referral System",
      description: "Share your unique referral links and coupon codes with students effortlessly",
      color: "from-blue-500 to-cyan-600",
    },
    {
      icon: TrendingUp,
      title: "Track Your Performance",
      description: "Monitor your referrals, earnings, and transactions in real-time dashboard",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Award,
      title: "Multiple Discount Tiers",
      description: "Offer 5%, 10%, or 15% discount codes to attract more students",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: UserPlus,
      title: "Build Your Network",
      description: "Invite students and grow your creator community",
      color: "from-indigo-500 to-blue-600",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Get insights into your referral performance and candidate engagement",
      color: "from-teal-500 to-green-600",
    },
  ];

  const features = [
    {
      title: "Unique Referral Links",
      description: "Get personalized referral links for assessments and dashboard",
      icon: LinkIcon,
    },
    {
      title: "Custom Coupon Codes",
      description: "Generate discount codes (5%, 10%, 15%) to incentivize purchases",
      icon: Gift,
    },
    {
      title: "Real-time Tracking",
      description: "Track all your referred candidates and their transactions",
      icon: Target,
    },
    {
      title: "Easy Payouts",
      description: "Receive your earnings through secure payment methods",
      icon: CreditCard,
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description: "Create your creator account and get verified",
      icon: UserPlus,
    },
    {
      step: "2",
      title: "Get Your Links",
      description: "Receive your unique referral links and coupon codes",
      icon: LinkIcon,
    },
    {
      step: "3",
      title: "Share & Earn",
      description: "Share with students and earn commissions on every purchase",
      icon: Share2,
    },
    {
      step: "4",
      title: "Track & Withdraw",
      description: "Monitor your earnings and withdraw your commissions",
      icon: DollarSign,
    },
  ];

  // OTP Timer Effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpTimerActive && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            setIsOtpTimerActive(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpTimerActive, otpTimer]);

  const handleGetStarted = () => {
    setIsDialogOpen(true);
    setFormStep("form");
    setFormData({ name: "", email: "", phone: "", location: "" });
    setOtp("");
  };

  const handleLearnMore = () => {
    router.push("/creator");
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      // Only allow digits and limit to 10 digits
      const phoneValue = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: phoneValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (formData.name.length < 4) {
      toast.error("Name must be at least 4 characters long");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.phone || formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter your location");
      return false;
    }
    return true;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await sendOtptoMobile({
        phoneNumber: formData.phone,
        email: formData.email,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to send OTP. Please try again.");
        return;
      }

      toast.success("OTP sent to your mobile number and email!");
      setFormStep("otp");
      setIsOtpTimerActive(true);
      setOtpTimer(30);
    } catch (error: any) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    setIsSubmitting(true);
    try {
      // Step 1: Verify OTP
      const otpResponse = await verifyOtpMobile({
        phoneNumber: formData.phone,
        email: formData.email,
        otp: otp,
      });

      if (!otpResponse.success) {
        toast.error(otpResponse.data?.message || "Invalid OTP. Please try again.");
        return;
      }

      // Step 2: Create user account (signup)
      // Generate a temporary password for creator account
      const tempPassword = `Creator${Date.now()}`;
      
      const signupResponse = await userSignup({
        name: formData.name,
        email: formData.email,
        mobile: formData.phone,
        password: tempPassword,

      });

      if (!signupResponse.success) {
        toast.error(signupResponse.data?.message || "Failed to create creator account. Please try again.");
        return;
      }

      // Step 3: Store access token first
      Cookies.set("accessToken", signupResponse.data.accessToken);

      // Step 4: Get full user data with userId from isUserLoggedIn API
      // Wait a moment for backend to process the user creation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const loggedInResponse = await isUserLoggedIn();
      
      // Check response structure (response.user is the standard format)
      const userData = loggedInResponse.user;
      
      if (!loggedInResponse.success || !userData) {
        console.error("isUserLoggedIn response:", loggedInResponse);
        toast.error("Failed to get user data. Please try again or contact support.");
        return;
      }

      const userId = userData.userId;
      
      if (!userId) {
        console.error("User data from isUserLoggedIn:", userData);
        console.error("Available fields:", Object.keys(userData));
        toast.error("userId field is missing. Please contact support.");
        return;
      }
      
      console.log("Successfully retrieved userId:", userId);

      // Step 5: Set user credentials with full user data
      setUserCredentials(userData);

      // Step 6: Create the 3 discount coupons
      const loadingToast = toast.loading("Creating your discount coupons...");
      const couponsResult = await createCreatorCoupons(userId);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (!couponsResult.success) {
        console.error("Failed to create coupons:", couponsResult.message);
        // Don't block the flow if coupon creation fails
        toast.error("Account created but failed to create coupons. Please contact support.");
      } else {
        toast.success("Discount coupons created successfully!");
      }

      // Close dialog and reset form
      setIsDialogOpen(false);
      setFormStep("form");
      setFormData({ name: "", email: "", phone: "", location: "" });
      setOtp("");
      setIsOtpTimerActive(false);
      
      // Redirect to creator dashboard
      toast.success("Creator account created successfully! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/creator");
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "Error creating creator account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    if (isOtpTimerActive) {
      toast.error(`Please wait ${otpTimer} seconds before requesting a new OTP`);
      return;
    }

    setIsSendingOtp(true);
    try {
      const response = await sendOtptoMobile({
        phoneNumber: formData.phone,
        email: formData.email,
      });

      if (!response.success) {
        toast.error(response.message || "Failed to resend OTP. Please try again.");
        return;
      }

      toast.success("OTP resent successfully!");
      setIsOtpTimerActive(true);
      setOtpTimer(30);
    } catch (error: any) {
      toast.error(error.message || "Failed to resend OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="text-center">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
                <Zap className="w-4 h-4 mr-2" />
                Join the Creator Programme
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Turn Your Network Into
                <br />
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Passive Income
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-orange-50 mb-8 max-w-3xl mx-auto leading-relaxed">
                Help students discover career opportunities and earn commissions for every assessment purchase through your referral links
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                {/* <Button
                  onClick={handleLearnMore}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
                >
                  Learn More
                </Button> */}
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Join the Creator Programme?
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Unlock multiple revenue streams while helping students advance their careers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <Card
                  key={index}
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                >
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-base leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to succeed as a creator
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start earning in just 4 simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 text-center h-full">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {step.step}
                      </div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 text-base">
                        {step.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-orange-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-orange-50 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who are already earning by helping students achieve their career goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Now - It's Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              {/* <Button
                onClick={handleLearnMore}
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl backdrop-blur-sm"
              >
                View Dashboard Demo
              </Button> */}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-orange-50">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>No Upfront Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Instant Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">
                  50+
                </div>
                <div className="text-gray-600 text-lg">Active Creators</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">
                  1K+
                </div>
                <div className="text-gray-600 text-lg">Students Referred</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">
                  ₹1L+
                </div>
                <div className="text-gray-600 text-lg">Total Earnings</div>
              </div>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-orange-600 mb-2">
                  99%
                </div>
                <div className="text-gray-600 text-lg">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      
      {/* Creator Application Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {formStep === "form" ? "Join Creator Programme" : "Verify OTP"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {formStep === "form"
                ? "Fill in your details to get started"
                : "Enter the 6-digit OTP sent to your mobile and email"}
            </DialogDescription>
          </DialogHeader>

          {formStep === "form" ? (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={formData.phone}
                  onChange={handleFormChange}
                  maxLength={10}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter your city/location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white mt-6"
                size="lg"
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Send OTP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP *</Label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="w-full text-center text-2xl tracking-widest font-semibold"
                />
                <p className="text-sm text-gray-500 text-center">
                  OTP sent to {formData.phone} and {formData.email}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleVerifyOtp}
                  disabled={isSubmitting || otp.length !== 6}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>

                <Button
                  onClick={handleResendOtp}
                  disabled={isSendingOtp || isOtpTimerActive}
                  variant="outline"
                  className="w-full"
                  size="sm"
                >
                  {isOtpTimerActive ? (
                    `Resend OTP in ${otpTimer}s`
                  ) : (
                    "Resend OTP"
                  )}
                </Button>

                <Button
                  onClick={() => {
                    setFormStep("form");
                    setOtp("");
                  }}
                  variant="ghost"
                  className="w-full"
                  size="sm"
                >
                  Change Phone Number
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </>
  );
}

