import React, { useState, useEffect } from "react";

const JobFairSection = () => {
  const [companyLogos, setCompanyLogos] = useState([]);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Fetch logo URLs from your API
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`${backendUrl}/companies/companies`);
        const data = await response.json();
        // Adjust mapping based on your API response structure
        const logos = data.map((item) => item.logo_url); // Example: assuming logoUrl is the field
        setCompanyLogos(logos);
      } catch (error) {
        console.error("Error fetching logos:", error);
        setCompanyLogos([]); // Fallback to empty array on error
      }
    };

    fetchLogos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 lg:p-8 bg-white">
      <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Join Our Community <br />
          Over <span className="text-orange-500">Top Companies</span>
        </h2>
      </div>
      <div className="w-full md:w-3/4 overflow-hidden">
        {companyLogos.length > 0 ? (
          <div className="marquee flex flex-col space-y-6">
            {/* First Row: Moves Left */}
            <div className="flex space-x-4 animate-marquee-left">
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={`row1-${setIndex}`}
                  className="flex space-x-4 min-w-full"
                >
                  {companyLogos.slice(0, Math.ceil(companyLogos.length / 2)).map((url, index) => (
                    <div
                      key={`row1-${setIndex}-${index}`}
                      className="flex-shrink-0 bg-white p-2 md:p-3 lg:p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={url}
                        alt={`Company ${index + 1}`}
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                       
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Second Row: Moves Right */}
            <div className="flex space-x-4 animate-marquee-right">
              {[...Array(2)].map((_, setIndex) => (
                <div
                  key={`row2-${setIndex}`}
                  className="flex space-x-4 min-w-full"
                >
                  {companyLogos.slice(Math.ceil(companyLogos.length / 2)).map((url, index) => (
                    <div
                      key={`row2-${setIndex}-${index}`}
                      className="flex-shrink-0 bg-white p-2 md:p-3 lg:p-4 border border-gray-200 rounded-lg"
                    >
                      <img
                        src={url}
                        alt={`Company ${index + Math.ceil(companyLogos.length / 2) + 1}`}
                        className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                        
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading logos...</div>
        )}

        {/* Animation Styles */}
        <style>
          {`
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
            @keyframes marquee-right {
              0% { transform: translateX(0); }
              100% { transform: translateX(100%); }
            }
            .animate-marquee-left {
              display: flex;
              animation: marquee-left 20s linear infinite;
              width: 200%;
            }
            .animate-marquee-right {
              display: flex;
              animation: marquee-right 20s linear infinite;
              width: 200%;
            }
            .marquee:hover .animate-marquee-left,
            .marquee:hover .animate-marquee-right {
              animation-play-state: paused;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default JobFairSection;