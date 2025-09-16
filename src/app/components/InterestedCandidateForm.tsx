"use client";

import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { X } from "lucide-react";

const InterestedCandidateForm = ({ isOpen, onClose, candidateName }) => {
  const [step, setStep] = useState(1); // Track form step
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: "",
    interviewDate: "",
    interviewMode: "online", // Default to online
    companyAddress: "",
    mobile: "+91",
    mobileOtp: "",
  });
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      // Ensure mobile starts with +91 and contains only digits after that
      if (!value.startsWith("+91")) {
        return; // Prevent changing the +91 prefix
      }
      if (value.length > 13 || !/^\+91\d{0,10}$/.test(value)) {
        return; // Restrict to 10 digits after +91
      }
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Send OTP via backend API
  const sendOtp = async () => {
    setIsSubmitting(true);
    try {
      const mobile = formData.mobile;
      if (mobile.length !== 13 || !/^\+91\d{10}$/.test(mobile)) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }
      const response = await fetch(`${backendUrl}/send-otp/mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP");
      }

      setMobileOtpSent(true);
      toast.success("Mobile OTP sent successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to send mobile OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission with OTP validation in backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const mobile = formData.mobile;
      if (mobile.length !== 13 || !/^\+91\d{10}$/.test(mobile)) {
        throw new Error("Please enter a valid 10-digit mobile number");
      }
      const response = await fetch(`${backendUrl}/submit-interest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, candidateName }),
      });

      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Invalid OTP") {
          throw new Error("Invalid OTP entered. Please try again.");
        }
        throw new Error(data.error || "Failed to submit interest");
      }

      toast.success("Interest expressed successfully! We will contact you soon.");
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to express interest. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Next button to move to Step 2
  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.companyName) {
      toast.error("Please fill all required fields in Step 1.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setStep(2);
  };

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        email: "",
        companyName: "",
        interviewDate: "",
        interviewMode: "online",
        companyAddress: "",
        mobile: "+91",
        mobileOtp: "",
      });
      setMobileOtpSent(false);
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Express Interest in {candidateName}</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-orange-600">
            <X size={24} />
          </button>
        </div>

        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            <div>
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="Enter company name"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md"
            >
              Next
            </Button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="interviewDate">Interview Schedule Date</Label>
              <Input
                id="interviewDate"
                name="interviewDate"
                type="date"
                value={formData.interviewDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split("T")[0]} // Prevent past dates
              />
            </div>
            <div>
              <Label htmlFor="interviewMode">Interview Mode</Label>
              <select
                id="interviewMode"
                name="interviewMode"
                value={formData.interviewMode}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            {formData.interviewMode === "offline" && (
              <div>
                <Label htmlFor="companyAddress">Company Address</Label>
                <Input
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                  placeholder="Enter company address"
                />
              </div>
            )}
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  placeholder="+91 Enter mobile number"
                  disabled={mobileOtpSent}
                />
                <Button
                  type="button"
                  onClick={sendOtp}
                  disabled={isSubmitting || mobileOtpSent || formData.mobile.length <= 3}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  {mobileOtpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              </div>
            </div>
            {mobileOtpSent && (
              <div>
                <Label htmlFor="mobileOtp">Mobile OTP</Label>
                <Input
                  id="mobileOtp"
                  name="mobileOtp"
                  value={formData.mobileOtp}
                  onChange={handleChange}
                  required
                  placeholder="Enter mobile OTP"
                />
              </div>
            )}
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !mobileOtpSent || !formData.mobileOtp}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-md"
              >
                {isSubmitting ? "Submitting..." : "Submit Interest"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default InterestedCandidateForm;