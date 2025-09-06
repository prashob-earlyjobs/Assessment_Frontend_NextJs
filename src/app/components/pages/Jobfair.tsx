import React from "react";

const JobFairSection = () => {
  const company_logo_urls = [
    "https://imgs.search.brave.com/luj9gLwVV9jNcq9xln9AcHDSZhZB44mg0TfjtPpSS1Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2NjLzE1/Lzc0L2NjMTU3NGU2/YjE1ZWQ4YWE4YTc3/NTljMmM5MjIwNDI5/LmpwZw",
    "https://imgs.search.brave.com/0a9pz95jAiAJwN1XDwqvjVf2yG5YUz2pMtqSb6I_z1w/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC85/MzAtOTMwNTQwMV90/ZWxlcGVyZm9ybWFu/Y2Utbm9yZGljLXRl/bGVwZXJmb3JtYW5j/ZS1sb2dvLnBuZw",
    "https://imgs.search.brave.com/Lz7qiJN-t3QYjXTUuPx7_4TfCkHrPU19rASFLitx8BY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIxLzAz/L1BheXRtX0xvZ28t/NTAweDI2Ny5qcGc",
    "https://imgs.search.brave.com/7nMzpYhwPHX3ykOG80WVFM28T4BoA8H-siQMY59l7i8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2NvZ2Vu/dC1jb21tdW5pY2F0/aW9uczYyNDgubG9n/b3dpay5jb20ud2Vi/cA",
    "https://imgs.search.brave.com/Jbj53iphbZ4xa1l_6CJwC88CO9YfKHZ6V5u2eUXV0No/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzLzI0N2Fp/OTk0MS5sb2dvd2lr/LmNvbS53ZWJw",
    "https://imgs.search.brave.com/69LsYyxyV4o4BZoOHmcmwVuQ4ITRBQ9AOX6GqI4hZ-M/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2JhbmRo/YW4tYmFuazM5ODMu/anBn",
    "https://imgs.search.brave.com/O4vzinRJo50ktmeC4EEoGcku9pA9Nd83oeoieq6YHcM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9sb2dv/d2lrLmNvbS9jb250/ZW50L3VwbG9hZHMv/aW1hZ2VzL2lpZmwt/ZmluYW5jZTc4MDku/anBn",
    "https://imgs.search.brave.com/zsG8h0CNslH8zXd8ghJqKLVWm7a1unp70g0lUi2uHXk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuc3RhcnR1cHRh/bGt5LmNvbS8yMDIx/LzA0L2p1c3RkaWFs/LWxvZ28tc3RhcnR1/cHRhbGt5LmpwZw",
    "https://imgs.search.brave.com/GQ04PmzQK21eEonZRBDFBIq_D_z331zz4X7SpW5d8v4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bmljZXBuZy5jb20v/cG5nL2RldGFpbC8y/NjctMjY3NDU2MV95/ZXMtYmFuay1sb2dv/LnBuZw",
    "https://imgs.search.brave.com/4Sk2swhqF3aycp71odU30CGR6CgC2WSmW18qGsCpZso/rs:fit:0:180:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5kZXNpZ25ydXNo/LmNvbS9hZ2VuY2ll/cy82NjcxNDkvY29u/dmVyc2lvbnMvSmlu/ZGFsWC1sb2dvLXBy/b2ZpbGUuanBn",
    "https://imgs.search.brave.com/ZpnHeXPEqcX9IyydKQHavIy_PkOTrjPU7LhIY71nn-Y/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuc3RhcnR1cHRh/bGt5LmNvbS8yMDIz/LzAxL3NoYWFkaS5j/b20tbG9nby1zdGFy/dHVwdGFsa3kuanBn",
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 md:p-6 lg:p-8 bg-white">
      <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
          Join Our Community <br />
          Over <span className="text-orange-500">Top Companies</span>
        </h2>
      </div>
      <div className="w-full md:w-3/4 overflow-hidden">
        <div className="marquee flex flex-col space-y-6">
          {/* First Row: Moves Left */}
          <div className="flex space-x-4 animate-marquee-left">
            {[...Array(12)].map((_, setIndex) => (
              <div
                key={`row1-${setIndex}`}
                className="flex space-x-4 min-w-full"
              >
                {company_logo_urls.slice(0, 6).map((url, index) => (
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
            {[...Array(12)].map((_, setIndex) => (
              <div
                key={`row2-${setIndex}`}
                className="flex space-x-4 min-w-full"
              >
                {company_logo_urls.slice(6, 12).map((url, index) => (
                  <div
                    key={`row2-${setIndex}-${index}`}
                    className="flex-shrink-0 bg-white p-2 md:p-3 lg:p-4 border border-gray-200 rounded-lg"
                  >
                    <img
                      src={url}
                      alt={`Company ${index + 7}`}
                      className="h-12 md:h-16 lg:h-20 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Animation Styles */}
        <style>
          {`
            @keyframes marquee-left {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } /* Half since repeated */
            }
            @keyframes marquee-right {
              0% { transform: translateX(0); }
              100% { transform: translateX(50%); }
            }
            .animate-marquee-left {
              display: flex;
              animation: marquee-left 30s linear infinite;
              width: 200%;
            }
            .animate-marquee-right {
              display: flex;
              animation: marquee-right 30s linear infinite;
              width: 200%;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default JobFairSection;
