"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";
import axiosInstance from "../components/services/apiinterseptor";

interface College {
  _id?: string;
  collegeName: string;
  logoUrl: string | null;
  location: string;
  order: number;
}

// Placeholder image for colleges without logos
const placeholderImage = "/homepage_imgs/6190696.png";

const CollegeTieUp: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const response = await axiosInstance.get(`${backendUrl}/admin/college-tieups`);

        console.log('response', response?.data?.data);  
        setColleges(response?.data?.data || []);
      } catch (err) {
        console.error('Error fetching colleges:', err);
        setError('Failed to load colleges. Please try again later.');
        setColleges([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchColleges();
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-8 min-h-screen">
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-4 lg:mt-8">
          Our College Tie-Ups
        </h2>
        <p className="text-center text-gray-600 mb-8 lg:mb-16">
          EarlyJobs AI collaborates with India's top colleges to empower future
          talent.
        </p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-600">Loading colleges...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Retry
              </button>
            </div>
          </div>
        ) : colleges.length === 0 ? (
          <div className="flex justify-center items-center py-16">
            <p className="text-gray-600 text-lg">No colleges found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {colleges.map((college) => (
              <div
                key={college._id || college.collegeName}
                className="college-card bg-gray-100 p-4 rounded-lg shadow-md text-center hover:scale-102 transition-transform duration-300 border-t-3 border-orange-500 hover:border-blue-80 max-h-55 min-h-55"
              >
                {college.logoUrl ? (
                  <img
                  src={college.logoUrl}
                  alt={`${college.collegeName} logo`}
                  className="mx-auto h-30 w-30 scale-120"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = placeholderImage;
                  }}
                />
                ) : (
                  <img
                    src={placeholderImage}
                    alt="Placeholder logo"
                    className="mx-auto h-20 mb-4 object-contain"
                  />
                )}
                <h3 className="text-lg font-semibold text-gray-800">
                  {college.collegeName}
                </h3>
                <p className="text-sm text-gray-600">{college.location}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CollegeTieUp;
