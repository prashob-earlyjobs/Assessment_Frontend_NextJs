import React, { useState, useEffect } from "react";

const JobFairSection = () => {
  const [companyLogoUrls, setCompanyLogoUrls] = useState([]);

  useEffect(() => {
    // Fetch company logos from the API
    const fetchLogos = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL_IN
        const response = await fetch(`${API_BASE_URL}/companies/companies`); // Replace with your actual API endpoint
        const data = await response.json();
        // Extract logo URLs from the API response
        const urls = data.companies.map((company) => company.logo_url);
        setCompanyLogoUrls(urls);
      } catch (error) {
        console.error("Error fetching company logos:", error);
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 lg:p-8 bg-white mx-auto">
      <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Join Our Community <br />
          Over <span className="text-orange-500">Top Companies</span>
        </h2>
      </div>
      <div className="w-full md:w-3/4 overflow-hidden">
        <div className="marquee">
          {/* Single Marquee: Moves Left */}
          {companyLogoUrls.length > 0 && (
            <div className="flex space-x-4 animate-marquee-left">
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={`marquee-${setIndex}`}
                  className="flex space-x-4 min-w-full"
                >
                  {companyLogoUrls.map((url, index) => (
                    <div
                      key={`marquee-${setIndex}-${index}`}
                      className="flex-shrink-0 bg-white p-2 md:p-3 lg:p-4 border border-gray-200 rounded-lg w-32 md:w-40 lg:w-48 flex items-center justify-center"
                    >
                      <img
                        src={url}
                        alt={`Company ${index + 1}`}
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain max-w-full"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Animation Styles */}
        <style>
          {`
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-marquee-left {
              display: flex;
              animation: marquee-left 30s linear infinite;
              width: 200%;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default JobFairSection;