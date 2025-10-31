"use client";
import React, { useState, useEffect } from "react";
import Header from "../components/pages/header";
import Footer from "../components/pages/footer";

interface Company {
  id: string;
  name: string;
  logo_url: string;
  registered_address: string;
  address: string;
  email: string;
  phone: string;
  gst_no?: string | null;
  created_at: string;
  updated_at: string;
  referred_by: string | null;
  is_external_company: boolean;
}

const Clientele: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL_2_0}/public/companies`;
  console.log("API URL:", apiUrl);
  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch companies");
        }
        return response.json();
      })
      .then((data: Company[]) => {
        const validCompanies = data.filter((company) => !company.is_external_company).filter((company) =>
          /^[a-zA-Z0-9\s.,&-]+$/.test(company.name)
        );
        setCompanies(validCompanies);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching companies:", error);
        setError("Failed to load companies. Please try again later.");
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mx-auto px-8 py-8">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-8 py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-8 py-8">
        <h2 className="text-4xl font-bold text-orange-500 text-center mb-4 lg:mt-8">
          Our Clientele
        </h2>
        <p className="text-center text-gray-600 mb-8 lg:mb-16">
          EarlyJobs AI powers hiring for India&apos;s best brands.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {companies.map((company) => (
            <div
              key={company.id}
              className="client-card bg-gray-100 p-4 rounded-lg shadow-md text-center hover:scale-105 transition-transform duration-300 border-t-3 border-orange-500 hover:border-blue-800"
            >
              <img
                src={company.logo_url}
                alt={`${company.name} logo`}
                className="mx-auto h-16 mb-4 bg-white"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://cdn-app.sealsubscriptions.com/shopify/public/img/promo/no-image-placeholder.png";
                }}
              />
              <h3 className="text-lg font-semibold text-gray-800">{company.name}</h3>
              <button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                onClick={() => alert(`View services for ${company.name}`)}
              >
                Services
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Clientele;