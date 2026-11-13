"use client";

import { useEffect, useState, type ChangeEvent, type ComponentProps } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Gift,
  Link as LinkIcon,
  Loader2,
  Share2,
  Target,
  TrendingUp,
  UserPlus,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createCreatorCoupons,
  getLoggedInCreator,
  sendCreatorOtp,
  signupCreator,
  verifyCreatorOtp,
} from "@/lib/creator-programme";

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
  { step: "1", title: "Sign Up", description: "Create your creator account and get verified", icon: UserPlus },
  { step: "2", title: "Get Your Links", description: "Receive your unique referral links and coupon codes", icon: LinkIcon },
  { step: "3", title: "Share & Earn", description: "Share with students and earn commissions on every purchase", icon: Share2 },
  { step: "4", title: "Track & Withdraw", description: "Monitor your earnings and withdraw your commissions", icon: DollarSign },
];

export function JoinCreatorProgramme() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formStep, setFormStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", location: "" });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isOtpTimerActive, setIsOtpTimerActive] = useState(false);

  useEffect(() => {
    if (!isOtpTimerActive) return;
    const timer = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          setIsOtpTimerActive(false);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOtpTimerActive]);

  function openForm() {
    setIsDialogOpen(true);
    setFormStep("form");
    setFormData({ name: "", email: "", phone: "", location: "" });
    setOtp("");
  }

  function updateField(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: value.replace(/\D/g, "").slice(0, 10) }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validateForm() {
    if (!formData.name.trim() || formData.name.trim().length < 4) {
      toast.error("Name must be at least 4 characters long");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (formData.phone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter your location");
      return false;
    }
    return true;
  }

  async function handleSendOtp() {
    if (!validateForm()) return;
    setIsSendingOtp(true);
    try {
      const response = await sendCreatorOtp(formData.phone, formData.email);
      if (!response.success) {
        toast.error(response.message || "Failed to send OTP. Please try again.");
        return;
      }
      toast.success("OTP sent to your mobile number and email!");
      setFormStep("otp");
      setIsOtpTimerActive(true);
      setOtpTimer(30);
    } catch {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }
    setIsSubmitting(true);
    try {
      const otpResponse = await verifyCreatorOtp(formData.phone, formData.email, otp);
      if (!otpResponse.success) {
        toast.error(otpResponse.data?.message || otpResponse.message || "Invalid OTP. Please try again.");
        return;
      }

      const signupResponse = await signupCreator({
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.phone,
        location: formData.location.trim(),
        password: `Creator${Date.now()}`,
      });
      if (!signupResponse.success) {
        toast.error(signupResponse.data?.message || signupResponse.message || "Failed to create creator account. Please try again.");
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const loggedIn = await getLoggedInCreator();
      const userId = loggedIn.user?.userId;
      if (!loggedIn.success || !userId) {
        toast.error("Account created, but the profile could not be loaded. Please contact support.");
        return;
      }

      const loadingToast = toast.loading("Creating your discount coupons...");
      const coupons = await createCreatorCoupons(userId);
      toast.dismiss(loadingToast);
      if (!coupons.success) {
        toast.error("Account created but failed to create coupons. Please contact support.");
      } else {
        toast.success("Discount coupons created successfully!");
      }

      setIsDialogOpen(false);
      setFormStep("form");
      setOtp("");
      setIsOtpTimerActive(false);
      toast.success("Creator account created successfully.");
    } catch {
      toast.error("Error creating creator account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    if (isOtpTimerActive) {
      toast.error(`Please wait ${otpTimer} seconds before requesting a new OTP`);
      return;
    }
    setIsSendingOtp(true);
    try {
      const response = await sendCreatorOtp(formData.phone, formData.email);
      if (!response.success) {
        toast.error(response.message || "Failed to resend OTP. Please try again.");
        return;
      }
      toast.success("OTP resent successfully!");
      setIsOtpTimerActive(true);
      setOtpTimer(30);
    } catch {
      toast.error("Failed to resend OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <Badge className="mb-6 border-white/30 bg-white/20 text-white hover:bg-white/30">
            <Zap className="mr-2 h-4 w-4" />
            Join the Creator Programme
          </Badge>
          <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Turn Your Network Into
            <br />
            <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">Passive Income</span>
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-orange-50 sm:text-2xl">
            Help students discover career opportunities and earn commissions for every assessment purchase through your referral links
          </p>
          <Button
            onClick={openForm}
            size="lg"
            className="rounded-xl bg-white px-8 py-6 text-lg text-orange-600 shadow-lg hover:bg-orange-50"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Why Join the Creator Programme?</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Unlock multiple revenue streams while helping students advance their careers
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <CardHeader>
                  <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${benefit.color}`}>
                    <benefit.icon className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-gray-600">{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Powerful Features</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Everything you need to succeed as a creator</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-600">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="leading-relaxed text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-orange-50 to-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">Start earning in just 4 simple steps</p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step) => (
              <Card key={step.step} className="relative h-full border-0 text-center shadow-lg">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -right-4 -top-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-lg font-bold text-white shadow-lg">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">{step.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-600 to-orange-500 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl">Ready to Start Earning?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-orange-50">
            Join thousands of creators who are already earning by helping students achieve their career goals
          </p>
          <Button onClick={openForm} size="lg" className="rounded-xl bg-white px-8 py-6 text-lg text-orange-600 hover:bg-orange-50">
            Join Now - It&apos;s Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-orange-50">
            {["No Upfront Costs", "Instant Setup", "24/7 Support"].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["50+", "Active Creators"],
            ["1K+", "Students Referred"],
            ["₹1L+", "Total Earnings"],
            ["99%", "Satisfaction Rate"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <div className="mb-2 text-4xl font-bold text-orange-600 sm:text-5xl">{value}</div>
              <div className="text-lg text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

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
              <Field label="Full Name *" id="name" name="name" value={formData.name} onChange={updateField} placeholder="Enter your full name" />
              <Field label="Email Address *" id="email" name="email" type="email" value={formData.email} onChange={updateField} placeholder="Enter your email" />
              <Field label="Phone Number *" id="phone" name="phone" type="tel" value={formData.phone} onChange={updateField} placeholder="Enter 10-digit phone number" maxLength={10} />
              <Field label="Location *" id="location" name="location" value={formData.location} onChange={updateField} placeholder="Enter your city/location" />
              <Button onClick={handleSendOtp} disabled={isSendingOtp} className="mt-6 w-full bg-orange-600 text-white hover:bg-orange-700" size="lg">
                {isSendingOtp ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSendingOtp ? "Sending OTP..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP *</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full text-center text-2xl font-semibold tracking-widest"
                />
                <p className="text-center text-sm text-gray-500">
                  OTP sent to {formData.phone} and {formData.email}
                </p>
              </div>
              <Button onClick={handleVerifyOtp} disabled={isSubmitting || otp.length !== 6} className="w-full bg-orange-600 text-white hover:bg-orange-700" size="lg">
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
              <Button onClick={handleResendOtp} disabled={isSendingOtp || isOtpTimerActive} variant="outline" className="w-full" size="sm">
                {isOtpTimerActive ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & ComponentProps<typeof Input>) {
  return (
    <div className="space-y-2">
      <Label htmlFor={props.id}>{label}</Label>
      <Input {...props} />
    </div>
  );
}
