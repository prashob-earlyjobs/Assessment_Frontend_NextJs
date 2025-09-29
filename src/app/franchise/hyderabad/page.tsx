"use client"
import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import {
  ArrowRight,
  Loader2,
  Shield,
  Clock,
  Award,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import HeroSection from "../../components/franchiseHYD/herosection";
import AboutSection from "../../components/franchiseHYD/AboutSection";
import emailjs from "@emailjs/browser";
import BenefitsSection from "../../components/franchiseHYD/BenefitsSection";
import LocalEvents from "../../components/franchiseHYD/LocalEvents";
import Faq from "../../components/franchiseHYD/faq";

const Index = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    role: "student",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[^\d+]/g, "").replace("+91", "");
    const phoneRegex = /^\+?\d{10,15}$/;

    if (!phone) {
      return "Phone number is required";
    }

    if (!phoneRegex.test(cleanPhone)) {
      return "Enter a valid phone number with 10-digits";
    }

    return "";
  };

  const handlePhoneChange = (value) => {
    const raw = value.replace(/\D/g, "");
    let formatted = "+91 ";

    if (raw.length > 2) {
      const number = raw.slice(2);
      if (number.length <= 4) {
        formatted += number;
      } else {
        formatted += number.slice(0, 4) + " " + number.slice(4, 10);
      }
    }

    handleInputChange("phone", formatted);
    const error = validatePhone(formatted);
    setPhoneError(error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneValidationError = validatePhone(formData.phone);
    if (phoneValidationError) {
      setPhoneError(phoneValidationError);
      return;
    }

    setLoading(true);

    try {
      const sendToUser = emailjs.send(
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          role: formData.role,
          branch: "Hyderabad",
        },
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY
      );

      const sendToTeam = emailjs.send(
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_SERVICE_ID_2,
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_TEMPLATE_ID_2,
        {
          from_name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          role: formData.role,
          Branch: "Hyderabad",
          message: formData.message,
          tomail: "hyderabad@earlyjobs.in",
        },
        process.env.REACT_APP_FRANCHISE_HYD_MOH_EMAILJS_ACCOUNT_KEY_2
      );

      await Promise.all([sendToUser, sendToTeam]);
      toast.success("Form Submitted Successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        role: "student",
      });
    } catch (error) {
      toast.error("Submission Failed");
      console.error("EmailJS Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Local Expertise",
      description:
        "Deep understanding of Hyderabad's job market and business landscape",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "24-48 hours response time for all inquiries",
    },
    {
      icon: Award,
      title: "Proven Success",
      description: "95% placement rate with verified local employers",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple 3-step process to get started
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Register
              </h3>
              <p className="text-gray-600">
                Sign up with your details and specify whether you're a student,
                college, or employer
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Get Matched
              </h3>
              <p className="text-gray-600">
                Our AI algorithm matches candidates with suitable roles or
                employers with qualified talent
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Interview & Start
              </h3>
              <p className="text-gray-600">
                Participate in interviews with our support and begin your career
                journey
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="lead-capture"
        className="bg-orange-700 py-16 min-h-screen"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1 max-w-lg bg-white/10 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join the EarlyJobs Hyderabad Network
            </h3>
            <p className="mb-6">
              Get started today and unlock opportunities in Hyderabad's thriving
              job market
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-orange-300" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{feature.title}</h4>
                    <p className="text-orange-100">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-300" />
                  <span>+91 9949 702299</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-300" />
                  <a
                    href="mailto:hyderabad@earlyjobs.in"
                    className="text-orange-300 hover:underline"
                  >
                    hyderabad@earlyjobs.in
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-300" />
                  <span>
                    Cabin No: 2, Shreeji Towers, 1st Floor 1-10-74/71, Sardar Patel Road, Begumpet, Hyderabad – 500016, Telangana, India
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 max-w-lg bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Get Started Today
            </h2>
            <p className="text-gray-600 mb-6">
              Join thousands of successful candidates and employers
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXX XXXXXX"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  required
                  className={`mt-1 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${phoneError ? 'border-red-500' : ''}`}
                  aria-required="true"
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "phone-error" : undefined}
                />
                {phoneError && (
                  <p
                    id="phone-error"
                    className="mt-1 text-sm text-red-600"
                  >
                    {phoneError}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Description *
                </Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your goals or requirements"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  aria-required="true"
                />
              </div>
              <div>
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  I am a *
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                >
                  <SelectTrigger className="mt-1 block w-full border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Student / Job Seeker">
                      Student / Job Seeker
                    </SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="College / Placements">
                      College / Placements
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  value="Hyderabad"
                  disabled
                  className="mt-1 block w-full border-gray-300 rounded-lg bg-gray-100"
                  aria-disabled="true"
                />
              </div>
              <Button
                type="submit"
                className="w-full flex justify-center items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition-colors"
                disabled={loading || !!phoneError}
                aria-label={
                  loading ? "Submitting form" : "Join EarlyJobs Hyderabad"
                }
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Join EarlyJobs Hyderabad"
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                By submitting this form, you agree to our{" "}
                <a href="/terms-and-conditions" className="text-orange-500 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy-policy" className="text-orange-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </form>
          </div>
        </div>
      </section>
      <LocalEvents />
      <Faq />
      <Footer />
    </div>
  );
};

export default Index;