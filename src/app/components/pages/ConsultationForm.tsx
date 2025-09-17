"use client";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

const ConsultationForm = () => {
  const sitekey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    freelanceRecruiter: false,
    intern: false,
  });
  const [captchaValue, setCaptchaValue] = useState(null);

  function onChange(value) {
    setCaptchaValue(value);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Form submitted:", formData);
    // Show success toast
    toast.success("Form successfully submitted!");
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      number: "",
      freelanceRecruiter: false,
      intern: false,
    });
    setCaptchaValue(null); // Reset reCAPTCHA
  };

  // Check if all fields are filled and reCAPTCHA is completed
  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.number.trim() !== "" &&
    captchaValue !== null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Free Consultation by Expert</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-800 mb-2">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-800 mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="number" className="text-sm font-medium text-gray-800 mb-2">Phone Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-md text-gray-800 focus:border-blue-500 focus:outline-none transition-colors"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            required
          />
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center text-sm text-gray-800">
            <input
              type="checkbox"
              name="freelanceRecruiter"
              checked={formData.freelanceRecruiter}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            Become a Freelance Recruiter
          </label>
          <label className="flex items-center text-sm text-gray-800">
            <input
              type="checkbox"
              name="intern"
              checked={formData.intern}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-blue-500"
            />
            Become an Intern
          </label>
        </div>
        <ReCAPTCHA
          sitekey={sitekey}
          onChange={onChange}
        />
        <button
          type="submit"
          className={`p-3 rounded-md font-medium transition-colors ${
            isFormValid ? "bg-orange-500 text-white hover:bg-orange-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ConsultationForm;