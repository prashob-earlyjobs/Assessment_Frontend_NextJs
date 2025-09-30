import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const RequestForm = ({ isFranchise }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    district: "",
    lookingFor: "",
  });

  useEffect(() => {
    console.log("isFranchise", isFranchise);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const sheetData = {
        name: formData.name,
        email: formData.email,
        contact: formData.contact,
        district: formData.district,
        lookingFor: isFranchise ? "Franchise" : formData.lookingFor,
        postDateTime: new Date().toISOString(),
      };

      // Send data to SheetDB
      const sheetResponse = await fetch("https://sheetdb.io/api/v1/cw5ryaik6yrl1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [sheetData] }),
        }
      );

      if (!sheetResponse.ok) {
        throw new Error("Failed to save data to SheetDB");
      }

      const emailParams = {
        from_name: formData.name,
        from_email: formData.email,
        contact: formData.contact,
        district: formData.district,
        looking_for: isFranchise ? "Franchise" : formData.lookingFor,
        to_email:
          formData.lookingFor === "Candidate"
            ? "franchise@earlyjobs.in"
            : "akanksha@earlyjobs.in",
        cc_email: "prajwal@earlyjobs.in",
        subject: `Consultation Request from ${formData.name}`,
        message: `
          <html>
            <body>
              <p>Hi Earlyjobs Team,</p>
              <p>We have received a request for free consultation from <strong>${formData.name}</strong> with email id <strong>${formData.email}</strong> and contact number <strong>${formData.contact}</strong>.</p>
              <p>They are looking for <strong>${isFranchise ? "Franchise" : formData.lookingFor}</strong>.</p>
              <p>District: <strong>${formData.district}</strong></p>
              <p>Regards,<br>earlyjobs.in team<br>Victaman Enterprises</p>
            </body>
          </html>
        `,
      };

      // Send email using EmailJS
      await emailjs.send(
        "service_ovaxj17",
        "template_v0jj42o",
        emailParams,
        "Qz7wBRaW9bttj7rra"
      );

      toast.success("Your request has been submitted successfully");

      setFormData({
        name: "",
        email: "",
        contact: "",
        district: "",
        lookingFor: "",
      });
    } catch (error) {
      console.error("Error submitting consultation request: ", error);
      toast.error("There was an issue submitting your request. Please try again.");
    }
  };

  return (
    <form
      className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-orange-400"
      onSubmit={handleSubmit}
    >
      {!isFranchise && (
        <>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Free Consultation by Expert
          </h2>
          <hr className="border-gray-300 mb-6" />
        </>
      )}
      <div className="mb-4">
        <input
          type="text"
          required
          placeholder="Enter Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          required
          placeholder="Enter Email Id"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="tel"
          required
          placeholder="Contact Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="contact"
          value={formData.contact}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          required
          placeholder="District"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          name="district"
          value={formData.district}
          onChange={handleInputChange}
        />
      </div>
      {!isFranchise && (
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <input
              type="radio"
              required
              name="lookingFor"
              id="Job"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              value="Job"
              onChange={handleInputChange}
            />
            <label htmlFor="Job" className="ml-2 text-gray-700">
              Looking For Job
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              required
              name="lookingFor"
              id="Candidate"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              value="Candidate"
              onChange={handleInputChange}
            />
            <label htmlFor="Candidate" className="ml-2 text-gray-700">
              Looking For Candidate
            </label>
          </div>
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Send
      </button>
    </form>
  );
};

export default RequestForm;