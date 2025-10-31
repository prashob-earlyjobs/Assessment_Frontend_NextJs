"use client";
import React, { useState } from "react";
import "./LeadCaptureForm.css";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import { toast } from "sonner";

const API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_URL_2_0;

interface FormData {
  franchiseId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  experience: string;
  skills: string;
  industry: string;
  city: string;
  resume: boolean;
}

const LeadCaptureSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    franchiseId: "bangalore-urban",
    name: "",
    email: "",
    phone: "",
    role: "student",                    // default
    experience: "0-1",
    skills: "",
    industry: "it",                     // default
    city: "Bangalore Urban",          // default
    resume: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const required = [
      formData.name,
      formData.email,
      formData.phone,
      formData.skills,
    ];
    if (required.some((f) => !f.trim())) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const resp = await fetch(`${API_ENDPOINT}/franchiseForm/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          franchiseId: formData.franchiseId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          experience: formData.experience,
          skills: formData.skills,
          industry: formData.industry,
          city: formData.city,
          resume: formData.resume,
          source: "Bangalore Urban-landing",
        }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => null);
        throw new Error(text || `API responded with ${resp.status}`);
      }

      toast.success(
        "Your form was submitted successfully. We'll contact you within 24 hours."
      );

      setFormData({
        franchiseId: "Bangalore Urban",
        name: "",
        email: "",
        phone: "",
        role: "student",
        experience: "0-1",
        skills: "",
        industry: "it",
        city: "Bangalore Urban",
        resume: false,
      });
    } catch (err: any) {
      console.error("Lead submit failed:", err);
      toast.error("Submission failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="lead-capture" className="lead-capture-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Join the EarlyJobs Bangalore Urban Network
          </h2>
          <p className="section-subtitle">
            Take the first step towards your career goals or hiring needs with
            Bangalore Urban's trusted recruitment partner
          </p>
        </div>

        <div className="grid-container">
          {/* Features & Contact */}
          <div className="features-container">
            <h3 className="features-title">
              Why Choose EarlyJobs Bangalore Urban?
            </h3>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon-container">
                  <Shield className="feature-icon" />
                </div>
                <div>
                  <h4 className="feature-title">Local Expertise</h4>
                  <p className="feature-description">
                    Deep understanding of Bangalore Urban's job market and business
                    landscape
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-container">
                  <Clock className="feature-icon" />
                </div>
                <div>
                  <h4 className="feature-title">Quick Response</h4>
                  <p className="feature-description">
                    24-48 hours response time for all inquiries
                  </p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon-container">
                  <Award className="feature-icon" />
                </div>
                <div>
                  <h4 className="feature-title">Proven Success</h4>
                  <p className="feature-description">
                    High placement success with verified local employers
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-info">
              <h4 className="contact-title">Get in Touch</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <Phone className="contact-icon" />
                  <span>+91 98728 74150</span>
                </div>
                <div className="contact-item">
                  <Mail className="contact-icon" />
                  <span>Bangalore Urban@earlyjobs.in</span>
                </div>
                <div className="contact-item">
                  <MapPin className="contact-icon" />
                  <span>Bangalore Urban & surrounding areas</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <Card className="form-card">
            <CardHeader className="form-header">
              <CardTitle className="form-title">Get Started Today</CardTitle>
              <p className="form-subtitle">
                Join thousands of successful candidates and employers
              </p>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="form-container">
                {/* Hidden fields */}
                <input type="hidden" name="franchiseId" value={formData.franchiseId} />
                <input type="hidden" name="resume" value={String(formData.resume)} />

                {/* Name */}
                <div className="form-group">
                  <Label htmlFor="name" className="form-label">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    required
                    className="form-input"
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <Label htmlFor="phone" className="form-label">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "");
                      let formatted = raw;
                      if (raw.length === 10) formatted = `+91${raw}`;
                      if (raw.startsWith("91") && raw.length === 12)
                        formatted = `+${raw}`;
                      setFormData({ ...formData, phone: formatted });
                    }}
                    placeholder="+91XXXXXXXXXX"
                    required
                    className="form-input"
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <Label htmlFor="email" className="form-label">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="your.email@example.com"
                    required
                    className="form-input"
                  />
                </div>

                {/* ROLE - DROPDOWN */}
                <div className="form-group">
                  <Label htmlFor="role" className="form-label">
                    I am a: *
                  </Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    required
                    className="form-select"
                  >
                    <option value="student">Student / Job Seeker</option>
                    <option value="college">College Representative</option>
                    <option value="employer">Employer / HR</option>
                  </select>
                </div>

                {/* Experience */}
                <div className="form-group">
                  <Label htmlFor="experience" className="form-label">
                    Experience *
                  </Label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    required
                    className="form-select"
                  >
                    <option value="0-1">0-1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">5+ years</option>
                  </select>
                </div>

                {/* Skills */}
                <div className="form-group">
                  <Label htmlFor="skills" className="form-label">
                    Skills *
                  </Label>
                  <Input
                    id="skills"
                    value={formData.skills}
                    onChange={(e) =>
                      setFormData({ ...formData, skills: e.target.value })
                    }
                    placeholder="e.g. Java, Python, React"
                    required
                    className="form-input"
                  />
                </div>

                {/* INDUSTRY - DROPDOWN */}
                <div className="form-group">
                  <Label htmlFor="industry" className="form-label">
                    Industry *
                  </Label>
                  <select
                    id="industry"
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    required
                    className="form-select"
                  >
                    <option value="it">IT / Software</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="retail">Retail</option>
                    <option value="finance">Finance / Banking</option>
                    <option value="logistics">Logistics / Supply Chain</option>
                    <option value="agriculture">Agriculture</option>
                    <option value="automotive">Automotive</option>
                    <option value="textile">Textile / Apparel</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* City */}
                <div className="form-group">
                  <Label htmlFor="city" className="form-label">
                    City
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    readOnly
                    className="form-input readonly"
                  />
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="submit-button"
                  style={{ border: "0px" }}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Join EarlyJobs Bangalore Urban"}
                </Button>

                <p className="form-footer">
                  By submitting this form, you agree to our Terms of Service
                  and Privacy Policy
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureSection;