"use client";

import React from "react";
import { FaLinkedin } from "react-icons/fa";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import Navbar from "../components/pages/navbar";

type Director = {
  id: string;
  name: string;
  designation: string;
  imageUrl: string;
  linkedInUrl?: string;
  biography: string;
};

const directors: Director[] = [
  {
    id: "1",
    name: "Saurav Kumar",
    designation: "Founder & CEO",
    imageUrl: "/images/1756300384422.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/mesauravkumar",
    biography:
      "Founder & CEO of EarlyJobs. Building AI-powered hiring and a distributed recruiter network to connect talent with opportunity at scale.",
  },
  {
    id: "2",
    name: "Ravi Prakash Kumar",
    designation: "Founder & Director",
    imageUrl: "/images/founder-image.jpg",
    linkedInUrl: "https://www.linkedin.com/in/raviprakashkumar",
    biography:
      "Founder of EarlyJobs with deep experience in recruitment. Focused on bridging the gap between talent and opportunity across India.",
  },
  {
    id: "3",
    name: "Surbhi Rani",
    designation: "Co-Founder & Director",
    imageUrl: "/images/1765196458989.jpeg",
    linkedInUrl: "https://www.linkedin.com/in/thesurbhirani",
    biography:
      "Co-Founder & Director at EarlyJobs. Passionate about empowering freelance recruiters and creating accessible career pathways.",
  },
  {
    id: "4",
    name: "Prashob P",
    designation: "CTO",
    imageUrl: "/images/1780079531953.png",
    biography:
      "CTO leading technology and product innovation at EarlyJobs, building scalable platforms for recruiters, colleges, and employers.",
  },
  {
    id: "5",
    name: "Shankar Gaur",
    designation: "Non-Executive Director",
    imageUrl: "/images/1769533094910.jpeg",
    biography:
      "Non-Executive Director at EarlyJobs with 30+ years of leadership experience, including expertise in scaling job marketplaces and high-growth startups.",
  },
];

const TeamPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="px-4 sm:px-6 pt-10 sm:pt-14 pb-4 max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Our Directors
          </h1>
          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Meet the leadership guiding EarlyJobs&apos; mission to transform hiring across India.
          </p>
        </div>

        <div className="px-3 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {directors.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm"
              >
                <div className="flex-shrink-0 w-full sm:w-[180px] md:w-[200px] aspect-square max-w-[160px] sm:max-w-[180px] md:max-w-[200px] mx-auto sm:mx-0">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    draggable="false"
                    className="w-full h-full object-cover rounded-xl select-none bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = "/images/company_placeholder.png";
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-col w-full min-w-0">
                  <div className="flex items-start gap-2 sm:gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 leading-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base font-medium text-[#EB6A4D] mb-1">
                        {member.designation}
                      </p>
                    </div>
                    {member.linkedInUrl && (
                      <a
                        href={member.linkedInUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0077b5] hover:text-[#005885] transition-colors flex-shrink-0 mt-1"
                        aria-label={`${member.name}'s LinkedIn profile`}
                      >
                        <FaLinkedin className="text-xl sm:text-2xl" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {member.biography}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TeamPage;
